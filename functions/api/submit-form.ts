export async function onRequestPost(context: { request: Request; env: { DISCORD_WEBHOOK_URL: string } }) {
  const { request, env } = context;
  const webhookUrl = env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return new Response(JSON.stringify({ error: "DISCORD_WEBHOOK_URL is not set in Cloudflare environment variables" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const payload = {
      content: "New Form Submission (Cloudflare)",
      embeds: [
        {
          title: "Form Data",
          color: 5814783, // Blurple
          fields: Object.entries(body).map(([key, value]) => ({
            name: key,
            value: String(value) || "N/A",
            inline: true,
          })),
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordResponse.ok) {
      return new Response(JSON.stringify({ error: `Discord API error: ${discordResponse.status}` }), {
        status: discordResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Cloudflare Function Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
