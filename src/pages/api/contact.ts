import type { APIRoute } from 'astro';
import { getBrevoConfig, readFileFromRepo, writeFileToRepo } from '../../plugins/_server';
import { sendTransactionalEmail } from '../../plugins/email-list/brevo-api';

export const prerender = false;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const POST: APIRoute = async ({ request }) => {
  const json = (data: any, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  try {
    const body = await request.json().catch(() => null);
    if (!body) return json({ error: 'Body inválido.' }, 400);

    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const subject = (body.subject || '').trim();
    const message = (body.message || '').trim();

    if (!name) return json({ error: 'Nome é obrigatório.' }, 400);
    if (!email) return json({ error: 'Email é obrigatório.' }, 400);
    if (!isValidEmail(email)) return json({ error: 'Email inválido.' }, 400);
    if (!message) return json({ error: 'Mensagem é obrigatória.' }, 400);

    // Persists message to contactMessages.json
    const raw = await readFileFromRepo('src/data/contactMessages.json');
    let messages: any[] = [];
    try {
      messages = raw ? JSON.parse(raw) : [];
    } catch {
      messages = [];
    }

    const newMsg = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    };
    messages.push(newMsg);

    await writeFileToRepo(
      'src/data/contactMessages.json',
      JSON.stringify(messages, null, 2),
      { message: `Contact form: ${name} <${email}>` }
    ).catch(() => null);

    // Try sending notification email via Brevo if fully configured
    const brevo = getBrevoConfig();
    if (brevo.brevoApiKey && brevo.senderEmail && brevo.notificationEmail) {
      sendTransactionalEmail(
        brevo.brevoApiKey,
        brevo.notificationEmail,
        `[Portfolio] ${subject || 'Nova mensagem de contato'} - ${name}`,
        `<h2>Nova mensagem de contato</h2>
         <p><strong>Nome:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Assunto:</strong> ${subject || '(sem assunto)'}</p>
         <hr>
         <p>${message.replace(/\n/g, '<br>')}</p>`,
        brevo.senderEmail,
        brevo.senderName || 'Portfolio'
      ).catch(() => null);
    }

    return json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
    });
  } catch (err: any) {
    return json({ error: err.message || 'Erro interno.' }, 500);
  }
};
