/* ============================================================
   SAKURA PETALS — tsParticles Integration
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    // We assume tsParticles is loaded via CDN in index.html
    if (typeof tsParticles !== "undefined") {
        tsParticles.load("sakura-canvas", {
            fpsLimit: 60,
            particles: {
                color: { value: ["#e8a0b4", "#f4c2d1"] },
                move: {
                    direction: "bottom-left",
                    enable: true,
                    outModes: { default: "out" },
                    random: true,
                    speed: 1.5,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: window.innerWidth < 768 ? 15 : 35, // Less on mobile
                },
                opacity: {
                    value: { min: 0.2, max: 0.6 },
                    animation: { enable: true, speed: 0.5, minimumValue: 0.1 }
                },
                shape: {
                    type: "polygon",
                    options: { polygon: { sides: 5 } } // simple petal shape proxy
                },
                size: {
                    value: { min: 3, max: 8 },
                    random: true,
                },
                rotate: {
                    value: 0,
                    random: true,
                    animation: { enable: true, speed: 5 }
                }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    resize: true,
                },
                modes: {
                    repulse: { distance: 60, duration: 0.4 }
                }
            },
            detectRetina: true,
        });
    }
});
