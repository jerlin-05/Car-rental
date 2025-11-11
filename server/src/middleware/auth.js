import jwt from "jsonwebtoken";

// Read token from "Authorization: Bearer xxx" or cookie "token"
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = payload; // must include { id, role, name, email } in your sign
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Optional role guards
export const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};

export const isSellerOrAdmin = (req, res, next) => {
  if (["seller", "admin"].includes(req.user?.role)) return next();
  return res.status(403).json({ message: "Seller or Admin only" });
};
