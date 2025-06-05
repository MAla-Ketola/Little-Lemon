import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    }

    return (
        <>
            <nav>
                <button className="hamburger" onClick={() => setMenuOpen(true)}>
                    <HiMenu />
                </button>

                <ul className={`nav-list ${menuOpen ? 'show' : ''}`}>
                {/* Close Icon */}
                    <button className="nav-close" onClick={() => setMenuOpen(false)}>
                        <HiX />
                    </button>

                    <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                    <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                    <li><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
                    <li><Link to="/booking" onClick={handleLinkClick}>Book Now</Link></li>
                    <li><Link to="/order" onClick={handleLinkClick}>Order Online</Link></li>
                    <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
                </ul>
                <div
                    className={`overlay ${menuOpen ? 'show' : ''}`}
                    onClick={() => setMenuOpen(false)}/>
            </nav>
        </>



    )
}

export default Nav;