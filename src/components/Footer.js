import React from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function Footer() {
    return (
        <footer>
            <div className="container footer-layout">
                <img src="/images/Logo1.png" alt="Little Lemon Logo"/>
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

                <section className="contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Address</li>
                        <li>Phone</li>
                        <li>Email</li>
                    </ul>
                </section>

                <section className="socials">
                    <h3>Social Media</h3>
                    <ul className="social-icons">
                        <li><a
                        href="https://www.instagram.com" target="_blank"
                        aria-label="Follow us on Instagram"
                        rel="noreferrer"><FaInstagram aria-hidden="true"/></a></li>
                        <li><a
                        href="https://www.facebook.com"
                        aria-label="Follow us on Facebook"
                        target="_blank" rel="noreferrer"><FaFacebook aria-hidden="true"/></a></li>
                        <li><a
                        href="https://www.tiktok.com"
                        aria-label="Follow us on Tiktok"
                        target="_blank" rel="noreferrer"><FaTiktok aria-hidden="true"/></a></li>
                    </ul>
                </section>
            </div>
        </footer>
    )
}

<img src="images/Logo1.png" alt="Little Lemon Logo"/>
export default Footer;