import React, { useState, useEffect } from "react";

function UserForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    transaction_id: "",
    nama: "",
    alamat: "",
    nohp: "",
    username: "",
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
      transaction_id: "",
      nama: "",
      alamat: "",
      nohp: "",
      username: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 20,
        background: "#f9f9f9",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <input
          name="transaction_id"
          placeholder="Transaction ID"
          value={form.transaction_id}
          onChange={handleChange}
          style={{ flex: 1 }}
          type="number"
        />
        <input
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          style={{ flex: 2 }}
          required
        />
        <input
          name="alamat"
          placeholder="Alamat"
          value={form.alamat}
          onChange={handleChange}
          style={{ flex: 2 }}
        />
        <input
          name="nohp"
          placeholder="No HP"
          value={form.nohp}
          onChange={handleChange}
          style={{ flex: 2 }}
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{ flex: 2 }}
          required
        />
        <button
          type="submit"
          style={{
            flex: 1,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
          }}
        >
          {initialData ? "Update" : "Create"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              background: "#aaa",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
