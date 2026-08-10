export async function getCurrentUser(req, res) {
  const { _id, name, email, profileImage, role } = req.user;
  res.status(200).json({ user: { id: _id, name, email, profileImage, role } });
}
