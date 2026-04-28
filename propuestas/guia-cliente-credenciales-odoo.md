# Cómo conectar tu Odoo con Artemiz — Guía rápida

Esta guía es para que tú mismo generes los datos que necesitamos para
conectar Artemiz a tu Odoo. Toma **5 minutos** y no requiere conocimiento
técnico. Si en cualquier paso te trabas, escríbenos y lo hacemos juntos
por videollamada.

---

## Lo que necesitamos al final

Solo 4 datos:

```
1. URL de tu Odoo:    ej. https://gavinooutlet.odoo.com
2. Base de datos:     ej. gavinooutlet
3. Usuario:           ej. integracion@gavinooutlet.com
4. API Key:           xxxxxxxxxxxxxxxxxxxx
```

Abajo te explicamos cómo sacar cada uno.

---

## Paso 1 — Crea un usuario dedicado para Artemiz (recomendado)

> **¿Por qué?** Si más adelante quieres cortar el acceso, simplemente
> desactivas este usuario y listo. No tocas tu cuenta personal.

1. Entra a tu Odoo con tu usuario administrador.
2. Ve a **Ajustes** → **Usuarios y compañías** → **Usuarios**.
3. Click en **Crear**.
4. Llena:
   - **Nombre:** Integración Artemiz
   - **Correo:** `integracion@tunegocio.com` (puede ser un correo real o
     uno de tu dominio)
5. En la pestaña **Permisos de acceso**, marca:
   - **Ventas:** Vendedor (o superior)
   - **Inventario:** Usuario
   - **Contactos:** Lectura/escritura
   - **Punto de venta:** Usuario (si vendes con POS)
6. Guarda.

---

## Paso 2 — Activa el modo desarrollador

> **¿Por qué?** Las API Keys están en una sección que solo aparece con
> este modo activado. No es peligroso, es solo una vista extra.

1. Ve a **Ajustes**.
2. Baja hasta el final de la página.
3. Verás un enlace que dice **Activar el modo desarrollador**. Haz click.
4. La página se recargará con más opciones disponibles.

---

## Paso 3 — Genera la API Key

1. Cierra sesión y vuelve a entrar **con el usuario "Integración
   Artemiz"** que creaste en el Paso 1.
2. Click en tu nombre arriba a la derecha → **Mi perfil** (o
   **Preferences**).
3. Ve a la pestaña **Cuenta de seguridad** (o **Account Security**).
4. Busca la sección **Developer API Keys** (o **Claves de API del
   desarrollador**).
5. Click en **Nueva clave de API**.
6. Ponle un nombre, ej: `Artemiz integración`.
7. (Si te pide duración) elige **Sin expiración** o el máximo posible.
8. Click en **Generar clave**.
9. Odoo te mostrará la clave. ⚠️ **Cópiala ahora**, solo se ve una vez.

---

## Paso 4 — Encuentra el nombre de tu base de datos

Hay dos formas fáciles:

**Opción A (la más simple):**
- Si tu URL es `https://gavinooutlet.odoo.com`, entonces tu base de
  datos generalmente se llama `gavinooutlet` (la parte antes de
  `.odoo.com`).

**Opción B:**
- Ve a **Ajustes** → **Información** → ahí aparece el nombre de la base
  de datos.

---

## Paso 5 — Mándanos los datos por canal seguro

Mándanos esto en un solo mensaje, idealmente por un canal privado (chat
directo, no grupo público):

```
URL Odoo:    https://___________________
Base de datos: ____________________
Usuario:     integracion@_______________
API Key:     ____________________
```

> ⚠️ **Nunca compartas tu contraseña personal de Odoo.** No la
> necesitamos. Solo la API Key del usuario que creaste.

---

## Preguntas que solemos recibir

**¿Esto da acceso total a mi Odoo?**
No. Solo a los permisos del usuario "Integración Artemiz" que creaste.
Por eso recomendamos que ese usuario solo tenga lo mínimo necesario:
ventas, inventario y contactos.

**¿Puedo cortar el acceso después?**
Sí, en cualquier momento. Tienes dos formas:
1. Borrar la API Key desde el perfil del usuario.
2. Desactivar al usuario "Integración Artemiz" desde Ajustes.

**¿Pueden ver mi información financiera o mis facturas?**
Solo si le das ese permiso al usuario. Por defecto, no se lo damos.

**Mi Odoo está en mi propio servidor (on-premise), ¿igual funciona?**
Sí, mientras tu Odoo sea accesible desde internet (o nos puedas dar
acceso por VPN). Avísanos y coordinamos.

**Tengo Odoo Community (gratis), ¿funciona?**
Sí. La integración funciona con Community y Enterprise, desde la
versión 14 en adelante.

---

## ¿Y ahora qué sigue?

Apenas recibamos tus datos:

1. **Día 1:** conectamos a tu Odoo y validamos que todo el catálogo se
   lee correctamente.
2. **Día 2:** te mostramos una demo con tus propios productos
   funcionando dentro de Artemiz.
3. **Día 3 en adelante:** activamos el flujo de ventas, sincronización
   de stock y la IA con tu catálogo.

¿Dudas? Escríbenos. Esto debería tomarte menos de 10 minutos en total.
