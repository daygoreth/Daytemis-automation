# Propuesta: Integración Odoo ↔ Artemiz CRM

## Contexto del cliente

El cliente ya tiene Odoo en producción con:

- Inventario y productos cargados, con códigos de barras listos para escanear.
- Operación de POS funcionando (escaneo → venta → descuento de stock).
- Procesos de facturación y control de stock montados en Odoo.

No quiere (ni le conviene) salir de Odoo. La propuesta NO busca reemplazar Odoo,
sino sumar una **capa conversacional y de CRM** sobre los mismos datos usando
Artemiz como front operativo.

## Idea central

Artemiz se convierte en el **front de interacción** (WhatsApp, conversación,
seguimiento de clientes, escaneo en movilidad) y **consume Odoo vía API** como
fuente de verdad de inventario, productos y documentos de venta.

Es el mismo modelo que ya se usa hoy con WooCommerce o Shopify, sumando a Odoo
como un conector más.

## Arquitectura propuesta

```
                ┌──────────────────────┐
                │      WhatsApp        │
                │   Business API       │
                └──────────┬───────────┘
                           │ webhooks
                           ▼
┌─────────────────────────────────────────────────┐
│                ARTEMIZ CRM (front)              │
│                                                 │
│  • Conversaciones WhatsApp                      │
│  • Seguimiento de clientes / pipeline           │
│  • Escaneo de productos en movilidad            │
│  • Cotizaciones y cierre de venta               │
└──────────────┬──────────────────────────────────┘
               │  API REST / webhooks
               ▼
┌─────────────────────────────────────────────────┐
│                    ODOO                         │
│                                                 │
│  • Inventario y stock (fuente de verdad)        │
│  • Productos con código de barras               │
│  • POS / sale.order / pos.order                 │
│  • Facturación                                  │
└─────────────────────────────────────────────────┘
```

## Quién manda sobre qué dato

Para evitar duplicidad y descuadres, cada dato tiene un único dueño:

| Dato                              | Fuente de verdad | Quién consume                  |
| --------------------------------- | ---------------- | ------------------------------ |
| Producto, SKU, código de barras   | Odoo             | Artemiz (lectura)              |
| Stock e inventario                | Odoo             | Artemiz (lectura en vivo)      |
| Precio y lista de precios         | Odoo             | Artemiz (lectura)              |
| Cliente / contacto                | Artemiz          | Odoo (sincroniza al vender)    |
| Conversación WhatsApp             | Artemiz          | —                              |
| Pipeline / seguimiento            | Artemiz          | —                              |
| Cotización / venta / orden POS    | Se origina en Artemiz, **se materializa en Odoo** | ambos |
| Factura                           | Odoo             | Artemiz (lectura)              |

## Flujos clave

### 1. Sincronización de catálogo

- Carga inicial: Artemiz consulta `product.product` y `product.template` de
  Odoo y trae SKU, `barcode`, nombre, variantes, precio y stock.
- Actualización continua: o bien pull periódico (cada N minutos), o bien push
  vía webhook desde Odoo cuando un producto cambia (recomendado para precios y
  stock).

### 2. Escaneo de producto desde Artemiz

1. El vendedor escanea el código de barras en la app de Artemiz.
2. Artemiz busca primero en su caché local.
3. Si no lo tiene o el stock es crítico, consulta a Odoo en vivo.
4. Devuelve producto + stock disponible + precio.

### 3. Venta originada en conversación

1. Cliente escribe por WhatsApp → entra a Artemiz.
2. Vendedor arma cotización en Artemiz (escaneando o buscando productos).
3. Al confirmar:
   - Artemiz crea o actualiza el contacto en Odoo (`res.partner`).
   - Crea el documento en Odoo: `sale.order` para cotización formal o
     `pos.order` si es venta directa de mostrador.
   - Odoo descuenta inventario y emite la factura según su flujo normal.
4. Artemiz guarda el ID del documento de Odoo en la conversación, así toda
   la conversación queda ligada a la venta.

### 4. Seguimiento post-venta

- Artemiz lee estado de la orden / factura / entrega desde Odoo y dispara
  mensajes automáticos al cliente por WhatsApp ("tu pedido salió",
  "tu factura está lista").

## Endpoints / modelos de Odoo a usar

Odoo expone XML-RPC y JSON-RPC sobre los modelos estándar:

- `res.partner` — clientes.
- `product.template`, `product.product` — productos y variantes.
- `stock.quant` — stock por ubicación.
- `pricelist.item` — precios.
- `sale.order`, `sale.order.line` — cotizaciones y ventas.
- `pos.order`, `pos.order.line` — ventas POS.
- `account.move` — facturas.

Recomendado: si el cliente está en Odoo 16+, usar la API JSON-RPC; para
notificaciones en tiempo real, instalar un módulo simple en Odoo que dispare
webhooks a Artemiz cuando cambian stock o precio.

## Lo que el cliente gana

- **No pierde su inversión en Odoo.** Sigue siendo el corazón de inventario,
  POS y facturación.
- **Suma WhatsApp + CRM sin duplicar trabajo.** Lo que se vende por chat entra
  automáticamente a Odoo igual que una venta de mostrador.
- **Escaneo en movilidad.** Los vendedores pueden escanear desde Artemiz en el
  celular, no solo desde la caja.
- **Trazabilidad completa:** conversación → cotización → venta → factura, todo
  enlazado.

## Lo que tenemos que validar antes de cotizar

1. Versión de Odoo del cliente (community vs. enterprise, versión).
2. ¿Odoo está on-premise o en Odoo.sh / cloud? Define cómo se exponen las
   APIs.
3. Confirmar credenciales de API de Odoo (usuario de servicio + API key).
4. ¿El cliente factura desde POS o desde `sale.order`? Define qué documento
   crea Artemiz al cerrar venta.
5. Volumen estimado de productos y de mensajes/día — define plan de caché y
   throughput.

## Próximos pasos sugeridos

1. Reunión técnica corta con el cliente para validar los 5 puntos de arriba.
2. Demo conceptual: jalar su catálogo de Odoo a Artemiz en modo lectura
   (1–2 días de trabajo) para que vea funcionando el primer puente.
3. Cotización del conector completo con los flujos descritos.
