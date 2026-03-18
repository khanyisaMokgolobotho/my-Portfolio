document.documentElement.classList.add("js-ready");

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const quickNavToggle = document.querySelector(".quick-nav-toggle");
const quickNavPanel = document.querySelector(".quick-nav-panel");
const quickNavAnchors = document.querySelectorAll(".quick-nav-panel a");
const revealItems = document.querySelectorAll("[data-reveal]");
const counterItems = document.querySelectorAll("[data-count]");
const sections = document.querySelectorAll("main section[id]");
const terminalOutput = document.getElementById("terminal-output");
const yearTarget = document.getElementById("year");
const allNavAnchors = [...navAnchors, ...quickNavAnchors];

function setMenuState(toggle, panel, isOpen) {
  if (!toggle || !panel) {
    return;
  }

  panel.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = !navLinks.classList.contains("is-open");
    setMenuState(navToggle, navLinks, isOpen);
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      setMenuState(navToggle, navLinks, false);
    });
  });
}

function updateQuickNavVisibility() {
  if (!quickNavToggle) {
    return;
  }

  const shouldShow = window.scrollY > Math.max(window.innerHeight * 0.35, 240);
  quickNavToggle.classList.toggle("is-visible", shouldShow);

  if (!shouldShow) {
    setMenuState(quickNavToggle, quickNavPanel, false);
  }
}

if (quickNavToggle && quickNavPanel) {
  quickNavToggle.addEventListener("click", () => {
    const isOpen = !quickNavPanel.classList.contains("is-open");
    setMenuState(quickNavToggle, quickNavPanel, isOpen);
  });

  quickNavAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      setMenuState(quickNavToggle, quickNavPanel, false);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      quickNavPanel.classList.contains("is-open") &&
      target instanceof Node &&
      !quickNavPanel.contains(target) &&
      !quickNavToggle.contains(target)
    ) {
      setMenuState(quickNavToggle, quickNavPanel, false);
    }
  });

  window.addEventListener("scroll", updateQuickNavVisibility, { passive: true });
  updateQuickNavVisibility();
}

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  setMenuState(navToggle, navLinks, false);
  setMenuState(quickNavToggle, quickNavPanel, false);
});

function animateCounter(counter) {
  const targetValue = Number(counter.dataset.count || "0");
  const pad = Number(counter.dataset.pad || "0");
  const suffix = counter.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(targetValue * eased);
    const paddedValue = String(value).padStart(pad, "0");

    counter.textContent = `${paddedValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.8,
    }
  );

  counterItems.forEach((counter) => {
    counterObserver.observe(counter);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });

  counterItems.forEach((counter) => {
    animateCounter(counter);
  });
}

const terminalMessages = [
  "Deploying AI-powered applications...",
  "Multilingual systems aligned for real-time experiences...",
  "Secure backend protocols online...",
  "Cloud-native workflows synced...",
  "Impact-focused build sequence complete.",
];

if (terminalOutput) {
  let messageIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  function renderTerminalLine() {
    const activeMessage = terminalMessages[messageIndex];
    const visibleText = activeMessage.slice(0, characterIndex);
    terminalOutput.textContent = visibleText;

    if (!isDeleting && characterIndex < activeMessage.length) {
      characterIndex += 1;
      window.setTimeout(renderTerminalLine, 42);
      return;
    }

    if (!isDeleting && characterIndex === activeMessage.length) {
      isDeleting = true;
      window.setTimeout(renderTerminalLine, 1400);
      return;
    }

    if (isDeleting && characterIndex > 0) {
      characterIndex -= 1;
      window.setTimeout(renderTerminalLine, 20);
      return;
    }

    isDeleting = false;
    messageIndex = (messageIndex + 1) % terminalMessages.length;
    window.setTimeout(renderTerminalLine, 250);
  }

  renderTerminalLine();
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");

        if (!id) {
          return;
        }

        if (entry.isIntersecting) {
          allNavAnchors.forEach((anchor) => anchor.classList.remove("is-active"));

          document
            .querySelectorAll(`.nav-links a[href="#${id}"], .quick-nav-panel a[href="#${id}"]`)
            .forEach((anchor) => anchor.classList.add("is-active"));
        }
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
