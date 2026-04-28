# Cómo publicar la landing en `artemiz.io/odoo`

Tres caminos, según dónde esté hosteada hoy `artemiz.io`. Elige el que
aplica a tu caso.

---

## Caso A — `artemiz.io` ya está en Vercel

El más rápido. **5 minutos.**

1. Ve a [vercel.com](https://vercel.com) → tu proyecto de `artemiz.io`.
2. **Settings → Git** → si el proyecto ya está conectado al repo
   `daygoreth/daytemis-automation`, salta al paso 4.
3. Si no: **Add New → Project** → importa este repo →
   **Root Directory: `landing`** → Deploy.
4. **Settings → Domains** → agrega `artemiz.io` (o `www.artemiz.io`).
5. Cuando termine, la landing estará en `artemiz.io/odoo`.

> El `vercel.json` ya está configurado para redirigir `/odoo` a la landing.

---

## Caso B — `artemiz.io` ya está en Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import
   from Git** → conectar repo `daygoreth/daytemis-automation`.
2. **Base directory: `landing`** → **Publish directory: `landing`**.
3. **Domains** → agrega `artemiz.io`.
4. El `netlify.toml` ya tiene la regla de redirect para `/odoo`.

---

## Caso C — `artemiz.io` está en otro hosting (cPanel, Hostinger, etc.)

### Opción 1 (la más simple): subdominio

En vez de `artemiz.io/odoo`, publica en `odoo.artemiz.io`.

1. En tu panel de hosting → DNS → agrega un registro:
   - Tipo: `A` o `CNAME`
   - Nombre: `odoo`
   - Valor: la IP del hosting o el CNAME que te pidan
2. Crea la carpeta `odoo/` en `public_html/` y sube ahí
   `index.html`, `styles.css` (los archivos de `landing/`).
3. Listo: `https://odoo.artemiz.io`.

### Opción 2: subcarpeta `/odoo`

1. En tu hosting, entra a `public_html/` (o equivalente).
2. Crea una carpeta llamada `odoo`.
3. Sube por FTP / Administrador de archivos:
   - `landing/index.html` → `public_html/odoo/index.html`
   - `landing/styles.css` → `public_html/odoo/styles.css`
4. Listo: `https://artemiz.io/odoo`.

> Si el sitio principal es WordPress u otro CMS, asegúrate de que la
> carpeta `/odoo/` no esté siendo capturada por reglas de `.htaccess`
> de WordPress. Si pasa, agrega esto al `.htaccess` raíz **antes** de
> las reglas de WordPress:
>
> ```apache
> RewriteRule ^odoo/?$ /odoo/index.html [L]
> ```

---

## Caso D — Todavía no tienes `artemiz.io` configurado

Lo más rápido para tener algo arriba **hoy**:

1. Crea cuenta gratis en [vercel.com](https://vercel.com) o
   [netlify.com](https://netlify.com).
2. Conecta el repo `daygoreth/daytemis-automation`.
3. Root directory: `landing`.
4. Te da una URL tipo `daytemis-automation.vercel.app` que puedes usar
   mientras configuras el dominio.
5. Cuando esté listo `artemiz.io`, lo agregas en Settings → Domains.

---

## Después del deploy: checklist

Antes de mandar la URL a clientes, asegúrate de:

- [ ] Reemplazar el número de WhatsApp en `index.html` (busca
      `wa.me/51999716331` y cámbialo por el real).
- [ ] Reemplazar el email `hola@artemiz.com`.
- [ ] Verificar que `/odoo` carga bien y que `styles.css` se ve aplicado
      (si no, problema de rutas).
- [ ] Probar la landing en celular — la mayoría de clientes la abrirán
      desde WhatsApp.
- [ ] Grabar y embebir los 4 videos tutoriales (instrucciones en
      `README.md`).

---

## Test local antes de subir

```bash
cd landing
python3 -m http.server 8000
# luego abre http://localhost:8000
```

Si ves la landing bien en local, va a verse igual en producción.
