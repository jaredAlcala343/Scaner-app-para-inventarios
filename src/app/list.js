"use client";
import React, { useState, useEffect } from 'react';
import Products from "../../pages/products";

export default function List() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch('/api/data'); 

                if (!res.ok) {
                    throw new Error('No conecta con data.js mec');
                }

                const data = await res.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <Products products={products} />
        </div>
    );
}
