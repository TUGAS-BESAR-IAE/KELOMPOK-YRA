import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <div className="sidebar">
      <h1>TernaQan</h1>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>        
        <li>
          <Link to="/transactions">Peternak</Link>
        </li>
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setUserDropdown((v) => !v)}
          >
            Admin {userDropdown ? "▲" : "▼"}
          </span>
          {userDropdown && (
            <ul style={{ listStyle: "none", paddingLeft: 16 }}>
              <li>
                <Link to="/user/create">Create Admin</Link>
              </li>
              <li>
                <Link to="/user/list">User List</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
