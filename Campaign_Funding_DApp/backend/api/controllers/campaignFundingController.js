const employees = []; // In-memory store for demonstration purposes

exports.getEmployees = (req, res) => {
  res.status(200).json({ employees });
};
