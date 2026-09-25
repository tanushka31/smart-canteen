function Dashboard({ onOrderFood, onViewOrders, onOpenCart }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          🍴 <span>Smart Canteen</span>
        </div>

        <div className="user-actions">
          <span>👤 {user?.name}</span>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <p className="tagline">
          SMART • FAST • CONVENIENT
        </p>

        <h1>
          Welcome, <span>{user?.name}!</span>
        </h1>

        <p className="dashboard-subtitle">
          What would you like to do today?
        </p>

        <p className="dashboard-note">
          🍴 Order food, track your orders, and
          collect them from your selected pickup
          location.
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">🍔</div>

            <h2>Order Food</h2>

            <p>
              Browse the canteen menu and place
              your order.
            </p>

            <button onClick={onOrderFood}>
              Order Now →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📋</div>

            <h2>My Orders</h2>

            <p>
              View your current and previous food
              orders.
            </p>

            <button onClick={onViewOrders}>
              View Orders →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🛒</div>

            <h2>Cart</h2>

            <p>
              Check your selected items before
              checkout.
            </p>

            <button onClick={onOpenCart}>
              Open Cart →
            </button>
          </div>
        </div>
      </main>

      {/* STUDENT FOOTER */}
      <footer className="dashboard-footer">
        <div className="footer-brand">
          <div className="footer-logo">
            🍴 Smart Canteen
          </div>

          <p>
            SMART • FAST • CONVENIENT
          </p>
        </div>

        

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📞 +91 9876543210</p>

          <p>
            📍 PCCOE&R College Canteen,
            <br />
                Ravet, Pune, Maharashtra
          </p>
        </div>
      </footer>

      <div className="dashboard-footer-bottom">
        <span>
          © 2026 Smart Canteen. All rights reserved.
        </span>

        <span>
          Campus Food Ordering System
        </span>
      </div>
    </div>
  );
}

export default Dashboard;