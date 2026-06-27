const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyscrQZeSCJMNDwTyflpLNbW3QfTMOX3IRRqoCgc3M5dEw4MxL0K-qb_WSg1-5fAiE0/exec';
const RESEND_API = 'https://api.resend.com/emails';
const FROM_EMAIL = 'Diagnóstico Estratégico <info@warrenbenavides.com>';
const WARREN_EMAIL = 'info@warrenbenavides.com';

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

function emailProspecto({ nombre, apellidos, empresa, puntaje, diagnosticoHtml }) {
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
  .diag-section p{font-size:13px;color:#444;line-height:1.8;margin-bottom:12px}
  .diag-section ul{padding-left:18px;margin-bottom:12px}
  .diag-section ul li{font-size:13px;color:#555;line-height:1.7;margin-bottom:6px}
  .diag-section strong{color:#111}
  .cta-box{background:#111;border-radius:6px;padding:28px;text-align:center;margin-top:32px}
  .cta-h{font-size:16px;font-weight:800;color:#fff;margin-bottom:8px}
  .cta-sub{font-size:12px;color:#666;margin-bottom:20px;line-height:1.6}
  .cta-btn{display:inline-block;background:#fff;color:#111;font-size:13px;font-weight:700;padding:14px 28px;border-radius:6px;text-decoration:none}
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
    <p class="intro">A continuación encontrará el análisis estratégico de su empresa <strong>${empresa}</strong>.</p>
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
      <p class="cta-sub">Este diagnóstico es el punto de partida.</p>
      <a class="cta-btn" href="https://wa.me/50688813232">💬 Conversemos por WhatsApp</a>
    </div>
  </div>
  <div class="ftr"><p>Warren Benavides · Consultor en Estrategia de Negocio · warrenbenavides.com</p></div>
</div></div></body></html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, userData, answers, score } = req.body;

  // ── 1. Llamada a Claude ────────────────────────────────────────────────────
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
        max_tokens: 2000,
        system: `Eres Warren Benavides, Consultor en Estrategia de Negocio. 

REGLAS ABSOLUTAS — sin excepción:
1. Responde ÚNICAMENTE con fragmentos HTML usando solo estas etiquetas: <h3>, <p>, <ul>, <li>, <strong>. NUNCA incluyas <!DOCTYPE>, <html>, <head>, <body>, <style>, ni bloques de código markdown.
2. USA SIEMPRE "usted" para dirigirte al prospecto. NUNCA uses "tú", "tu", "tienes", "eres", "estás", "puedes", "haces". Usa: "usted", "su", "sus", "tiene", "es", "está", "puede", "hace".
3. Completa SIEMPRE las 5 secciones completas: Resumen Ejecutivo, Brechas Estratégicas Identificadas, Áreas de Oportunidad, Recomendaciones Prioritarias, Próximo Paso.
4. En Recomendaciones Prioritarias incluye EXACTAMENTE 3 recomendaciones completas, numeradas del 1 al 3. Cada una con título en <strong> y explicación en el mismo <li>. No cortes ni omitas ninguna.
5. Tono: ejecutivo, directo, honesto. Sin lenguaje corporativo ni frases vacías.`,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!aiRes.ok) {
      const errBody = await aiRes.text();
      throw new Error(`Claude API ${aiRes.status}: ${errBody}`);
    }

    const aiData = await aiRes.json();
    let raw = aiData.content[0].text;

    raw = raw.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    if (raw.toLowerCase().includes('<body')) {
      const idx = raw.toLowerCase().indexOf('<body');
      const closeTag = raw.indexOf('>', idx);
      if (closeTag !== -1) {
        raw = raw.substring(closeTag + 1).replace(/<\/body>/gi, '').replace(/<\/html>/gi, '').trim();
      }
    }

    diagnosticoHtml = raw;
    if (!diagnosticoHtml) throw new Error('Claude devolvió contenido vacío');

  } catch (err) {
    return res.status(502).json({ error: 'Error generando diagnóstico: ' + err.message });
  }

  const sideEffectErrors = [];

  // ── 2. Google Sheets ───────────────────────────────────────────────────────
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: `${userData.nombre} ${userData.apellidos}`,
        empresa: userData.empresa, puesto: userData.puesto,
        pais: userData.pais, correo: userData.correo,
        whatsapp: userData.whatsapp, puntaje: `${score}/40`,
        r1: answers[0], r2: answers[1], r3: answers[2],
        r4: answers[3], r5: answers[4], r6: answers[5],
        r7: answers[6], r8: answers[7], r9: answers[8], r10: answers[9]
      })
    });
  } catch (err) {
    sideEffectErrors.push('sheets: ' + err.message);
  }

  // ── 3. Correo a Warren ─────────────────────────────────────────────────────
  try {
    await fetch(RESEND_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_EMAIL, to: [WARREN_EMAIL],
        subject: `🎯 Nuevo Lead — ${userData.nombre} ${userData.apellidos} (${userData.empresa})`,
        html: emailWarren({ ...userData, puntaje: score, diagnosticoHtml })
      })
    });
  } catch (err) {
    sideEffectErrors.push('email-warren: ' + err.message);
  }

  // ── 4. Correo al prospecto ─────────────────────────────────────────────────
  try {
    await fetch(RESEND_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_EMAIL, to: [userData.correo],
        subject: `Su diagnóstico estratégico — ${userData.empresa}`,
        html: emailProspecto({ ...userData, puntaje: score, diagnosticoHtml })
      })
    });
  } catch (err) {
    sideEffectErrors.push('email-prospecto: ' + err.message);
  }

  return res.status(200).json({
    result: diagnosticoHtml,
    ...(sideEffectErrors.length > 0 && { warnings: sideEffectErrors })
  });
}
