"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";

export default function Property() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }

    
  }, [id, property]);


  return <h1>Property</h1>;
}
