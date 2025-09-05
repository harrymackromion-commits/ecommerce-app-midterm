import { useEffect, useState } from "react";

export default function Banner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          "http://localhost:8000/api/product/getProduct.php"
        );
        const data = await res.json();
        if (data.success) {
          setProducts((data.products || []).slice(0, 3));
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (products.length === 0)
    return <p className="text-center">No products available</p>;

  return (
    <div className="w-100 h-100">
      <div
        className="shadow-lg p-4"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          id="bannerCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {products.map((p, i) => (
              <div
                key={p.id}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <div className="d-flex justify-content-center p-5">
                  <div className="position-relative d-flex justify-content-center">
                    <div
                      className="position-absolute rounded-circle shadow"
                      style={{
                        width: 320,
                        height: 320,
                        background: "rgba(128, 128, 128, 0.35)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        zIndex: -1,
                      }}
                    ></div>
                    <img
                      src={p.image} 
                      alt={p.name || `Product ${p.id}`}
                      className="img-fluid"
                      style={{
                        maxHeight: 300,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
