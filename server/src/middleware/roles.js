export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") return res.status(403).json({ message: "Forbidden: admin only" });
  next();
};

export const requireSeller = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") return res.status(403).json({ message: "Forbidden: seller only" });
  next();
};

export const requireAdminOrSeller = (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "seller")) {
    return res.status(403).json({ message: "Forbidden: admin or seller only" });
  }
  next();
};
