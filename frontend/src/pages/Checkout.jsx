export default function Checkout() {
  return (
    <div className="page">
      <h1>Checkout</h1>

      <div className="card">
        <h2>Booking Summary</h2>

        <p><b>Car:</b> BMW X5</p>
        <p><b>Price:</b> ₹4800/day</p>

        <hr className="line" />

        <button className="btn" style={{ width: "200px" }}>
          Pay with Card
        </button>
      </div>
    </div>
  );
}
