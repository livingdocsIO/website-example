const bodyParser = require('body-parser')

module.exports = function setupConfiguration (app) {
  // do not expose that this is an express server
  app.disable('x-powered-by')
  // apply compression
  const hostName = require('os').hostname()
  const compression = require('compression')()
  app.use(function (req, res, next) {
    res.setHeader('X-Served-By', hostName)
    res.setHeader('X-DNS-Prefetch-Control', 'on')
    compression(req, res, next)
  })
  // apply json body parser
  app.use(bodyParser.json())
}
