// One-time helper: gets a Spotify refresh token for the /info ticker.
//
// 1. Create an app at https://developer.spotify.com/dashboard
//    Redirect URI: http://127.0.0.1:8888/callback  (Spotify rejects "localhost")
//    API: Web API
// 2. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
// 3. node --env-file=.env.local scripts/spotify-token.mjs
//    Approve in the browser; the refresh token prints here.
// 4. Add all three SPOTIFY_* vars to .env.local and to Vercel
//    (Project → Settings → Environment Variables), then redeploy.

import http from "node:http";
import { exec } from "node:child_process";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local");
  process.exit(1);
}

const REDIRECT = "http://127.0.0.1:8888/callback";
const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: id,
    response_type: "code",
    redirect_uri: REDIRECT,
    scope: "user-read-recently-played user-top-read user-read-currently-playing",
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  if (url.pathname !== "/callback") return res.end();
  const code = url.searchParams.get("code");
  if (!code) {
    res.end("No code — authorization was denied.");
    return server.close();
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  });
  const data = await tokenRes.json();

  if (data.refresh_token) {
    console.log(`\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    res.end("Done — copy the refresh token from your terminal.");
  } else {
    console.error(data);
    res.end("Token exchange failed — see terminal.");
  }
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log(`Opening ${authUrl}`);
  exec(`open "${authUrl}"`);
});
