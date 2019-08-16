const liSDK = require('@livingdocs/node-sdk')
const resolveIncludes = require('../includes')
const renderLayout = require('../rendering/layout')

module.exports = function commonRouteHandler ({liClient, conf}) {
  const headerMenuHandle = conf.get('navigation:headerMenuHandle')
  const popnaviMenuHandle = conf.get('navigation:popnaviMenuHandle')
  const footerMenuHandle = conf.get('navigation:footerMenuHandle')
  const includesConfig = conf.get('includes')
  const defaultContentType = conf.get('defaultContentType')
  const contentTypes = conf.get('contentTypes')

  return async (req, res, next) => {
    // our retrieved publication
    const publication = req.publication
    // not found
    if (!publication) return next(new Error(`Page not found, requested url was "${req.url}"`))

    // get the design
    const design = require('../../design/dist/design.json')

    // create a Livingdoc instance using the serialized content & built design
    let livingdoc = {}
    try {
      const content = publication.content
      livingdoc = liSDK.document.create({design, content})
    } catch (error) {
      return next(error)
    }

    // get the location & menu for navigation purposes
    const location = req.url
    let menu = {}
    try {
      [menu] = await liClient.getMenus({handle: headerMenuHandle})
    } catch (error) {
      console.error('Couldn\'t get the header menu', error)
    }

    let popnavimenu = {}
    try {
      [popnavimenu] = await liClient.getMenus({handle: popnaviMenuHandle})
    } catch (error) {
      console.error('Couldn\'t get the header menu', error)
    }

    let footermenu = {}
    try {
      [footermenu] = await liClient.getMenus({handle: footerMenuHandle})
    } catch (error) {
      console.error('Couldn\'t get the footer menu', error)
    }

    // resolve includes
    try {
      await resolveIncludes(livingdoc, liClient, includesConfig)
    } catch (error) {
      console.error(error)
    }

    // compose layout with the publication livingdoc
    // and render it into the shell
    try {
      const contentType = publication.systemdata.contentType
      const currentContentType = contentTypes && contentTypes[contentType]
      const targetContentType = currentContentType || defaultContentType

      const data = {menu, popnavimenu, footermenu, location}
      const layoutComponents = targetContentType.layoutComponents
      const renderedLayout = renderLayout(design, livingdoc, layoutComponents, data)
      res.render('shell', {...publication, content: renderedLayout})
    } catch (error) {
      next(error)
    }
  }
}
