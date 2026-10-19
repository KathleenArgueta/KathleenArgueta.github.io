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
    document.dispatchEvent(new Event("langchange"));
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

// ---------- Tema claro / oscuro ----------
(function () {
  var btn = document.getElementById("theme-btn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("ka-theme", next); } catch (e) {}
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

  // Elementos hermanos aparecen en cascada (90 ms entre cada uno)
  items.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.hasAttribute("data-reveal");
    });
    el.style.setProperty("--delay", Math.min(siblings.indexOf(el), 5) * 90 + "ms");
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { observer.observe(el); });
})();

// ---------- Línea de tiempo ----------
// Traza una curva que pasa por cada punto y la "dibuja" según el scroll.
(function () {
  var tl = document.querySelector(".timeline");
  if (!tl) return;
  var svg = tl.querySelector(".tl-path");
  var path = svg.querySelector("path");
  var items = tl.querySelectorAll(".tl-item");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var length = 0;

  // Logos que aún no existen: se muestra el nombre en grande
  tl.querySelectorAll(".tl-logo").forEach(function (img) {
    function missing() { img.classList.add("is-missing"); }
    if (img.complete && img.naturalWidth === 0) missing();
    img.addEventListener("error", missing);
  });

  function build() {
    var box = tl.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
    var pts = Array.prototype.map.call(items, function (it) {
      var r = it.querySelector(".tl-dot").getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    if (!pts.length) return;
    var swing = Math.min(box.width * 0.28, 260);
    var d = "M " + pts[0].x + " 0 L " + pts[0].x + " " + pts[0].y;
    for (var i = 1; i < pts.length; i++) {
      var p0 = pts[i - 1], p1 = pts[i], dir = i % 2 ? -1 : 1, h = p1.y - p0.y;
      d += " C " + (p0.x + dir * swing) + " " + (p0.y + h * 0.35) + ", " +
           (p1.x + dir * swing) + " " + (p1.y - h * 0.35) + ", " + p1.x + " " + p1.y;
    }
    path.setAttribute("d", d);
    length = path.getTotalLength();
    path.style.strokeDasharray = length;
    draw();
  }

  function draw() {
    if (reduce) { path.style.strokeDashoffset = 0; return; }
    var r = tl.getBoundingClientRect();
    var p = (window.innerHeight * 0.6 - r.top) / r.height;
    path.style.strokeDashoffset = length * (1 - Math.max(0, Math.min(1, p)));
  }

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (it) { it.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -30% 0px" });
    items.forEach(function (it) { io.observe(it); });
  }

  window.addEventListener("scroll", draw, { passive: true });
  window.addEventListener("resize", build);
  window.addEventListener("load", build);
  document.addEventListener("langchange", build);
  build();
})();

// ---------- Botón "Siguiente sección" ----------
// Muestra el nombre de la siguiente sección y lleva a ella al hacer clic.
(function () {
  var btn = document.getElementById("next-btn");
  var nameEl = document.getElementById("next-name");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  if (!btn || !sections.length) return;
  var current = 0;

  function label() {
    var lang = document.documentElement.lang === "en" ? "en" : "es";
    var last = current >= sections.length - 1;
    var target = last ? sections[0] : sections[current + 1];
    btn.querySelector(".next-label").hidden = last;
    nameEl.textContent = last ? (lang === "en" ? "Back to top" : "Volver al inicio") : target.dataset[lang];
  }

  function update() {
    var mid = window.innerHeight * 0.4;
    sections.forEach(function (s, i) { if (s.getBoundingClientRect().top <= mid) current = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.length - 1;
    label();
  }

  btn.addEventListener("click", function () {
    var target = current >= sections.length - 1 ? sections[0] : sections[current + 1];
    target.scrollIntoView({ behavior: "smooth" });
  });
  window.addEventListener("scroll", update, { passive: true });
  document.addEventListener("langchange", label);
  update();
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
  document.querySelectorAll("main section[id]").forEach(function (s) { observer.observe(s); });
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

// ---------- Fotos que aún no existen: la tarjeta muestra su cifra ----------
(function () {
  document.querySelectorAll(".card-img img, .p-shot img").forEach(function (img) {
    function missing() { img.parentElement.classList.add("no-img"); }
    if (img.complete && img.naturalWidth === 0) missing();
    img.addEventListener("error", missing);
  });
})();

// ---------- Contacto por WhatsApp ----------
// Arma un mensaje formal con los datos y abre WhatsApp con el texto listo.
(function () {
  var form = document.getElementById("wa-form");
  if (!form) return;
  var preview = document.getElementById("wa-preview");
  var error = document.getElementById("wa-error");
  var f = form.elements;

  function message() {
    var name = f.name.value.trim();
    var company = f.company.value.trim();
    var role = f.role.value;
    var en = document.documentElement.lang === "en";
    var n = name || (en ? "[your name]" : "[tu nombre]");
    var c = company || (en ? "[company]" : "[empresa]");
    if (en) {
      return "Hello Kathleen, my name is " + n + " from " + c + ". I reviewed your portfolio and I would like to talk with you about " +
        (role ? "a " + role + " internship opportunity" : "an internship opportunity") + ". Would you be available for a conversation?";
    }
    return "Buen día, Kathleen. Mi nombre es " + n + ", de " + c + ". Revisé tu portafolio y me gustaría conversar contigo sobre " +
      (role ? "una oportunidad de pasantía en " + role : "una oportunidad de pasantía") + ". ¿Tendrías disponibilidad para una conversación?";
  }

  function render() { preview.textContent = message(); }
  form.addEventListener("input", render);
  document.addEventListener("langchange", render);
  render();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!f.name.value.trim() || !f.company.value.trim()) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    var url = "https://wa.me/" + form.dataset.phone + "?text=" + encodeURIComponent(message());
    var link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.click();
  });
})();
