export const getMyProfile = async (req, res) => {
  res.json({ profile: req.user });
};