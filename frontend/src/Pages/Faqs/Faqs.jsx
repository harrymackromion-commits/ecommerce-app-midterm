import { Accordion } from "react-bootstrap";

export default function Faqs() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">Frequently Asked Questions</h2>

      <Accordion defaultActiveKey="0" flush>
       
        <Accordion.Item eventKey="0">
          <Accordion.Header>How long does shipping take?</Accordion.Header>
          <Accordion.Body>
            Standard shipping usually takes <strong>3–7 business days</strong>.
            Express options are also available at checkout.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Do you offer free shipping?</Accordion.Header>
          <Accordion.Body>
            Yes, we offer <strong>free shipping</strong> on orders over $50.
          </Accordion.Body>
        </Accordion.Item>

  
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            What payment methods do you accept?
          </Accordion.Header>
          <Accordion.Body>
            We accept GCash, PayPal, Credit/Debit cards, and Cash on Delivery
            (COD) in selected locations.
          </Accordion.Body>
        </Accordion.Item>

       
        <Accordion.Item eventKey="3">
          <Accordion.Header>What is your return policy?</Accordion.Header>
          <Accordion.Body>
            You can return unused products within <strong>7 days</strong> of
            delivery. Refunds are processed within 3–5 business days after
            approval.
          </Accordion.Body>
        </Accordion.Item>

       
        <Accordion.Item eventKey="4">
          <Accordion.Header>Are your products authentic?</Accordion.Header>
          <Accordion.Body>
            Yes, all products on <strong>Add2Kart</strong> are 100% genuine and
            sourced directly from verified suppliers.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
