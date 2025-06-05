import React from "react";
import StarRating from "./starRating";

function Testimonials() {
    return (
        <section className="testimonials-section">
            <div className="container">
                <h2>Testimonials</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <div className="testimonial-card-header">
                            <img src="images/emma.png" alt="avatar"/>
                            <div>
                                <StarRating rating={5}/>
                                <h3>Emma</h3>
                            </div>
                        </div>
                        <p>Booking a table for my birthday was so easy...</p>
                    </div>
                    <div className="testimonial-card">
                    <div className="testimonial-card-header">
                            <img src="images/emma.png" alt="avatar"/>
                            <div>
                                <StarRating rating={5}/>
                                <h3>Emma</h3>
                            </div>
                        </div>
                        <p>Booking a table for my birthday was so easy...</p>
                    </div>
                    <div className="testimonial-card">
                    <div className="testimonial-card-header">
                            <img src="images/emma.png" alt="avatar"/>
                            <div>
                                <StarRating rating={5}/>
                                <h3>Emma</h3>
                            </div>
                        </div>
                        <p>Booking a table for my birthday was so easy...</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;