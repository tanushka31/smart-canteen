
import { useEffect, useState } from "react";

function AdminDashboard({
  onManageOrders,
  onManageInventory,
  onManageMenu,
  onLogout,
}) {
  const [orderCount, setOrderCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
 const [inventoryCount, setInventoryCount] = useState(0);
const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders"
        );

        const data = await response.json();

        if (response.ok) {
          setOrderCount(data.length);

          setPendingCount(
            data.filter(
              (order) =>
                order.status === "Pending"
            ).length
          );
        }
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error
        );
      }
    };

    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/inventory"
        );

        const data = await response.json();

        if (response.ok) {
          setInventoryCount(data.length);
        }
      } catch (error) {
        console.error(
          "Error fetching inventory:",
          error
        );
      }
    };

    fetchOrders();
fetchInventory();
setLastUpdated(new Date());

    const interval = setInterval(() => {
     fetchOrders();
fetchInventory();
setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>🍴 Canteen Admin Dashboard</h1>

      <p className="admin-subtitle">
  Monitor orders, manage food stock, and keep the canteen running smoothly.
</p>

<p className="admin-updated">
  🔄 Last updated: {lastUpdated.toLocaleTimeString()}
</p>

      <button onClick={onLogout}>
        Logout
      </button>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>📋</span>

          <div>
            <strong>{orderCount}</strong>
            <small>Total Orders</small>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>⏳</span>

          <div>
            <strong>{pendingCount}</strong>
            <small>Pending Orders</small>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>📦</span>

          <div>
            <strong>{inventoryCount}</strong>
            <small>Inventory Items</small>
          </div>
        </div>

      </div>

      <div className="admin-cards">

        <div className="admin-card">
          <h2>📋 Orders</h2>

          <p>
            View and manage student orders.
          </p>

          <button onClick={onManageOrders}>
            Manage Orders →
          </button>
        </div>

        <div className="admin-card">
          <h2>📦 Inventory</h2>

          <p>
            Check food stock and availability.
          </p>

          <button onClick={onManageInventory}>
            Manage Inventory →
          </button>
        </div>

        <div className="admin-card">
          <h2>🍔 Menu</h2>

          <p>
            Add or update canteen food items.
          </p>

          <button onClick={onManageMenu}>
            Manage Menu →
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;

