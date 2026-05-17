/* ============================================================
   SKILLS LOGIC — Emaki Scroll Dashboards & Progress Fills
   ============================================================ */

const initSkills = () => {
    console.log("[SYSTEM] Initializing Skills Core System...");

    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    // Trigger title slash animation when section is visible
    const sectionObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            skillsSection.classList.add("in-view");
            sectionObserver.disconnect();
        }
    }, { threshold: 0.15 });
    sectionObserver.observe(skillsSection);

    // Animate Progress Bars sequentially on scroll
    const progressFills = document.querySelectorAll(".skill-progress-fill");
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const progressVal = fill.getAttribute("data-progress") || fill.dataset.progress;
                
                if (progressVal) {
                    // Trigger smooth width fill transition
                    setTimeout(() => {
                        fill.style.width = progressVal;
                        fill.classList.add("animated");
                    }, 100);
                }
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.1 });

    progressFills.forEach(fill => {
        // Set initial width to 0%
        fill.style.width = "0%";
        fill.style.transition = "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        progressObserver.observe(fill);
    });
};

// Immediate or deferred initialization to guarantee it runs flawlessly
if (document.readyState !== "loading") {
    initSkills();
} else {
    document.addEventListener("DOMContentLoaded", initSkills);
}
