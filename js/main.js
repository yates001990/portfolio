const toolDatabase = [
    {
        name: "Nmap",
        category: "Recon",
        use: "Network discovery, port scanning, and service enumeration across target hosts.",
        command: "nmap -sV -Pn -oN scan.txt 10.10.10.0/24",
        tags: ["discovery", "ports", "enumeration"],
        risk: "Low"
    },
    {
        name: "Gobuster",
        category: "Web",
        use: "Brute-force hidden directories and files on web servers using wordlists.",
        command: "gobuster dir -u https://target.site -w /usr/share/wordlists/dirb/common.txt -t 50",
        tags: ["content", "enumeration", "web"],
        risk: "Low"
    },
    {
        name: "SQLMap",
        category: "Database",
        use: "Automated detection and exploitation of SQL injection flaws in web apps.",
        command: "sqlmap -u 'https://target.site/item?id=4' --batch --risk=2 --level=3 --dbs",
        tags: ["injection", "database", "audit"],
        risk: "High"
    },
    {
        name: "Hydra",
        category: "Access",
        use: "Online brute-force testing of credentials against SSH, FTP, HTTP, and other services.",
        command: "hydra -L users.txt -P passwords.txt ssh://10.0.0.12 -t 4",
        tags: ["auth", "passwords", "testing"],
        risk: "High"
    },
    {
        name: "Burp Suite",
        category: "Web",
        use: "Intercepting proxy for manual web application testing, request replay, and vulnerability scanning.",
        command: "Proxy → Intercept → Repeater → Intruder workflow",
        tags: ["proxy", "web", "manual"],
        risk: "Medium"
    },
    {
        name: "Responder",
        category: "Internal",
        use: "LLMNR / NBT-NS poisoning and credential capture within internal networks.",
        command: "sudo responder -I eth0 -dwP",
        tags: ["windows", "internal", "relay"],
        risk: "High"
    },
    {
        name: "Nikto",
        category: "Web",
        use: "Scans web servers for known misconfigurations, outdated software, and dangerous files.",
        command: "nikto -h https://target.site -o nikto_report.html -Format htm",
        tags: ["scanner", "web", "audit"],
        risk: "Low"
    },
    {
        name: "John the Ripper",
        category: "Access",
        use: "Offline password hash cracking supporting multiple hash types and custom rules.",
        command: "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
        tags: ["passwords", "cracking", "offline"],
        risk: "Medium"
    },
    {
        name: "Metasploit",
        category: "Exploitation",
        use: "Framework for developing, testing, and executing exploits against target systems.",
        command: "msfconsole → use exploit/multi/handler → set PAYLOAD → run",
        tags: ["exploit", "framework", "post-exploitation"],
        risk: "Critical"
    },
    {
        name: "Wireshark",
        category: "Recon",
        use: "Packet capture and protocol analysis for live traffic inspection and forensic review.",
        command: "wireshark -i eth0 -k -Y 'http.request'",
        tags: ["traffic", "packets", "forensics"],
        risk: "Low"
    },
    {
        name: "Hashcat",
        category: "Access",
        use: "GPU-accelerated hash cracking supporting hundreds of hash algorithms.",
        command: "hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt",
        tags: ["passwords", "gpu", "cracking"],
        risk: "Medium"
    },
    {
        name: "Enum4linux",
        category: "Recon",
        use: "Enumerates SMB shares, users, groups, and policies from Windows/Samba systems.",
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
    initArsenalSearch();
    initBreachReport();
    initPhishLab();
    initAdminLogs();
    initMpgCalculator();
    initImageSlider();
    initReadinessCalculator();
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
    const reportCounts = document.querySelectorAll("[data-report-count]");
    const phishCounts = document.querySelectorAll("[data-phish-count]");

    if (!reportTable || !phishTable) {
        return;
    }

    const render = () => {
        const reports = readStorage("nexusReports");
        const phishLogs = readStorage("nexusPhishLogs");

        reportTable.innerHTML = reports.length ? reports.map((item) => `
            <tr>
                <td>${item.date}</td>
                <td>${item.client}</td>
                <td>${item.title}</td>
                <td>${item.severity}</td>
                <td>${item.status}</td>
                <td>${item.affected}</td>
            </tr>
        `).join("") : '<tr><td colspan="6" class="muted">No breach reports stored yet. Submit one from the <a href="report.html">Breach Report</a> page.</td></tr>';

        phishTable.innerHTML = phishLogs.length ? phishLogs.map((item) => `
            <tr>
                <td>${item.date}</td>
                <td>${item.user}</td>
                <td>${item.department}</td>
                <td>${item.action}</td>
                <td>${item.notes}</td>
            </tr>
        `).join("") : '<tr><td colspan="5" class="muted">No Phish-Lab activity stored yet. Visit <a href="phish-lab.html">Phish-Lab</a> to generate events.</td></tr>';

        for (let i = 0; i < reportCounts.length; i += 1) {
            reportCounts[i].textContent = String(reports.length);
        }

        for (let i = 0; i < phishCounts.length; i += 1) {
            phishCounts[i].textContent = String(phishLogs.length);
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
            thumbs[thumbIndex].classList.toggle("is-active", thumbIndex === currentIndex);
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

function initReadinessCalculator() {
    const form = document.querySelector("[data-readiness-form]");
    const result = document.querySelector("[data-readiness-result]");

    if (!form || !result) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let total = 0;
        const values = Array.from(form.querySelectorAll("select")).map((select) => Number(select.value));

        for (let index = 0; index < values.length; index += 1) {
            total += values[index];
        }

        const percentage = Math.round((total / (values.length * 5)) * 100);
        const tier = percentage >= 80 ? "Ready" : percentage >= 60 ? "Improving" : "Needs work";

        result.innerHTML = `
            <div class="readiness-result">
                <span class="readiness-score">${percentage}%</span>
                <span class="app-value-label">Readiness score</span>
            </div>
            <div class="readiness-result">
                <span class="readiness-score">${tier}</span>
                <span class="app-value-label">Assessment tier</span>
            </div>
        `;
    });
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