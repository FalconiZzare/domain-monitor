import "dotenv/config";
import { notifyAll } from "../helpers/notify.js";
import { checkWhois } from "../helpers/whois.js";
import { checkRDAP } from "../helpers/rdap.js";

// ----------------------------
// MAIN TEST
// ----------------------------
async function testSystem() {
  const domain = process.env.TEST_DOMAIN;

  if (!domain) {
    console.error("❌ TEST_DOMAIN missing in .env");
    process.exit(1);
  }

  console.log(`Running test for domain: ${domain}`);
  console.log("-----------------------------------");

  const w = await checkWhois(domain);
  const d = await checkRDAP(domain);

  console.log("WHOIS available:", w);
  console.log("RDAP available:", d);

  if (w || d) {
    const msg =
      `✅ SYSTEM TEST PASSED\n` +
      `The test domain **${domain}** appears AVAILABLE.\n\n` +
      `WHOIS: ${w}\nDNS: ${d}\n\n` +
      `Your monitoring + notifications work correctly.`;

    await notifyAll(msg);
    console.log("Alerts sent.");
  } else {
    console.log("❌ Test failed — test domain reported NOT available.");
  }
}

testSystem();
