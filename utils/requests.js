const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties() {
  try {

    // Handle in case the domain is not available yet
    if (!apiDomain) {
        return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.log("Error fetching properties: ", error);
    return [];
  }
}

export { fetchProperties };