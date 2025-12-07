export async function checkRDAP(domain) {
  const rdapUrl = `https://rdap.org/domain/${domain}`;

  try {
    const response = await fetch(rdapUrl);

    if (response.status === 404) {
      return true; // 404 typically means the domain is not found (Available)
    } else if (response.status === 200) {
      return false; // 200 OK means we found the registration (Taken)
    } else {
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.error("RDAP Error:", error);
    return null;
  }
}
