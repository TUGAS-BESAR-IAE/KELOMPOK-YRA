import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [userDropdown, setUserDropdown] = useState(false);
  const [peternakDropdown, setPeternakDropdown] = useState(false);
  const location = useLocation();

  return (
    <div className="sidebar">
      <h1>TernaQan</h1>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/sapi"
            className={location.pathname.startsWith("/sapi") ? "active" : ""}
          >
            Sapi
          </Link>
        </li>
        <li>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setPeternakDropdown((v) => !v)}
          >
            Peternak {peternakDropdown ? "▲" : "▼"}
          </span>
          {peternakDropdown && (
            <ul>
              <li>
                <Link
                  to="/product"
                  className={
                    location.pathname.startsWith("/product") ? "active" : ""
                  }
                >
                  Kelola Sapi
                </Link>
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
            <ul>
              <li>
                <Link
                  to="/user/list"
                  className={
                    location.pathname.startsWith("/user") ? "active" : ""
                  }
                >
                  Kelola Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/peternak"
                  className={
                    location.pathname.startsWith("/peternak") ? "active" : ""
                  }
                >
                  Kelola Peternak
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/transactions"
            className={
              location.pathname.startsWith("/transactions") ? "active" : ""
            }
          >
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
