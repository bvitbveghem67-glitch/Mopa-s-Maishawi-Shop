import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ORDER NOTIFICATION ENDPOINT
  app.post('/api/order', async (req, res) => {
    const { orderId, items, total, location, lang, timestamp } = req.body;
    
    console.log('-------------------------------------------');
    console.log('🔴 NEW ORDER RECEIVED 🔴');
    console.log(`Order ID: ${orderId}`);
    console.log(`Time: ${timestamp}`);
    console.log(`Language used: ${lang}`);
    console.log(`Location: ${location}`);
    console.log(`Total: ${total}`);
    console.log('Items:');
    items.forEach((item: any) => {
      console.log(` - ${item.quantity}x ${item.name} (${item.price})`);
    });
    console.log('-------------------------------------------');

    // Email Notification
    if (resend) {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'bvitbveghem67@gmail.com';
        await resend.emails.send({
          from: 'Maishawi Grid <onboarding@resend.dev>',
          to: adminEmail,
          subject: `MAISHAWI_ELITE: New Order ${orderId}`,
          html: `
            <div style="background: #0D0D0D; color: #F2E8D5; padding: 40px; font-family: serif;">
              <h1 style="color: #C5A059; font-style: italic;">Mopa's Maishawi Logistics</h1>
              <p style="text-transform: uppercase; letter-spacing: 0.3em; opacity: 0.6;">Order ID: ${orderId}</p>
              <hr style="border-color: #C5A059; opacity: 0.2;" />
              <div style="margin: 40px 0;">
                <h3>Items:</h3>
                <ul>
                  ${items.map((i: any) => `<li>${i.quantity}x ${i.name} (${i.price}) - ${i.restoName}</li>`).join('')}
                </ul>
              </div>
              <div style="margin: 40px 0;">
                <p><strong>Total:</strong> ${total}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Timestamp:</strong> ${timestamp}</p>
              </div>
              <p style="font-size: 10px; opacity: 0.4;">PROTOCOL: PAY_ON_ARRIVAL</p>
            </div>
          `
        });
      } catch (err) {
        console.error('Email delivery failure:', err);
      }
    }
    
    res.json({ success: true, message: 'Order received in the grid.' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mopa's Maishawi Logistics active at http://localhost:${PORT}`);
  });
}

startServer();
