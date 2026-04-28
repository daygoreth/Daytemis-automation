# Preguntas técnicas frecuentes — Integración Odoo ↔ Artemiz

Documento interno para resolver las dudas que aparecen al cotizar / arrancar
la integración con un cliente que ya tiene Odoo.

## 1. ¿Cómo nos da el cliente los datos para la integración?

Le pedimos un paquete corto de datos. Idealmente armamos un formulario de
onboarding con esto:

**Datos de su Odoo:**
- URL de su instancia (ej: `https://miempresa.odoo.com` o
  `https://erp.miempresa.com`).
- Versión de Odoo (14, 15, 16, 17…) y si es Community o Enterprise.
- Tipo de hosting: Odoo.sh, on-premise, otro proveedor.
- Nombre de la base de datos (en Odoo se ve como `db_name`, suele aparecer en
  la URL de login o en Ajustes → Información de la base de datos).

**Credenciales de acceso vía API:**
- Email del usuario que usaremos para la integración (recomendamos crear un
  usuario dedicado, ej: `integracion@empresa.com`, no usar el del dueño).
- API Key de ese usuario (no la contraseña — explicamos cómo sacarla abajo).

**Datos de negocio:**
- ¿Qué documento crean al vender: `sale.order` (cotización/venta tradicional)
  o `pos.order` (venta POS de mostrador)?
- ¿Tienen lista de precios única o varias?
- ¿Manejan más de un almacén/ubicación?
- ¿Quieren que Artemiz también vea facturas / entregas / pagos?

Lo entregamos como checklist al cliente para que no haya idas y vueltas.

## 2. ¿De dónde saca el cliente la API de Odoo?

Odoo no tiene un "panel de API" como Stripe o Shopify. La API ya viene
incluida en cualquier Odoo (XML-RPC y JSON-RPC). Lo que el cliente nos da son
**credenciales para usarla**.

### Pasos para sacar la API Key (Odoo 14+)

1. El cliente entra a su Odoo con el usuario que va a usar la integración.
2. Va a su nombre arriba a la derecha → **Mi perfil** (o **Preferences**).
3. Pestaña **Cuenta** → sección **Developer API Keys** (o **Claves de API
   del desarrollador**).
4. Click en **Nueva clave de API** → le pone un nombre, ej:
   "Integración Artemiz".
5. Odoo le muestra la clave **una sola vez** → la copia y nos la pasa por un
   canal seguro.

> Si no ve la opción "Developer API Keys", hay que activar el **modo
> desarrollador** en Ajustes → Activar modo desarrollador.

### Recomendación importante

Pedirle que cree un **usuario dedicado** para la integración (no el suyo
personal), con permisos solo de:

- Ventas (Vendedor o superior)
- Inventario (lectura)
- Contactos (lectura/escritura)
- Punto de venta, si aplica

Así, si algún día desactiva la integración, solo desactiva ese usuario y no
afecta a nadie más.

### Datos finales que terminamos teniendo

```
URL:      https://miempresa.odoo.com
DB:       miempresa
Usuario:  integracion@miempresa.com
API Key:  xxxxxxxxxxxxxxxxxxxx
```

Con eso Artemiz se conecta.

## 3. ¿Cómo autoriza Odoo a Artemiz para mandar/recibir información?

Odoo no usa OAuth como Google o Facebook. Funciona con
**autenticación por API Key** sobre XML-RPC o JSON-RPC.

El flujo es así:

1. Artemiz arma una llamada al endpoint `/xmlrpc/2/common` de la URL del
   cliente.
2. Manda: `db`, `usuario`, `api_key` → Odoo responde con un `uid` (id
   numérico de sesión).
3. Con ese `uid` + la API Key, Artemiz ya puede llamar a cualquier modelo
   permitido para ese usuario:
   - Leer productos, stock, precios.
   - Crear contactos (`res.partner`).
   - Crear cotizaciones / ventas (`sale.order`, `pos.order`).
   - Leer facturas (`account.move`).

Cada llamada lleva las credenciales — no hay tokens que expiren ni refresh.
Si el cliente quiere cortar el acceso, simplemente borra la API Key desde su
perfil de Odoo.

**Para tiempo real (opcional):** instalamos un módulo pequeño en Odoo que
dispara webhooks a Artemiz cuando cambian stock, precio o se crea una
factura. Esto evita estar consultando cada minuto.

## 4. Si el cliente se crea por WhatsApp y se hace la venta, ¿se refleja en Odoo?

**Sí, ese es el punto central de la integración.** El flujo es:

1. Llega un mensaje nuevo de WhatsApp a Artemiz, de un número que no existe
   en el sistema.
2. Artemiz crea el contacto en su CRM y, en paralelo, lo crea en Odoo
   llamando al modelo `res.partner` (con nombre, teléfono, y si lo da, email
   y RUC/DNI).
3. Guarda el `partner_id` que devuelve Odoo, asociado a la conversación de
   Artemiz.
4. El vendedor arma la cotización en Artemiz (escaneando productos o
   buscándolos).
5. Al confirmar la venta, Artemiz crea en Odoo:
   - Un `sale.order` con el `partner_id` del cliente y las líneas de
     productos, **o**
   - Un `pos.order` si el cliente trabaja todo desde POS.
6. Odoo descuenta el stock automáticamente como en cualquier venta hecha
   desde su interfaz.
7. La factura sigue el flujo normal de Odoo (manual o automática según cómo
   lo tenga configurado).

Resultado: en el módulo de Ventas de Odoo aparece la venta como una más, sin
diferenciar si vino de WhatsApp o de mostrador. Eso le da al dueño una sola
visión de su negocio.

## 5. Si el cliente compra en tienda física y luego lo agregamos en WhatsApp, ¿vemos su historial?

**Sí, y este es uno de los argumentos más fuertes de venta.** Funciona así:

1. Cuando el vendedor agrega o detecta un nuevo número en WhatsApp dentro de
   Artemiz, antes de crear un contacto nuevo, Artemiz **busca primero en
   Odoo** por:
   - Número de teléfono (`phone` o `mobile` en `res.partner`).
   - O documento (DNI/RUC) si el vendedor lo pregunta.
2. Si lo encuentra:
   - **Asocia** la conversación con el `partner_id` existente, no crea uno
     nuevo.
   - Trae el historial de compras: consulta `sale.order` y `pos.order` con
     ese `partner_id`.
   - Muestra en Artemiz: últimas compras, productos que compró, ticket
     promedio, fecha de su última compra, facturas.
3. Si no lo encuentra → lo crea como contacto nuevo (caso de la pregunta 4).

Así, si Juan ya compró 3 veces en la tienda física durante el último año y
hoy escribe por WhatsApp, el vendedor lo recibe con: "Hola Juan, vi que la
última vez te llevaste el polo azul talla M. ¿Cómo te fue?". Eso convierte
mucho más.

### Caso bonus: matching difuso

Si el cliente en tienda compró sin dar teléfono, no hay match automático.
Para esos casos se puede:

- Pedir DNI al inicio de la conversación de WhatsApp y matchear por ahí.
- Dejar que el vendedor confirme manualmente "este WhatsApp = este cliente
  de Odoo" desde Artemiz, y queda enlazado para siempre.

## 6. ¿Qué pasa si el cliente edita un producto en Odoo? ¿Artemiz se entera?

Sí, dos opciones:

- **Pull periódico:** Artemiz consulta Odoo cada X minutos por cambios. Más
  simple, sirve para catálogos que no cambian a cada rato.
- **Push por webhook (recomendado):** un módulo en Odoo dispara un aviso a
  Artemiz cada vez que cambia un producto, precio o stock. Es lo que más
  conviene para inventario en vivo.

## 7. ¿Y si Odoo se cae o está lento?

Artemiz mantiene una caché local del catálogo y del stock. Si Odoo no
responde:

- El escaneo y la cotización siguen funcionando contra la caché.
- Las ventas se encolan y se mandan a Odoo cuando vuelve.
- El vendedor ve un aviso de "modo offline con Odoo".

Esto evita que un problema de hosting de Odoo paralice las ventas por
WhatsApp.
