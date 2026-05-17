/* ============================================================
   EXPERIENCE LOGIC — Lantern Swing
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const lanterns = document.querySelectorAll(".lantern-card");
    
    const lanternObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add swing class with slight stagger
                setTimeout(() => {
                    entry.target.classList.add("swing");
                }, 100);
                lanternObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    lanterns.forEach(lantern => {
        lanternObserver.observe(lantern);
        
        // Add hover swing for extra interaction
        lantern.addEventListener("mouseenter", function() {
            this.classList.remove("swing");
            // Trigger reflow
            void this.offsetWidth;
            this.classList.add("swing");
        });
    });
});
