import { useEffect, useState } from "react";

function AdminInventory({ onBack }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const fetchInventory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/inventory"
      );

      const data = await response.json();

      if (response.ok) {
        setItems(data);
      }
    } catch (error) {
      console.error(
        "Error fetching inventory:",
        error
      );
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

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
            name: item.name,
            quantity: Number(item.quantity),
            price: Number(item.price),
            available:
              Number(item.quantity) > 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update item"
        );
        return;
      }

      alert("Item updated successfully! ✅");

      fetchInventory();
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to server."
      );
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/inventory/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete item"
        );
        return;
      }

      alert(
        "Inventory item deleted! 🗑️"
      );

      fetchInventory();
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to server."
      );
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            quantity: Number(quantity),
            price: Number(price),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to add item"
        );
        return;
      }

      alert(
        "Inventory item added! 🍔"
      );

      setName("");
      setQuantity("");
      setPrice("");

      fetchInventory();
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to server."
      );
    }
  };

  return (
    <div className="admin-inventory">
      <div className="inventory-top">
        <div>
          <p className="admin-eyebrow">
            ADMIN PANEL
          </p>

          <h1>📦 Inventory Management</h1>

          <p>
            Manage food items, prices,
            stock and availability.
          </p>
        </div>

        <button onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      <form
        className="inventory-form"
        onSubmit={addItem}
      >
        <h2>➕ Add Food Item</h2>

        <div className="inventory-input-grid">
          <input
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            min="0"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Price ₹"
            min="0"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Add Item
        </button>
      </form>

      <div className="inventory-heading">
        <div>
          <h2>Current Inventory</h2>
          <p>
            {items.length} food item
            {items.length !== 1
              ? "s"
              : ""}{" "}
            in inventory
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-inventory">
          <div>📦</div>
          <h3>No inventory items</h3>
          <p>
            Add your first food item
            above.
          </p>
        </div>
      ) : (
        <div className="inventory-grid">
          {items.map((item) => (
            <div
              className="inventory-card"
              key={item._id}
            >
              <div className="inventory-card-top">
                <div className="inventory-food-icon">
                  {item.name === "Pizza" ||
                  item.name === "Pizzza"
                    ? "🍕"
                    : item.name === "Burger"
                    ? "🍔"
                    : item.name ===
                      "Sandwich"
                    ? "🥪"
                    : item.name ===
                      "Cold Drink"
                    ? "🥤"
                    : "🍴"}
                </div>

                <span
                  className={
                    item.quantity > 0
                      ? "stock-badge available"
                      : "stock-badge empty"
                  }
                >
                  {item.quantity > 0
                    ? "● Available"
                    : "● Out of Stock"}
                </span>
              </div>

              <input
                className="inventory-name"
                type="text"
                value={item.name}
                onChange={(e) => {
                  setItems(
                    items.map((i) =>
                      i._id === item._id
                        ? {
                            ...i,
                            name: e.target.value,
                          }
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
                      setItems(
                        items.map((i) =>
                          i._id === item._id
                            ? {
                                ...i,
                                quantity:
                                  Number(
                                    e.target
                                      .value
                                  ),
                                available:
                                  Number(
                                    e.target
                                      .value
                                  ) > 0,
                              }
                            : i
                        )
                      );
                    }}
                  />
                </div>

                <div>
                  <label>Price</label>

                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) => {
                      setItems(
                        items.map((i) =>
                          i._id === item._id
                            ? {
                                ...i,
                                price:
                                  Number(
                                    e.target
                                      .value
                                  ),
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
                  onClick={() =>
                    updateItem(item)
                  }
                >
                  Save Changes
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteItem(item._id)
                  }
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