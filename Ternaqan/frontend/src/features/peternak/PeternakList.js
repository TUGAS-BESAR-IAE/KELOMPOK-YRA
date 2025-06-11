import React, { useEffect, useState } from "react";
import PeternakTable from "./PeternakTable";
import { useNavigate } from "react-router-dom";
import "./peternak.css";

const API_URL = "http://localhost:8002/";

function PeternakList() {
  const [peternaks, setPeternaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPeternaks = () => {
    setLoading(true);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            peternaks {
              id
              nama
              alamat
              nohp
              username
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPeternaks(result.data.peternaks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPeternaks();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus peternak ini?")) return;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            deletePeternak(id: ${id})
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchPeternaks());
  };

  return (
    <>
      <h2 className="peternak-title">Peternak List</h2>
      <button
        className="peternak-form-btn"
        style={{ maxWidth: 220, marginBottom: 24 }}
        onClick={() => navigate("/peternak/create")}
      >
        + Tambah Peternak
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="peternak-table-container">
          <PeternakTable peternaks={peternaks} onDelete={handleDelete} />
        </div>
      )}
    </>
  );
}

export default PeternakList;
