const publicationHref = require('../../util/publication_href')

module.exports = function getFooterComponent (tree, {footer, footerItem}, {footermenu, location}) {
  const footerComponent = tree.createComponent(footer)
  const footerItemContainer = footerComponent.containers.get('footer-item')

  const menuNodes = footermenu.nodes || []
  for (const node of menuNodes) {
    const footerItemComponent = tree.createComponent(footerItem)

    const footerItemContent = getFooterItemContent(node)
    footerItemComponent.setContent(footerItemContent)

    const isCurrent = isCurrentLocation(node, location)
    if (isCurrent) {
      footerItemComponent.setStyle('selected-menu', 'is-active')
    }

    footerItemContainer.append(footerItemComponent)
  }

  return footerComponent
}

function getFooterItemContent (node) {
  return {
    link: getHref(node),
    text: node.label || ''
  }
}

function isCurrentLocation (node, location) {
  let strippedUri = String(node.uri)
  strippedUri = strippedUri.replace(/https?:\/\/[^/]+/i, '')

  if (node.label === 'Home' && location === '/') return true

  switch (node.type) {
    case 'document':
      return location === publicationHref.generate(node.label, node.documentId)
    case 'uri':
      return (location === node.uri || location === strippedUri)
    default:
      return false
  }
}

function getHref (node) {
  switch (node.type) {
    case 'document':
      return publicationHref.generate(node.label, node.documentId)
    case 'uri':
      return node.uri
    default:
      return '#'
  }
}
