document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    // Buat container untuk partikel
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.prepend(particlesContainer);
    
    // Style untuk container partikel
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.zIndex = '1';
    
    // Fungsi untuk membuat partikel baru
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Ukuran acak antara 2px - 8px
        const size = Math.random() * 6 + 2;
        
        // Posisi horizontal acak
        const posX = Math.random() * 100;
        
        // Warna acak dengan opacity acak
        const opacity = Math.random() * 0.7 + 0.3; // Opacity antara 0.3 - 1.0
        
        // Generate warna acak dari palet yang ditentukan
        const colors = [
            // Biru
            `rgba(0, ${Math.floor(Math.random() * 100 + 150)}, 255, ${opacity})`, // Biru muda
            `rgba(0, ${Math.floor(Math.random() * 50 + 100)}, 255, ${opacity})`,  // Biru sedang
            // Ungu
            `rgba(${Math.floor(Math.random() * 100 + 100)}, 0, 255, ${opacity})`,
            // Pink
            `rgba(255, 0, ${Math.floor(Math.random() * 100 + 100)}, ${opacity})`,
            // Cyan
            `rgba(0, 255, ${Math.floor(Math.random() * 100 + 150)}, ${opacity})`,
            // Ungu muda
            `rgba(${Math.floor(Math.random() * 100 + 150)}, 100, 255, ${opacity})`
        ];
        
        // Pilih warna acak dari array colors
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Atur style partikel
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = '-20px';
        particle.style.backgroundColor = randomColor;
        particle.style.borderRadius = '1px';
        particle.style.pointerEvents = 'none';
        
        // Kecepatan jatuh acak antara 2s - 6s
        const duration = Math.random() * 4 + 2;
        particle.style.animation = `fall ${duration}s linear infinite`;
        
        // Delay animasi acak
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Tambahkan partikel ke container
        particlesContainer.appendChild(particle);
        
        // Hapus partikel setelah selesai animasi untuk menghemat memori
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Buat partikel setiap 100ms
    setInterval(createParticle, 100);
});
