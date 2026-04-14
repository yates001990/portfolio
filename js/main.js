const toolDatabase = [
    {
        name: "Nmap",
        category: "Recon",
        use: "Initial perimeter sweep to map live hosts, services, and version exposure after scope approval.",
        command: "nmap -sV -Pn -oN scan.txt 10.10.10.0/24",
        tags: ["discovery", "ports", "enumeration"],
        risk: "Low"
    },
    {
        name: "Gobuster",
        category: "Web",
        use: "Directory and file discovery on a live web application or staging target.",
        command: "gobuster dir -u https://target.site -w /usr/share/wordlists/dirb/common.txt -t 50",
        tags: ["content", "enumeration", "web"],
        risk: "Low"
    },
    {
        name: "SQLMap",
        category: "Database",
        use: "Validation of a parameter suspected of SQL injection during a web assessment.",
        command: "sqlmap -u 'https://target.site/item?id=4' --batch --risk=2 --level=3 --dbs",
        tags: ["injection", "database", "audit"],
        risk: "High"
    },
    {
        name: "Hydra",
        category: "Access",
        use: "Authorized password audit against a login form, SSH service, or other scoped endpoint.",
        command: "hydra -L users.txt -P passwords.txt ssh://10.0.0.12 -t 4",
        tags: ["auth", "passwords", "testing"],
        risk: "High"
    },
    {
        name: "Burp Suite",
        category: "Web",
        use: "Manual web testing for request handling, cookies, session flow, and input validation.",
        command: "Proxy → Intercept → Repeater → Intruder workflow",
        tags: ["proxy", "web", "manual"],
        risk: "Medium"
    },
    {
        name: "Responder",
        category: "Internal",
        use: "Internal assessment of name-resolution exposure inside a sanctioned network or lab.",
        command: "sudo responder -I eth0 -dwP",
        tags: ["windows", "internal", "relay"],
        risk: "High"
    },
    {
        name: "Nikto",
        category: "Web",
        use: "Baseline scan of a public web server to surface outdated software and common misconfigurations.",
        command: "nikto -h https://target.site -o nikto_report.html -Format htm",
        tags: ["scanner", "web", "audit"],
        risk: "Low"
    },
    {
        name: "John the Ripper",
        category: "Access",
        use: "Offline review of recovered password hashes using wordlists and targeted rules.",
        command: "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
        tags: ["passwords", "cracking", "offline"],
        risk: "Medium"
    },
    {
        name: "Metasploit Framework",
        category: "Exploitation",
        use: "Controlled validation of a known issue in a test environment or lab.",
        command: "msfconsole → use exploit/multi/handler → set PAYLOAD → run",
        tags: ["exploit", "framework", "post-exploitation"],
        risk: "Critical"
    },
    {
        name: "Wireshark",
        category: "Recon",
        use: "Traffic capture for incident response, troubleshooting, or protocol review.",
        command: "wireshark -i eth0 -k -Y 'http.request'",
        tags: ["traffic", "packets", "forensics"],
        risk: "Low"
    },
    {
        name: "Hashcat",
        category: "Access",
        use: "GPU-based offline password audit for hashes collected during an engagement.",
        command: "hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt",
        tags: ["passwords", "gpu", "cracking"],
        risk: "Medium"
    },
    {
        name: "enum4linux",
        category: "Recon",
        use: "Windows and Samba discovery to enumerate shares, users, and domain exposure.",
        command: "enum4linux -a 10.10.10.5",
        tags: ["smb", "enumeration", "windows"],
        risk: "Low"
    }
];

(function () {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSite);
        return;
    }

    initSite();
})();

function initSite() {
    initNavigation();
    initThemeToggle();
    initAnimatedAccordions();
    initArsenalSearch();
    initBreachReport();
    initPhishLab();
    initAdminLogs();
    initMpgCalculator();
    initImageSlider();
    markCurrentPage();
}

function initThemeToggle() {
    const navShell = document.querySelector(".nav-shell");

    if (!navShell) {
        return;
    }

    const preferred = localStorage.getItem("nexusTheme") || "dark";
    document.documentElement.setAttribute("data-theme", preferred);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("aria-label", "Toggle site theme");

    const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const updateIcon = () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        button.innerHTML = current === "dark" ? sunIcon : moonIcon;
        button.setAttribute("aria-label", current === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };

    updateIcon();

    button.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("nexusTheme", next);
        updateIcon();
    });

    navShell.appendChild(button);
}

function initNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) {
        return;
    }

    /* Mobile hamburger */
    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close mobile nav on link click */
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    /* Dropdown toggles */
    const dropdowns = document.querySelectorAll(".nav-dropdown");
    for (let i = 0; i < dropdowns.length; i += 1) {
        const dropdown = dropdowns[i];
        const btn = dropdown.querySelector(".nav-dropdown-toggle");
        if (!btn) { continue; }

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const wasOpen = dropdown.classList.contains("is-open");

            /* Close all other dropdowns */
            for (let j = 0; j < dropdowns.length; j += 1) {
                dropdowns[j].classList.remove("is-open");
                const otherBtn = dropdowns[j].querySelector(".nav-dropdown-toggle");
                if (otherBtn) { otherBtn.setAttribute("aria-expanded", "false"); }
            }

            if (!wasOpen) {
                dropdown.classList.add("is-open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    }

    /* Close dropdown when clicking outside */
    document.addEventListener("click", () => {
        for (let i = 0; i < dropdowns.length; i += 1) {
            dropdowns[i].classList.remove("is-open");
            const btn = dropdowns[i].querySelector(".nav-dropdown-toggle");
            if (btn) { btn.setAttribute("aria-expanded", "false"); }
        }
    });
}

function markCurrentPage() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    const allLinks = document.querySelectorAll(".site-nav a, .nav-dropdown-menu a");
    for (let i = 0; i < allLinks.length; i += 1) {
        const link = allLinks[i];
        const href = (link.getAttribute("href") || "").split("/").pop();
        link.classList.toggle("is-active", href === current);
    }
}

function initAnimatedAccordions() {
    const accordions = document.querySelectorAll("[data-animated-accordion]");

    if (!accordions.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setItemState = (item, isOpen) => {
        const summary = item.querySelector("summary");
        item.open = isOpen;
        item.classList.toggle("is-open", isOpen);
        if (summary) {
            summary.setAttribute("aria-expanded", String(isOpen));
        }
    };

    const cleanupItem = (item) => {
        item.style.height = "";
        item.style.overflow = "";
        item.dataset.animating = "false";
        item._faqAnimation = null;
    };

    const animateItem = (item, shouldOpen) => {
        const summary = item.querySelector("summary");
        const body = item.querySelector(".faq-body");

        if (!summary || !body) {
            setItemState(item, shouldOpen);
            return;
        }

        if (item._faqAnimation) {
            item._faqAnimation.cancel();
        }

        const startHeight = item.offsetHeight;

        if (shouldOpen) {
            item.open = true;
            item.classList.add("is-open");
        }

        const endHeight = shouldOpen ? summary.offsetHeight + body.scrollHeight : summary.offsetHeight;
        item.style.height = startHeight + "px";
        item.style.overflow = "hidden";
        item.dataset.animating = "true";

        const animation = item.animate(
            [
                { height: startHeight + "px" },
                { height: endHeight + "px" }
            ],
            {
                duration: shouldOpen ? 280 : 220,
                easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
            }
        );

        item._faqAnimation = animation;

        animation.onfinish = () => {
            setItemState(item, shouldOpen);
            cleanupItem(item);
        };

        animation.oncancel = () => {
            cleanupItem(item);
        };
    };

    accordions.forEach((accordion) => {
        const items = Array.from(accordion.querySelectorAll(".faq-item"));

        items.forEach((item) => {
            const summary = item.querySelector("summary");

            setItemState(item, item.open);

            if (!summary) {
                return;
            }

            summary.addEventListener("click", (event) => {
                event.preventDefault();

                if (item.dataset.animating === "true") {
                    return;
                }

                const shouldOpen = !item.open;

                if (shouldOpen) {
                    items.forEach((otherItem) => {
                        if (otherItem === item || !otherItem.open) {
                            return;
                        }

                        if (prefersReducedMotion.matches) {
                            setItemState(otherItem, false);
                            return;
                        }

                        animateItem(otherItem, false);
                    });
                }

                if (prefersReducedMotion.matches) {
                    setItemState(item, shouldOpen);
                    return;
                }

                animateItem(item, shouldOpen);
            });
        });
    });
}

function initArsenalSearch() {
    const list = document.querySelector("[data-arsenal-list]");
    const input = document.querySelector("[data-arsenal-input]");
    const counterEl = document.querySelector("[data-arsenal-count]");
    const filterButtons = document.querySelectorAll("[data-arsenal-filter]");

    if (!list || !input) {
        return;
    }

    const render = (query) => {
        const normalized = query.trim().toLowerCase();
        const items = toolDatabase.filter((tool) => {
            const haystack = [tool.name, tool.category, tool.use, tool.command, tool.tags.join(" "), tool.risk].join(" ").toLowerCase();
            return haystack.includes(normalized);
        });

        list.innerHTML = items.map((tool) => {
            const riskClass = tool.risk === "Critical" ? "risk-critical" : tool.risk === "High" ? "risk-high" : tool.risk === "Medium" ? "risk-medium" : "risk-low";
            return `
            <article class="tool-card">
                <div class="tool-header">
                    <span class="tool-category">${tool.category}</span>
                    <span class="tool-risk ${riskClass}">${tool.risk} Risk</span>
                </div>
                <h3>${tool.name}</h3>
                <p>${tool.use}</p>
                <div class="tool-tags">${tool.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
                <code>${tool.command}</code>
            </article>
        `;
        }).join("");

        if (counterEl) {
            counterEl.textContent = `${items.length} tool${items.length !== 1 ? "s" : ""} found`;
        }

        if (!items.length) {
            list.innerHTML = '<p class="log-empty">No tools match that search. Try terms like recon, web, injection, or high.</p>';
        }
    };

    render("");
    input.addEventListener("input", (event) => render(event.target.value));

    /* Category filter buttons */
    for (let i = 0; i < filterButtons.length; i += 1) {
        filterButtons[i].addEventListener("click", () => {
            const cat = filterButtons[i].getAttribute("data-arsenal-filter");
            for (let j = 0; j < filterButtons.length; j += 1) {
                filterButtons[j].classList.toggle("is-active", filterButtons[j] === filterButtons[i]);
            }
            if (cat === "All") {
                input.value = "";
                render("");
            } else {
                input.value = cat;
                render(cat);
            }
        });
    }
}

function initBreachReport() {
    const form = document.querySelector("[data-breach-form]");
    const message = document.querySelector("[data-breach-message]");

    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const entry = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            client: String(formData.get("client")).trim(),
            contact: String(formData.get("contact")).trim(),
            title: String(formData.get("title")).trim(),
            severity: String(formData.get("severity")),
            status: String(formData.get("status")),
            affected: String(formData.get("affected")).trim(),
            summary: String(formData.get("summary")).trim()
        };

        if (!entry.client || !entry.title || !entry.summary || !entry.affected) {
            showMessage(message, "Missing required report details", "Complete the client, title, affected asset, and summary fields before saving.", true);
            return;
        }

        const reports = readStorage("nexusReports");
        reports.unshift(entry);
        writeStorage("nexusReports", reports);
        form.reset();
        showMessage(message, "Report saved locally", `Severity ${entry.severity} finding logged for ${entry.client}. Open Admin Logs to review it.`, false);
    });
}

function initPhishLab() {
    const form = document.querySelector("[data-phish-form]");
    const message = document.querySelector("[data-phish-message]");
    const interactionButton = document.querySelector("[data-simulate-click]");

    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const record = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            user: String(formData.get("user")).trim(),
            department: String(formData.get("department")).trim(),
            action: "Reported suspicious message",
            notes: String(formData.get("notes")).trim() || "User submitted a report through the awareness portal."
        };

        if (!record.user || !record.department) {
            showMessage(message, "Awareness report incomplete", "Enter the team member name and department before sending the report.", true);
            return;
        }

        const logs = readStorage("nexusPhishLogs");
        logs.unshift(record);
        writeStorage("nexusPhishLogs", logs);
        form.reset();
        showMessage(message, "Awareness report stored", `${record.user} was logged as reporting a suspicious message.`, false);
    });

    if (interactionButton) {
        interactionButton.addEventListener("click", (e) => {
            e.preventDefault();
            const logs = readStorage("nexusPhishLogs");
            logs.unshift({
                id: Date.now(),
                date: new Date().toLocaleString(),
                user: "Simulated user",
                department: "Unknown",
                action: "Clicked suspicious link",
                notes: "User clicked the phishing link in the email preview instead of reporting it."
            });
            writeStorage("nexusPhishLogs", logs);
            showMessage(message, "You clicked the link!", "In a real attack, this would have redirected you to a credential harvesting page. Always report suspicious emails instead of clicking. This event has been logged to Admin Logs.", true);
        });
    }
}

function initAdminLogs() {
    const reportTable = document.querySelector("[data-report-table]");
    const phishTable = document.querySelector("[data-phish-table]");
    const clearButton = document.querySelector("[data-clear-logs]");
    const reportCount = document.querySelector("[data-report-count]");
    const phishCount = document.querySelector("[data-phish-count]");
    const tabs = document.querySelectorAll("[data-log-tab]");
    const sections = document.querySelectorAll(".log-table-section");

    if (!reportTable || !phishTable) {
        return;
    }

    /* Tab switching */
    for (let i = 0; i < tabs.length; i += 1) {
        tabs[i].addEventListener("click", () => {
            const target = tabs[i].getAttribute("data-log-tab");
            for (let j = 0; j < tabs.length; j += 1) {
                const active = tabs[j] === tabs[i];
                tabs[j].classList.toggle("is-active", active);
                tabs[j].setAttribute("aria-selected", String(active));
            }
            for (let k = 0; k < sections.length; k += 1) {
                sections[k].classList.toggle("is-active", sections[k].id === "log-" + target);
            }
        });
    }

    const sevBadgeClass = (sev) => {
        const map = { low: "badge-low", medium: "badge-medium", high: "badge-high", critical: "badge-critical" };
        return map[sev.trim().toLowerCase()] || "badge-medium";
    };

    const statusBadgeClass = (status) => {
        const map = { "new": "badge-new", "in review": "badge-in-review", "validated": "badge-validated", "remediated": "badge-remediated" };
        return map[status.trim().toLowerCase()] || "badge-new";
    };

    const emptyRow = (cols, icon, msg) => `<tr><td colspan="${cols}"><div class="log-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
        <p>${msg}</p>
    </div></td></tr>`;

    const render = () => {
        const reports = readStorage("nexusReports");
        const phishLogs = readStorage("nexusPhishLogs");

        reportTable.innerHTML = reports.length ? reports.map((item) => `
            <tr>
                <td>${item.date}</td>
                <td>${item.client}</td>
                <td>${item.title}</td>
                <td><span class="badge ${sevBadgeClass(item.severity)}">${item.severity}</span></td>
                <td><span class="badge ${statusBadgeClass(item.status)}">${item.status}</span></td>
                <td>${item.affected}</td>
            </tr>
        `).join("") : emptyRow(6,
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
            "No breach findings logged yet. Submit a report through the Breach Report page."
        );

        const actionBadge = (action) => {
            const isClick = action.toLowerCase().includes("click");
            return `<span class="badge ${isClick ? "badge-clicked" : "badge-reported"}">${isClick ? "Clicked link" : "Reported"}</span>`;
        };

        phishTable.innerHTML = phishLogs.length ? phishLogs.map((item) => `
            <tr>
                <td>${item.date}</td>
                <td>${item.user}</td>
                <td>${item.department}</td>
                <td>${actionBadge(item.action)}</td>
                <td>${item.notes}</td>
            </tr>
        `).join("") : emptyRow(5,
            '<path d="M4 7h16v10H4z"/><path d="M4 8l8 5 8-5"/>',
            "No awareness responses recorded yet. Activity from the Phish-Lab appears here."
        );

        if (reportCount) {
            reportCount.textContent = String(reports.length);
        }

        if (phishCount) {
            phishCount.textContent = String(phishLogs.length);
        }
    };

    render();

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            localStorage.removeItem("nexusReports");
            localStorage.removeItem("nexusPhishLogs");
            render();
        });
    }
}

function initMpgCalculator() {
    const form = document.querySelector("[data-mpg-form]");
    const result = document.querySelector("[data-mpg-result]");

    if (!form || !result) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const miles = Number(document.querySelector("[data-mpg-miles]").value);
        const gallons = Number(document.querySelector("[data-mpg-gallons]").value);

        if (!miles || !gallons || gallons <= 0) {
            result.innerHTML = '<div class="message-box error"><strong>Enter valid numbers</strong><span>Add a distance and a gallons-used value greater than zero.</span></div>';
            return;
        }

        const mpg = miles / gallons;
        const efficiency = mpg >= 30 ? "Efficient" : mpg >= 20 ? "Average" : "Fuel heavy";
        result.innerHTML = `
            <div class="app-result-grid">
                <div class="app-value-card">
                    <span class="app-value">${mpg.toFixed(2)}</span>
                    <span class="app-value-label">Miles per gallon</span>
                </div>
                <div class="app-value-card">
                    <span class="app-value">${efficiency}</span>
                    <span class="app-value-label">Efficiency band</span>
                </div>
            </div>
        `;
    });
}

function initImageSlider() {
    const slider = document.querySelector("[data-slider]");

    if (!slider) {
        return;
    }

    const slides = Array.from(slider.querySelectorAll(".slide"));
    const thumbs = Array.from(slider.querySelectorAll(".thumb-button"));
    const prev = slider.querySelector("[data-slider-prev]");
    const next = slider.querySelector("[data-slider-next]");
    const status = slider.querySelector("[data-slider-status]");
    let currentIndex = 0;
    let intervalId = 0;

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;

        for (let slideIndex = 0; slideIndex < slides.length; slideIndex += 1) {
            slides[slideIndex].classList.toggle("is-active", slideIndex === currentIndex);
        }

        for (let thumbIndex = 0; thumbIndex < thumbs.length; thumbIndex += 1) {
            const isActive = thumbIndex === currentIndex;
            thumbs[thumbIndex].classList.toggle("is-active", isActive);
            thumbs[thumbIndex].setAttribute("aria-pressed", String(isActive));
        }

        if (status) {
            status.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
        }
    };

    const startAutoPlay = () => {
        window.clearInterval(intervalId);
        intervalId = window.setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
    };

    if (prev) {
        prev.addEventListener("click", () => {
            showSlide(currentIndex - 1);
            startAutoPlay();
        });
    }

    if (next) {
        next.addEventListener("click", () => {
            showSlide(currentIndex + 1);
            startAutoPlay();
        });
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    showSlide(0);
    startAutoPlay();
}

function readStorage(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function showMessage(node, title, text, isError) {
    node.innerHTML = `<div class="message-box${isError ? " error" : ""}"><strong>${title}</strong><span>${text}</span></div>`;
}
