export function adminAuth(req, res, next) {
  try {
    const isAdmin = req.user?.role === "admin";
    if (!isAdmin) {
      return res.status(403).json({ message: "Admin only access" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
