import { parse } from "cookie";

export async function onRequest({ request, env }) {console.log('user 1');
  const url = new URL(request.url);
  const cookie = parse(request.headers.get("Cookie") || "");
  const sessionID = cookie['session']

  if (!sessionID) {
    return new Response("Session ID not provided", { status: 400 });
  }console.log('user 3');

  const { token } = await env.SESSIONS.get(sessionID, 'json')

  try {
    // Fetch guild details from Discord using the access token
    let guildResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });console.log('user 4');
    guildResponse = await guildResponse.json()

    guildResponse = guildResponse.filter(guild => (guild.permissions & 1 << 3) === 1 << 3)
    console.log('user 5');

    const guild_id = url.searchParams.get('guild_id');
    if(guild_id && guildResponse.some(guild => guild.id === guild_id)) {
      let specificGuildResponse = await fetch(`https://discord.com/api/guilds/${guild_id}`, {
        headers: {
          Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
        },
      });
      specificGuildResponse = await specificGuildResponse.json()

      //return specific guild to frontend
      return new Response(JSON.stringify(specificGuildResponse), {
        headers: { 'Content-Type': 'application/json' },
        status: specificGuildResponse.status
      });
    }
    
    // Return guild list to frontend
    return new Response(JSON.stringify(guildResponse), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(`Error fetching user data: ${error.message}`, { status: 500 });
  }
}