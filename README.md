# Kathleen Argueta · Portafolio

Portafolio bilingüe (español / inglés) de Kathleen Argueta, estudiante de Ingeniería de Software y Negocios Digitales en la ESEN. Enfocado en pasantías de QA, Cloud y SOC.

Sitio: https://kathleenargueta.github.io

## Estructura

```
index.html          contenido de todas las secciones (ES y EN juntos)
css/styles.css      diseño; los colores y fuentes están en :root al inicio
js/main.js          idioma, aparición al hacer scroll, menú, filtro de proyectos
assets/             foto de perfil
assets/proyectos/   capturas de cada proyecto
```

## Trabajar en VS Code

1. Clona el repositorio y ábrelo en VS Code.
2. Instala la extensión **Live Server** y haz clic en "Go Live" para ver los cambios al guardar.

## Cómo hacer cambios comunes

- **Textos:** cada texto existe dos veces, `<span data-l="es">` y `<span data-l="en">`. Cambia los dos.
- **Colores:** edita las variables de `:root` en `css/styles.css`.
- **Fotos de proyectos:** guarda la captura en `assets/proyectos/` con el nombre que aparece en su `<img>` (por ejemplo `cloudshop.jpg`, proporción 16:10). Si falta, se muestra un espacio con el nombre del proyecto.
- **Animación al hacer scroll:** agrega `data-reveal` a cualquier elemento.
- **Filtro de proyectos:** cada `<article class="project">` tiene `data-area` (`qa`, `cloud`, `soc` o `negocio`).
