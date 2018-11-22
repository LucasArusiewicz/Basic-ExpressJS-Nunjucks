module.exports = (req, res, next) => {
  const { age } = req.query

  return !age ? res.redirect('/') : next()
}
