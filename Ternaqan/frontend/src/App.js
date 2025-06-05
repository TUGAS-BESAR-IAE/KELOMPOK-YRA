import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Product from "./features/product/Product";
import Transactions from "./features/transactions/Transactions";
import User from "./features/user/User";
import Dashboard from "./features/dashboard";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/product" element={<Product />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
