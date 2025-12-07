import * as whoiser from "whoiser";

export async function checkWhois(domain) {
  const whoisData = await whoiser.whoisDomain(domain, { follow: 1 });
  const firstServerKey = Object.keys(whoisData)[0];
  const severData = whoisData[firstServerKey];

  const rawText = JSON.stringify(severData).toLowerCase();

  const availabilityPatterns = [
    "no match for",
    "not found",
    "no data found",
    "has not been registered",
    "is available",
    "status: free",
    "no entries found"
  ];

  return availabilityPatterns.some((pattern) => rawText.includes(pattern));
}
