// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const avatarUpload = document.getElementById('avatar-upload');
    const displayNameInput = document.getElementById('display-name');
    const usernameInput = document.getElementById('username');
    const verifiedCheckbox = document.getElementById('verified');
    const tweetContentInput = document.getElementById('tweet-content');
    const tweetDateInput = document.getElementById('tweet-date');
    const repliesInput = document.getElementById('replies');
    const retweetsInput = document.getElementById('retweets');
    const likesInput = document.getElementById('likes');
    const generateButton = document.getElementById('generate-tweet');
    const downloadButton = document.getElementById('download-tweet');
    const tweetPreview = document.getElementById('tweet-preview');
    const addEmojiButton = document.getElementById('add-emoji');
    const emojiModal = document.getElementById('emoji-modal');
    const closeEmojiModal = document.getElementById('close-emoji-modal');
    const emojiGrid = document.getElementById('emoji-grid');
    
    // Set default date to current date/time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    tweetDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Sample emojis for the picker
    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
        '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
        '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
        '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
        '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
        '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
        '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
        '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
        '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿',
        '😾', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞',
        '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍',
        '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
        '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂',
        '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄', '💋',
        '🩸', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️',
        '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍',
        '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️',
        '🗨️', '🗯️', '💭', '💤'
    ];
    
    // Populate emoji picker
    emojis.forEach(emoji => {
        const emojiOption = document.createElement('div');
        emojiOption.className = 'emoji-option';
        emojiOption.textContent = emoji;
        emojiOption.addEventListener('click', () => {
            insertEmoji(emoji);
            emojiModal.classList.add('hidden');
        });
        emojiGrid.appendChild(emojiOption);
    });
    
    // Event Listeners
    generateButton.addEventListener('click', generateTweet);
    downloadButton.addEventListener('click', downloadTweet);
    addEmojiButton.addEventListener('click', () => emojiModal.classList.remove('hidden'));
    closeEmojiModal.addEventListener('click', () => emojiModal.classList.add('hidden'));
    avatarUpload.addEventListener('change', handleAvatarUpload);
    
    // Generate initial tweet preview
    generateTweet();
    
    // Functions
    function handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Update the preview when a new image is loaded
                generateTweet();
            };
            reader.readAsDataURL(file);
        }
    }
    
    function insertEmoji(emoji) {
        const textarea = tweetContentInput;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        
        textarea.value = text.substring(0, start) + emoji + text.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
    }
    
    function generateTweet() {
        // Get values from inputs
        const displayName = displayNameInput.value || 'Twitter User';
        const username = usernameInput.value || 'twitteruser';
        const isVerified = verifiedCheckbox.checked;
        const tweetContent = tweetContentInput.value || 'This is a sample tweet generated by the Fake Tweet Generator.';
        const tweetDate = new Date(tweetDateInput.value || new Date());
        const replies = repliesInput.value || '0';
        const retweets = retweetsInput.value || '0';
        const likes = likesInput.value || '0';
        
        // Format date like Twitter (e.g., "9:30 AM · Mar 15, 2023")
        const formattedDate = formatTweetDate(tweetDate);
        
        // Create tweet HTML
        let tweetHTML = `
            <div class="tweet">
                <div class="tweet-header">
                    ${getAvatarHTML()}
                    <div class="flex-1">
                        <div class="flex items-center">
                            <span class="tweet-user">${escapeHtml(displayName)}</span>
                            ${isVerified ? '<svg class="tweet-verified" viewBox="0 0 24 24" aria-label="Verified account"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>' : ''}
                            <span class="tweet-username">@${escapeHtml(username)}</span>
                        </div>
                    </div>
                </div>
                <div class="tweet-content">${formatTweetContent(tweetContent)}</div>
                <div class="tweet-date">${formattedDate}</div>
                <div class="tweet-stats">
                    <div class="tweet-stat">
                        <svg viewBox="0 0 24 24"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                        <span>${replies}</span>
                    </div>
                    <div class="tweet-stat">
                        <svg viewBox="0 0 24 24"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                        <span>${retweets}</span>
                    </div>
                    <div class="tweet-stat">
                        <svg viewBox="0 0 24 24"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>
                        <span>${likes}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Update preview
        tweetPreview.innerHTML = tweetHTML;
    }
    
    function getAvatarHTML() {
        if (avatarUpload.files && avatarUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.querySelector('.tweet-avatar').src = e.target.result;
            };
            reader.readAsDataURL(avatarUpload.files[0]);
            return '<img class="tweet-avatar" src="" alt="Profile picture">';
        }
        return '<div class="tweet-avatar bg-gray-300"></div>';
    }
    
    function formatTweetDate(date) {
        const options = { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        };
        const timeString = date.toLocaleTimeString('en-US', options);
        
        const dateOptions = { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        };
        const dateString = date.toLocaleDateString('en-US', dateOptions);
        
        return `${timeString} · ${dateString}`;
    }
    
    function formatTweetContent(content) {
        // Replace newlines with <br> and escape HTML
        return escapeHtml(content).replace(/\n/g, '<br>');
    }
    
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    function downloadTweet() {
        // Use html2canvas to convert the tweet to an image
        html2canvas(tweetPreview, {
            backgroundColor: '#ffffff',
            scale: 2 // Higher scale for better quality
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            link.download = 'fake-tweet.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
});