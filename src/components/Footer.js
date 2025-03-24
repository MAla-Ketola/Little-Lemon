import React from "react";

function Footer() {
    return (
        <footer>
            <img src="images/Logo1.png"/>
            <nav>
                <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Reservations</a></li>
                <li><a href="#">Order Online</a></li>
                <li><a href="#">Login</a></li>
                </ul>
            </nav>
            <section id="contact">
                <h3>Contact</h3>
                <p>Address, Phone, Email</p>
            </section>
            <section id="socials">
                <h3>Social Media Links</h3>
                <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">TikTok</a></li>
                </ul>
      </section>
        </footer>
    )
}

export default Footer;