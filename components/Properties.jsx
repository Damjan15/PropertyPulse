"use client";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`/api/properties`);

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await res.json();
                setProperties(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProperties();
    }, [])
  return (
    <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Browse Properties</h1>
            {properties.length === 0 ? (
                <p>No properties found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <PropertyCard property={property} key={index} />
                    ))}
                </div>
            )}
        </div>
    </section>
  )
}

export default Properties