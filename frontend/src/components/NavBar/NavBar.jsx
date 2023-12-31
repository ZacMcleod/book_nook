import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>React/Flask JWT</b>
          </Link>
        </li>
        <li>
        <button onClick={() => navigate("/search")}>Search</button>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
        <li>
        <button onClick={() => navigate("/user_favorites")}>See Your Favorites</button>
          {/* {user ? (
            <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )} */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
