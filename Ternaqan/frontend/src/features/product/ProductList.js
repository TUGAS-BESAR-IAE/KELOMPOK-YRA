import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { useNavigate } from "react-router-dom";
import "./product.css";

const API_URL = "http://localhost:8001/";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            deleteProduct(id: ${id})
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchProducts());
  };

  return (
    <>
      <h2 className="product-title">Sapi List</h2>
      <button
        className="product-form-btn"
        style={{ maxWidth: 220, marginBottom: 24 }}
        onClick={() => navigate("/product/create")}
      >
        + Tambah Sapi
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-table-container">
          <ProductTable products={products} onDelete={handleDelete} />
        </div>
      )}
    </>
  );
}

export default ProductList;