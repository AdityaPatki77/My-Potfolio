/* ============================================================
   MAIN INITIALIZATION & GSAP ANIMATIONS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Typed.js for Hero Title ---
    if (typeof Typed !== "undefined") {
        new Typed("#typed-title", {
            strings: [
                "Data Engineer",
                "AI Developer",
                "Builder of Worlds",
                "Samurai Coder"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2500,
            loop: true,
            cursorChar: "▍",
            showCursor: true
        });
    }

    // --- 2. Scroll Progress Bar ---
    const progress = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const scrolled = (window.scrollY / docHeight) * 100;
            progress.style.width = `${scrolled}%`;
        }
    });

    // --- 3. Section Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Section Diviers (Katana Slash) ---
    const dividers = document.querySelectorAll(".section-divider");
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slash-active");
            }
        });
    }, { threshold: 0.5 });
    dividers.forEach(div => dividerObserver.observe(div));

    // --- 5. Background Parallax (Kanji Watermarks) ---
    const watermarks = document.querySelectorAll(".kanji-watermark");
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        watermarks.forEach((wm) => {
            const speed = wm.dataset.speed || 0.15;
            // Only parallax if relatively in viewport
            const rect = wm.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                wm.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // --- 6. 3D Tilt Effect for Cinematic Cards ---
    const tiltElements = document.querySelectorAll(".scroll-card, .skill-card, .lantern-card, .ema-plaque");
    tiltElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (max 10 degrees)
            const xPct = x / rect.width - 0.5;
            const yPct = y / rect.height - 0.5;
            
            const rotateX = yPct * -12;
            const rotateY = xPct * 12;
            
            // Subtle scale
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Dynamic glare effect based on mouse position
            if (el.style.setProperty) {
                el.style.setProperty('--mouse-x', `${x}px`);
                el.style.setProperty('--mouse-y', `${y}px`);
            }
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Remove the inline transform after animation finishes so CSS hovers can take over again if needed
            setTimeout(() => {
                if(!el.matches(':hover')) {
                    el.style.transform = '';
                }
            }, 500);
        });
    });

    // --- 7. Mouse-tracking Parallax for Background Elements ---
    const parallaxElements = document.querySelectorAll(".hero-orb, .hero-moon, .cyber-grid, .projects-orb-1, .projects-orb-2");
    window.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || (el.classList.contains('cyber-grid') ? 15 : 30);
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            if (el.classList.contains('cyber-grid')) {
                el.style.transform = `rotateX(60deg) translateY(-100px) translate(${x}px, ${y}px)`;
            } else {
                el.style.marginLeft = `${x}px`;
                el.style.marginTop = `${y}px`;
            }
        });
    });
    // --- 8. Scrolling Skew Effect (Optimized & Lag-free) ---
    let currentPos = window.pageYOffset;
    const skewElements = document.querySelectorAll(".section-header");
    
    const updateSkew = () => {
        // Skip skew calculation on mobile devices or if elements don't exist to save CPU/battery
        if (window.innerWidth < 768 || skewElements.length === 0) {
            requestAnimationFrame(updateSkew);
            return;
        }
        
        const newPos = window.pageYOffset;
        const diff = newPos - currentPos;
        const speed = diff * 0.15;
        
        // Only apply transform if there is active movement to prevent layout thrashing
        if (Math.abs(speed) > 0.01) {
            skewElements.forEach(el => {
                el.style.transform = `skewY(${speed * 0.03}deg)`;
            });
        } else {
            skewElements.forEach(el => {
                if (el.style.transform !== '') {
                    el.style.transform = '';
                }
            });
        }
        
        currentPos = newPos;
        requestAnimationFrame(updateSkew);
    };
    updateSkew();

    // --- 9. Operational Cyber Diagnostics Terminal Script ---
    const consoleEl = document.getElementById("hero-terminal-console");
    const btnSyncCore = document.getElementById("btn-sync-core");
    const btnClearLogs = document.getElementById("btn-clear-logs");

    if (consoleEl && btnSyncCore && btnClearLogs) {
        const logTemplates = [
            "[INFO] Querying Snowflake data warehouse...",
            "[SUCCESS] Snowflake query returned 25,482 rows in 420ms",
            "[PIPELINE] Trimming null nodes via DBT transformation...",
            "[DBT] Model 'stg_airbnb_listings' compiled successfully",
            "[SYSTEM] Memory buffer sync stable // LOAD: 3.8%",
            "[AI] Querying Mistral-7B YouTube parser model...",
            "[AI] Transcription summary successfully stored in vector DB",
            "[INFO] Syncing s3://patki-warehouse/nyc-taxi/batch_09.parquet",
            "[SUCCESS] PySpark batch transformation complete in 8.2s",
            "[WARNING] Heavy incoming traffic on dojo portal // resolving...",
            "[SUCCESS] Guarded with rate-limiting shield // latency: 12ms",
            "[SYSTEM] Port 8000 operational. Listening for wanderer connections..."
        ];

        const appendTerminalLog = (text, type = "") => {
            const line = document.createElement("div");
            line.className = `terminal-line ${type}`;
            line.innerText = text;
            consoleEl.appendChild(line);
            consoleEl.scrollTop = consoleEl.scrollHeight;

            // Cap logs count in DOM to prevent performance decay
            if (consoleEl.children.length > 20) {
                consoleEl.removeChild(consoleEl.firstChild);
            }
        };

        // Automated log loop
        setInterval(() => {
            const index = Math.floor(Math.random() * logTemplates.length);
            const rawText = logTemplates[index];
            
            let type = "";
            if (rawText.includes("SUCCESS")) type = "success-line";
            if (rawText.includes("WARNING") || rawText.includes("CRITICAL")) type = "warning-line";
            if (rawText.includes("SYSTEM") || rawText.includes("PIPELINE") || rawText.includes("DBT")) type = "system-line";

            appendTerminalLog(rawText, type);
        }, 3200);

        // SYNC CORE Action
        btnSyncCore.addEventListener("click", () => {
            // Apply viewport glitch
            document.body.classList.add("quantum-glitch-active");
            
            // Core logs feed on sync
            appendTerminalLog("==========================================", "system-line");
            appendTerminalLog("[CRITICAL] TRIGGERING QUANTUM SYNC INITIATIVE...", "warning-line");
            appendTerminalLog("[SYSTEM] Syncing central AI CPU cores...", "system-line");
            appendTerminalLog("[SUCCESS] ALL SYSTEMS STABILIZED // CORE SYNC: 100%", "success-line");
            appendTerminalLog("==========================================", "system-line");

            setTimeout(() => {
                document.body.classList.remove("quantum-glitch-active");
            }, 600);
        });

        // CLEAR Action
        btnClearLogs.addEventListener("click", () => {
            consoleEl.innerHTML = "";
            appendTerminalLog("[SYSTEM] Cleared terminal logs.", "warning-line");
            appendTerminalLog("[SYSTEM] Core system reboot nominal.", "success-line");
        });
    }

    // --- 10. Holographic Weapon Loadout HUD Controller ---
    const hudSlots = document.querySelectorAll(".hud-weapon-slot");
    const activeNameEl = document.getElementById("hud-weapon-active-name");
    const activeDescEl = document.getElementById("hud-weapon-active-desc");
    const activeStatsEl = document.getElementById("hud-weapon-active-stats");
    const terminalConsole = document.getElementById("hero-terminal-console");

    if (hudSlots.length > 0 && activeNameEl && activeDescEl && activeStatsEl) {
        // High-tech audio synthesizer using Web Audio API
        const playHudSynthSound = () => {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return;
                const ctx = new AudioContext();
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = "sine";
                osc.frequency.setValueAtTime(500, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
                
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.13);
            } catch (e) {
                console.warn("Audio Context blocked or not supported: ", e);
            }
        };

        // Interactive Scrambled Text Decrypt Effect
        const decryptText = (element, targetText, speed = 20) => {
            const chars = "$@#%&*?^{}[]-+:=~_<>";
            const length = targetText.length;
            let progress = 0;
            
            const interval = setInterval(() => {
                let result = "";
                for (let i = 0; i < length; i++) {
                    if (i < progress) {
                        result += targetText[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                element.innerText = result;
                progress += 2; // Decrypt 2 characters at a time for smoother speed
                
                if (progress > length + 2) {
                    clearInterval(interval);
                    element.innerText = targetText;
                }
            }, speed);
        };

        // Helper to append logs directly to the hero console
        const logToHeroTerminal = (weaponName, statsStr) => {
            if (!terminalConsole) return;
            
            const appendLine = (text, lineType = "") => {
                const line = document.createElement("div");
                line.className = `terminal-line ${lineType}`;
                line.innerText = text;
                terminalConsole.appendChild(line);
                terminalConsole.scrollTop = terminalConsole.scrollHeight;
                
                if (terminalConsole.children.length > 20) {
                    terminalConsole.removeChild(terminalConsole.firstChild);
                }
            };

            appendLine("------------------------------------------", "system-line");
            appendLine(`[WEAPON] Requesting core loadout change...`, "system-line");
            appendLine(`[SYSTEM] Equipping ${weaponName}...`, "system-line");
            appendLine(`[SUCCESS] Synchronized // stats: ${statsStr}`, "success-line");
            appendLine("------------------------------------------", "system-line");
        };

        // Click Handler
        hudSlots.forEach(slot => {
            slot.addEventListener("click", () => {
                if (slot.classList.contains("active")) return;

                // Play futuristic audio chirp
                playHudSynthSound();

                // Swap Active Classes
                hudSlots.forEach(s => s.classList.remove("active"));
                slot.classList.add("active");

                // Get Custom Attributes
                const name = slot.getAttribute("data-name");
                const desc = slot.getAttribute("data-desc");
                const statsStr = slot.getAttribute("data-stats");

                // Run Holographic Decryption Scrambler
                decryptText(activeNameEl, name);
                decryptText(activeDescEl, desc, 12);

                // Render Dynamic Stats Columns
                activeStatsEl.innerHTML = "";
                const statsArr = statsStr.split("|");
                statsArr.forEach(stat => {
                    const cleanStat = stat.trim();
                    const statEl = document.createElement("span");
                    statEl.className = "telemetry-stat";
                    statEl.innerText = cleanStat;

                    // Match dynamic rarity colors
                    if (cleanStat.includes("LEGENDARY")) statEl.classList.add("rarity-legendary");
                    if (cleanStat.includes("MYTHIC")) statEl.classList.add("rarity-mythic");
                    if (cleanStat.includes("EPIC")) statEl.classList.add("rarity-epic");

                    activeStatsEl.appendChild(statEl);
                });

                // Stream Weapon Deployment Logs directly to terminal console
                logToHeroTerminal(name, statsStr);
            });
        });
    }
});
