/* =============================================
   RÊVE ECO — Subpages Interactive Logic (pages.js)
   Tab navigation, Accordions, and Forms
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sub-Navigation Tabs & Scroll Spy
  const tabs = document.querySelectorAll(".subnav-tab");
  const sections = document.querySelectorAll(".subpage-section[id]");

  function setActiveTab(hash) {
    if (!hash) return;
    tabs.forEach((tab) => {
      const tabTarget = tab.getAttribute("href");
      if (tabTarget === hash) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // Handle URL hash on load
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        const offset = 130;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setActiveTab(window.location.hash);
      }, 150);
    }
  }

  // Scrollspy to update active tab on scroll
  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 180;
      if (window.scrollY >= top) {
        currentId = "#" + sec.getAttribute("id");
      }
    });
    if (currentId) {
      setActiveTab(currentId);
    }
  }, { passive: true });

  // Smooth click scroll for tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const targetId = tab.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          history.pushState(null, null, targetId);
          const offset = 130;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetSection.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          setActiveTab(targetId);
        }
      }
    });
  });

  // 2. Collapsible FAQ Accordion (help.html)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        // Close others
        faqItems.forEach((other) => other.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // 3. Gift Card Selector (shop.html)
  const tierBtns = document.querySelectorAll(".tier-btn");
  const amountDisplay = document.getElementById("giftcardAmountDisplay");
  if (tierBtns.length > 0 && amountDisplay) {
    tierBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tierBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const amount = btn.getAttribute("data-amount");
        amountDisplay.textContent = "$" + amount;
      });
    });
  }

  // 4. Contact Form Feedback (help.html)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
      if (typeof lucide !== "undefined") lucide.createIcons();

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (typeof lucide !== "undefined") lucide.createIcons();
      }, 3500);
    });
  }

  // Initialize Lucide icons on inner page load
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
