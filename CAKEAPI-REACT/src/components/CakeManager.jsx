import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const CakeManager = () => {
  const [cakes, setCakes] = useState([]);
  const [cake, setCake] = useState({
    id: "",
    name: "",
    flavor: "",
    price: "",
    type: "",
    availability: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  // ✅ Load backend API base URL from Vite .env
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("✅ Backend Base URL:", baseUrl);
    if (!baseUrl) {
      console.error("❌ VITE_API_URL is not defined. Check your .env file.");
      setMessage("⚠️ Backend URL missing. Check your .env file.");
    } else {
      fetchAllCakes();
    }
  }, [baseUrl]);

  const fetchAllCakes = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setCakes(res.data);
    } catch (error) {
      console.error("Error fetching cakes:", error);
      setMessage("🍰 Failed to load cakes.");
    }
  };

  const handleChange = (e) => {
    setCake({ ...cake, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${baseUrl}/update`, cake);
        setMessage("✅ Cake updated successfully!");
      } else {
        await axios.post(`${baseUrl}/add`, cake);
        setMessage("🎂 Cake added successfully!");
      }
      fetchAllCakes();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  const handleEdit = (selectedCake) => {
    setCake(selectedCake);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage("🗑️ Cake deleted.");
      fetchAllCakes();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("❌ Error deleting cake.");
    }
  };

  const resetForm = () => {
    setCake({
      id: "",
      name: "",
      flavor: "",
      price: "",
      type: "",
      availability: "",
    });
    setEditMode(false);
  };

  return (
    <div className="cake-dashboard">
      {message && <div className="toast">{message}</div>}

      <header className="cake-header">
        <h1>🍰 Cake Manager</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Add Cake
        </button>
      </header>

      <div className="cake-grid">
        {cakes.length === 0 ? (
          <p className="empty">No cakes found. Add one!</p>
        ) : (
          cakes.map((c) => (
            <div className="cake-card" key={c.id}>
              <h3>{c.name}</h3>
              <p><strong>Flavor:</strong> {c.flavor}</p>
              <p><strong>Price:</strong> ₹{c.price}</p>
              <p><strong>Type:</strong> {c.type}</p>
              <p><strong>Availability:</strong> {c.availability}</p>
              <div className="cake-actions">
                <button className="btn-edit" onClick={() => handleEdit(c)}>✏️ Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(c.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editMode ? "Edit Cake" : "Add New Cake"}</h2>
            <input
              type="text"
              name="name"
              placeholder="Cake Name"
              value={cake.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="flavor"
              placeholder="Flavor"
              value={cake.flavor}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={cake.price}
              onChange={handleChange}
            />
            <select name="type" value={cake.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Eggless">Eggless</option>
              <option value="With Egg">With Egg</option>
            </select>
            <select
              name="availability"
              value={cake.availability}
              onChange={handleChange}
            >
              <option value="">Availability</option>
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <div className="modal-actions">
              <button className="btn-green" onClick={handleSubmit}>
                {editMode ? "Update Cake" : "Add Cake"}
              </button>
              <button
                className="btn-gray"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakeManager;
