import React from "react";
import ProductForm from "./ProductForm";
import Swal from "sweetalert2";
import "./product.css";

const API_URL = "http://localhost:8001/";

function ProductCreate() {
  const handleSubmit = (data) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateSapi($umur: Int, $berat: Float!, $stok: Int!, $harga: Float!) {
            createSapi(umur: $umur, berat: $berat, stok: $stok, harga: $harga) {
              id
            }
          }
        `,
        variables: {
          umur: Number(data.umur),
          berat: Number(data.berat),
          stok: Number(data.stok),
          harga: Number(data.harga),
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data && result.data.createSapi) {
          Swal.fire(
            "Berhasil!",
            "Data sapi berhasil ditambahkan.",
            "success"
          ).then(() => {
            window.location.href = "/product";
          });
        } else {
          Swal.fire("Gagal!", "Gagal menambah sapi.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menambah.", "error");
      });
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Tambah Sapi</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ProductCreate;
