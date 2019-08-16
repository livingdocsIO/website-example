/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const liSDK = require('@livingdocs/node-sdk')
const conf = require('../conf')
const publicationHref = require('./util/publication_href')

const port = process.env.PORT || 8080
const distPath = path.join(__dirname, '../design/dist')

// get a livingdocs api client instance
const liClientConfig = conf.get('client')
const liClient = new liSDK.Client(liClientConfig)

const app = express()
app.use(express.static(distPath))

// setup app configurations
require('./setup/configuration')(app)

// setup dev middlewares and watchers
if (process.env.NODE_ENV === 'development') {
  require('../lib/dev_setup')({
    app,
    designPath: path.join(distPath, 'design.json'),
    onDesignChanged () {
      Object.keys(require.cache).forEach(id => {
        if (/design\.json$/.test(id)) delete require.cache[id]
      })
    }
  })
}

// setup rendering
require('./setup/rendering')(app)

// version endpoint for probing etc.
app.get('/version', function (req, res) {
  res.status(200).send(require('../package.json').version)
})

app.get('/how-to', function (req, res) {
  res.redirect(301, '/user-guide-3')
})

const pssstRedirects = ['/psst', '/pst', '/pstt', '/psstt', '/psttt', '/pssttt', '/pssst']
for (const redirect of pssstRedirects) {
  app.get(redirect, function (req, res) {
    res.redirect(301, 'https://edit.livingdocs.io/signup')
  })
}

// routes
app.get('/', require('./routes/home')({liClient}))
app.get(publicationHref.getPathRegex(), require('./routes/publications')({liClient}))
app.get('*', require('./routes/common')({liClient, conf}))

// setup error handling
require('./setup/error_handling')(app)

// go
app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> website started at http://0.0.0.0:%s/', port)
})
