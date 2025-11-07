export const sellerDashboard = async (req, res) => {
  res.json({ message: `Welcome, ${req.user.name} (seller)` });
};