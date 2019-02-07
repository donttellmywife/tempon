export default function(error, req, res, next) {
  res.status(500).json(error.message || error.toString())
}
