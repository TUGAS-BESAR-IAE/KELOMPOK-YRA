import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useParams, useNavigate } from "react-router-dom";
import "./product.css";

const API_URL = "http://localhost:8000/";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetProduct($id: Int!) {
            product(id: $id) {
              id
              nama
              harga
              stok
              kategori
            }
          }
        `,
        variables: { id: Number(id) },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setInitialData(result.data.product);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (data) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation UpdateProduct($id: Int!, $nama: String, $harga: Int, $stok: Int, $kategori: String) {
            updateProduct(id: $id, nama: $nama, harga: $harga, stok: $stok, kategori: $kategori) {
              id
            }
          }
        `,
        variables: {
          ...data,
          id: Number(id),
          harga: Number(data.harga),
          stok: Number(data.stok),
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/product");
      });
  };

  if (loading)
    return <div style={{ marginLeft: 320, padding: 20 }}>Loading...</div>;
  if (!initialData)
    return <div style={{ marginLeft: 320, padding: 20 }}>Product not found</div>;

  return (
    <div className="product-container">
      <h2 className="product-title">Edit Product</h2>
      <ProductForm
        onSubmit={handleSubmit}
        initialData={initialData}
        onCancel={() => navigate("/product")}
      />
    </div>
  );
}

export default ProductEdit;