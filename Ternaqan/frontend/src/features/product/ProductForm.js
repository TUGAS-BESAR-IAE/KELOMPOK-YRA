import React, { useState, useEffect } from "react";
import "./product.css";

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
    kategori: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      nama: "",
      harga: "",
      stok: "",
      kategori: "",
    });
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="product-form-fields">
          <input
            name="nama"
            placeholder="Nama Produk"
            value={form.nama}
            onChange={handleChange}
            className="product-form-input"
            required
          />
          <input
            name="harga"
            placeholder="Harga"
            value={form.harga}
            onChange={handleChange}
            className="product-form-input"
            type="number"
            required
          />
          <input
            name="stok"
            placeholder="Stok"
            value={form.stok}
            onChange={handleChange}
            className="product-form-input"
            type="number"
            required
          />
          <input
            name="kategori"
            placeholder="Kategori"
            value={form.kategori}
            onChange={handleChange}
            className="product-form-input"
            required
          />
          <button className="product-form-btn" type="submit">
            {initialData ? "Update" : "Create"}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="product-form-btn cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
