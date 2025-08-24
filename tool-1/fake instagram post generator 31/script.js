// Fake Instagram Post Generator - Main Script
// Handles all interactivity, real-time preview, and download functionality

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('postForm');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const addCommentBtn = document.getElementById('addComment');
    const commentsContainer = document.getElementById('commentsContainer');
    
    // Preview elements
    const previewProfileImage = document.getElementById('previewProfileImage');
    const previewPostImage = document.getElementById('previewPostImage');
    const previewUsername = document.getElementById('previewUsername');
    const previewUsernameCaption = document.getElementById('previewUsernameCaption');
    const verifiedBadge = document.getElementById('verifiedBadge');
    const previewCaption = document.getElementById('previewCaption');
    const previewLikes = document.getElementById('previewLikes');
    const commentsList = document.getElementById('commentsList');
    const previewTime = document.getElementById('previewTime');
    const likeButton = document.getElementById('likeButton');
    
    // Input elements
    const profileImageInput = document.getElementById('profileImageInput');
    const postImageInput = document.getElementById('postImageInput');
    const usernameInput = document.getElementById('username');
    const verifiedInput = document.getElementById('verified');
    const captionInput = document.getElementById('caption');
    const likesInput = document.getElementById('likes');
    const postDateInput = document.getElementById('postDate');
    const postTimeInput = document.getElementById('postTime');
    
    // Set current date and time as default
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    
    postDateInput.value = today;
    postTimeInput.value = currentTime;
    
    // Format time display (e.g., "2 hours ago")
    function formatTimeAgo() {
        const now = new Date();
        const postTime = new Date(
            postDateInput.value + 'T' + postTimeInput.value + ':00'
        );
        
        const diffMs = now - postTime;
        const diffMins = Math.round(diffMs / 60000);
        const diffHours = Math.round(diffMins / 60);
        const diffDays = Math.round(diffHours / 24);
        
        if (diffMins < 60) {
            return diffMins === 0 ? 'just now' : `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
            const weeks = Math.round(diffDays / 7);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        }
    }
    
    // Update preview function
    function updatePreview() {
        // Update username in header and caption
        const username = usernameInput.value || 'username';
        previewUsername.textContent = username;
        previewUsernameCaption.textContent = username;
        
        // Toggle verified badge
        if (verifiedInput.checked) {
            verifiedBadge.classList.remove('hidden');
        } else {
            verifiedBadge.classList.add('hidden');
        }
        
        // Update caption
        previewCaption.textContent = captionInput.value || '';
        
        // Update likes with comma formatting
        const likes = parseInt(likesInput.value) || 0;
        previewLikes.textContent = likes.toLocaleString();
        
        // Update time
        previewTime.textContent = formatTimeAgo();
        
        // Update comments
        updateComments();
    }
    
    // Handle profile image upload
    profileImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewProfileImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle post image upload
    postImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewPostImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Add comment fields
    addCommentBtn.addEventListener('click', function() {
        const commentGroup = document.createElement('div');
        commentGroup.className = 'flex';
        
        const userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.placeholder = 'Username';
        userInput.className = 'px-3 py-1 border border-gray-300 rounded-l-md text-sm w-1/3 focus:outline-none focus:ring-1 focus:ring-blue-500';
        
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Comment';
        commentInput.className = 'px-3 py-1 border-y border-r border-gray-300 rounded-r-md text-sm w-2/3 focus:outline-none focus:ring-1 focus:ring-blue-500';
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-times text-red-500"></i>';
        removeBtn.className = 'ml-2 self-center text-sm opacity-0 group-hover:opacity-100 transition-opacity';
        removeBtn.type = 'button';
        
        // Add event listener to remove button
        removeBtn.addEventListener('click', function() {
            commentsContainer.removeChild(commentGroup);
            updateComments();
        });
        
        // Add hover effect to show remove button
        commentGroup.addEventListener('mouseenter', () => removeBtn.classList.remove('opacity-0'));
        commentGroup.addEventListener('mouseleave', () => removeBtn.classList.add('opacity-0'));
        
        commentGroup.appendChild(userInput);
        commentGroup.appendChild(commentInput);
        commentGroup.appendChild(removeBtn);
        
        commentsContainer.appendChild(commentGroup);
    });
    
    // Update comments in preview
    function updateComments() {
        // Clear current comments
        commentsList.innerHTML = '';
        
        // Get all comment inputs
        const commentGroups = commentsContainer.querySelectorAll('.flex');
        
        commentGroups.forEach(group => {
            const inputs = group.querySelectorAll('input');
            const username = inputs[0].value;
            const comment = inputs[1].value;
            
            if (username && comment) {
                const commentEl = document.createElement('div');
                commentEl.className = 'comment';
                commentEl.innerHTML = `
                    <span class="font-semibold text-gray-900">${username}</span>
                    <span class="ml-1">${comment}</span>
                `;
                commentsList.appendChild(commentEl);
            }
        });
    }
    
    // Like button animation
    let isLiked = false;
    likeButton.addEventListener('click', function() {
        const heartIcon = likeButton.querySelector('i');
        
        if (isLiked) {
            heartIcon.classList.remove('fas', 'text-red-500');
            heartIcon.classList.add('far', 'text-gray-800');
            isLiked = false;
        } else {
            heartIcon.classList.remove('far', 'text-gray-800');
            heartIcon.classList.add('fas', 'text-red-500', 'heart-animation');
            isLiked = true;
            
            // Remove animation class after animation completes
            setTimeout(() => {
                heartIcon.classList.remove('heart-animation');
            }, 800);
        }
    });
    
    // Generate preview button
    generateBtn.addEventListener('click', updatePreview);
    
    // Download as PNG
    downloadBtn.addEventListener('click', function() {
        // Temporarily hide the form and keep only the preview
        const originalDisplay = document.querySelector('.lg\\:grid-cols-2').style.display;
        document.querySelector('.lg\\:grid-cols-2').style.display = 'flex';
        document.querySelector('.lg\\:grid-cols-2').style.flexDirection = 'column';
        
        // Get the preview container
        const preview = document.getElementById('previewContainer');
        
        // Use html2canvas to capture the preview
        html2canvas(preview, {
            backgroundColor: '#fff',
            scale: 2, // Higher resolution
            useCORS: true // Handle cross-origin images
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            link.download = 'instagram-post.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Restore original layout
            document.querySelector('.lg\\:grid-cols-2').style.display = originalDisplay;
        }).catch(error => {
            console.error('Error generating image:', error);
            alert('Error generating image. Please try again.');
        });
    });
    
    // Initialize preview
    updatePreview();
    
    // Update preview when inputs change (real-time preview)
    form.addEventListener('input', function(e) {
        // Skip file inputs as they have their own event listeners
        if (e.target.type !== 'file') {
            updatePreview();
        }
    });
    
    // Update time display every minute
    setInterval(() => {
        previewTime.textContent = formatTimeAgo();
    }, 60000);
});