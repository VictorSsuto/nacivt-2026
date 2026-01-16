function genOrderId() {
  // Produce a short, human-friendly 8-character ID for pickup receipts.
  // Prefer crypto.randomBytes when available (Node), fall back to Math.random.
  try {
    if (typeof crypto !== "undefined" && crypto.randomBytes) {
      return crypto.randomBytes(4).toString("hex").toUpperCase()
    }
  } catch (e) {
    // ignore and fallback
  }

  // Fallback: timestamp + random, then base36 and slice to 8 chars
  const rnd = Math.floor(Math.random() * 36 ** 4)
  const ts = Date.now() % 36 ** 4
  return (ts.toString(36) + rnd.toString(36)).toUpperCase().padStart(8, "0").slice(0, 8)
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { name, email, items, total } = req.body || {}
  if (!name || !email || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Missing order data" })
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
  const MERCHANT_EMAIL = process.env.MERCHANT_EMAIL || "contact@nacivt.com"

  if (!SENDGRID_API_KEY) {
    // Dev-friendly fallback: simulate a successful send so developers can test locally
    const simulatedOrderId = genOrderId()
    console.warn("SENDGRID_API_KEY not set — returning simulated order id for local testing")
    return res.status(200).json({ orderId: simulatedOrderId, simulated: true })
  }

  const orderId = genOrderId()

  // Build plain text and HTML bodies
  const lines = []
  lines.push(`Order ID: ${orderId}`)
  lines.push(`Name: ${name}`)
  lines.push(`Email: ${email}`)
  lines.push("")
  lines.push("Items:")
  items.forEach((it) => {
    lines.push(`- ${it.product.name} x ${it.qty} — $${(it.product.price * it.qty).toFixed(2)}`)
  })
  lines.push("")
  lines.push(`Total: $${Number(total).toFixed(2)}`)
  lines.push("")
  lines.push("Pay in person and show this Order ID at pickup.")

  const textBody = lines.join("\n")

  const htmlLines = []
  htmlLines.push(`<h2>NACIVT Order ${orderId}</h2>`)
  htmlLines.push(`<p><strong>Name:</strong> ${name}<br /><strong>Email:</strong> ${email}</p>`)
  htmlLines.push(`<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;border-bottom:1px solid #ddd;padding:6px">Item</th><th style="text-align:right;border-bottom:1px solid #ddd;padding:6px">Qty</th><th style="text-align:right;border-bottom:1px solid #ddd;padding:6px">Price</th></tr></thead><tbody>`)
  items.forEach((it) => {
    htmlLines.push(`<tr><td style="padding:6px;border-bottom:1px solid #f0f0f0">${it.product.name}</td><td style="padding:6px;border-bottom:1px solid #f0f0f0;text-align:right">${it.qty}</td><td style="padding:6px;border-bottom:1px solid #f0f0f0;text-align:right">$${(it.product.price * it.qty).toFixed(2)}</td></tr>`)
  })
  htmlLines.push(`</tbody><tfoot><tr><td></td><td style="padding:6px;font-weight:bold;text-align:right">Total</td><td style="padding:6px;font-weight:bold;text-align:right">$${Number(total).toFixed(2)}</td></tr></tfoot></table>`)
  htmlLines.push(`<p>Pay in person and show this Order ID at pickup.</p>`)

  const htmlBody = htmlLines.join("")

  try {
    // Use SendGrid HTTP API directly to avoid SDK dependency issues
    const payload = {
      personalizations: [
        {
          to: [
            { email },
          ],
          bcc: [{ email: MERCHANT_EMAIL }],
          subject: `Your NACIVT Order ${orderId}`,
        },
      ],
      from: { email: MERCHANT_EMAIL },
      content: [
        { type: "text/plain", value: textBody },
        { type: "text/html", value: htmlBody },
      ],
    }

    const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const errorText = await resp.text().catch(() => "")
      console.error("SendGrid error", resp.status, errorText)
      return res.status(500).json({ error: "Failed to send email" })
    }

    return res.status(200).json({ orderId })
  } catch (err) {
    console.error("send-order error", err)
    return res.status(500).json({ error: "Failed to send email" })
  }
}
