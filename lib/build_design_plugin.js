const fs = require('fs')
const Design = require('livingdocs-manager')
const cheerio = require('cheerio')
const htmlmin = require('html-minifier')
const getDesign = require('./design_getter')

module.exports = function BuildDesignPlugin (options) {
  this.apply = function (compiler) {
    compiler.plugin('after-emit', function (compilation, callback) {
      const designModel = Design.build(options)
      designModel
        .on('warn', function onWarning (warning) {
          console.warn(warning) // eslint-disable-line
        })
        .on('error', function onError (err) {
          callback(err)
        })
        .on('end', function onEnd () {
          reworkDesign(designModel, options, callback)
        })
    })
  }
}

function reworkDesign (designModel, options, callback) {
  if (options.rewriteImageSources.disable) return callback(null)

  // correct relative image sources
  const base = options.rewriteImageSources.base
  const designPath = `${options.dest}/design.json`
  getDesign(designPath, (err, design) => {
    if (err) return callback(err)

    design.components.forEach(component => {
      if (!component.html) return

      const $ = cheerio.load(component.html)

      let hasChange = false
      $('img[src]').each(function () {
        const src = $(this).attr('src')
        if (!src) return

        const absoluteUrlPattern = /^https?:\/\/|^\/\//i
        const isAbsolute = absoluteUrlPattern.test(src)
        if (isAbsolute) return

        const newSrc = `${base}/designs/${design.name}/${design.version}${src}`
        $(this).attr('src', newSrc)
        hasChange = true
      })

      if (!hasChange) return

      component.html = htmlmin.minify($.html(), designModel.options.minify)
    })

    const designString = JSON.stringify(design, null, 0)
    fs.writeFile(designPath, designString, (err) => {
      if (err) return callback(err)
      return callback(null)
    })
  })
}
