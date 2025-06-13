// DOM Elements
const streamCardsContainer = document.getElementById('stream-cards');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing...');
    
    // Set up mobile navigation
    setupMobileNavigation();
    
    // Set up refresh button
    const refreshButton = document.getElementById('refresh-status');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            console.log('Manual refresh requested');
            refreshButton.classList.add('refreshing');
            refreshButton.disabled = true;
            
            // Force a fresh check after a small delay
            setTimeout(() => {
                checkStreamStatus().finally(() => {
                    // Remove refreshing state after a short delay
                    setTimeout(() => {
                        refreshButton.classList.remove('refreshing');
                        refreshButton.disabled = false;
                    }, 500);
                });
            }, 300);
        });
    }
    
    // Check stream status on page load with a small delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Initial stream status check...');
        checkStreamStatus();
    }, 500);
    
    // Check status every 5 minutes
    setInterval(checkStreamStatus, 5 * 60 * 1000);
    
    // Also check when the page becomes visible again (if user switches tabs)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('Page became visible, checking stream status...');
            checkStreamStatus();
        }
    });
});

// Check if the stream is live
async function checkStreamStatus() {
    const offlineOverlay = document.getElementById('offline-overlay');
    const liveBadge = document.querySelector('.live-badge');
    
    // Make sure elements exist
    if (!offlineOverlay || !liveBadge) {
        console.error('Required elements not found');
        return;
    }
    
    try {
        console.log('Checking stream status...');
        
        // In a real implementation, you would check the Kick API for live status
        // For demo purposes, we'll simulate the check with a 50% chance of being live
        const isLive = Math.random() > 0.5;
        
        console.log('Stream status:', isLive ? 'LIVE' : 'OFFLINE');
        
        if (isLive) {
            // Stream is live
            console.log('Hiding offline overlay, showing live badge');
            offlineOverlay.classList.remove('active');
            liveBadge.style.display = 'block';
        } else {
            // Stream is offline
            console.log('Showing offline overlay, hiding live badge');
            offlineOverlay.classList.add('active');
            liveBadge.style.display = 'none';
        }
        
        // Force a reflow/repaint to ensure transitions work
        void offlineOverlay.offsetHeight;
        
    } catch (error) {
        console.error('Error checking stream status:', error);
        // If there's an error, assume offline
        if (offlineOverlay) {
            offlineOverlay.classList.add('active');
        }
        if (liveBadge) {
            liveBadge.style.display = 'none';
        }
    }
}

// Set up event listeners
function setupEventListeners() {
    // Any additional event listeners can be added here
}

// Switch to a different stream
function switchStream(streamer) {
    // In a real app, you would load the new stream
    const mainStream = document.querySelector('.stream-placeholder');
    const streamerName = document.querySelector('.streamer-details h3');
    const gameTitle = document.querySelector('.streamer-details p');
    const viewerCount = document.querySelector('.viewer-count');
    const streamerAvatar = document.querySelector('.streamer-avatar img');
    
    // Update stream info
    streamerName.textContent = streamer.name;
    gameTitle.textContent = `Playing: ${streamer.game}`;
    viewerCount.innerHTML = `<i class="fas fa-eye"></i> ${formatViewerCount(streamer.viewers)} viewers`;
    streamerAvatar.src = streamer.avatar;
    
    // Show loading state
    mainStream.style.background = 'linear-gradient(45deg, #0a1128, #1a237e)';
    
    // In a real app, you would load the new stream here
    setTimeout(() => {
        // Simulate stream loading
        mainStream.style.background = `linear-gradient(rgba(10, 17, 40, 0.7), rgba(10, 17, 40, 0.8)), url('${streamer.thumbnail}') no-repeat center center/cover`;
        
        // Update chat with new streamer's messages
        setTimeout(() => {
            chatMessages.innerHTML = '';
            
            // Generate some random messages for the new streamer
            const randomMessages = [
                `Welcome to ${streamer.name}'s stream!`,
                'This is an awesome stream!',
                'Just got here, what did I miss?',
                `${streamer.name} is killing it!`,
                'Can\'t wait for the next game!',
                'This is so much fun!',
                'Thanks for the great content!'
            ];
            
            // Shuffle messages
            const shuffledMessages = [...randomMessages].sort(() => 0.5 - Math.random());
            
            // Add messages to chat
            shuffledMessages.slice(0, 5 + Math.floor(Math.random() * 3)).forEach((msg, i) => {
                const usernames = ['GamerPro99', 'StreamFan42', 'ChromeLover', 'GamblerX', 'LuckyCharm', 'StreamSniper', 'GameMaster'];
                const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
                const timeAgo = `${1 + Math.floor(Math.random() * 10)} min ago`;
                
                setTimeout(() => {
                    addChatMessage(randomUser, msg, timeAgo);
                }, i * 300);
            });
        }, 500);
    }, 1000);
}

// Simulate new messages in chat
function simulateNewMessages() {
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of a new message
            const messages = [
                'Nice play!',
                'LOL',
                'GG',
                'That was close!',
                'How did you do that?',
                'Amazing!',
                'Let\'s go!',
                'PogChamp',
                'Kappa',
                'LUL'
            ];
            
            const usernames = ['GamerPro99', 'StreamFan42', 'ChromeLover', 'GamblerX', 'LuckyCharm', 'StreamSniper', 'GameMaster'];
            const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            addChatMessage(randomUser, randomMessage, 'just now');
        }
    }, 3000 + Math.random() * 7000); // Random interval between 3-10 seconds
}

// Format viewer count (e.g., 1250 -> 1.2K)
function formatViewerCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}

// Set up mobile navigation
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate links
            if (navLinks.classList.contains('active')) {
                links.forEach((link, index) => {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                });
            } else {
                links.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
        
        // Close mobile menu when clicking on a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
}
