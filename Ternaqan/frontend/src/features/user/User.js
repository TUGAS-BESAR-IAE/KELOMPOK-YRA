import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const API_URL = "http://localhost:8000/";

function User() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

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

  // CREATE or UPDATE
  const handleSubmit = (data) => {
    const isEdit = !!editData;
    const mutation = isEdit
      ? `
        mutation UpdateAdmin($id: Int!, $transaction_id: Int, $nama: String, $alamat: String, $nohp: String, $username: String) {
          updateAdmin(id: $id, transaction_id: $transaction_id, nama: $nama, alamat: $alamat, nohp: $nohp, username: $username) {
            id
          }
        }
      `
      : `
        mutation CreateAdmin($transaction_id: Int, $nama: String!, $alamat: String, $nohp: String, $username: String!) {
          createAdmin(transaction_id: $transaction_id, nama: $nama, alamat: $alamat, nohp: $nohp, username: $username) {
            id
          }
        }
      `;
    const variables = isEdit
      ? {
          ...data,
          id: editData.id,
          transaction_id: Number(data.transaction_id) || null,
        }
      : { ...data, transaction_id: Number(data.transaction_id) || null };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchAdmins();
        setEditData(null);
      });
  };

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
    setEditData(admin);
  };

  const handleCancel = () => setEditData(null);

  return (
    <div style={{ marginLeft: 220, padding: 20 }}>
      <h2>User List</h2>
      <UserForm
        onSubmit={handleSubmit}
        initialData={editData}
        onCancel={handleCancel}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserTable
          admins={admins}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default User;

// function User() {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/admins")
//       .then((res) => {
//         setAdmins(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ marginLeft: 220, padding: 20 }}>
//       <h2>User List</h2>
//       <table border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Transaction ID</th>
//             <th>Nama</th>
//             <th>Alamat</th>
//             <th>No HP</th>
//             <th>Username</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admins.map((admin) => (
//             <tr key={admin.id}>
//               <td>{admin.id}</td>
//               <td>{admin.transaction_id}</td>
//               <td>{admin.nama}</td>
//               <td>{admin.alamat}</td>
//               <td>{admin.nohp}</td>
//               <td>{admin.username}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default User;
