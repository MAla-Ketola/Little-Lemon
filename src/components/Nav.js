import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from 'react-icons/hi';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    }

    return (
      <>
        <nav>
          <button 
          className="hamburger" 
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}>
            <HiMenu aria-hidden="true"/>
          </button>

          <ul className={`nav-list ${menuOpen ? "show" : ""}`}>
            {/* Close Icon */}
            <button 
            className="nav-close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}>
              <HiX aria-hidden="true"/>
            </button>

            <li>
              <NavLink
                to="/"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : undefined
                }
                onClick={handleLinkClick}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : undefined
                }
                onClick={handleLinkClick}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : undefined
                }
                onClick={handleLinkClick}
              >
                Book Now
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : undefined
                }
                onClick={handleLinkClick}
              >
                Order Online
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myBookings"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : undefined
                }
                onClick={handleLinkClick}
              >
                Login
              </NavLink>
            </li>
          </ul>
          <div
            className={`overlay ${menuOpen ? "show" : ""}`}
            onClick={() => setMenuOpen(false)}
          />
        </nav>
      </>
    );
}

export default Nav;