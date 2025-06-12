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
              <p>Bright, crunchy cucumbers and ripe tomatoes meet silky feta and briny Kalamata olives on a bed of crisp greens. A light, house-made citrus-oregano dressing brings everything together for a refreshing taste of the Mediterranean.</p>
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
              <p>Toasted slices of rustic Italian bread are rubbed with garlic, drizzled in extra-virgin olive oil, and piled high with a colorful medley of diced heirloom tomatoes, fresh basil, and shaved Parmesan. Finished with a sprinkle of sea salt and cracked black pepper for that perfect crunch.</p>
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
              <p>Layers of delicate lemon sponge cake alternate with silky lemon curd and a light mascarpone cream, finished with candied lemon peel and a dusting of powdered sugar. Bright, tangy, and irresistibly creamy.</p>
            </div>
          </article>
        </div>
        </div>

      </section>
    );
  }

export default Specials;