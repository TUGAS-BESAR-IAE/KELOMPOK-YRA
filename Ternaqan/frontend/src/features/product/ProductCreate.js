import React from "react";
import ProductForm from "./ProductForm";
import "./product.css";

const API_URL = "http://localhost:8001/";

function ProductCreate() {
  const handleSubmit = (data) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateProduct($nama: String!, $harga: Int!, $stok: Int!, $kategori: String!) {
            createProduct(nama: $nama, harga: $harga, stok: $stok, kategori: $kategori) {
              id
            }
          }
        `,
        variables: {
          ...data,
          harga: Number(data.harga),
          stok: Number(data.stok),
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/product";
      });
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Create Product</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ProductCreate;
