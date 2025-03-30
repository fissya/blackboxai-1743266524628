// Confetti function for successful form submission
function confetti({
    particleCount = 50,
    spread = 70,
    origin = { y: 0.6 }
} = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    document.body.appendChild(canvas);

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height * origin.y,
            size: Math.random() * 8 + 3,
            color: getRandomColor(),
            speedX: Math.random() * spread - spread/2,
            speedY: Math.random() * -3 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }

    function getRandomColor() {
        const colors = [
            '#c72c3b', // Temple red
            '#f8d56b', // Gold
            '#ffffff', // White
            '#3a3a3a'  // Black
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            
            ctx.restore();
            
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            p.speedY += 0.1; // Gravity
            
            // Remove particles that are out of view
            if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
                particles.splice(i, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }
    
    animate();
}
