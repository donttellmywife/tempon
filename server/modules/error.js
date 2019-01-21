export default function(error, req, res, next) {
  console.error(error.stack)
  res.status(500).json(error.message || error.toString())
}
