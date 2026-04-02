# Daytemis.com - Guía de Diseño Futurista

## Qué incluye este kit

```
css/daytemis-futuristic.css     → Estilos futuristas completos
js/daytemis-futuristic.js       → Efectos interactivos (partículas, cursor, animaciones)
elementor-snippets/             → Secciones HTML listas para Elementor
wordpress/functions-snippet.php → Código PHP para cargar todo en WordPress
```

---

## Instalación Paso a Paso

### Paso 1: Subir archivos al servidor

Sube los archivos CSS y JS a tu child theme de Woodmart:

```
wp-content/themes/woodmart-child/daytemis/css/daytemis-futuristic.css
wp-content/themes/woodmart-child/daytemis/js/daytemis-futuristic.js
```

Puedes subirlos via **FTP** (FileZilla) o desde el **File Manager** de tu hosting.

### Paso 2: Activar el código PHP

**Opción A - Plugin Code Snippets (Recomendada):**
1. Instala "Code Snippets" desde Plugins > Añadir nuevo
2. Ve a Snippets > Add New
3. Copia el contenido de `wordpress/functions-snippet.php`
4. Ponle nombre: "Daytemis Futuristic Design"
5. Activa el snippet

**Opción B - Woodmart Custom CSS/JS:**
1. Ve a Theme Settings > Custom CSS
2. Pega el contenido de `css/daytemis-futuristic.css`
3. Ve a Theme Settings > Custom JS
4. Pega el contenido de `js/daytemis-futuristic.js`

**Opción C - Elementor Custom Code (Pro):**
1. Ve a Elementor > Custom Code
2. Crea uno nuevo, pega el CSS dentro de `<style>` tags
3. Crea otro, pega el JS dentro de `<script>` tags
4. Ponlos en el `<head>` y antes de `</body>` respectivamente

### Paso 3: Añadir secciones en Elementor

1. Edita tu página principal con Elementor
2. Añade un widget "HTML"
3. Pega el contenido de `elementor-snippets/hero-section.html`
4. Repite con `elementor-snippets/service-cards.html`

---

## Personalización rápida

### Cambiar colores

Edita las variables CSS al inicio de `daytemis-futuristic.css`:

```css
:root {
  --dt-primary: #00f0ff;     /* Cambia el cyan */
  --dt-secondary: #7b2fff;   /* Cambia el violeta */
  --dt-accent: #ff2d95;      /* Cambia el rosa */
}
```

### Clases útiles para Elementor

Añade estas clases CSS en los widgets de Elementor (pestaña Avanzado > CSS Classes):

| Clase | Efecto |
|-------|--------|
| `dt-glass` | Efecto glassmorphism (cristal esmerilado) |
| `dt-fade-up` | Animación de entrada desde abajo |
| `dt-fade-left` | Animación de entrada desde la izquierda |
| `dt-fade-right` | Animación de entrada desde la derecha |
| `dt-scale-in` | Animación de entrada con escala |
| `dt-gradient-text` | Texto con gradiente cyan-violeta |
| `dt-text-glow` | Texto con efecto neón pulsante |
| `dt-text-cyan` | Texto color cyan |
| `dt-text-violet` | Texto color violeta |
| `dt-text-pink` | Texto color rosa |
| `dt-border-glow` | Borde con brillo neón |
| `dt-shadow-glow` | Sombra con brillo cyan |
| `dt-delay-1` a `dt-delay-5` | Retraso en animaciones (combinar con dt-fade-*) |

### Efecto de texto escribiéndose (typing)

En cualquier widget HTML de Elementor:
```html
<span class="dt-typing" data-texts="Texto 1|Texto 2|Texto 3"></span>
```

---

## Efectos incluidos

- **Partículas interactivas** - Fondo con partículas que reaccionan al mouse
- **Cursor personalizado** - Cursor neón que se agranda al pasar sobre elementos
- **Glassmorphism** - Efecto de cristal esmerilado en tarjetas
- **Scroll animations** - Elementos aparecen al hacer scroll
- **Tilt 3D** - Tarjetas de producto con inclinación 3D al hover
- **Botones magnéticos** - Botones que siguen ligeramente al cursor
- **Preloader** - Animación de carga al entrar al sitio
- **Grid de fondo** - Patrón de cuadrícula sutil que se mueve
- **Scrollbar personalizada** - Con gradiente cyan-violeta
- **Neon glow** - Brillos neón en hover de elementos

---

## Tips para el WOW factor

1. **Usa fondos oscuros** en Elementor para que los efectos resalten
2. **Menos es más** - No llenes la página, usa espacio en blanco
3. **Imágenes de calidad** - Usa fotos/renders futuristas de Unsplash o Freepik
4. **Tipografía grande** para títulos hero (60px+)
5. **Gradientes** en títulos importantes con la clase `dt-gradient-text`
6. **Animaciones de entrada** con `dt-fade-up` en cada sección
