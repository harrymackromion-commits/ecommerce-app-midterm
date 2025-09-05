import Card from "react-bootstrap/Card";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">Need Help?</h2>
      <p className="text-center text-muted mb-5">
        We’re here to assist you. Choose an option below or contact us directly.
      </p>

      <div className="row g-4">
   
        <div className="col-md-4">
          <Card className="h-100 shadow-sm text-center p-3">
            <Mail size={32} className="mx-auto text-primary mb-3" />
            <h5>Email Support</h5>
            <p className="text-muted">
              Send us an email and we’ll reply within 24 hours.
            </p>
            <a
              href="mailto:support@add2kart.com"
              className="btn btn-outline-primary"
            >
              support@add2kart.com
            </a>
          </Card>
        </div>

       
        <div className="col-md-4">
          <Card className="h-100 shadow-sm text-center p-3">
            <Phone size={32} className="mx-auto text-success mb-3" />
            <h5>Call Us</h5>
            <p className="text-muted">
              Talk to our support team for urgent inquiries.
            </p>
            <a href="tel:+639123456789" className="btn btn-outline-success">
              +63 912 345 6789
            </a>
          </Card>
        </div>

        {/* Live Chat */}
        <div className="col-md-4">
          <Card className="h-100 shadow-sm text-center p-3">
            <MessageCircle size={32} className="mx-auto text-info mb-3" />
            <h5>Live Chat</h5>
            <p className="text-muted">
              Chat with our team instantly for real-time support.
            </p>
            <button className="btn btn-outline-info">Start Chat</button>
          </Card>
        </div>
      </div>
    </div>
  );
}
