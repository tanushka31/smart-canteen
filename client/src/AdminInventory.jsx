
import { useEffect, useState } from "react";

function AdminInventory({ onBack }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // Get the correct icon for every food item
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

  // Fetch inventory from the backend
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
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Update an inventory item
  const updateItem = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/inventory/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: item.name.trim(),
            quantity: Number(item.quantity),
            price: Number(item.price),
            available: Number(item.quantity) > 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update item");
        return;
      }

      alert("Inventory item updated successfully! ✅");
      fetchInventory();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Cannot connect to server.");
    }
  };

  // Delete an inventory item
  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/inventory/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete item");
        return;
      }

      alert("Inventory item deleted! 🗑️");
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Cannot connect to server.");
    }
  };

  // Add a new inventory item
  const addItem = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Please enter a food name.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            quantity: Number(quantity),
            price: Number(price),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add item");
        return;
      }

      alert(`${getFoodIcon(trimmedName)} ${trimmedName} added successfully!`);

      setName("");
      setQuantity("");
      setPrice("");

      fetchInventory();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Cannot connect to server.");
    }
  };

  return (
    <div className="admin-inventory">
      {/* Inventory header */}
      <div className="inventory-top">
        <div>
          <p className="admin-eyebrow">ADMIN PANEL</p>

          <h1>📦 Inventory Management</h1>

          <p>
            Manage food items, prices, stock and availability.
          </p>
        </div>

        <button onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      {/* Add food form */}
      <form className="inventory-form" onSubmit={addItem}>
        <h2>➕ Add Food Item</h2>

        <div className="inventory-input-grid">
          <input
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price ₹"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {name.trim() && (
          <p className="inventory-icon-preview">
            Food icon preview: {getFoodIcon(name)} {name.trim()}
          </p>
        )}

        <button type="submit">
          Add Item
        </button>
      </form>

      {/* Inventory heading */}
      <div className="inventory-heading">
        <div>
          <h2>Current Inventory</h2>

          <p>
            {items.length} food item
            {items.length !== 1 ? "s" : ""} in inventory
          </p>
        </div>
      </div>

      {/* Inventory items */}
      {items.length === 0 ? (
        <div className="empty-inventory">
          <div>📦</div>
          <h3>No inventory items</h3>
          <p>Add your first food item above.</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {items.map((item) => (
            <div className="inventory-card" key={item._id}>
              <div className="inventory-card-top">
                <div className="inventory-food-icon">
                  {getFoodIcon(item.name)}
                </div>

                <span
                  className={
                    Number(item.quantity) > 0
                      ? "stock-badge available"
                      : "stock-badge empty"
                  }
                >
                  {Number(item.quantity) > 0
                    ? "● Available"
                    : "● Out of Stock"}
                </span>
              </div>

              <input
                className="inventory-name"
                type="text"
                value={item.name}
                onChange={(e) => {
                  setItems((previousItems) =>
                    previousItems.map((i) =>
                      i._id === item._id
                        ? { ...i, name: e.target.value }
                        : i
                    )
                  );
                }}
              />

              <div className="inventory-fields">
                <div>
                  <label>Stock</label>

                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value);

                      setItems((previousItems) =>
                        previousItems.map((i) =>
                          i._id === item._id
                            ? {
                                ...i,
                                quantity: newQuantity,
                                available: newQuantity > 0,
                              }
                            : i
                        )
                      );
                    }}
                  />
                </div>

                <div>
                  <label>Price ₹</label>

                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) => {
                      setItems((previousItems) =>
                        previousItems.map((i) =>
                          i._id === item._id
                            ? {
                                ...i,
                                price: Number(e.target.value),
                              }
                            : i
                        )
                      );
                    }}
                  />
                </div>
              </div>

              <div className="inventory-actions">
                <button
                  type="button"
                  onClick={() => updateItem(item)}
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminInventory;
