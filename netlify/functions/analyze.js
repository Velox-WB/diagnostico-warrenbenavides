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

    const estiloBase = `
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Manrope', Arial, sans-serif; background: #F5F5F5; color: #444444; }
    `;

    const headerHTML = `
      <div style="background: #111111; padding: 32px 40px; text-align: center;">
        <p style="color: #888888; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px; font-family: Manrope, Arial, sans-serif;">Diagnóstico Estratégico</p>
        <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; font-family: Manrope, Arial, sans-serif;">Warren Benavides</h1>
        <p style="color: #888888; font-size: 13px; margin-top: 6px; font-family: Manrope, Arial, sans-serif;">Consultor en Estrategia de Negocio</p>
      </div>
    `;

    const puntajeHTML = (puntaje) => `
      <div style="background: #FFFFFF; margin: 24px 0; padding: 32px; text-align: center; border: 1px solid #E0E0E0;">
        <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #888888; margin-bottom: 16px; font-family: Manrope, Arial, sans-serif;">Índice de Madurez Estratégica</p>
        <p style="font-size: 72px; font-weight: 800; color: #111111; line-height: 1; font-family: Manrope, Arial, sans-serif;">${puntaje}</p>
        <p style="font-size: 13px; color: #888888; margin-top: 8px; font-family: Manrope, Arial, sans-serif;">de 40 puntos posibles</p>
      </div>
    `;

    const footerHTML = `
      <div style="border-top: 1px solid #E0E0E0; margin-top: 40px; padding-top: 24px; text-align: center;">
        <p style="font-size: 12px; color: #888888; font-family: Manrope, Arial, sans-serif;">
          Warren Benavides · Consultor en Estrategia de Negocio<br>
          <a href="https://warrenbenavides.com" style="color: #111111; text-decoration: none;">warrenbenavides.com</a>
        </p>
      </div>
    `;

    // 2. Correo al prospecto
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
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><style>${estiloBase}</style></head>
          <body>
            <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF;">
              ${headerHTML}

              <div style="padding: 40px;">
                <!-- Saludo -->
                <p style="font-size: 15px; color: #444444; line-height: 1.6; margin-bottom: 8px; font-family: Manrope, Arial, sans-serif;">
                  Estimado/a <strong style="color: #111111;">${userData.nombre} ${userData.apellidos}</strong>,
                </p>
                <p style="font-size: 14px; color: #888888; line-height: 1.6; font-family: Manrope, Arial, sans-serif;">
                  A continuación encontrará el análisis estratégico individualizado de su empresa <strong style="color: #111111;">${userData.empresa}</strong>, generado a partir de sus respuestas.
                </p>

                <!-- Puntaje -->
                ${puntajeHTML(userData.puntaje || '')}

                <!-- Separador -->
                <div style="border-top: 2px solid #111111; margin: 32px 0 24px 0;"></div>

                <!-- Informe -->
                <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #888888; margin-bottom: 20px; font-family: Manrope, Arial, sans-serif;">Su Diagnóstico</p>
                <div style="font-size: 14px; color: #444444; line-height: 1.8; font-family: Manrope, Arial, sans-serif;">
                  ${informe.replace(/\n\n/g, '<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong style="color:#111111;">$1</strong>').replace(/<h3>(.*?)<\/h3>/g, '<p style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#888888;margin:28px 0 12px 0;font-family:Manrope,Arial,sans-serif;">$1</p>')}
                </div>

                <!-- CTA -->
                <div style="background: #111111; padding: 32px; text-align: center; margin-top: 40px;">
                  <p style="color: #FFFFFF; font-size: 17px; font-weight: 700; margin-bottom: 8px; font-family: Manrope, Arial, sans-serif;">El siguiente paso es una conversación.</p>
                  <p style="color: #888888; font-size: 13px; margin-bottom: 24px; font-family: Manrope, Arial, sans-serif;">Este diagnóstico es el punto de partida. La claridad estratégica real viene del trabajo conjunto.</p>
                  <a href="https://wa.me/50688813232?text=Hola%20Warren%2C%20acabo%20de%20completar%20el%20diagnóstico%20estratégico."
                     style="display: inline-block; background: #FFFFFF; color: #111111; padding: 14px 32px; font-weight: 700; font-size: 14px; text-decoration: none; letter-spacing: 0.5px; font-family: Manrope, Arial, sans-serif;">
                    💬 Conversemos por WhatsApp
                  </a>
                </div>

                ${footerHTML}
              </div>
            </div>
          </body>
          </html>
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

    // 4. Notificar a Warren
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Diagnóstico Estratégico <info@warrenbenavides.com>',
        to: ['info@warrenbenavides.com'],
        subject: `🎯 Nuevo Lead — Diagnóstico Estratégico — ${userData.nombre} ${userData.apellidos} (${userData.empresa})`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><style>${estiloBase}</style></head>
          <body>
            <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF;">
              ${headerHTML}

              <div style="padding: 40px;">
                <!-- Label -->
                <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #888888; margin-bottom: 20px; font-family: Manrope, Arial, sans-serif;">Nuevo Lead del Diagnóstico</p>

                <!-- Datos del prospecto -->
                <div style="background: #F5F5F5; border: 1px solid #E0E0E0; padding: 24px; margin-bottom: 24px;">
                  <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #888888; margin-bottom: 16px; font-family: Manrope, Arial, sans-serif;">Datos del Prospecto</p>
                  <table style="width: 100%; border-collapse: collapse; font-family: Manrope, Arial, sans-serif;">
                    <tr><td style="padding: 8px 0; color: #888888; font-size: 13px; width: 120px;">Nombre</td><td style="padding: 8px 0; font-weight: 700; color: #111111; font-size: 13px;">${userData.nombre} ${userData.apellidos}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888888; font-size: 13px; border-top: 1px solid #E0E0E0;">Empresa</td><td style="padding: 8px 0; font-weight: 700; color: #111111; font-size: 13px; border-top: 1px solid #E0E0E0;">${userData.empresa}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888888; font-size: 13px; border-top: 1px solid #E0E0E0;">Puesto</td><td style="padding: 8px 0; color: #444444; font-size: 13px; border-top: 1px solid #E0E0E0;">${userData.puesto}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888888; font-size: 13px; border-top: 1px solid #E0E0E0;">País</td><td style="padding: 8px 0; color: #444444; font-size: 13px; border-top: 1px solid #E0E0E0;">${userData.pais}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888888; font-size: 13px; border-top: 1px solid #E0E0E0;">Correo</td><td style="padding: 8px 0; font-size: 13px; border-top: 1px solid #E0E0E0;"><a href="mailto:${userData.correo}" style="color: #111111;">${userData.correo}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #888888; font-size: 13px; border-top: 1px solid #E0E0E0;">WhatsApp</td><td style="padding: 8px 0; font-size: 13px; border-top: 1px solid #E0E0E0;"><a href="https://wa.me/${userData.whatsapp}" style="color: #111111;">${userData.whatsapp}</a></td></tr>
                  </table>
                </div>

                <!-- Puntaje -->
                ${puntajeHTML(userData.puntaje || '')}

                <!-- Separador -->
                <div style="border-top: 2px solid #111111; margin: 32px 0 24px 0;"></div>

                <!-- Informe -->
                <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #888888; margin-bottom: 20px; font-family: Manrope, Arial, sans-serif;">Diagnóstico Generado</p>
                <div style="font-size: 13px; color: #444444; line-height: 1.8; font-family: Manrope, Arial, sans-serif;">
                  ${informe.replace(/\n\n/g, '<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong style="color:#111111;">$1</strong>').replace(/<h3>(.*?)<\/h3>/g, '<p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#888888;margin:24px 0 10px 0;font-family:Manrope,Arial,sans-serif;">$1</p>')}
                </div>

                ${footerHTML}
              </div>
            </div>
          </body>
          </html>
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