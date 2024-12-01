module.exports = (req, res, next) => {
  const accessId = req.headers["app-access-id"];
  const secretKey = process.env.SECRET_KEY;

  if (!accessId || accessId !== secretKey) {
    return res.status(403).json({ error: "Forbidden: Invalid App Access ID" });
  }

  next();
};
