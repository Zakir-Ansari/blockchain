module.exports = (err, req, res, next) => {
  console.error("Error occurred:", err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
