
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import AdminInventory from "./AdminInventory";
import AdminOrders from "./AdminOrders";
import Menu from "./Menu";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);

  const [showAdminInventory, setShowAdminInventory] =
    useState(false);

  const [showOrders, setShowOrders] =
    useState(false);

  const [showSignup, setShowSignup] =
    useState(false);

  const [showAdminOrders, setShowAdminOrders] =
    useState(false);

  const [showMenu, setShowMenu] =
    useState(false);

  const [showCheckout, setShowCheckout] =
    useState(false);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* ===============================
     LOGIN HANDLER
     =============================== */

  const handleLogin = (loggedInUser) => {
    setShowLogin(false);
    setShowSignup(false);

    if (loggedInUser?.role === "admin") {
      setShowAdminInventory(false);
      setShowAdminOrders(false);
    }
  };

  /* ===============================
     CHECKOUT
     =============================== */


  if (showCheckout) {
  return (
    <Checkout
        cart={cart}
        onBack={() => {
          setShowCheckout(false);
          setShowMenu(true);
        }}
        onOrderPlaced={() => {
  setShowCheckout(false);
  setShowOrders(true);
  setCart([]);
  localStorage.removeItem("cart");
}}
      />
    );
  }

  /* ===============================
     MY ORDERS
     =============================== */

  if (showOrders) {
    return (
      <MyOrders
        onBack={() => {
          setShowOrders(false);
        }}
      />
    );
  }

  /* ===============================
     MENU
     =============================== */

  if (showMenu) {
    return (
      <Menu
  cart={cart}
  setCart={setCart}
  onBack={() => {
    setShowMenu(false);
  }}
  onCheckout={() => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (!localStorage.getItem("token")) {
    alert(
      "Please login before placing an order."
    );

    setShowMenu(false);
    setShowLogin(true);
    return;
  }

  setShowMenu(false);
  setShowCheckout(true);
}}
      />
    );
  }

  /* ===============================
     LOGIN
     =============================== */

  if (showLogin) {
    return (
      <Login
        onLogin={handleLogin}
        onSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
    );
  }

  /* ===============================
     SIGNUP
     =============================== */

  if (showSignup) {
    return (
      <Signup
        onSignup={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
        onBackToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    );
  }

  /* ===============================
     ADMIN
     =============================== */

  if (
    token &&
    user?.role === "admin"
  ) {
    if (showAdminInventory) {
      return (
        <AdminInventory
          onBack={() => {
            setShowAdminInventory(false);
          }}
        />
      );
    }

    if (showAdminOrders) {
      return (
        <AdminOrders
          onBack={() => {
            setShowAdminOrders(false);
          }}
        />
      );
    }

    return (
      <AdminDashboard
        onManageOrders={() => {
          setShowAdminOrders(true);
        }}
        onManageInventory={() => {
          setShowAdminInventory(true);
        }}
        onManageMenu={() => {
          setShowAdminInventory(true);
        }}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.reload();
        }}
      />
    );
  }

  /* ===============================
     STUDENT DASHBOARD
     =============================== */

  if (token) {
    return (
      <Dashboard
        onOrderFood={() => {
          setShowMenu(true);
        }}
        onViewOrders={() => {
          setShowOrders(true);
        }}
        onOpenCart={() => {
          setShowMenu(true);
        }}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.reload();
        }}
      />
    );
  }

  /* ===============================
     LANDING PAGE
     =============================== */

  return (
    <div className="app">
      
<div className="floating-food food-one">🍕</div>
<div className="floating-food food-two">🍟</div>
<div className="floating-food food-three">🍩</div>
<div className="floating-food food-four">🥤</div>
<div className="floating-food food-five">🍔</div>


      <nav className="navbar">

        <div className="logo">
          🍴 <span>Smart Canteen</span>
        </div>

        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            Sign Up
          </button>

        </div>
      </nav>

      <main className="hero">

        <div className="hero-text">

          <p className="tagline">
            SMART • FAST • CONVENIENT
          </p>

          <h1>
            Your Campus Canteen,
            <br />
            <span>Made Smarter.</span>
          </h1>

          <p className="description">
            Order your favorite food, skip the
            queue, track your orders, and enjoy
            a smarter canteen experience.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Order Food →
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                setShowMenu(true);
              }}
            >
              Explore Menu
            </button>

          </div>

        </div>

        <div className="hero-card">

          <div className="food-icon">
            🍔
          </div>

          <h2>Hungry?</h2>

          <p>
            Your favorite meals are just a
            few clicks away.
          </p>

          <div className="quick-info">

            <div>
              <strong>⚡ Fast</strong>

              <span>
                Quick ordering
              </span>
            </div>

            <div>
              <strong>🛒 Easy</strong>

              <span>
                Simple checkout
              </span>
            </div>

          </div>

        </div>

      </main>
      <footer className="site-footer">
  <span>© 2026 Smart Canteen</span>
  <span>SMART • FAST • CONVENIENT</span>
</footer>
    </div>
  );
}

export default App;
