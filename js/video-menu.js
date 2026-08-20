(function () {
  const menu = document.getElementById("navVideoMenu");
  const openBtn = document.getElementById("openVideoMenu");
  const closeBtn = document.getElementById("closeVideoMenu");

  if (!menu || !openBtn || !closeBtn) return;

  const videos = Array.from(menu.querySelectorAll("video"));

  function setActiveItem() {
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

    menu.querySelectorAll(".nav-video-item").forEach((item) => {
      const itemPage = (item.getAttribute("href") || "").split("#")[0].toLowerCase();
      const isActive = itemPage === currentPage;
      item.classList.toggle("active", isActive);
      if (isActive) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.classList.toggle("is-hidden", open);
    openBtn.setAttribute("aria-expanded", String(open));

    videos.forEach((video) => {
      if (!open) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      video.muted = true;
      video.setAttribute("muted", "");
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    });

    if (open) {
      closeBtn.focus();
    }
  }

  setActiveItem();
  setMenu(false);

  openBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenu(!menu.classList.contains("is-open"));
  });

  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenu(false);
    openBtn.focus();
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("is-open")) return;
    if (menu.contains(event.target) || openBtn.contains(event.target)) return;
    setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu.classList.contains("is-open")) return;
    setMenu(false);
    openBtn.focus();
  });
})();
