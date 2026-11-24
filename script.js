/* Mobile menu */
(function () {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("nav-toggle");
    if (!header || !toggle) return;

    const icon = toggle.querySelector("i");

    function setMenu(open) {
        header.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-xmark", open);
        }
    }

    toggle.addEventListener("click", () => setMenu(!header.classList.contains("open")));

    header.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) setMenu(false);
    });
})();

/* Typewriter effect (home page only) */
(function () {
    const el = document.querySelector(".typewriter-text");
    if (!el) return;

    const texts = ["DEVELOPER", "STUDENT", "DATA ANALYST"];
    const typeSpeed = 100;
    const eraseSpeed = 50;
    let textIndex = 0;
    let charIndex = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
        el.textContent = texts[0];
        return;
    }

    function type() {
        if (charIndex < texts[textIndex].length) {
            el.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            setTimeout(erase, 1200);
        }
    }

    function erase() {
        if (el.textContent.length > 0) {
            el.textContent = el.textContent.slice(0, -1);
            setTimeout(erase, eraseSpeed);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            setTimeout(type, 400);
        }
    }

    type();
})();

/* Project filters (projects page only) */
(function () {
    const buttons = document.querySelectorAll(".filter");
    const cards = document.querySelectorAll(".project");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
            cards.forEach((card) => {
                const show = filter === "all" || card.dataset.category === filter;
                card.hidden = !show;
            });
        });
    });
})();

/* Scroll reveal */
(function () {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
        items.forEach((i) => i.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    items.forEach((i) => observer.observe(i));
})();
