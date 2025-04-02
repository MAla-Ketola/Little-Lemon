import React from "react";

function Footer() {
    return (
        <footer>
            <div className="container footer-layout">
                <img src="images/Logo1.png" alt="Little Lemon Logo"/>
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
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">TikTok</a></li>
                    </ul>
                </section>
            </div>
        </footer>
    )
}

<img src="images/Logo1.png" alt="Little Lemon Logo"/>
export default Footer;