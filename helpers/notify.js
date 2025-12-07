import fetch from "node-fetch";

export async function notifyAll(message) {
  await Promise.all([sendTelegram(message), sendDiscord(message)]);
}

async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: "Hi, @FalconiZzare,\n" + message
    })
  });
}

async function sendDiscord(message) {
  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `Hi, <@405746136792694794>,\n${message}` })
  });
}
