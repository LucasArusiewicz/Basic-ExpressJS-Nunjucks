const express = require('express')
const nunjucks = require('nunjucks')
const validate = require('./validate')

const app = express()

/** Configurações **/
nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

/** Rotas **/
app.get('/', (req, res) => {
  return res.render('start')
})

app.get('/major', validate, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', validate, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  const view = age >= 18 ? 'major' : 'minor'

  return res.redirect(`/${view}?age=${age}`)
})

app.listen(3000)
