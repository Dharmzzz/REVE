/* =============================================
   RÊVE ECO — "Steps That Count" Campaign
   JavaScript — Interactions & Animations
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ----- Pill navbar scroll effect -----
  const pillNav = document.getElementById("pillNav");
  const scrollIndicator = document.getElementById("scrollIndicator");

  function handleNavScroll() {
    const scrolled = window.scrollY > 60;
    if (pillNav) pillNav.classList.toggle("scrolled", scrolled);
    if (scrollIndicator) {
      scrollIndicator.style.opacity = scrolled ? "0" : "1";
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  // ----- Mobile hamburger menu (pill nav) -----
  const pillHamburger = document.getElementById("pillHamburger");
  const pillNavLinks = document.getElementById("pillNavLinks");

  if (pillHamburger && pillNavLinks) {
    pillHamburger.addEventListener("click", () => {
      pillHamburger.classList.toggle("active");
      pillNavLinks.classList.toggle("active");
      document.body.style.overflow = pillNavLinks.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu on link click
    pillNavLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        pillHamburger.classList.remove("active");
        pillNavLinks.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ----- Scroll-triggered fade animations -----
  const fadeElements = document.querySelectorAll(".fade-in, .fade-up");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  // ----- Impact counter animation -----
  const counters = document.querySelectorAll(".impact-number");

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return Math.floor(num / 1000) + "K";
    }
    return num.toLocaleString();
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // ----- Parallax effect on lifestyle image -----
  const parallaxImg = document.getElementById("parallaxImg");
  const lifestyleSection = document.querySelector(".lifestyle");

  if (parallaxImg && lifestyleSection) {
    function handleParallax() {
      const rect = lifestyleSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only process when section is in view
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const scrollPercent =
        (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = (scrollPercent - 0.5) * 80; // Subtle parallax

      parallaxImg.style.transform = `translateY(${translateY}px) scale(1.1)`;
    }

    window.addEventListener("scroll", handleParallax, { passive: true });
    handleParallax();
  }

  // ----- Newsletter form submission -----
  const ctaForm = document.getElementById("ctaForm");

  if (ctaForm) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = ctaForm.querySelector(".form-input");
      const btn = ctaForm.querySelector(".btn-form");

      if (input && input.value) {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="form-btn-icon"></i> Welcome!';
        if (typeof lucide !== "undefined") lucide.createIcons();
        btn.style.backgroundColor = "#8fa98b";
        input.value = "";

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.backgroundColor = "";
          if (typeof lucide !== "undefined") lucide.createIcons();
        }, 3000);
      }
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = pillNav ? pillNav.offsetHeight + 18 : 60;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ----- Initialize Lucide icons -----
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
