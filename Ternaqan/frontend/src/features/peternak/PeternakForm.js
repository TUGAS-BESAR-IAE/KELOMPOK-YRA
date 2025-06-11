import React, { useState, useEffect } from "react";
import "./peternak.css";

function PeternakForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
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
      nama: "",
      alamat: "",
      nohp: "",
      username: "",
    });
  };

  return (
    <div className="peternak-form-container">
      <form onSubmit={handleSubmit} className="peternak-form">
        <div className="peternak-form-fields">
          <input
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="peternak-form-input"
            required
          />
          <input
            name="alamat"
            placeholder="Alamat"
            value={form.alamat}
            onChange={handleChange}
            className="peternak-form-input"
          />
          <input
            name="nohp"
            placeholder="No HP"
            value={form.nohp}
            onChange={handleChange}
            className="peternak-form-input"
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="peternak-form-input"
            required
          />
          <button className="peternak-form-btn" type="submit">
            {initialData ? "Update" : "Create"}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="peternak-form-btn cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PeternakForm;
