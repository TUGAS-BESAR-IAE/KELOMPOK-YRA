import React, { useEffect, useState } from "react";
// import axios from "axios";

function User() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/", {
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
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ marginLeft: 220, padding: 20 }}>
      <h2>User List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Transaction ID</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>No HP</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.transaction_id}</td>
              <td>{admin.nama}</td>
              <td>{admin.alamat}</td>
              <td>{admin.nohp}</td>
              <td>{admin.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
