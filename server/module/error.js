export default function(error, req, res, next) {
  console.log('error:!!!!', error, error.message)
  res.status(505).json('error.message || error.toString()')
}
