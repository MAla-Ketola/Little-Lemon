import React from "react";

function Hero() {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/restauranfood1.jpg)` }}>
            <div className="container hero-layout">
                <div className="hero-text">
                        <div className="hero-title">
                        <h1>Little Lemon</h1>
                        </div>
                        <h2>Chicago</h2>
                        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                        <button className="cta-button">Reserve a table</button>
                    </div>
                <img src="images/restauranfood1.jpg" alt="Hero img" className="hero-image"/>
            </div>
        </section>
    )
}

export default Hero;