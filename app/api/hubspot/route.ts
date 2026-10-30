import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const portalId = process.env.HUBSPOT_PORTAL_ID; 
    const formGuid = process.env.HUBSPOT_FORM_GUID;

    if (!portalId || !formGuid) {
      return NextResponse.json(
        { error: 'Faltan HUBSPOT_PORTAL_ID o HUBSPOT_FORM_GUID en .env.local (reinicia npm run dev)' },
        { status: 500 }
      );
    }

    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const themesString = Array.isArray(data.themes) ? data.themes.join(", ") : (data.themes || "");
    const formattedDate = data.date && data.date !== "Por coordinar" ? data.date.split("T")[0] : "";

    const baseFields = [
      { name: "firstname", value: data.name || "" },
      { name: "lastname", value: data.lastname || "" },
      { name: "email", value: data.email || "" },
      { name: "phone", value: data.phone || "" },
      { name: "company", value: data.company || "" },
      { name: "jobtitle", value: data.jobtitle || data.jobTitle || "" },
    ].filter(field => field.value !== "");

    const customFields = [
      { name: "message", value: data.comment || "" },
      { name: "tema_de_interes", value: themesString },
      { name: "fecha_de_la_cita", value: formattedDate },
      { name: "hora_de_la_cita", value: data.time || "" }
    ].filter(field => field.value !== "");

    let response = await fetch(hubspotUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: [...baseFields, ...customFields] })
    });

    let result = await response.json();

    // Respaldo si falla por alguna propiedad personalizada
    if (!response.ok) {
      console.warn('Reintentando con respaldo. Motivo:', result);

      const fallbackMessage = [
        data.comment ? `Comentario: ${data.comment}` : "",
        formattedDate ? `Fecha solicitada: ${formattedDate}` : "",
        data.time ? `Hora solicitada: ${data.time}` : "",
        themesString ? `Temas: ${themesString}` : ""
      ].filter(Boolean).join(" | ");

      const fallbackFields = [...baseFields];
      if (fallbackMessage) {
        fallbackFields.push({ name: "message", value: fallbackMessage });
      }

      response = await fetch(hubspotUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: fallbackFields })
      });

      result = await response.json();
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: result?.message || 'Fallo al enviar a HubSpot', details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: 'Datos enviados con éxito' });

  } catch (error) {
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}