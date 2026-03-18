document.documentElement.classList.add("js-ready");

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll("[data-reveal]");
const counterItems = document.querySelectorAll("[data-count]");
const sections = document.querySelectorAll("main section[id]");
const terminalOutput = document.getElementById("terminal-output");
const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

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

        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navAnchors.forEach((anchor) => anchor.classList.remove("is-active"));

          if (activeLink) {
            activeLink.classList.add("is-active");
          }
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
