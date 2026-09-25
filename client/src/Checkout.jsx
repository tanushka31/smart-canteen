import { useState } from "react";

function Checkout({ cart, onBack, onOrderPlaced }) {
  const [phoneNumber, setPhoneNumber] = useState("");
const [pickupLocation, setPickupLocation] = useState("");
const [placingOrder, setPlacingOrder] = useState(false);
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const placeOrder = async () => {
  if (placingOrder) {
    return;
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (!pickupLocation.trim()) {
    alert("Please enter your pickup location.");
    return;
  }

  setPlacingOrder(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.id,
          phoneNumber,
          pickupLocation,
          items: cart,
          totalAmount,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setPlacingOrder(false);

      alert(
        data.message ||
          "Failed to place order"
      );

      return;
    }

    alert("Order placed successfully! 🎉");

    onOrderPlaced();
  } catch (error) {
    console.error(error);

    setPlacingOrder(false);

    alert("Cannot connect to server.");
  }
};

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div>
          <p className="checkout-eyebrow">
            FINAL STEP
          </p>

          <h1>🛒 Checkout</h1>

          <p>
            Review your order before
            placing it.
          </p>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-box">
          <div className="checkout-section">
            <h2>👤 Pickup Details</h2>

            <label>
              Pickup Name
            </label>

            <input
              type="text"
              value={
                user?.name || ""
              }
              readOnly
            />

            <label>
  Phone Number
</label>

<input
  type="tel"
inputMode="numeric"
  placeholder="Enter 10-digit phone number"
  value={phoneNumber}
  maxLength="10"
  onChange={(e) =>
    setPhoneNumber(
      e.target.value.replace(/\D/g, "")
    )
  }
/>

<label>
  Pickup Location
</label>

<input
  type="text"
  placeholder="Enter canteen counter"
  value={pickupLocation}
  onChange={(e) =>
    setPickupLocation(e.target.value)
  }
/>
          </div>

          <div className="checkout-section">
            <h2>💳 Payment</h2>

            <div className="payment-option selected">
              <span className="payment-icon">
                💵
              </span>

              <div>
                <strong>
                  Cash at Canteen
                </strong>

                <small>
                  Pay when you collect
                  your order
                </small>
              </div>

              <span className="payment-check">
                ✓
              </span>
            </div>

            <div className="payment-option disabled">
              <span className="payment-icon">
                💳
              </span>

              <div>
                <strong>
                  UPI / Online Payment
                </strong>

                <small>
                  Coming Soon
                </small>
              </div>
            </div>
          </div>

          <div className="checkout-actions">
            <button
  className="place-order-btn"
  onClick={placeOrder}
  disabled={placingOrder}
>
  {placingOrder
    ? "Placing Order..."
    : `Place Order • ₹${totalAmount}`}
</button>

            <button
              className="back-menu-btn"
              onClick={onBack}
            >
              ← Back to Menu
            </button>
          </div>
        </div>

        <div className="checkout-summary">
          <div className="summary-heading">
            <h2>Order Summary</h2>

            <span>
              {totalItems} items
            </span>
          </div>

          {cart.map((item) => (
            <div
              className="summary-item"
              key={item.name}
            >
              <div className="summary-item-info">
                <span className="summary-food-icon">
                  {item.name === "Pizza"
                    ? "🍕"
                    : item.name ===
                      "Burger"
                    ? "🍔"
                    : item.name ===
                      "Sandwich"
                    ? "🥪"
                    : item.name ===
                      "Cold Drink"
                    ? "🥤"
                    : "🍴"}
                </span>

                <div>
                  <strong>
                    {item.name}
                  </strong>

                  <small>
                    ₹{item.price} ×{" "}
                    {item.quantity}
                  </small>
                </div>
              </div>

              <strong>
                ₹
                {item.price *
                  item.quantity}
              </strong>
            </div>
          ))}

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total Amount</span>

            <strong>
              ₹{totalAmount}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;