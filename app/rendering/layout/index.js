const liSDK = require('@livingdocs/node-sdk')
const getHeaderComponent = require('./header')
const getFooterComponent = require('./footer')
const conf = require('../../../conf')
const _ = require('lodash')

module.exports = function renderLayout (design, livingdoc,
  {layout, header, headerItem, popnaviItem, popnaviSubitem,
    breadcrumbItem, footer, footerItem, mobilenavi},
  {menu, popnavimenu, footermenu, location}
) {
  const imageServicesConfig = conf.get('imageServices', {})
  const config = {}
  if (!_.isEmpty(imageServicesConfig)) config.imageServices = imageServicesConfig

  const wrapperLivingdoc = liSDK.document.create({design, content: {}, config})
  const tree = wrapperLivingdoc.componentTree

  const layoutComponent = tree.createComponent(layout)

  const headerComponent = getHeaderComponent(tree,
    {header, headerItem, popnaviItem, popnaviSubitem, breadcrumbItem},
    {menu, popnavimenu, location})
  layoutComponent.append('header', headerComponent)

  const contentContainer = layoutComponent.containers.get('content')
  contentContainer.appendTree(livingdoc.componentTree)

  const footerComponent = getFooterComponent(tree, {footer, footerItem}, {footermenu, location})
  layoutComponent.append('footer', footerComponent)

  const mobilenaviComponent = tree.createComponent(mobilenavi)
  layoutComponent.append('mobilenavi', mobilenaviComponent)

  tree.append(layoutComponent)
  return liSDK.document.render(wrapperLivingdoc)
}
