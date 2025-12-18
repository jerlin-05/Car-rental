export default function Success() {
  return (
    <div className="page">
      <div className="card" style={{ textAlign: "center", padding: "40px" }}>
        <h1>🎉 Booking Successful!</h1>
        <p>Your payment has been completed.</p>

        <a href="/" className="btn" style={{ marginTop: "20px", display: "inline-block" }}>
          Go Home
        </a>
      </div>
    </div>
  );
}
