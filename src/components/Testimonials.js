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
                                <h3>Maya</h3>
                            </div>
                        </div>
                        <p>"From the moment we arrived, the service was friendly and attentive. Every dish—from the crisp Greek Salad to the zesty Lemon Cake—was simply outstanding. I’ll be back again and again!"</p>
                    </div>
                    <div className="testimonial-card">
                    <div className="testimonial-card-header">
                            <img src="images/emma.png" alt="avatar"/>
                            <div>
                                <StarRating rating={4}/>
                                <h3>Noah</h3>
                            </div>
                        </div>
                        <p>“The bruschetta starter was exactly what I needed to kick off the evening—perfectly toasted bread and the tomato topping was bursting with flavor. Just wish the ambiance was a touch cozier, but the food more than made up for it!”</p>
                    </div>
                    <div className="testimonial-card">
                    <div className="testimonial-card-header">
                            <img src="images/emma.png" alt="avatar"/>
                            <div>
                                <StarRating rating={5}/>
                                <h3>Zoe</h3>
                            </div>
                        </div>
                        <p>“Such a delightful find! Little Lemon’s mix of fresh ingredients and bright citrus notes blew me away. My friends and I couldn’t stop raving about the desserts—highly recommend the lemon mousse cake!”</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;