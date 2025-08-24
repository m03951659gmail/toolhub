// EXIF Data Viewer with Leaflet Map Integration

class EXIFViewer {
    constructor() {
        this.map = null;
        this.marker = null;
        this.exifData = null;
        this.uploadLabel = null;
        this.resultsSection = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.initializeMap();
    }

    cacheElements() {
        this.uploadLabel = document.querySelector('.upload-label');
        this.resultsSection = document.getElementById('results-section');
    }

    setupEventListeners() {
        const fileInput = document.getElementById('file-input');
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop functionality
        this.setupDragAndDrop();

        // Keyboard navigation
        fileInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInput.click();
            }
        });
    }

    setupDragAndDrop() {
        const dropArea = this.uploadLabel;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('drag-over');
            });
        });

        dropArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                this.handleFileSelect({ target: { files: files } });
            } else {
                this.showError('Please drop an image file');
            }
        });
    }

    initializeMap() {
        // Initialize Leaflet map centered on world view
        this.map = L.map('map').setView([0, 0], 2);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            this.showError('Please select an image file (JPEG, PNG, etc.)');
            return;
        }

        // Show results section
        this.resultsSection.style.display = 'block';
        this.showLoading();

        const reader = new FileReader();
        reader.onload = (e) => {
            this.extractEXIFData(e.target.result, file);
        };
        reader.onerror = () => {
            this.showError('Error reading file. Please try again.');
        };
        reader.readAsArrayBuffer(file);
    }

    extractEXIFData(arrayBuffer, file) {
        try {
            // Use exif-js library (we'll include it via CDN)
            const exif = EXIF.readFromBinaryFile(arrayBuffer);

            if (!exif || Object.keys(exif).length === 0) {
                this.showError('No EXIF data found in this image.');
                return;
            }

            this.exifData = exif;
            this.displayEXIFData(exif);
            this.displayImagePreview(arrayBuffer, file.type);
            this.handleGPSData(exif);

        } catch (error) {
            console.error('Error extracting EXIF data:', error);
            this.showError('Error extracting EXIF data. The image might not contain EXIF information.');
        }
    }

    displayEXIFData(exifData) {
        const exifContainer = document.getElementById('exif-data');
        exifContainer.style.display = 'block';
        exifContainer.classList.add('fade-in');

        // Group EXIF data by category
        const categories = {
            'Camera Information': [
                'Make', 'Model', 'Software', 'DateTime', 'DateTimeOriginal', 'DateTimeDigitized'
            ],
            'Camera Settings': [
                'ExposureTime', 'FNumber', 'ISOSpeedRatings', 'ExposureProgram', 'ExposureMode',
                'MeteringMode', 'Flash', 'FocalLength', 'FocalLengthIn35mmFilm'
            ],
            'Image Properties': [
                'ImageWidth', 'ImageLength', 'Orientation', 'ResolutionUnit',
                'XResolution', 'YResolution'
            ],
            'GPS Information': [
                'GPSLatitude', 'GPSLongitude', 'GPSAltitude', 'GPSTimeStamp',
                'GPSDateStamp', 'GPSSpeed'
            ],
            'Other Information': [
                'Artist', 'Copyright', 'UserComment', 'WhiteBalance', 'LensMake', 'LensModel'
            ]
        };

        let html = '<h2>EXIF Data</h2>';

        for (const [category, fields] of Object.entries(categories)) {
            const categoryData = this.getCategoryData(exifData, fields);
            if (Object.keys(categoryData).length > 0) {
                html += this.createCategoryTable(category, categoryData);
            }
        }

        exifContainer.innerHTML = html;
    }

    getCategoryData(exifData, fields) {
        const data = {};
        fields.forEach(field => {
            if (exifData[field] !== undefined) {
                data[field] = this.formatEXIFValue(field, exifData[field]);
            }
        });
        return data;
    }

    formatEXIFValue(field, value) {
        // Format specific EXIF values for better readability
        switch (field) {
            case 'ExposureTime':
                return `${value} sec`;
            case 'FNumber':
                return `ƒ/${value}`;
            case 'FocalLength':
                return `${value} mm`;
            case 'FocalLengthIn35mmFilm':
                return `${value} mm (35mm equivalent)`;
            case 'ISOSpeedRatings':
                return `ISO ${value}`;
            case 'DateTime':
            case 'DateTimeOriginal':
            case 'DateTimeDigitized':
                // EXIF DateTime format is "YYYY:MM:DD HH:MM:SS"
                // We need to replace the first colon with a hyphen for Date object parsing
                if (typeof value === 'string') {
                    const formattedDateString = value.replace(/:(\d{2}:)/, '-$1').replace(/:(\d{2})/, '-$1');
                    const date = new Date(formattedDateString);
                    // Check if the date is valid before formatting
                    if (!isNaN(date.getTime())) {
                        return date.toLocaleString();
                    }
                }
                return value; // Return original value if parsing fails or not a string
            case 'GPSLatitude':
            case 'GPSLongitude':
                return this.convertGPSToDecimal(value);
            case 'GPSAltitude':
                return `${value} meters`;
            case 'Flash':
                return this.formatFlashValue(value);
            default:
                return value.toString();
        }
    }

    convertGPSToDecimal(gpsArray) {
        if (!gpsArray || !Array.isArray(gpsArray) || gpsArray.length !== 3) {
            return 'N/A';
        }

        const [degrees, minutes, seconds] = gpsArray;
        return degrees + (minutes / 60) + (seconds / 3600);
    }

    formatFlashValue(flashValue) {
        const flashModes = {
            0x0: 'Flash did not fire',
            0x1: 'Flash fired',
            0x5: 'Strobe return light not detected',
            0x7: 'Strobe return light detected',
            0x9: 'Flash fired, compulsory flash mode',
            0xD: 'Flash fired, compulsory flash mode, return light not detected',
            0xF: 'Flash fired, compulsory flash mode, return light detected',
            0x10: 'Flash did not fire, compulsory flash mode',
            0x18: 'Flash did not fire, auto mode',
            0x19: 'Flash fired, auto mode',
            0x1D: 'Flash fired, auto mode, return light not detected',
            0x1F: 'Flash fired, auto mode, return light detected',
            0x20: 'No flash function',
            0x41: 'Flash fired, red-eye reduction mode',
            0x45: 'Flash fired, red-eye reduction mode, return light not detected',
            0x47: 'Flash fired, red-eye reduction mode, return light detected',
            0x49: 'Flash fired, compulsory flash mode, red-eye reduction mode',
            0x4D: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
            0x4F: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
            0x59: 'Flash fired, auto mode, red-eye reduction mode',
            0x5D: 'Flash fired, auto mode, red-eye reduction mode, return light not detected',
            0x5F: 'Flash fired, auto mode, red-eye reduction mode, return light detected'
        };

        return flashModes[flashValue] || `Unknown flash mode (${flashValue})`;
    }

    createCategoryTable(category, data) {
        let table = `
            <h3>${category}</h3>
            <table class="exif-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const [property, value] of Object.entries(data)) {
            table += `
                <tr>
                    <td><strong>${property}</strong></td>
                    <td>${value}</td>
                </tr>
            `;
        }

        table += `
                </tbody>
            </table>
        `;

        return table;
    }

    displayImagePreview(arrayBuffer, mimeType) {
        const blob = new Blob([arrayBuffer], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const preview = document.createElement('div');
        preview.innerHTML = `
            <h3>Image Preview</h3>
            <img src="${url}" alt="Uploaded image" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">
        `;

        const exifContainer = document.getElementById('exif-data');
        exifContainer.insertBefore(preview, exifContainer.firstChild);
    }

    handleGPSData(exifData) {
        const { GPSLatitude, GPSLongitude, GPSLatitudeRef, GPSLongitudeRef } = exifData;

        if (GPSLatitude && GPSLongitude) {
            let lat = this.convertGPSToDecimal(GPSLatitude);
            let lng = this.convertGPSToDecimal(GPSLongitude);

            // Apply reference (N/S, E/W)
            if (GPSLatitudeRef === 'S') lat = -lat;
            if (GPSLongitudeRef === 'W') lng = -lng;

            this.updateMap(lat, lng);
            this.showSuccess('GPS coordinates found and mapped!');
        } else {
            this.showInfo('No GPS coordinates found in this image.');
        }
    }

    updateMap(latitude, longitude) {
        // Clear existing marker
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }

        // Set map view to the coordinates
        this.map.setView([latitude, longitude], 15);

        // Add new marker
        this.marker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup('Photo Location<br>Lat: ' + latitude.toFixed(6) + '<br>Lng: ' + longitude.toFixed(6))
            .openPopup();

        // Add circle to show accuracy (if available)
        L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: 50
        }).addTo(this.map);
    }

    showLoading() {
        const exifContainer = document.getElementById('exif-data');
        exifContainer.style.display = 'block';
        exifContainer.innerHTML = '<div class="loading">Processing image...</div>';
    }

    showError(message) {
        const exifContainer = document.getElementById('exif-data');
        exifContainer.style.display = 'block';
        exifContainer.innerHTML = `<div class="error">${message}</div>`;
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;

        const exifContainer = document.getElementById('exif-data');
        exifContainer.insertBefore(successDiv, exifContainer.firstChild);
    }

    showInfo(message) {
        const infoDiv = document.createElement('div');
        infoDiv.style.background = '#e3f2fd';
        infoDiv.style.color = '#1565c0';
        infoDiv.style.padding = '15px';
        infoDiv.style.borderRadius = '8px';
        infoDiv.style.margin = '10px 0';
        infoDiv.style.borderLeft = '4px solid #1565c0';
        infoDiv.textContent = message;

        const exifContainer = document.getElementById('exif-data');
        exifContainer.insertBefore(infoDiv, exifContainer.firstChild);
    }
}

// Initialize the EXIF viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load exif-js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/exif-js@2.3.0/exif.min.js';
    script.onload = () => {
        new EXIFViewer();
    };
    document.head.appendChild(script);
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}