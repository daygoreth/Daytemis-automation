# Landing — Artemiz × Odoo

Landing page para promocionar la integración de Artemiz con Odoo y guiar al
cliente paso a paso para que genere su API Key y nos la envíe.

## Archivos

- `index.html` — la landing completa, una sola página con todas las
  secciones.
- `styles.css` — estilos. Sin frameworks, sin dependencias.

## Cómo verla en local

Abre `landing/index.html` directamente en el navegador, o si prefieres
servidor local:

```bash
cd landing
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Cómo publicarla

Cualquier hosting estático sirve:

- **Vercel / Netlify:** arrastra la carpeta `landing/` a su panel de deploy
  o conéctala al repo y elige `landing` como root.
- **GitHub Pages:** habilita Pages apuntando a esta carpeta.
- **Hosting tradicional (cPanel, etc.):** sube `index.html` y `styles.css`
  por FTP a `public_html/odoo/` o a un subdominio.

Sugerido: usar un subdominio tipo `odoo.artemiz.com` o
`integraciones.artemiz.com`.

## Secciones de la landing

1. **Hero** — propuesta de valor + mockup de WhatsApp con Gavino Outlet.
2. **Strip de versiones** — soporte para Odoo 14–17, Community/Enterprise,
   Odoo.sh y on-premise.
3. **Beneficios** — 6 cards: IA aprende sola, stock exacto, vende desde
   chat, reconoce clientes, precios al día, no toca tu Odoo.
4. **Cómo funciona** — 4 pasos + diagrama WhatsApp ↔ Artemiz ↔ Odoo.
5. **Tutoriales en video** — 4 pasos con espacio para embebido de
   YouTube/Loom + texto explicativo de cada uno.
6. **FAQ** — 7 preguntas frecuentes en formato acordeón nativo
   (`<details>`).
7. **CTA final** — botón principal a WhatsApp, secundario a email.
8. **Footer.**

## Cómo reemplazar los placeholders de video

Cada video tiene un bloque así en `index.html`:

```html
<div class="video-placeholder" data-video-slot="paso-1">
  <span class="play">▶</span>
  <p>Video: Crear usuario dedicado</p>
  <small>Reemplaza este bloque con un &lt;iframe&gt; de YouTube/Loom</small>
</div>
```

Cuando tengas el video, reemplaza el `<div class="video-placeholder">…</div>`
completo por:

**YouTube:**
```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Cómo crear un usuario dedicado en Odoo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="width:100%; aspect-ratio:16/9; border-radius:14px;">
</iframe>
```

**Loom:**
```html
<div style="position:relative; padding-bottom:56.25%; height:0;">
  <iframe
    src="https://www.loom.com/embed/VIDEO_ID"
    frameborder="0"
    webkitallowfullscreen mozallowfullscreen allowfullscreen
    style="position:absolute; top:0; left:0; width:100%; height:100%; border-radius:14px;">
  </iframe>
</div>
```

Los 4 slots son: `paso-1`, `paso-2`, `paso-3`, `paso-4`.

## Datos a personalizar antes de publicar

En `index.html`:

- Número de WhatsApp en el botón final:
  `https://wa.me/51999716331?text=...` → cambiar al número real.
- Email de contacto: `mailto:hola@artemiz.com`.
- Logo o nombre en el `<header>` si quieren un logo en imagen en vez de
  texto.
- Política de privacidad y Términos en el footer (links vacíos por ahora).

## Lista de videos a grabar

Idealmente con Loom — son cortos y directos:

1. **Paso 1 — Crear usuario dedicado** (~60–90 seg)
   Mostrar Ajustes → Usuarios → Crear → poner nombre y permisos.

2. **Paso 2 — Activar modo desarrollador** (~30 seg)
   Ajustes → bajar al final → click en "Activar el modo desarrollador".

3. **Paso 3 — Generar API Key** (~90 seg)
   Login con el usuario nuevo → Mi perfil → Cuenta de seguridad →
   Developer API Keys → Nueva → copiar.

4. **Paso 4 — Encontrar URL y base de datos** (~45 seg)
   Mostrar la URL del navegador y dónde leer la DB en Ajustes →
   Información.

Total estimado: 4–5 minutos de grabación, que el cliente puede ver
mientras va haciendo los pasos.
