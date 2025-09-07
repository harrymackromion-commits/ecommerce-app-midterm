import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useLocation } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [expand, setExpand] = useState(null);

  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("http://localhost:8000/api/product/getProduct.php");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    };
    loadProducts();
  }, []);


  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm) ||
          p.description?.toLowerCase().includes(searchTerm)
      )
    : products;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center fw-bold">Products</h2>
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, index) => (
            <div className="col-md-4 col-sm-6" key={p.id || index}>
              <div
                className="card h-100 shadow-sm"
                onDoubleClick={() => setExpand(expand === p.id ? null : p.id)}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ height: "200px" }}
                  >
                    <span className="text-muted">No Image</span>
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  {expand === p.id && (
                    <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                      {p.description || "No description available."}
                    </p>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success fs-6">
                      ₱{Number(p.price).toLocaleString()}
                    </span>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted py-5 fs-4">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
