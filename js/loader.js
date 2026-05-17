/* ============================================================
   LOADER — Cinematic Opening Sequence
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    const kanjiChars = document.querySelectorAll("#loader-kanji .char");
    const nameEl = document.getElementById("loader-name");
    const wipeEl = document.getElementById("loader-wipe");

    // 1. Torii draws (CSS animation handles stroke-dashoffset)
    // 2. Kanji appear sequentially
    setTimeout(() => {
        kanjiChars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add("visible");
            }, index * 200);
        });
    }, 1400);

    // 3. Name fades in
    setTimeout(() => {
        nameEl.style.opacity = "1";
        nameEl.style.transition = "opacity 0.8s ease";
    }, 2800);

    // 4. Red wipe and hide
    setTimeout(() => {
        wipeEl.style.animation = "inkWipe 1.2s var(--ease-ink) forwards";

        setTimeout(() => {
            loader.style.opacity = "0";
            loader.classList.add("hiding");
            mainContent.classList.add("loaded");
            document.body.classList.add("loaded");

            // Allow scrolling to start
            document.body.style.overflow = "";
            document.body.style.overflowY = "";
            document.body.removeAttribute("style");

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 600);
    }, 4200);
});
