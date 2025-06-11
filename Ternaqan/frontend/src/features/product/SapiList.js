import React, { useEffect, useState } from "react";
import "./product.css";

const API_URL = "http://localhost:8001/";

const SapiList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            products {
              id
              nama
              harga
              stok
              kategori
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h2 className="product-title">Sapi List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.nama}</td>
                  <td>{prod.harga}</td>
                  <td>{prod.stok}</td>
                  <td>{prod.kategori}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SapiList;
