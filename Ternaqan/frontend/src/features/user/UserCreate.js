import React from "react";
import UserForm from "./UserForm";
import "./user.css"

const API_URL = "http://localhost:8000/";

function UserCreate() {
  const handleSubmit = (data) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateAdmin($transaction_id: Int, $nama: String!, $alamat: String, $nohp: String, $username: String!) {
            createAdmin(transaction_id: $transaction_id, nama: $nama, alamat: $alamat, nohp: $nohp, username: $username) {
              id
            }
          }
        `,
        variables: {
          ...data,
          transaction_id: Number(data.transaction_id) || null,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/user/list";
      });
  };

  return (
    <div style={{ marginLeft: 320, padding: 20 }}>
      <h2>Create Admin</h2>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserCreate;