import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">About Us</h5>
            <p className="text-muted">
              We provide high-quality tech products to enhance your digital
              experience. Our commitment is to deliver exceptional service and
              innovation.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none hover-opacity"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none hover-opacity"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none hover-opacity"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none hover-opacity"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center p-2 hover-opacity"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center p-2 hover-opacity"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center p-2 hover-opacity"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center p-2 hover-opacity"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center pb-3">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} Add2Kart. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .hover-opacity:hover {
          opacity: 0.8;
          transition: 0.3s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
