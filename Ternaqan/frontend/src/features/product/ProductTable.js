import React from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";

function ProductTable({ products, onDelete }) {
  const navigate = useNavigate();

  return (
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
            <td>
              <button
                onClick={() => navigate(`/product/edit/${prod.id}`)}
                className="product-action-btn edit"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(prod.id)}
                className="product-action-btn delete"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;