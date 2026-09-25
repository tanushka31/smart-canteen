import { useEffect, useState } from "react";

function MyOrders({ onBack }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const statusSteps = [
    "Pending",
    "Preparing",
    "Ready",
    "Completed",
  ];

  return (
    <div className="orders-page">
      <h1>📋 My Orders</h1>

      <button onClick={onBack}>
        ← Back to Dashboard
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          const currentStep =
            statusSteps.indexOf(order.status);

          return (
            <div
              className="order-card"
              key={order._id}
            >
              <h2>
                Order #{order._id.slice(-6)}
              </h2>

              <p className="order-date">
  🕒 {new Date(order.createdAt).toLocaleString()}
</p>

<p className="order-pickup">
  📍 Pickup Location:{" "}
  {order.pickupLocation || "No pickup location"}
</p>

              {order.items.map(
                (item, index) => (
                  <p key={index}>
                    {item.name} × {item.quantity} -
                    ₹
                    {item.price *
                      item.quantity}
                  </p>
                )
              )}

              <h3>
                Total: ₹{order.totalAmount}
              </h3>

              <div className="order-current-status">
  <span>
    {order.status === "Pending" && "⏳"}
    {order.status === "Preparing" && "👨‍🍳"}
    {order.status === "Ready" && "🔔"}
    {order.status === "Completed" && "✅"}
  </span>

  <div>
    <small>Current Status</small>

    <strong>{order.status}</strong>
  </div>
</div>

              <div className="order-progress">
                {statusSteps.map(
                  (step, index) => (
                    <div
                      className={`status-step ${
                        index <= currentStep
                          ? "active"
                          : ""
                      }`}
                      key={step}
                    >
                      <div className="status-dot">
                        {index <= currentStep
                          ? "✓"
                          : index + 1}
                      </div>

                      <span>{step}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyOrders;