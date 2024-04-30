const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case when the domain is not available yet
    if (!apiDomain) {
        return [];
    }

    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// Fetch a single property
async function fetchProperty(id) {
  try {
    // Handle the case when the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.log("Error fetching property: ", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };