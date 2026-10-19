# Kathleen Argueta · Portafolio

Portafolio bilingüe (español / inglés) de Kathleen Argueta, estudiante de Ingeniería de Software y Negocios Digitales en la ESEN. Enfocado en pasantías de QA, Cloud y SOC.

Sitio: https://kathleenargueta.github.io

## Estructura

```
index.html          contenido de todas las secciones (ES y EN juntos)
css/styles.css      diseño; los colores y fuentes están en :root al inicio
js/main.js          idioma, aparición al hacer scroll, menú, filtro de proyectos
assets/             foto de perfil
assets/aiesec/      fotos de los proyectos de AIESEC
assets/proyectos/   capturas de los proyectos técnicos
assets/trayectoria/ logos de la línea de tiempo
assets/skills/      logos de tecnologías
```

## Trabajar en VS Code

1. Clona el repositorio y ábrelo en VS Code.
2. Instala la extensión **Live Server** y haz clic en "Go Live" para ver los cambios al guardar.

## Cómo hacer cambios comunes

- **Textos:** cada texto existe dos veces, `<span data-l="es">` y `<span data-l="en">`. Cambia los dos.
- **Colores:** edita las variables al inicio de `css/styles.css` (tema oscuro y tema claro).
- **WhatsApp:** en `index.html`, cambia `data-phone="503XXXXXXXX"` del formulario por tu número con código de país, sin `+` ni espacios.
- **Fotos de AIESEC:** guárdalas en `assets/aiesec/` como `talento-humano.jpg`, `voluntarios.jpg`, `comite.jpg` e `iniciativas.jpg` (horizontales, 16:10). Mientras falte una, la tarjeta muestra su cifra en grande.
- **Capturas de proyectos:** guárdalas en `assets/proyectos/` como `legacy-delivery.png`, `cloudshop.png`, `devsecops.png` y `control-acceso.png` (16:10). Mientras falte una, la tarjeta muestra su stack.
- **Logos de la trayectoria:** guárdalos en `assets/trayectoria/` como `kriete.png`, `esen.png` y `aiesec.png`. Si falta uno, se ve el nombre de la organización.
- **Botón Siguiente:** usa los atributos `data-es` y `data-en` de cada `<section>` como nombre.
- **Skills:** los logos están en `assets/skills/` (íconos de Devicon, licencia MIT). Agrega un `<li>` con su imagen y nombre.
- **Línea de tiempo:** cada etapa es un `<li>` dentro de `.timeline`.
- **Animación al hacer scroll:** agrega `data-reveal` a cualquier elemento.
