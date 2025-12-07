import "dotenv/config";
import { checkWhois } from "./helpers/whois.js";
import { checkRDAP } from "./helpers/rdap.js";
import { notifyAll } from "./helpers/notify.js";

const domain = process.env.DOMAIN;
const maxRetries = parseInt(process.env.MAX_RETRIES) || 3;
const retryDelay = parseInt(process.env.RETRY_DELAY_MS) || 30000;

async function checkWithRetry(fn, label) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`${label} retry ${i + 1}/${maxRetries}`);
      await new Promise((r) => setTimeout(r, retryDelay));
    }
  }
  return false;
}

async function runCheck() {
  console.log(`\n[${new Date().toISOString()}] Checking ${domain} ...`);

  const whoisAvailable = await checkWithRetry(() => checkWhois(domain), "WHOIS");
  const rdapAvailable = await checkWithRetry(() => checkRDAP(domain), "RDAP");

  if (whoisAvailable || rdapAvailable) {
    const message =
      `🎉 Domain AVAILABLE: ${domain}\n` + `WHOIS: ${whoisAvailable}\nRDAP: ${rdapAvailable}`;
    console.log(message);
    await notifyAll(message);
  } else {
    console.log("Not available yet.");
  }
}

// Run every hour
setInterval(runCheck, 60 * 60 * 1000);
runCheck(); // run immediately on startup
