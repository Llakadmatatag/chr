// Google Sheets API configuration
const SHEET_ID = '17VT1YOy2Q37rZO9toc4K_8ZhKFX0P6nhPg3N86xd67k';
const API_KEY = 'AIzaSyB3uJ6l4w3XQ8QvXQ3XQ3XQ3XQ3XQ3XQ3XQ';
const SHEET_NAME = 'DICEBLOX';

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Update leaderboard with data
function updateLeaderboard(data) {
    // Sort data by wagered amount (descending)
    const sortedData = [...data].sort((a, b) => b.wagered - a.wagered).slice(0, 10);
    
    // Update podium (top 3)
    const podiumData = sortedData.slice(0, 3);
    const podiumStands = document.querySelectorAll('.podium-stand');
    
    podiumStands.forEach((stand, index) => {
        if (podiumData[index]) {
            const user = podiumData[index];
            const nameEl = stand.querySelector('.podium-name');
            const wageredEl = stand.querySelector('.podium-wagered span');
            
            if (nameEl) nameEl.textContent = user.username || '-';
            if (wageredEl) wageredEl.textContent = formatNumber(user.wagered) || '0';
        }
    });
    
    // Update table (ranks 4-10)
    const tableBody = document.getElementById('diceblox-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add rows for ranks 4-10
    for (let i = 3; i < Math.min(sortedData.length, 10); i++) {
        const user = sortedData[i];
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div class="rank">${i + 1}</div>
            <div class="username">${user.username || '-'}</div>
            <div class="wagered">${formatNumber(user.wagered) || '0'}</div>
            <div class="prize">${i === 3 || i === 4 ? '$50' : '-'}</div>
        `;
        tableBody.appendChild(row);
    }
    
    // Fill remaining rows with placeholders if needed
    for (let i = sortedData.length; i < 10; i++) {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div class="rank">${i + 1}</div>
            <div class="username">-</div>
            <div class="wagered">0</div>
            <div class="prize">-</div>
        `;
        tableBody.appendChild(row);
    }
}

// Fetch data from Google Sheets
async function fetchLeaderboardData() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch data from Google Sheets');
        }
        
        const data = await response.json();
        const rows = data.values;
        const headers = rows[0].map(h => h.toLowerCase());
        
        // Convert rows to objects with header keys
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            // Convert wagered to number
            if (obj.wagered) {
                obj.wagered = parseFloat(obj.wagered.replace(/[^0-9.]/g, '')) || 0;
            } else {
                obj.wagered = 0;
            }
            result.push(obj);
        }
        
        return result;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return [];
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle mobile menu
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            hamburger.classList.toggle('active');
            
            // Toggle body scroll
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

        // Countdown timer for Diceblox leaderboard
    function updateCountdown() {
        // Set the end date to June 30, 2025 23:59:59 UTC
        const endDate = new Date('2025-06-30T23:59:59Z').getTime();
        const now = new Date().getTime();
        const distance = endDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

        // Display the result with animation
        function updateElement(id, value) {
            const el = document.getElementById(id);
            if (!el) return;
            
            // Only animate if value changes
            if (el.textContent !== value) {
                el.style.transform = 'scale(1.2)';
                el.style.color = '#00b4d8';
                el.textContent = value;
                
                // Reset animation
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                    el.style.color = '';
                }, 300);
            } else {
                el.textContent = value;
            }
        }


        updateElement('diceblox-days', String(days).padStart(2, '0'));
        updateElement('diceblox-hours', String(hours).padStart(2, '0'));
        updateElement('diceblox-minutes', String(minutes).padStart(2, '0'));
        updateElement('diceblox-seconds', String(seconds).padStart(2, '0'));

        // If the countdown is finished
        if (distance < 0) {
            const countdownEl = document.getElementById('diceblox-countdown');
            if (countdownEl) {
                countdownEl.innerHTML = `
                    <div style="
                        background: rgba(255, 59, 48, 0.1);
                        border: 1px solid rgba(255, 59, 48, 0.2);
                        padding: 0.8rem 1.5rem;
                        border-radius: 50px;
                        font-weight: 600;
                        color: #ff3b30;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        font-size: 1.1rem;
                        animation: pulse 2s infinite;
                    ">
                        🎉 Leaderboard has ended! 🎉
                    </div>
                `;
                
                // Add pulse animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }
            clearInterval(countdownTimer);
        }
    }


    // Initialize with a small delay to ensure smooth animation
    setTimeout(updateCountdown, 100);
    // Update the countdown every second
    const countdownTimer = setInterval(updateCountdown, 1000);

    // Add hover effect on countdown numbers
    const countdownNumbers = document.querySelectorAll('.countdown-timer span:not(:first-child)');
    countdownNumbers.forEach(number => {
        number.style.transition = 'all 0.3s ease';
        number.style.cursor = 'default';
        
        number.addEventListener('mouseenter', () => {
            number.style.transform = 'translateY(-3px)';
            number.style.textShadow = '0 0 10px rgba(0, 180, 216, 0.8)';
        });
        
        number.addEventListener('mouseleave', () => {
            number.style.transform = 'translateY(0)';
            number.style.textShadow = 'none';
        });
    });

    // Fetch and display leaderboard data
    try {
        const leaderboardData = await fetchLeaderboardData();
        if (leaderboardData.length > 0) {
            updateLeaderboard(leaderboardData);
        }
        
        // Refresh data every 30 minutes
        setInterval(async () => {
            const newData = await fetchLeaderboardData();
            if (newData.length > 0) {
                updateLeaderboard(newData);
            }
        }, 30 * 60 * 1000);
    } catch (error) {
        console.error('Error initializing leaderboard:', error);
    }
});
