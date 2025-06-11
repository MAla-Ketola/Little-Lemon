import React from "react";

function Specials() {
    return (
      <section className="specials-section">
        <div className="container">
        <div className="specials-header">
          <h2>This week's specials!</h2>
          <button className="cta-button" aria-label="On Click">Online Menu</button>
        </div>
        <div className="specials-cards">
          {/* Special 1 */}
          <article className="special-card">
            <img src="images/greeksalad.jpg" alt="Greek salad" />
            <div className="special-details">
              <div className="specials-card-title">
                <h3>Greek Salad</h3>
                <p>$12.99</p>
              </div>
              <p>Fresh salad with crispy lettuce, tomatoes, feta cheese, and olives.</p>
            </div>
          </article>
          {/* Special 2 */}
          <article className="special-card">
            <img src="images/bruchetta.svg" alt="Bruschetta" />
            <div className="special-details">
              <div className="specials-card-title">
                <h3 >Bruschetta</h3>
                <p>$12.99</p>
              </div>
              <p>Fresh salad with crispy lettuce, tomatoes, feta cheese, and olives.</p>
            </div>
          </article>
          {/* Special 3 */}
          <article className="special-card">
            <img src="images/lemondessert.jpg" alt="Lemon Dessert" />
            <div className="special-details">
              <div className="specials-card-title">
                <h3>Lemon Dessert</h3>
                <p>$12.99</p>
              </div>
              <p>Fresh salad with crispy lettuce, tomatoes, feta cheese, and olives.</p>
            </div>
          </article>
        </div>
        </div>

      </section>
    );
  }

export default Specials;