import { useState, useEffect } from "react";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";
import SignupForm from "../SignupForm/SignupForm";
import LoginButton from "../LoginButton/LoginButton";
import SignupButton from "../SignupButton/SignupButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import useAuth from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Keep tracks if the navbar is expanded or not
  const { user, isAuthenticated } = useAuth();

  // Function to flip the expanded state of the navbar
  function toggleNavbar() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    removeModal();
  }, [isAuthenticated]);

  // Function to remove bootstrap modal backdrop
  function removeModal() {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
    const modal = document.querySelector(".modal.show");
    if (modal) {
      modal.classList.remove("show");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Recipe Remix
          </Link>
          <button
            className="navbar-toggler p-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-links"
            aria-controls="navbar-links"
            aria-expanded={isExpanded}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <i className={`icon bi ${isExpanded ? "bi-x" : "bi-list"}`}></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbar-links"
          >
            <div className="navbar-nav text-center">
              <Link className="navbar-link" to="/explore">
                Explore
              </Link>
              <Link className="navbar-link" to="/favorites">
                Favorites
              </Link>
              <Link className="navbar-link" to="/about">
                About
              </Link>
            </div>
            {isAuthenticated ? (
              <div className="d-flex justify-content-center align-items-center gap-3">
                <LogoutButton />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center gap-3">
                <LoginButton />
                <SignupButton />
              </div>
            )}
          </div>
        </div>
      </nav>
      {!isAuthenticated && (
        <div>
          <LoginModal />
          <SignupForm />
        </div>
      )}
    </>
  );
};

export default Navbar;
