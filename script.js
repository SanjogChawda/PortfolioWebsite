document.addEventListener("DOMContentLoaded", () => {
  // Activate custom cursor logic once script runs
  document.body.classList.add("custom-cursor");

  // ── CURSOR ────────────────────────────────────────────────
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  let mx = 0,
    my = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
    setTimeout(() => {
      ring.style.left = mx + "px";
      ring.style.top = my + "px";
    }, 60);
  });

  document
    .querySelectorAll(
      "a, button, .exp-item, .skill-tag, .project-card, .cert-card",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        ring.style.width = "54px";
        ring.style.height = "54px";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "12px";
        cursor.style.height = "12px";
        ring.style.width = "36px";
        ring.style.height = "36px";
      });
    });

  // ── EXPERIENCE ACCORDION ─────────────────────────────────
  const expItems = document.querySelectorAll(".exp-item");
  expItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      expItems.forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 80);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));

  // ── FORM SUBMIT (demo) ───────────────────────────────────
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const orig = this.textContent;
      this.textContent = "✓ Message Sent!";
      this.style.borderColor = "#28c840";
      this.style.color = "#28c840";
      setTimeout(() => {
        this.textContent = orig;
        this.style.borderColor = "";
        this.style.color = "";
      }, 3000);
    });
  }

  // ── ACTIVE NAV ───────────────────────────────────────────
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + current ? "var(--accent)" : "";
    });
  });

  // ── STAGGER SKILL CARDS ──────────────────────────────────
  document.querySelectorAll(".skill-category").forEach((el, i) => {
    el.style.transitionDelay = i * 0.06 + "s";
  });
});
