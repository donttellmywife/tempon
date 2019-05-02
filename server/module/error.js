export default function(error, req, res, next) {
  console.log('CUSTOM ERROR: ', error, error.message)
  res.status(505).json('error.message || error.toString()')
}
