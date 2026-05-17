/* ============================================================
   CURSOR — Brush & Shuriken
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursorDot.style.display = "none";
        cursorRing.style.display = "none";
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    
    // Trailing particles array
    const trails = [];
    const TRAIL_COUNT = 8;
    
    for(let i=0; i<TRAIL_COUNT; i++) {
        const t = document.createElement('div');
        t.className = 'cursor-trail';
        document.body.appendChild(t);
        trails.push({ el: t, x: mouseX, y: mouseY });
    }

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth follow for the ring
    function animate() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        
        // Trail physics
        let prevX = mouseX;
        let prevY = mouseY;
        
        trails.forEach((trail, i) => {
            trail.x += (prevX - trail.x) * 0.35;
            trail.y += (prevY - trail.y) * 0.35;
            trail.el.style.left = `${trail.x}px`;
            trail.el.style.top = `${trail.y}px`;
            
            // Shrink based on index
            const scale = 1 - (i / TRAIL_COUNT);
            trail.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
            
            prevX = trail.x;
            prevY = trail.y;
        });
        
        requestAnimationFrame(animate);
    }
    animate();

    // Hover states for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .skill-tab, .scroll-card, .ema-plaque");
    
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
});
