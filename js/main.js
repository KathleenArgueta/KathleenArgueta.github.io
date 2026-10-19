// Portafolio Kathleen Argueta: interacciones del sitio.
// Cada bloque es independiente; puedes borrar uno sin romper los demás.

// ---------- Idioma (ES / EN) ----------
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".lang button");

  function setLang(lang) {
    root.lang = lang;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === lang));
    });
    try { localStorage.setItem("ka-lang", lang); } catch (e) {}
  }

  // Enlace directo con #en o #es; si no, el último idioma elegido
  var start = "es";
  if (location.hash === "#en" || location.hash === "#es") start = location.hash.slice(1);
  else { try { start = localStorage.getItem("ka-lang") || start; } catch (e) {} }
  setLang(start);

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.set); });
  });
})();

// ---------- Aparición al hacer scroll ----------
(function () {
  var items = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  // Elementos hermanos aparecen en cascada (80 ms entre cada uno)
  items.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.hasAttribute("data-reveal");
    });
    el.style.setProperty("--delay", Math.min(siblings.indexOf(el), 5) * 80 + "ms");
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { observer.observe(el); });
})();

// ---------- Sección activa en el menú ----------
(function () {
  var links = document.querySelectorAll(".nav a");
  if (!("IntersectionObserver" in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + entry.target.id));
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id], footer[id]").forEach(function (s) { observer.observe(s); });
})();

// ---------- Menú en celular ----------
(function () {
  var btn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  function close() { nav.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();

// ---------- Filtro de proyectos ----------
(function () {
  var buttons = document.querySelectorAll(".filters button");
  var projects = document.querySelectorAll(".project");
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.dataset.filter;
      buttons.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      projects.forEach(function (p) {
        var show = f === "all" || p.dataset.area.split(" ").indexOf(f) !== -1;
        p.hidden = !show;
        if (show) p.classList.add("is-visible");
      });
    });
  });
})();

// ---------- Fotos de AIESEC que aún no existen: se ocultan ----------
(function () {
  document.querySelectorAll(".gallery img").forEach(function (img) {
    function hide() { img.closest("figure").hidden = true; }
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener("error", hide);
  });
})();
