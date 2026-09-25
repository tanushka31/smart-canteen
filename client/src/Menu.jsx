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

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/inventory"
        );

        const data = await response.json();

        if (response.ok) {
  setItems(data);
}

setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching menu:",
          error
        );
        setLoading(false);
      }
    };

    fetchInventory();
    const interval = setInterval(() => {
  fetchInventory();
}, 10000);

return () => clearInterval(interval);
  }, []);

  const getFoodIcon = (name) => {
    if (
      name === "Pizza" ||
      name === "Pizzza"
    ) {
      return "🍕";
    }

    if (name === "Burger") {
      return "🍔";
    }

    if (name === "Sandwich") {
      return "🥪";
    }

    if (name === "Cold Drink") {
      return "🥤";
    }

    return "🍴";
  };

  /* ===============================
     FILTER MENU
     =============================== */

  const filteredItems = items.filter((item) =>
    item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* ===============================
     ADD TO CART
     =============================== */

  const addToCart = (item) => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert(
        "Please login to add items to your cart."
      );

      window.location.href = "/";
      return;
    }

    const existingItem = cart.find(
      (cartItem) =>
        cartItem.name === item.name
    );

    if (existingItem) {
      if (
        existingItem.quantity >=
        item.quantity
      ) {
        alert(
          "You cannot add more than the available stock."
        );

        return;
      }

      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
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

  /* ===============================
     INCREASE QUANTITY
     =============================== */

  const increaseQuantity = (
    cartItem
  ) => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert(
        "Please login to add items to your cart."
      );

      window.location.href = "/";
      return;
    }

    const inventoryItem = items.find(
      (item) =>
        item.name === cartItem.name
    );

    if (!inventoryItem) {
      return;
    }

    if (
      cartItem.quantity >=
      inventoryItem.quantity
    ) {
      alert(
        "You cannot add more than the available stock."
      );

      return;
    }

    setCart(
      cart.map((item) =>
        item.name === cartItem.name
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  /* ===============================
     DECREASE QUANTITY
     =============================== */

  const decreaseQuantity = (
    cartItem
  ) => {
    if (cartItem.quantity <= 1) {
      setCart(
        cart.filter(
          (item) =>
            item.name !==
            cartItem.name
        )
      );

      return;
    }

    setCart(
      cart.map((item) =>
        item.name === cartItem.name
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item
      )
    );
  };

  /* ===============================
     CART TOTALS
     =============================== */

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <div className="menu-page">

      {/* ===============================
          BACK BUTTON
          =============================== */}

      <button
        className="back-dashboard-btn"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      {/* ===============================
          MENU HEADER
          =============================== */}

      <div className="menu-header">
        <div>
          <p className="menu-eyebrow">
            SMART CANTEEN
          </p>

          <h1>🍴 Today's Menu</h1>

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
            {totalItems !== 1
              ? "s"
              : ""}
          </span>
        </button>
      </div>

      {/* ===============================
          SEARCH
          =============================== */}

      <div className="menu-search">
        <span className="menu-search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        {searchTerm && (
          <button
            className="menu-search-clear"
            onClick={() =>
              setSearchTerm("")
            }
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {/* ===============================
          FOOD MENU
          =============================== */}

      <div className="menu-result-info">
  {searchTerm
    ? `${filteredItems.length} item${
        filteredItems.length !== 1 ? "s" : ""
      } found`
    : `${items.length} items available`}
</div>

<div className="menu-grid">

  {loading ? (
    <div className="menu-empty">
      <div className="menu-empty-icon">
        ⏳
      </div>

      <h2>
        Loading menu...
      </h2>

      <p>
        Getting today's food items ready.
      </p>
    </div>
  ) : filteredItems.length === 0 ? (
          <div className="menu-empty">
            <div className="menu-empty-icon">
              🔎
            </div>

            <h2>
              No food found
            </h2>

            <p>
              Try searching for another
              item.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const cartItem = cart.find(
              (cartItem) =>
                cartItem.name ===
                item.name
            );

            return (
              <div
                className="food-card"
                key={item._id}
              >
                <div className="food-image">
                  {getFoodIcon(
                    item.name
                  )}
                </div>

                <div className="food-card-info">
                  <h2>{item.name}</h2>

                  <strong>
                    ₹{item.price}
                  </strong>

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
                        decreaseQuantity(
                          cartItem
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          cartItem
                        )
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
                    onClick={() =>
                      addToCart(item)
                    }
                  >
                    {item.available &&
                    item.quantity > 0
                      ? "Add to Cart  +"
                      : "Out of Stock"}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ===============================
          CART
          =============================== */}

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-top">
            <div>
              <p className="cart-label">
                YOUR CART
              </p>

              <h2>
                🛒 Order Summary
              </h2>
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
                <strong>
                  {item.name}
                </strong>

                <span>
                  ₹{item.price} ×{" "}
                  {item.quantity}
                </span>
              </div>

              <div className="cart-item-right">
                <strong>
                  ₹
                  {item.price *
                    item.quantity}
                </strong>

                <button
                  className="remove-cart-btn"
                  onClick={() => {
                    setCart(
                      cart.filter(
                        (cartItem) =>
                          cartItem.name !==
                          item.name
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

            <strong>
              ₹{totalAmount}
            </strong>
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