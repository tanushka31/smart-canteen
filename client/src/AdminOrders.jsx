import { useEffect, useState } from "react";

function AdminOrders({ onBack }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update status"
        );
        return;
      }

      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      alert("Order status updated! ✅");
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to server."
      );
    }
  };

  return (
    <div className="admin-orders">
      <h1>📋 Manage Orders</h1>

      <p>
        View and manage all student orders.
      </p>

      <button onClick={onBack}>
        ← Back to Admin Dashboard
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            className="admin-order-card"
            key={order._id}
          >
            <div className="admin-order-header">
              <div>
                <h2>
                  Order #
                  {order._id.slice(-6)}
                </h2>

                <p className="admin-order-date">
  🕒 {new Date(order.createdAt).toLocaleString()}
</p>

                <p>👤 {order.userId?.name || "Unknown User"}</p>
<p>✉️ {order.userId?.email || "No email"}</p>
<p>📞 {order.phoneNumber || "No phone number"}</p>
<p>
  📍 Pickup Location:{" "}
  {order.pickupLocation || "No pickup location"}
</p>

              </div>

              <span
                className={`admin-status ${order.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {order.status}
              </span>
            </div>

            <div className="admin-order-items">
              {order.items.map(
                (item, index) => (
                  <div
                    className="admin-order-item"
                    key={index}
                  >
                    <span>
                      {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <strong>
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>
                  </div>
                )
              )}
            </div>

            <div className="admin-order-total">
  <span>Total Amount</span>

  <strong>
    ₹{Number(order.totalAmount || 0)}
  </strong>
</div>

            <div className="admin-status-control">
              <label>
                Update Order Status
              </label>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Preparing">
                  Preparing
                </option>

                <option value="Ready">
                  Ready
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;