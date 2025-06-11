import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [userDropdown, setUserDropdown] = useState(false);
  const [peternakDropdown, setPeternakDropdown] = useState(false);

  return (
    <div className="sidebar">
      <h1>TernaQan</h1>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/product">Sapi</Link>
        </li>
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setPeternakDropdown((v) => !v)}
          >
            Peternak {peternakDropdown ? "▲" : "▼"}
          </span>
          {peternakDropdown && (
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 16,
                marginRight: 16,
                paddingRight: 16,
              }}
            >
              <li>
                <Link to="/peternak">Kelola Sapi</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setUserDropdown((v) => !v)}
          >
            Admin {userDropdown ? "▲" : "▼"}
          </span>
          {userDropdown && (
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 16,
                marginRight: 16,
                paddingRight: 16,
              }}
            >
              <li>
                <Link to="/user/list">Kelola Admin</Link>
              </li>
              <li>
                <Link to="/peternak">Kelola Peternak</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
