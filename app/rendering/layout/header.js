const publicationHref = require('../../util/publication_href')

module.exports = function getHeaderComponent (tree,
  {header, headerItem, popnaviItem, popnaviSubitem, breadcrumbItem},
  {menu, popnavimenu, location}) {
  const headerComponent = tree.createComponent(header)
  const headerItemContainer = headerComponent.containers.get('header-item')
  const popnaviItemContainer = headerComponent.containers.get('popnavi-item')
  const breadcrumbItemContainer = headerComponent.containers.get('breadcrumb-item')

  let menuNodes = menu.nodes || []
  for (const node of menuNodes) {
    const headerItemComponent = tree.createComponent(headerItem)

    const headerItemContent = getHeaderItemContent(node)
    headerItemComponent.setContent(headerItemContent)

    const isCurrent = isCurrentLocation(node, location)
    if (isCurrent) {
      headerItemComponent.setStyle('selected-menu', 'is-active')
    }
    headerItemContainer.append(headerItemComponent)
  }

  menuNodes = popnavimenu.nodes || []
  for (const node of menuNodes) {
    const popnaviItemComponent = tree.createComponent(popnaviItem)

    const popnaviItemContent = getHeaderItemContent(node)
    popnaviItemComponent.setContent(popnaviItemContent)

    const isCurrent = isCurrentLocation(node, location)
    if (isCurrent) {
      popnaviItemComponent.setStyle('selected-menu', 'is-active')
    }

    const subMenuNodes = node.nodes || []
    const popnaviSubitemContainer = popnaviItemComponent.containers.get('popnavi-subitem')
    for (const subNode of subMenuNodes) {
      const popnaviSubitemComponent = tree.createComponent(popnaviSubitem)

      const popnaviSubitemContent = getHeaderItemContent(subNode)
      popnaviSubitemComponent.setContent(popnaviSubitemContent)

      const isCurrentSub = isCurrentLocation(subNode, location)
      if (isCurrentSub) {
        popnaviSubitemComponent.setStyle('selected-menu', 'is-active')
      }

      popnaviSubitemContainer.append(popnaviSubitemComponent)
    }

    popnaviItemContainer.append(popnaviItemComponent)
  }

  menuNodes = popnavimenu.nodes || []
  const breadcrumbItemComponent = tree.createComponent(breadcrumbItem)
  const breadcrumbSubitemComponent = tree.createComponent(breadcrumbItem)
  let breadcrumbFound = false
  let breadcrumbSubFound = false
  for (const node of menuNodes) {
    const breadcrumbItemContent = getHeaderItemContent(node)
    if (breadcrumbItemContent.text === 'Home') {
      breadcrumbItemContent.text = 'Livingdocs'
    }
    breadcrumbItemComponent.setContent(breadcrumbItemContent)

    const isCurrent = isCurrentLocation(node, location)
    if (isCurrent) {
      breadcrumbFound = true
      break
    } else {
      const subMenuNodes = node.nodes || []
      for (const subNode of subMenuNodes) {
        const breadcrumbSubitemContent = getHeaderItemContent(subNode)
        breadcrumbSubitemComponent.setContent(breadcrumbSubitemContent)

        const isCurrentSub = isCurrentLocation(subNode, location)
        if (isCurrentSub) {
          breadcrumbSubFound = true
          breadcrumbFound = true
          break
        }
      }
      if (breadcrumbSubFound) {
        break
      }
    }
  }
  if (breadcrumbFound) {
    breadcrumbItemContainer.append(breadcrumbItemComponent)
  }
  if (breadcrumbSubFound) {
    breadcrumbItemContainer.append(breadcrumbSubitemComponent)
  }

  return headerComponent
}

function getHeaderItemContent (node) {
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
