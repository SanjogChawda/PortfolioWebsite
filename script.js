document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Activate custom cursor logic once script runs
  document.body.classList.add("custom-cursor");

  // ── SMOOTH SCROLL (Lenis) ─────────────────────────────────
  if (!reduceMotion && window.Lenis) {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep in-page anchor links working with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          lenis.scrollTo(id, { offset: -90 });
        }
      });
    });
  }

  // ── HERO SPLIT-TEXT REVEAL ────────────────────────────────
  document
    .querySelectorAll(".hero-name .line1, .hero-name .line2")
    .forEach((line) => {
      const letters = line.textContent.split("");
      line.textContent = "";
      letters.forEach((ch, i) => {
        const span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--i", i);
        span.textContent = ch === " " ? "\u00A0" : ch;
        line.appendChild(span);
      });
    });

  // ── MAGNETIC BUTTONS ──────────────────────────────────────
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document
      .querySelectorAll(".btn-primary, .btn-secondary, .nav-cta")
      .forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          const relX = e.clientX - r.left - r.width / 2;
          const relY = e.clientY - r.top - r.height / 2;
          btn.style.transform = `translate(${relX * 0.3}px, ${relY * 0.35}px)`;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "translate(0, 0)";
        });
      });
  }

  // ── TILT CARDS ─────────────────────────────────────────────
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document
      .querySelectorAll(".project-card, .skill-category")
      .forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(700px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
  }

  // ── BLOB PARALLAX ON SCROLL ───────────────────────────────
  const blobs = document.querySelectorAll(".blob");
  if (!reduceMotion && blobs.length) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          blobs.forEach((blob, i) => {
            const speed = 0.06 + i * 0.03;
            blob.style.setProperty(
              "--px",
              `${(i % 2 === 0 ? 1 : -1) * y * speed * 0.4}px`,
            );
            blob.style.setProperty("--py", `${y * speed}px`);
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

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
      "a, button, .exp-item, .exp-role, .skill-tag, .project-card, .cert-card",
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

  // Grouped roles (e.g. multiple positions at the same company) toggle
  // independently within their own group, LinkedIn-style.
  document.querySelectorAll(".exp-group").forEach((group) => {
    const roles = group.querySelectorAll(".exp-role");
    roles.forEach((role) => {
      role.querySelector(".exp-role-header").addEventListener("click", () => {
        const isActive = role.classList.contains("active");
        roles.forEach((r) => r.classList.remove("active"));
        if (!isActive) role.classList.add("active");
      });
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
