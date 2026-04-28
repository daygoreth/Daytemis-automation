# Demo conceptual — Gavino Outlet con Artemiz IA + Odoo

Mini-demo para mostrarle a Marco cómo se vería una conversación real con
Artemiz IA usando el catálogo de Gavino Outlet ya cargado en su Odoo.

> Todos los datos de productos, precios y stock que aparecen abajo son
> ilustrativos. En producción, vendrían **en vivo desde el Odoo de Marco**.

---

## Escena 1 — Cliente nuevo pregunta por un producto

**WhatsApp de Gavino Outlet — 14:32**

👤 **Cliente (Lucía):**
> Hola, vi un polo azul en su Instagram, ¿lo tienen en talla M?

🤖 **Artemiz IA:**
> ¡Hola Lucía! 👋 Sí, tenemos el **Polo Básico Azul Marino** en talla M.
>
> 🏷️ Precio: **S/ 59.00**
> 📦 Stock disponible: **4 unidades**
>
> ¿Te lo aparto o quieres ver más colores? Lo tenemos también en blanco,
> negro y rojo.

👤 **Lucía:**
> El negro también, ¿en M?

🤖 **Artemiz IA:**
> En negro talla M nos quedan solo **2 unidades**. ¿Te llevo los dos
> (azul + negro) por **S/ 118**? Te puedo armar el pedido ahora mismo.

> 🔍 **Lo que pasó por dentro:** Artemiz consultó en vivo
> `product.product` y `stock.quant` del Odoo de Marco. No estaba
> "memorizado", es el dato real del momento.

---

## Escena 2 — Cierre de venta y registro automático en Odoo

👤 **Lucía:**
> Sí, llévame los dos. ¿Cómo pago?

🤖 **Artemiz IA:**
> Perfecto Lucía 🎉 Te paso el resumen:
>
> • 1× Polo Básico Azul Marino — Talla M — S/ 59.00
> • 1× Polo Básico Negro — Talla M — S/ 59.00
> • **Total: S/ 118.00**
>
> Puedes pagar por Yape, Plin o transferencia BCP. ¿Cuál te queda mejor?
> Apenas confirmes el pago, te emito tu boleta y coordinamos envío.

👤 **Lucía:** *(envía captura de Yape)*

🤖 **Artemiz IA:**
> ¡Pago recibido! ✅ Tu pedido **#GAV-1042** ya está confirmado.
>
> Te llega tu boleta al correo en unos minutos y mañana coordinamos
> envío 📦

> 🔍 **Lo que pasó por dentro en el Odoo de Marco:**
>
> 1. Se creó `res.partner` con los datos de Lucía (si no existía).
> 2. Se creó `sale.order` #GAV-1042 con las dos líneas.
> 3. Stock de los dos polos talla M se descontó automáticamente.
> 4. Se generó la boleta en `account.move` siguiendo el flujo de Marco.
>
> Marco no tuvo que tocar nada. La venta aparece en su Odoo como una
> venta más.

---

## Escena 3 — Cliente recurrente que ya compró en tienda física

**Tres semanas después. Llega un mensaje nuevo a WhatsApp.**

👤 **Cliente (Carlos, +51 999 123 456):**
> Hola, quiero ver qué tienen nuevo

🤖 **Artemiz IA (al vendedor, en interno):**
> ⚡ Cliente reconocido: **Carlos Mendoza** — ya compró 2 veces en tienda
> física.
>
> 🛍️ Última compra: hace 23 días — Jean Slim Negro 32 + Camisa Oxford
> Blanca M (S/ 189)
> 🛍️ Compra anterior: hace 4 meses — 2 polos básicos
> 💰 Ticket promedio: S/ 145
>
> Sugerencia: ofrecerle camisas nuevas o jeans (categorías que ya
> consume).

🤖 **Artemiz IA (al cliente):**
> ¡Hola Carlos! 👋 Qué bueno verte por acá. Te cuento que esta semana
> entraron camisas Oxford nuevas en color celeste y verde, talla M
> disponibles. ¿Te paso fotos?

> 🔍 **Lo que pasó por dentro:** Artemiz buscó el número +51 999 123 456
> en `res.partner` de Odoo, lo encontró, y consultó su historial en
> `pos.order` y `sale.order`. Nada de esto se cargó manualmente — vino
> todo de la base de Odoo donde Marco ya lo tenía.

---

## Escena 4 — Marco cambia un precio en Odoo

**11:00 AM** — Marco entra a su Odoo y sube el precio del Polo Básico de
S/ 59 a S/ 65.

**11:01 AM** — Llega un mensaje a WhatsApp.

👤 **Cliente:**
> ¿Cuánto cuesta el polo básico?

🤖 **Artemiz IA:**
> El Polo Básico está a **S/ 65.00** 🏷️ Tenemos azul, blanco, negro y
> rojo. ¿Qué color y talla te interesa?

> 🔍 **Lo que pasó por dentro:** Artemiz no respondió con un precio
> "memorizado". Fue al pricelist de Odoo y trajo el precio actual. Marco
> no tuvo que avisarle al sistema, no hay capacitación que rehacer.

---

## Lo que Marco se lleva de esta demo

- **Cero capacitación de la IA.** Su catálogo de Odoo *es* el
  conocimiento de Artemiz.
- **Cero descuadre.** Las ventas de WhatsApp y las de tienda física viven
  en el mismo Odoo.
- **Cero precios viejos.** La IA siempre cotiza con el precio actual.
- **Conoce a sus clientes.** Cada conversación arranca con el contexto
  de su historial de compras.

Todo esto sin cambiar nada de cómo opera Gavino Outlet hoy.
