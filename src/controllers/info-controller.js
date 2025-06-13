function info(req, res) {
  res.json({ Status: "OK", SERVICE: "AUTH" });
}

module.exports = info;
