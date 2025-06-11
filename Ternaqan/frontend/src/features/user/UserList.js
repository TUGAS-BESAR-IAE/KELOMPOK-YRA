import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

const API_URL = "http://localhost:8000/";

function UserList({ onEdit }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = () => {
    setLoading(true);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            admins {
              id
              transaction_id
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
        setAdmins(result.data.admins);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            deleteAdmin(id: ${id})
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchAdmins());
  };

  // EDIT
  const handleEdit = (admin) => {
    if (onEdit) onEdit(admin);
  };

  return (
    <div className="userlist-container">
      <h2 className="userlist-title">User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="userlist-table-container">
          <UserTable
            admins={admins}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default UserList;
