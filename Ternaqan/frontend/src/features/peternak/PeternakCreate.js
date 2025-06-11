import React from "react";
import PeternakForm from "./PeternakForm";
import "./peternak.css";

const API_URL = "http://localhost:8002/";

function PeternakCreate() {
  const handleSubmit = (data) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreatePeternak($nama: String!, $alamat: String, $nohp: String, $username: String!) {
            createPeternak(nama: $nama, alamat: $alamat, nohp: $nohp, username: $username) {
              id
            }
          }
        `,
        variables: { ...data },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/peternak";
      });
  };

  return (
    <div className="peternak-container">
      <h2 className="peternak-title">Create Peternak</h2>
      <PeternakForm onSubmit={handleSubmit} />
    </div>
  );
}

export default PeternakCreate;
