/* ============================================================
   ABOUT & STATUS LOGIC — Cyber RPG System
   ============================================================ */

const initAbout = () => {
    console.log("[SYSTEM] Initializing About Core System...");

    // --- Stat Bar Fill ---
    const statBars = document.querySelectorAll(".stat-bar-fill");
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute("data-width") || bar.dataset.width;
                if (width) {
                    bar.style.width = width;
                    bar.classList.add("filled");
                }
                statObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    statBars.forEach(bar => statObserver.observe(bar));

    // --- Honor Cards Reveal ---
    const honorCards = document.querySelectorAll(".honor-card");
    const honorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("spring-in");
                honorObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    honorCards.forEach(card => {
        // Prepare initial style state
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        
        // Add animated transition when spring-in class is added
        const observerTarget = entry => {
            if (card.classList.contains("spring-in")) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        };
        
        // Listen for changes
        const mutationObserver = new MutationObserver(() => {
            if (card.classList.contains("spring-in")) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                mutationObserver.disconnect();
            }
        });
        mutationObserver.observe(card, { attributes: true, attributeFilter: ["class"] });
        
        honorObserver.observe(card);
    });

    // --- Cyber RPG Equipped Inventory System ---
    const inventoryData = {
        katana: {
            title: "Katana of PySpark",
            rarity: "LEGENDARY",
            desc: "A blade folded 1,000 times in the fires of massive datasets. Slices through Terabytes of raw logs in seconds.",
            stats: [
                { label: "THROUGHPUT:", value: "+95%" },
                { label: "INFERENCE:", value: "MAX" }
            ]
        },
        cloud: {
            title: "AWS Cloud Shroud",
            rarity: "EPIC",
            desc: "A protective cloak woven from distributed S3 buckets and IAM policies. Grants complete domain sovereignty.",
            stats: [
                { label: "LATENCY:", value: "-40ms" },
                { label: "CONCURRENCY:", value: "+5,000" }
            ]
        },
        relic: {
            title: "Gemini AI Amulet",
            rarity: "MYTHIC",
            desc: "A glowing gemstone containing a spark of cosmic LLM intelligence. Automates video indexing and summaries.",
            stats: [
                { label: "INTELLIGENCE:", value: "1.5 Pro" },
                { label: "CONTEXT:", value: "2M Tokens" }
            ]
        },
        scroll: {
            title: "Scroll of dbt Blueprints",
            rarity: "RARE",
            desc: "Ancient codex containing modular SQL blueprints and modular DAG transforms. Establishes perfect lineage.",
            stats: [
                { label: "TRANSFORM_RATE:", value: "+75%" },
                { label: "LINEAGE:", value: "VISUAL" }
            ]
        },
        boots: {
            title: "Docker Engine Greaves",
            rarity: "UNCOMMON",
            desc: "Iron greaves that allow running microservices seamlessly on any platform without dependency friction.",
            stats: [
                { label: "PORTABILITY:", value: "100%" },
                { label: "BOOT_TIME:", value: "< 2.0s" }
            ]
        },
        ring: {
            title: "Airflow Loop Band",
            rarity: "EPIC",
            desc: "A ring that bends time and schedules cron-triggers infinitely. Ensures tasks run in perfect logical sequence.",
            stats: [
                { label: "SCHEDULING:", value: "AUTO" },
                { label: "RETRIES:", value: "+5 CAPS" }
            ]
        }
    };

    const slots = document.querySelectorAll(".inv-slot");
    const rarityBadge = document.getElementById("inv-item-rarity");
    const titleEl = document.getElementById("inv-item-title");
    const descEl = document.getElementById("inv-item-desc");
    const statsContainer = document.getElementById("inv-item-stats");

    if (!rarityBadge || !titleEl || !descEl || !statsContainer) {
        console.warn("[SYSTEM] Status panel elements not found in DOM.");
        return;
    }

    const decryptText = (element, targetText, speed = 15) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        let iterations = 0;
        clearInterval(element.decryptIntervalID);
        
        element.decryptIntervalID = setInterval(() => {
            element.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iterations) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
                
            if (iterations >= targetText.length) {
                clearInterval(element.decryptIntervalID);
            }
            iterations += 2; // Decrypt 2 characters at a time for snappier feedback
        }, speed);
    };

    slots.forEach(slot => {
        slot.addEventListener("click", (e) => {
            e.preventDefault();
            const itemKey = slot.getAttribute("data-item") || slot.dataset.item;
            console.log("[SYSTEM] Inventory item selected:", itemKey);

            if (slot.classList.contains("active-slot") && titleEl.innerText !== "") {
                // If it is already active, don't re-trigger unless page just loaded
                return;
            }

            // Remove active class
            slots.forEach(s => s.classList.remove("active-slot"));
            slot.classList.add("active-slot");

            const item = inventoryData[itemKey];
            if (item) {
                // Update rarity class and text
                rarityBadge.className = `inv-item-rarity ${item.rarity.toLowerCase()}`;
                rarityBadge.innerText = item.rarity;

                // Matrix-style decrypt for title and desc
                decryptText(titleEl, item.title, 15);
                decryptText(descEl, item.desc, 8);

                // Re-render stats grid
                statsContainer.innerHTML = "";
                item.stats.forEach(stat => {
                    const statDiv = document.createElement("div");
                    statDiv.className = "inv-stat";
                    
                    const labelSpan = document.createElement("span");
                    labelSpan.innerText = stat.label;
                    
                    const valueSpan = document.createElement("span");
                    valueSpan.innerText = stat.value;

                    statDiv.appendChild(labelSpan);
                    statDiv.appendChild(valueSpan);
                    statsContainer.appendChild(statDiv);
                });
            }
        });
    });
};

// Immediate or deferred initialization to guarantee it runs flawlessly
if (document.readyState !== "loading") {
    initAbout();
} else {
    document.addEventListener("DOMContentLoaded", initAbout);
}
