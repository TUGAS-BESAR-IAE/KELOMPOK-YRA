function createAdmin(data) {
  return fetch("http://localhost:8000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation CreateAdmin($transaction_id: Int, $nama: String!, $alamat: String, $nohp: String, $username: String!) {
          createAdmin(transaction_id: $transaction_id, nama: $nama, alamat: $alamat, nohp: $nohp, username: $username) {
            id
            nama
            username
          }
        }
      `,
      variables: data,
    }),
  }).then((res) => res.json());
}

// Contoh pemakaian:
createAdmin({
  transaction_id: 1,
  nama: "Admin Baru",
  alamat: "Jl. Baru",
  nohp: "081234567899",
  username: "adminbaru",
}).then((result) => {
  // result.data.createAdmin berisi data admin baru
});
