export default function(error, req, res, next) {
  console.log('CUSTOM ERROR: ', error, error.message)
  res.status(506).json({
    error: `${error.message || error.toString()}`
  })
}
