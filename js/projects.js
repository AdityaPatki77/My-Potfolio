/* ============================================================
   PROJECTS LOGIC — Scroll Card Unroll
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const scrollCards = document.querySelectorAll(".scroll-card");

    scrollCards.forEach(card => {
        card.addEventListener("click", function(e) {
            // If user clicked the github stamp, don't toggle card open/close
            if (e.target.closest('.btn-stamp')) {
                return;
            }
            
            // Toggle current card
            const isOpen = this.classList.contains("open");
            
            // Optional: close all other cards (accordion style)
            // scrollCards.forEach(c => c.classList.remove("open"));
            
            if (!isOpen) {
                this.classList.add("open");
            } else {
                this.classList.remove("open");
            }
        });
    });
});
