const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbyscrQZeSCJMNDwTyflpLNbW3QfTMOX3IRRqoCgc3M5dEw4MxL0K-qb_WSg1-5fAiE0/exec";

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt, userData } = JSON.parse(event.body);

    // 1. Generar informe con Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const informe = data.content[0].text;

    // 2. Enviar correo al prospecto
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Warren Benavides <info@warrenbenavides.com>',
        to: [userData.correo],
        subject: `Su diagnóstico estratégico — ${userData.empresa}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; color: #1a1a1a;">
            <div style="background: #0a0a0a; padding: 40px; text-align: center; margin-bottom: 32px;">
              <p style="color: #c9a84c; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">Diagnóstico Estratégico</p>
              <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Warren Benavides</h1>
              <p style="color: #888; font-size: 13px; margin: 8px 0 0 0;">Consultor de Estrategia de Negocio</p>
            </div>

            <div style="padding: 0 24px;">
              <p style="font-size: 16px; line-height: 1.6;">Estimado/a <strong>${userData.nombre} ${userData.apellidos}</strong>,</p>
              <p style="font-size: 15px; line-height: 1.7; color: #444;">Aquí está su diagnóstico estratégico personalizado para <strong>${userData.empresa}</strong>.</p>

              <div style="background: #f9f9f9; border-left: 4px solid #c9a84c; padding: 24px 28px; margin: 28px 0; border-radius: 0 8px 8px 0;">
                <pre style="white-space: pre-wrap; font-family: Georgia, serif; font-size: 14px; line-height: 1.8; color: #1a1a1a; margin: 0;">${informe}</pre>
              </div>

              <div style="background: #0a0a0a; padding: 28px; border-radius: 8px; text-align: center; margin: 32px 0;">
                <p style="color: #ffffff; font-size: 17px; font-weight: bold; margin: 0 0 8px 0;">El siguiente paso es una conversación.</p>
                <p style="color: #888; font-size: 13px; margin: 0 0 20px 0;">Este diagnóstico es el punto de partida. La claridad estratégica real viene del trabajo conjunto.</p>
                <a href="https://wa.me/50688813232?text=Hola%20Warren%2C%20acabo%20de%20completar%20el%20diagnóstico%20estratégico." 
                   style="display: inline-block; background: #c9a84c; color: #000; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 15px;">
                  💬 Conversemos por WhatsApp
                </a>
              </div>

              <p style="font-size: 13px; color: #999; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                Warren Benavides · Consultor de Estrategia de Negocio<br>
                <a href="https://warrenbenavides.com" style="color: #c9a84c;">warrenbenavides.com</a>
              </p>
            </div>
          </div>
        `
      })
    });

    // 3. Enviar datos a Google Sheets
    await fetch(SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: userData.nombre + ' ' + userData.apellidos,
        empresa: userData.empresa,
        puesto: userData.puesto,
        pais: userData.pais,
        correo: userData.correo,
        whatsapp: userData.whatsapp,
        puntaje: userData.puntaje || '',
        r1: userData.r1 || '', r2: userData.r2 || '', r3: userData.r3 || '',
        r4: userData.r4 || '', r5: userData.r5 || '', r6: userData.r6 || '',
        r7: userData.r7 || '', r8: userData.r8 || '', r9: userData.r9 || '',
        r10: userData.r10 || ''
      })
    });

    // 4. Notificar a Warren (lead notification)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Diagnóstico nxt LVL <info@warrenbenavides.com>',
        to: ['info@warrenbenavides.com'],
        subject: `🎯 Nuevo lead nxt LVL — ${userData.nombre} ${userData.apellidos} (${userData.empresa})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0a0a0a; padding: 24px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #c9a84c; margin: 0; font-size: 18px;">🎯 Nuevo Lead — Diagnóstico Estratégico</h2>
            </div>
            <div style="background: #f5f5f5; padding: 24px; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 120px;">Nombre</td><td style="padding: 8px 0; font-weight: bold;">${userData.nombre} ${userData.apellidos}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Empresa</td><td style="padding: 8px 0; font-weight: bold;">${userData.empresa}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Puesto</td><td style="padding: 8px 0;">${userData.puesto}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Correo</td><td style="padding: 8px 0;"><a href="mailto:${userData.correo}">${userData.correo}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #666;">WhatsApp</td><td style="padding: 8px 0;"><a href="https://wa.me/${userData.whatsapp}">${userData.whatsapp}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #666;">País</td><td style="padding: 8px 0;">${userData.pais}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #fff; border-radius: 6px; border-left: 4px solid #c9a84c;">
                <p style="margin: 0; font-size: 13px; color: #444; font-weight: bold;">Informe generado:</p>
                <pre style="white-space: pre-wrap; font-size: 12px; color: #555; margin: 8px 0 0 0;">${informe}</pre>
              </div>
            </div>
          </div>
        `
      })
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: informe })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};