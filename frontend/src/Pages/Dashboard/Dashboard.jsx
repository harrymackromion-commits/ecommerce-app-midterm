import { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });

  const loadProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/product/myProducts.php",
        { credentials: "include" }
      );
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/Userlog.php", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setProfile({
            username: data.user.username || "",
            email: data.user.email || "",
            password: "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    loadProfile();
  }, []);

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductForm({ ...productForm, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const resetProductForm = () => {
    setProductForm({ name: "", price: "", description: "", image: null });
    setEditingProduct(null);
    setPreview(null);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("price", productForm.price);
    formData.append("description", productForm.description);
    if (productForm.image) formData.append("image", productForm.image);

    let url = "http://localhost:8000/api/product/addProduct.php";
    if (editingProduct) {
      url = "http://localhost:8000/api/product/updateProduct.php";
      formData.append("id", editingProduct.id);
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include", 
      });
      const data = await res.json();
      if (data.success) {
        loadProducts();
        resetProductForm();
        setShowProductModal(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
    setPreview(product.image);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/product/deleteProduct.php",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          credentials: "include", 
        }
      );
      const data = await res.json();
      if (data.success) loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/updateProfile.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully");
        setShowProfileModal(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setShowProductModal(true)}
        >
          Add Product
        </button>
        <button
          className="btn btn-info"
          onClick={() => setShowProfileModal(true)}
        >
          Update Profile
        </button>
      </div>

      {/* Products List */}
      <ul className="list-group">
        {products.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    marginRight: 10,
                  }}
                />
              )}
              <div>
                <strong>{p.name}</strong>
                <p className="mb-0">{p.description}</p>
                <span className="badge bg-success">₱{p.price}</span>
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditProduct(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowProductModal(false);
                    resetProductForm();
                  }}
                />
              </div>
              <form onSubmit={handleSubmitProduct}>
                <div className="modal-body">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={productForm.name}
                    onChange={handleProductChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={productForm.price}
                    onChange={handleProductChange}
                    className="form-control mb-2"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={productForm.description}
                    onChange={handleProductChange}
                    className="form-control mb-2"
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={handleProductChange}
                    className="form-control mb-2"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginTop: 10,
                      }}
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowProductModal(false);
                      resetProductForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    {editingProduct ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProfileModal(false)}
                />
              </div>
              <form onSubmit={handleSubmitProfile}>
                <div className="modal-body">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={profile.username}
                    onChange={handleProfileChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={profile.password}
                    onChange={handleProfileChange}
                    className="form-control mb-2"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowProfileModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
