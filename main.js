document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true
  });

  // 🔹 Hero animations
  gsap.to("#hero-title", { opacity: 1, y: -20, duration: 1 });
  gsap.to("#hero-sub", { opacity: 1, y: -20, duration: 1, delay: 0.5 });
  gsap.to("#hero-btn", { scale: 1, duration: 0.5, delay: 1 });

  // 🔹 Section animations
  gsap.fromTo("#about-content", { opacity: 0, x: -100 }, {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
    },
    opacity: 1,
    x: 0,
    duration: 1
  });

  gsap.fromTo("#portfolio-title", { opacity: 0, y: 50 }, {
    scrollTrigger: {
      trigger: "#portfolio-title",
      start: "top 90%",
    },
    opacity: 1,
    y: 0,
    duration: 1
  });

  gsap.utils.toArray("#portfolio-grid > div").forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
      },
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: i * 0.1
    });
  });

  gsap.fromTo("#contact-content", { opacity: 0, y: 50 }, {
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
    },
    opacity: 1,
    y: 0,
    duration: 1
  });

  // 🔹 Background color per section
  document.querySelectorAll("section").forEach(section => {
    const bgColor = section.getAttribute("data-color");
    if (!bgColor) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => {
        gsap.to("body", { backgroundColor: bgColor, duration: 0.8, overwrite: "auto" });
      },
      onEnterBack: () => {
        gsap.to("body", { backgroundColor: bgColor, duration: 0.8, overwrite: "auto" });
      }
    });
  });

  // 🔹 Background image
  document.body.style.backgroundImage = "linear-gradient(135deg, rgba(255,106,0,0.7), rgba(238,9,121,0.7)), url('assets/Images/101-copy.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  // 🔹 Horizontal scroll
  const scrollContent = document.querySelector(".horizontal-scroll");
  const scrollAmount = scrollContent.scrollWidth - window.innerWidth;

  gsap.to(scrollContent, {
    x: -scrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-scroll-container",
      start: "top top",
      end: () => `+=${scrollAmount}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    }
  });

  // 🔹 Modal image viewer
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeBtn = modal?.querySelector(".close");

  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.textContent = img.alt || "";
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal?.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // 🔹 Tab switcher
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(tc => tc.classList.remove("active"));
      btn.classList.add("active");

      const tabId = btn.dataset.tab;
      const activeTab = document.getElementById(tabId);
      if (activeTab) activeTab.classList.add("active");
    });
  });

  // 🔹 Scroll logos
  const scrollContainer = document.getElementById("imageScroll");
  if (scrollContainer) {
    scrollContainer.addEventListener("click", () => {
      const scrollAmount = scrollContainer.querySelector(".img-card").offsetWidth + 16;
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  // 🔹 Load more posts
  const posts = document.querySelectorAll(".post");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      posts.forEach(post => post.classList.remove("hidden"));
      loadMoreBtn.style.display = "none";
    });
  }

  // 🔹 Fullscreen iframe on click
  document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const iframe = wrapper.querySelector('iframe');
      if (!iframe) return;

      iframe.style.pointerEvents = 'auto';
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    });
  });

  
  /*Icon progress bar */
  document.addEventListener("DOMContentLoaded", () => {
    const percentages = [95, 90, 85, 88, 92]; // adjust to match your skills
    const circles = document.querySelectorAll(".progress-circle");

    circles.forEach((circle, index) => {
      const radius = 36;
      const circumference = 2 * Math.PI * radius;
      const percent = percentages[index];
      const offset = circumference - (percent / 100) * circumference;

      // Set default offset
      circle.style.strokeDashoffset = circumference;

      // Animate on hover
      const container = circle.closest(".group");
      container.addEventListener("mouseenter", () => {
        circle.style.strokeDashoffset = offset;
      });
      container.addEventListener("mouseleave", () => {
        circle.style.strokeDashoffset = circumference;
      });
    });
    
  });

  // download cv
  
  function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/Images/05_Sidhhesh_Dongare_Portfolio_2025.pdf';
    link.download = 'Sidhhesh_Dongare_CV_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
// Background video (Portfolio)

  const video = document.getElementById('background-video');
  video.addEventListener('loadeddata', () => {
    video.classList.remove('opacity-0');
    video.classList.add('opacity-100');
  });

  alert("main.js is loaded!");

function toggleMenu() {
  const menu = document.getElementById('menu');
  const burger = document.querySelector('.group');

  if (!menu || !burger) {
    console.warn("Missing menu or burger button.");
    return;
  }

  menu.classList.toggle('opacity-0');
  menu.classList.toggle('pointer-events-none');
  menu.classList.toggle('-translate-y-2');
  burger.classList.toggle('open');
}
alert("main.js is loaded!");

function toggleMenu() {
  const menu = document.getElementById('menu');
  const burger = document.querySelector('.group');

  if (!menu || !burger) {
    console.warn("Missing menu or burger button.");
    return;
  }

  menu.classList.toggle('opacity-0');
  menu.classList.toggle('pointer-events-none');
  menu.classList.toggle('-translate-y-2');
  burger.classList.toggle('open');
}

  
});