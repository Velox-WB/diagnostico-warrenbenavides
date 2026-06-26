const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyscrQZeSCJMNDwTyflpLNbW3QfTMOX3IRRqoCgc3M5dEw4MxL0K-qb_WSg1-5fAiE0/exec';
const RESEND_API = 'https://api.resend.com/emails';
const FROM_EMAIL = 'Diagnóstico Estratégico <info@warrenbenavides.com>';
const WARREN_EMAIL = 'info@warrenbenavides.com';

// ── PLANTILLA: correo a Warren (nuevo lead) ──────────────────────────────────
function emailWarren({ nombre, apellidos, empresa, puesto, pais, correo, whatsapp, puntaje, diagnosticoHtml }) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}
  .outer{padding:40px 16px}
  .shell{max-width:600px;margin:0 auto;background:#fff;border-radius:4px;overflow:hidden}
  .hdr{background:#111;padding:36px 40px;text-align:center}
  .hdr-ey{font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#666;margin-bottom:10px}
  .hdr-name{font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.02em;margin-bottom:4px}
  .hdr-role{font-size:13px;color:#666}
  .section-label{font-size:9px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#999;margin-bottom:18px}
  .body-pad{padding:36px 40px}
  .lead-label{font-size:9px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#999;margin-bottom:18px}
  .data-table{width:100%;border-collapse:collapse;margin-bottom:32px}
  .data-table td{padding:12px 16px;font-size:13px;border-bottom:1px solid #f0f0f0;vertical-align:top}
  .data-table td:first-child{color:#999;width:120px;font-size:12px}
  .data-table td:last-child{color:#111;font-weight:600}
  .score-box{background:#f8f8f8;border-radius:6px;padding:24px;text-align:center;margin-bottom:32px}
  .score-label{font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:8px}
  .score-num{font-size:42px;font-weight:800;color:#111;letter-spacing:-0.04em;line-height:1}
  .score-sub{font-size:11px;color:#999;margin-top:6px}
  .diag-section{border-top:1px solid #f0f0f0;padding-top:28px}
  .diag-section h3{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#999;margin:20px 0 10px}
  .diag-section h3:first-child{margin-top:0}
  .diag-section p{font-size:13px;color:#444;line-height:1.8;margin-bottom:12px}
  .diag-section ul{padding-left:18px;margin-bottom:12px}
  .diag-section ul li{font-size:13px;color:#555;line-height:1.7;margin-bottom:6px}
  .diag-section strong{color:#111}
  .ftr{padding:24px 40px;text-align:center;border-top:1px solid #f0f0f0}
  .ftr p{font-size:11px;color:#bbb;margin:0}
</style>
</head>
<body><div class="outer"><div class="shell">
  <div class="hdr">
    <div class="hdr-ey">Diagnóstico Estratégico</div>
    <div class="hdr-name">Warren Benavides</div>
    <div class="hdr-role">Consultor en Estrategia de Negocio</div>
  </div>
  <div class="body-pad">
    <div class="lead-label">Nuevo Lead del Diagnóstico</div>
    <div class="section-label">Datos del Prospecto</div>
    <table class="data-table">
      <tr><td>Nombre</td><td>${nombre} ${apellidos}</td></tr>
      <tr><td>Empresa</td><td>${empresa}</td></tr>
      <tr><td>Puesto</td><td>${puesto}</td></tr>
      <tr><td>País</td><td>${pais}</td></tr>
      <tr><td>Correo</td><td>${correo}</td></tr>
      <tr><td>WhatsApp</td><td>${whatsapp}</td></tr>
    </table>
    <div class="score-box">
      <div class="score-label">Índice de Madurez Estratégica</div>
      <div class="score-num">${puntaje}/40</div>
      <div class="score-sub">de 40 puntos posibles</div>
    </div>
    <div class="diag-section">
      <div class="section-label">Diagnóstico Generado</div>
      ${diagnosticoHtml}
    </div>
  </div>
  <div class="ftr"><p>Warren Benavides · Consultor en Estrategia de Negocio · warrenbenavides.com</p></div>
</div></div></body></html>`;
}

// ── PLANTILLA: correo al prospecto ───────────────────────────────────────────
function emailProspecto({ nombre, apellidos, empresa, puesto, pais, puntaje, diagnosticoHtml }) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}
  .outer{padding:40px 16px}
  .shell{max-width:600px;margin:0 auto;background:#fff;border-radius:4px;overflow:hidden}
  .hdr{background:#111;padding:36px 40px;text-align:center}
  .hdr-ey{font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#666;margin-bottom:10px}
  .hdr-name{font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.02em;margin-bottom:4px}
  .hdr-role{font-size:13px;color:#666}
  .body-pad{padding:36px 40px}
  .greeting{font-size:15px;color:#111;margin-bottom:6px}
  .greeting strong{font-weight:700}
  .intro{font-size:13px;color:#666;line-height:1.7;margin-bottom:28px}
  .intro strong{color:#111}
  .score-box{background:#f8f8f8;border-radius:6px;padding:24px;text-align:center;margin-bottom:32px}
  .score-label{font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:8px}
  .score-num{font-size:42px;font-weight:800;color:#111;letter-spacing:-0.04em;line-height:1}
  .score-sub{font-size:11px;color:#999;margin-top:6px}
  .divider{border:none;border-top:1px solid #f0f0f0;margin:0 0 28px}
  .section-label{font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:18px}
  .diag-section h3{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#999;margin:20px 0 10px}
  .diag-section h3:first-child{margin-top:0}
  .diag-section p{font-size:13px;color:#444;line-height:1.8;margin-bottom:12px}
  .diag-section ul{padding-left:18px;margin-bottom:12px}
  .diag-section ul li{font-size:13px;color:#555;line-height:1.7;margin-bottom:6px}
  .diag-section strong{color:#111}
  .cta-box{background:#111;border-radius:6px;padding:28px;text-align:center;margin-top:32px}
  .cta-h{font-size:16px;font-weight:800;color:#fff;margin-bottom:8px;letter-spacing:-0.01em}
  .cta-sub{font-size:12px;color:#666;margin-bottom:20px;line-height:1.6}
  .cta-btn{display:inline-block;background:#fff;color:#111;font-size:13px;font-weight:700;padding:14px 28px;border-radius:6px;text-decoration:none;letter-spacing:0.04em}
  .ftr{padding:24px 40px;text-align:center;border-top:1px solid #f0f0f0}
  .ftr p{font-size:11px;color:#bbb;margin:0}
</style>
</head>
<body><div class="outer"><div class="shell">
  <div class="hdr">
    <div class="hdr-ey">Diagnóstico Estratégico</div>
    <div class="hdr-name">Warren Benavides</div>
    <div class="hdr-role">Consultor en Estrategia de Negocio</div>
  </div>
  <div class="body-pad">
    <p class="greeting">Estimado/a <strong>${nombre} ${apellidos}</strong>,</p>
    <p class="intro">A continuación encontrará el análisis estratégico individualizado de su empresa <strong>${empresa}</strong>, generado a partir de sus respuestas.</p>
    <div class="score-box">
      <div class="score-label">Índice de Madurez Estratégica</div>
      <div class="score-num">${puntaje}/40</div>
      <div class="score-sub">de 40 puntos posibles</div>
    </div>
    <hr class="divider">
    <div class="section-label">Su Diagnóstico</div>
    <div class="diag-section">${diagnosticoHtml}</div>
    <div class="cta-box">
      <div class="cta-h">El siguiente paso es una conversación.</div>
      <p class="cta-sub">Este diagnóstico es el punto de partida.<br>La claridad estratégica real viene del trabajo conjunto.</p>
      <a class="cta-btn" href="https://wa.me/50688813232?text=Hola%20Warren%2C%20acabo%20de%20recibir%20mi%20diagn%C3%B3stico%20estrat%C3%A9gico.%20Soy%20${encodeURIComponent(nombre + ' ' + apellidos)}%2C%20${encodeURIComponent(puesto)}%20de%20${encodeURIComponent(empresa)}.%20Me%20interesa%20conversar%20sobre%20los%20resultados.">💬 Conversemos por WhatsApp</a>
    </div>
  </div>
  <div class="ftr"><p>Warren Benavides · Consultor en Estrategia de Negocio · warrenbenavides.com</p></div>
</div></div></body></html>`;
}

// ── HANDLER PRINCIPAL ────────────────────────────────────────────────────────
exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Headers CORS reutilizables
  const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // ── 1. Parse del body ──────────────────────────────────────────────────────
  let prompt, userData, answers, score;
  try {
    ({ prompt, userData, answers, score } = JSON.parse(event.body));
  } catch (err) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify({ error: 'Body inválido: ' + err.message })
    };
  }

  // ── 2. Llamada a Claude (CRÍTICA — si falla, se detiene todo) ──────────────
  let diagnosticoHtml;
  try {
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!aiRes.ok) {
      const errBody = await aiRes.text();
      throw new Error(`Claude API ${aiRes.status}: ${errBody}`);
    }

    const aiData = await aiRes.json();
// Si Claude devolvió un documento HTML completo, extraer solo el body
const bodyMatch = diagnosticoHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (bodyMatch) diagnosticoHtml = bodyMatch[1].trim();
console.error('[analyze] HTML primeros 300 chars:', diagnosticoHtml.substring(0, 300));
    if (!diagnosticoHtml) throw new Error('Claude devolvió contenido vacío');

  } catch (err) {
    // Si Claude falla, no hay nada que enviar — retornamos error claro
    return {
      statusCode: 502,
      headers: HEADERS,
      body: JSON.stringify({ error: 'Error generando diagnóstico: ' + err.message })
    };
  }

  // A partir de aquí, el diagnóstico existe.
  // Los pasos 3, 4 y 5 son independientes: un fallo en uno NO detiene los demás.
  const sideEffectErrors = [];

  // ── 3. Google Sheets (no bloqueante) ──────────────────────────────────────
  try {
    const sheetsPayload = {
      nombre: `${userData.nombre} ${userData.apellidos}`,
      empresa: userData.empresa,
      puesto: userData.puesto,
      pais: userData.pais,
      correo: userData.correo,
      whatsapp: userData.whatsapp,
      puntaje: `${score}/40`,
      r1: answers[0], r2: answers[1], r3: answers[2],
      r4: answers[3], r5: answers[4], r6: answers[5],
      r7: answers[6], r8: answers[7], r9: answers[8], r10: answers[9]
    };

    const sheetsRes = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetsPayload)
    });

    if (!sheetsRes.ok) {
      throw new Error(`Sheets HTTP ${sheetsRes.status}`);
    }
  } catch (err) {
    // Solo se loguea — no detiene el flujo
    sideEffectErrors.push('sheets: ' + err.message);
    console.error('[analyze] Google Sheets falló:', err.message);
  }

  // ── 4. Correo a Warren (no bloqueante) ────────────────────────────────────
  try {
    const warrenRes = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [WARREN_EMAIL],
        subject: `🎯 Nuevo Lead — Diagnóstico Estratégico — ${userData.nombre} ${userData.apellidos} (${userData.empresa})`,
        html: emailWarren({
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          empresa: userData.empresa,
          puesto: userData.puesto,
          pais: userData.pais,
          correo: userData.correo,
          whatsapp: userData.whatsapp,
          puntaje: score,
          diagnosticoHtml
        })
      })
    });

    if (!warrenRes.ok) {
      const errBody = await warrenRes.text();
      throw new Error(`Resend ${warrenRes.status}: ${errBody}`);
    }
  } catch (err) {
    sideEffectErrors.push('email-warren: ' + err.message);
    console.error('[analyze] Correo a Warren falló:', err.message);
  }

  // ── 5. Correo al prospecto (no bloqueante) ────────────────────────────────
  try {
    const prospectoRes = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [userData.correo],
        subject: `Su diagnóstico estratégico — ${userData.empresa}`,
        html: emailProspecto({
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          empresa: userData.empresa,
          puesto: userData.puesto,
          pais: userData.pais,
          puntaje: score,
          diagnosticoHtml
        })
      })
    });

    if (!prospectoRes.ok) {
      const errBody = await prospectoRes.text();
      throw new Error(`Resend ${prospectoRes.status}: ${errBody}`);
    }
  } catch (err) {
    sideEffectErrors.push('email-prospecto: ' + err.message);
    console.error('[analyze] Correo al prospecto falló:', err.message);
  }

  // ── 6. Respuesta final (siempre 200 si el diagnóstico existe) ─────────────
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({
      result: diagnosticoHtml,
      // En desarrollo útil para debug; en producción puedes quitar esta línea
      ...(sideEffectErrors.length > 0 && { warnings: sideEffectErrors })
    })
  };
};
