(function () {
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.getElementById("mobile-nav");
  if (!toggle || !mobile) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobile.hidden = !open;
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  mobile.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 860px)").matches) {
      setOpen(false);
    }
  });
})();
