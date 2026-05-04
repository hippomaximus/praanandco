/* =========================================================================
   AURION — Site interactions
   Lean vanilla JS: mobile nav, scroll reveal, header state
   ========================================================================= */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close on link click (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Sticky header state ---------- */
  const header = document.querySelector(".site-header");

  if (header) {
    const onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: just show everything
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Form submission (placeholder) ----------
     Before launch, replace this stub with a real handler. Options:

       1) Formspree  — set <form action="https://formspree.io/f/XXX" method="POST">
                       and remove this whole handler.
       2) Resend / SendGrid via a serverless function on Vercel
          (POST to /api/contact and JSON-stringify the form data).
       3) Anthropic-friendly: route to your own n8n endpoint.

     The current handler simply shows a success message and resets the form. */
  const form = document.querySelector('[data-form="quote"]') || document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const status = form.querySelector("[data-form-status]");

      // Minimal client-side validation
      const required = form.querySelectorAll("[required]");
      let invalid = false;
      required.forEach(function (el) {
        if (!el.value || (el.type === "email" && !/.+@.+\..+/.test(el.value))) {
          invalid = true;
          el.style.borderColor = "#cc4444";
        } else {
          el.style.borderColor = "";
        }
      });

      if (invalid) {
        if (status) {
          status.textContent = "Please complete the required fields.";
          status.style.color = "#cc6666";
          status.style.fontSize = "0.9rem";
        }
        return;
      }

      if (status) {
        status.textContent = "Thank you. We will be in touch within one business day.";
        status.style.color = "var(--accent-hi)";
        status.style.fontSize = "0.9rem";
      }
      form.reset();
    });
  }
})();
