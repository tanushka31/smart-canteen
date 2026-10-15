
function Dashboard({ onOrderFood, onViewOrders, onOpenCart }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="dashboard">
  <div className="food-background" aria-hidden="true">
    <span className="bg-food bg-food-1">🍔</span>
    <span className="bg-food bg-food-2">🍕</span>
    <span className="bg-food bg-food-3">🍟</span>
    <span className="bg-food bg-food-4">🥤</span>
    <span className="bg-food bg-food-5">🍩</span>
    <span className="bg-food bg-food-6">🌮</span>
    <span className="bg-food bg-food-7">🍔</span>
    <span className="bg-food bg-food-8">🍕</span>
    
  </div>

      {/* NAVBAR */}
      <nav className="dashboard-nav">
        <div className="logo">
          🍴 <span>Smart Canteen</span>
        </div>

        <div className="user-actions">
          <span>👤 {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* ANIMATED WELCOME SECTION */}
      <section className="welcome-showcase">
        <div className="showcase-glow"></div>

        {/* WELCOME TEXT */}
        <div className="showcase-content">
          <span className="showcase-label">
            SMART • FAST • CONVENIENT
          </span>

          <h2>
            Hungry? Let's fix that.
            <br />
            <span>Your favourites, just a few clicks away.</span>
          </h2>

          <p>
            Take a break from classes and enjoy your
            next meal without the queue.
          </p>
        </div>

        {/* KEEP EXISTING FOOD ANIMATION */}
        <div className="showcase-art" aria-hidden="true">
          <div className="art-orbit orbit-one"></div>
          <div className="art-orbit orbit-two"></div>

          <div className="art-circle">
            <div className="art-plate">🍔</div>
          </div>

          <span className="floating-food food-one">🍕</span>
          <span className="floating-food food-two">🥤</span>
          <span className="floating-food food-three">🍟</span>

          <span className="floating-spark spark-one">✦</span>
          <span className="floating-spark spark-two">✧</span>
        </div>
      </section>

      {/* STUDENT DASHBOARD */}
      <main className="dashboard-content">
        
        <h1>
          Welcome, <span>{user?.name} !</span>
        </h1>

        <p className="dashboard-subtitle">
          What would you like to do today?
        </p>

        <p className="dashboard-note">
          🍴 Order food, track your orders, and
          collect them from your selected pickup
          location.
        </p>

        {/* THREE EXISTING CARDS */}
        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="card-icon">🍔</div>
            <h2>Order Food</h2>
            <p>
              Browse the canteen menu and place your order.
            </p>
            <button onClick={onOrderFood}>
              Order Now →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📋</div>
            <h2>My Orders</h2>
            <p>
              View your current and previous food orders.
            </p>
            <button onClick={onViewOrders}>
              View Orders →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🛒</div>
            <h2>Cart</h2>
            <p>
              Check your selected items before checkout.
            </p>
            <button onClick={onOpenCart}>
              Open Cart →
            </button>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="dashboard-footer">

        <div className="footer-brand">
          <div className="footer-logo">
            🍴 Smart Canteen
          </div>

          <p className="footer-tagline">
            SMART • FAST • CONVENIENT
          </p>

          <p className="footer-description">
            A campus food ordering system designed
            to make canteen ordering simple,
            convenient, and efficient.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact & Location</h3>
          <p>📞 +91 9876543210</p>
          <p>📍 PCCOE&R College Canteen</p>
          <p>Ravet, Pune, Maharashtra</p>
        </div>

      </footer>

      <div className="dashboard-footer-bottom">
        <span>
          © 2026 Smart Canteen. All rights reserved.
        </span>

        <span>Campus Food Ordering System</span>
      </div>

    </div>
  );
}

export default Dashboard;
