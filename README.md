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
```

## Trabajar en VS Code

1. Clona el repositorio y ábrelo en VS Code.
2. Instala la extensión **Live Server** y haz clic en "Go Live" para ver los cambios al guardar.

## Cómo hacer cambios comunes

- **Textos:** cada texto existe dos veces, `<span data-l="es">` y `<span data-l="en">`. Cambia los dos.
- **Colores:** edita las variables de `:root` en `css/styles.css`.
- **Fotos de AIESEC:** guarda cada foto en `assets/aiesec/` con el nombre que aparece en su `<img>` (por ejemplo `tortugas.jpg`, horizontal 4:3). Si falta una, la galería la oculta y los bloques grandes (`talento-humano.jpg`, `voluntarios.jpg`, `comite.jpg`) se muestran solo con texto.
- **Animación al hacer scroll:** agrega `data-reveal` a cualquier elemento.
- **Filtro de proyectos:** cada `<details class="project">` tiene `data-area` (`qa`, `cloud` o `soc`; `all` solo aparece en "Todos").
