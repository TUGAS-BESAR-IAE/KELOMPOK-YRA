import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Product from "./features/product/Product";
import Transactions from "./features/transactions/Transactions";
import UserList from "./features/user/UserList";
import UserCreate from "./features/user/UserCreate";
import Dashboard from "./features/dashboard";
import UserEdit from "./features/user/UserEdit";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
