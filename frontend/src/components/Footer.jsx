import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 CarRental. All rights reserved.</p>

      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </footer>
  );
}
