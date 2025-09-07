import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  UserPlus,
  Check,
  Info,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Cart from "./Cart/Cart";
import { CartContext } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useContext(CartContext);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      {/* Top bar */}
      <div style={{ backgroundColor: "#A2D5C6" }} className="py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 d-flex align-items-center text-white small text-capitalize gap-2">
            <Check size={16} /> Order Now!
          </p>

          <div className="d-flex align-items-center gap-3">
            <Link
              to="/faqs"
              className="text-white small text-capitalize text-decoration-none"
            >
              Faqs
            </Link>

            <Link
              to="/help"
              className="d-flex align-items-center gap-1 text-white small text-capitalize text-decoration-none"
            >
              <Info size={16} />
              Need help?
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{ backgroundColor: "#f0f2f3" }}
      >
        <div className="container">
          {/* Brand */}
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
          >
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.8zrUR_lbn_VXejyvLDWrRwHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Add2Kart Logo"
              width="32"
              height="32"
              className="me-2 rounded-circle"
            />
            Add2Kart
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapse */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <form
              className="d-none d-lg-flex mx-auto w-50"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-dark rounded-pill"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Nav items */}
            <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
              <li className="nav-item">
                <button
                  className="btn position-relative"
                  onClick={() => setCartOpen(true)}
                  aria-label="Open Cart"
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-success text-dark">
                      {cartCount}
                    </span>
                  )}
                  <span className="d-lg-none ms-2">Cart</span>
                </button>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-dark btn-sm rounded-circle it"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User size={18} />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userMenu"
                >
                  {!loading && user ? (
                    <>
                      <li>
                        <Link to="/dashboard" className="dropdown-item">
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/auth/login" className="dropdown-item">
                          <LogIn size={16} /> Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/register" className="dropdown-item">
                          <UserPlus size={16} /> Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Cart modal */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}
