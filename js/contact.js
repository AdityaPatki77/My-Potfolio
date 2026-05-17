/* ============================================================
   CONTACT LOGIC — Form Submit & Stamp
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const successMsg = document.getElementById("submit-success");
    const stampBtn = document.querySelector(".btn-submit-stamp");

    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Add a stamp press effect programmatically
            stampBtn.style.animation = 'none';
            stampBtn.offsetHeight; /* trigger reflow */
            stampBtn.style.animation = 'stampPress 0.4s var(--ease-spring)';

            // Simulate form submission delay
            setTimeout(() => {
                contactForm.style.display = "none";
                successMsg.classList.add("show");
                
                // Add ink splatter effect globally centered
                createInkSplatter(stampBtn);
            }, 600);
        });
    }

    function createInkSplatter(target) {
        const splatter = document.createElement("div");
        splatter.style.position = "absolute";
        splatter.style.width = "200px";
        splatter.style.height = "200px";
        splatter.style.background = "radial-gradient(circle, rgba(192,57,43,0.3) 0%, transparent 60%)";
        splatter.style.borderRadius = "50%";
        splatter.style.pointerEvents = "none";
        splatter.style.zIndex = "10";
        
        const rect = target.getBoundingClientRect();
        splatter.style.left = `${rect.left + rect.width / 2 - 100}px`;
        splatter.style.top = `${rect.top + window.scrollY + rect.height / 2 - 100}px`;
        
        splatter.style.animation = "splatter 0.8s ease-out forwards";
        
        document.body.appendChild(splatter);
        
        setTimeout(() => splatter.remove(), 1000);
    }
});
