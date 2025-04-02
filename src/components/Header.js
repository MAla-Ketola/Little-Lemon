import React from "react";
import Nav from "./Nav";

function Header() {
    return (
        <header>
            <div className="container">
                <img src="images/Logo .png" alt="Little Lemon Logo" className="logo"/>
                <Nav/>
            </div>
        </header>
    )
}

export default Header;