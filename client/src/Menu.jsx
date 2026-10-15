
import { useEffect, useState } from "react";

function Menu({
  cart,
  setCart,
  onBack,
  onCheckout,
}) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch food items from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/inventory"
        );

        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();

    const interval = setInterval(() => {
      fetchInventory();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Return the correct emoji based on the food name
  const getFoodIcon = (name) => {
    const foodName = String(name || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    if (foodName.includes("noodle")) return "🍜";
    if (foodName.includes("pasta")) return "🍝";
    if (foodName.includes("pizza")) return "🍕";
    if (foodName.includes("burger")) return "🍔";
    if (foodName.includes("sandwich")) return "🥪";

    if (
      foodName.includes("cold drink") ||
      foodName.includes("soft drink")
    ) {
      return "🥤";
    }

    if (foodName.includes("samosa")) return "🥟";
    if (foodName.includes("fries")) return "🍟";
    if (foodName.includes("dosa")) return "🥞";
    if (foodName.includes("idli")) return "🍚";
    if (foodName.includes("vada pav")) return "🍔";
    if (foodName.includes("pav bhaji")) return "🍛";

    if (
      foodName.includes("biryani") ||
      foodName.includes("rice")
    ) {
      return "🍚";
    }

    if (foodName.includes("cake")) return "🍰";
    if (foodName.includes("ice cream")) return "🍨";

    if (
      foodName.includes("donut") ||
      foodName.includes("doughnut")
    ) {
      return "🍩";
    }

    if (foodName.includes("coffee")) return "☕";

    if (
      foodName.includes("tea") ||
      foodName.includes("chai")
    ) {
      return "🍵";
    }

    if (foodName.includes("juice")) return "🧃";

    if (
      foodName.includes("cookie") ||
      foodName.includes("biscuit")
    ) {
      return "🍪";
    }

    if (foodName.includes("popcorn")) return "🍿";
    if (foodName.includes("taco")) return "🌮";
    if (foodName.includes("hot dog")) return "🌭";
    if (foodName.includes("salad")) return "🥗";
    if (foodName.includes("chocolate")) return "🍫";
    if (foodName.includes("muffin")) return "🧁";
    if (foodName.includes("pancake")) return "🥞";

    if (
      foodName.includes("milkshake") ||
      foodName.includes("shake")
    ) {
      return "🥤";
    }

    if (foodName.includes("bread")) return "🍞";

    if (
      foodName.includes("egg") ||
      foodName.includes("omelette") ||
      foodName.includes("omelet")
    ) {
      return "🍳";
    }

    if (
      foodName.includes("chicken") ||
      foodName.includes("meat")
    ) {
      return "🍗";
    }

    if (
      foodName.includes("soup") ||
      foodName.includes("dal")
    ) {
      return "🍲";
    }

    if (foodName.includes("apple")) return "🍎";
    if (foodName.includes("banana")) return "🍌";
    if (foodName.includes("orange")) return "🍊";

    return "🍽️";
  };

  // Filter menu items
  const filteredItems = items.filter((item) =>
    String(item.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Add item to cart
  const addToCart = (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to your cart.");
      window.location.href = "/";
      return;
    }

    if (!item.available || item.quantity <= 0) {
      alert("This item is currently out of stock.");
      return;
    }

    const existingItem = cart.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      if (existingItem.quantity >= item.quantity) {
        alert("You cannot add more than the available stock.");
        return;
      }

      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase cart quantity
  const increaseQuantity = (cartItem) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to your cart.");
      window.location.href = "/";
      return;
    }

    const inventoryItem = items.find(
      (item) => item.name === cartItem.name
    );

    if (!inventoryItem) {
      return;
    }

    if (
      !inventoryItem.available ||
      cartItem.quantity >= inventoryItem.quantity
    ) {
      alert("You cannot add more than the available stock.");
      return;
    }

    setCart(
      cart.map((item) =>
        item.name === cartItem.name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease cart quantity
  const decreaseQuantity = (cartItem) => {
    if (cartItem.quantity <= 1) {
      setCart(
        cart.filter(
          (item) => item.name !== cartItem.name
        )
      );
      return;
    }

    setCart(
      cart.map((item) =>
        item.name === cartItem.name
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  // Cart totals
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="menu-page">
      {/* Back button */}
      <button
        className="back-dashboard-btn"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      {/* Menu header */}
      <div className="menu-header">
        <div>
          <p className="menu-eyebrow">
            SMART CANTEEN
          </p>

          <h1>🍽️ Today's Menu</h1>

          <p>
            Fresh picks. Quick ordering.
            Zero queue hassle.
          </p>
        </div>

        <button
          className="menu-cart-indicator"
          onClick={() => {
            document
              .querySelector(".cart-summary")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          🛒{" "}
          <span>
            {totalItems} item
            {totalItems !== 1 ? "s" : ""}
          </span>
        </button>
      </div>

      {/* Search */}
      <div className="menu-search">
        <span className="menu-search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        {searchTerm && (
          <button
            className="menu-search-clear"
            onClick={() => setSearchTerm("")}
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {/* Menu result information */}
      <div className="menu-result-info">
        {searchTerm
          ? `${filteredItems.length} item${
              filteredItems.length !== 1 ? "s" : ""
            } found`
          : `${items.length} items available`}
      </div>

      {/* Food cards */}
      <div className="menu-grid">
        {loading ? (
          <div className="menu-empty">
            <div className="menu-empty-icon">
              ⏳
            </div>

            <h2>Loading menu...</h2>

            <p>
              Getting today's food items ready.
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="menu-empty">
            <div className="menu-empty-icon">
              🔎
            </div>

            <h2>No food found</h2>

            <p>
              Try searching for another item.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const cartItem = cart.find(
              (cartItem) =>
                cartItem.name === item.name
            );

            return (
              <div
                className="food-card"
                key={item._id}
              >
                <div className="food-image">
                  {getFoodIcon(item.name)}
                </div>

                <div className="food-card-info">
                  <h2>{item.name}</h2>

                  <strong>₹{item.price}</strong>

                  <p
                    className={
                      item.quantity > 0
                        ? "stock-text"
                        : "stock-text out"
                    }
                  >
                    {item.quantity > 0
                      ? `${item.quantity} available`
                      : "Out of stock"}
                  </p>
                </div>

                {cartItem ? (
                  <div className="food-quantity">
                    <button
                      onClick={() =>
                        decreaseQuantity(cartItem)
                      }
                    >
                      −
                    </button>

                    <span>
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(cartItem)
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-cart-btn"
                    disabled={
                      !item.available ||
                      item.quantity <= 0
                    }
                    onClick={() => addToCart(item)}
                  >
                    {item.available && item.quantity > 0
                      ? "Add to Cart  +"
                      : "Out of Stock"}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Cart summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-top">
            <div>
              <p className="cart-label">
                YOUR CART
              </p>

              <h2>🛒 Order Summary</h2>
            </div>

            <span className="cart-count">
              {totalItems} items
            </span>
          </div>

          {cart.map((item) => (
            <div
              key={item.name}
              className="cart-item"
            >
              <div>
                <strong>{item.name}</strong>

                <span>
                  ₹{item.price} × {item.quantity}
                </span>
              </div>

              <div className="cart-item-right">
                <strong>
                  ₹{item.price * item.quantity}
                </strong>

                <button
                  className="remove-cart-btn"
                  onClick={() => {
                    setCart(
                      cart.filter(
                        (cartItem) =>
                          cartItem.name !== item.name
                      )
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <span>Total</span>

            <strong>₹{totalAmount}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={onCheckout}
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
