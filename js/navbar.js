/* ============================================================
   NAVIGATION — Scroll Spy & Shoji Menu
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".nav-hamburger");
    const mobileNav = document.getElementById("mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    
    // Scrolled state
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileNav.classList.toggle("open");
        document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : "";
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            mobileNav.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
});
