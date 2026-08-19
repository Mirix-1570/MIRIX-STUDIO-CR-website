/**
 * Netlify Function: notify-telegram
 * Sends a Telegram message to the site owner when a contact form is submitted.
 *
 * Env vars — set them in the Netlify dashboard (Site settings → Environment variables).
 * NEVER put them in the repo or in VITE_* vars: they would leak into the public bundle.
 *   TELEGRAM_BOT_TOKEN — token from @BotFather (secret)
 *   TELEGRAM_CHAT_ID   — owner chat id (from @userinfobot or Bot API getUpdates)
 *
 * After adding env vars, trigger a redeploy for the function to pick them up.
 */
export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return new Response('Telegram not configured', { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const name = String(body.name || '').slice(0, 100);
  const email = String(body.email || '').slice(0, 200);
  const phone = String(body.phone || '').slice(0, 60);
  const service = String(body.service || '').slice(0, 100);
  const message = String(body.message || '').slice(0, 2000);

  // Escape Markdown special characters so arbitrary user text can't break parsing
  const esc = (s) => s.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');

  const text =
    `🔔 NUEVO MENSAJE — mirixstudio.cr\n\n` +
    `👤 *${esc(name)}*\n` +
    `📧 ${esc(email)}\n` +
    `📱 ${esc(phone)}\n` +
    `🎯 ${esc(service)}\n\n` +
    `💬 ${esc(message)}\n\n` +
    `→ Revisa el panel admin del sitio`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    return new Response(`Telegram error: ${errText}`, { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};