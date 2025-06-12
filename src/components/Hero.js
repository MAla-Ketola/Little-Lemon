import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


function Hero() {

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

    return (
        <section className="hero-section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/restauranfood1.jpg)` }}>
            <div className="container hero-layout">
                <motion.div className="hero-text"
                     initial="hidden"
                     animate="visible"
                     variants={{
                       hidden: {},
                       visible: {
                         transition: {
                           staggerChildren: 0.2,
                         },
                       },
                     }}
                   >
                     <motion.h1 variants={fadeIn}>Little Lemon</motion.h1>
                     <motion.h2 variants={fadeIn}>Chicago</motion.h2>
                     <motion.p variants={fadeIn}>Find a table for any occasion</motion.p>
                        <Link to="/booking">
                            <button className="cta-button" aria-label="On Click">Reserve a Table</button>
                        </Link>
                    </motion.div>
                <img src="images/restauranfood1.jpg" alt="Hero img" className="hero-image"/>
            </div>
        </section>
    )
}

export default Hero;