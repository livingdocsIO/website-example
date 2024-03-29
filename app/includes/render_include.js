const liSDK = require('@livingdocs/node-sdk')

module.exports = async function renderInclude (
  liClient, livingdoc, layout, includeConfig, publication
) {
  const layoutConfig = includeConfig.layouts[layout]
  const component = livingdoc.createComponent(layoutConfig.template)

  const includeContent = getIncludeContent(layoutConfig.contentSpec, publication)
  const enrichmentArgs = [layoutConfig.contentEnrichments, liClient, component, publication]
  const enrichments = await getContentEnrichments(...enrichmentArgs)

  component.setContent({...includeContent, ...enrichments})
  return liSDK.document.renderComponent(component)
}

function getIncludeContent (contentSpec, publication) {
  return Object.keys(contentSpec)
    .reduce((accumulator, prop) => {
      const contentPropExtractor = contentSpec[prop]
      const accumulatedContent = {}
      accumulatedContent[prop] = contentPropExtractor(publication)
      return {...accumulator, ...accumulatedContent}
    }, {})
}

async function getContentEnrichments (contentEnrichments = [], liClient, component, publication) {
  const pendingEnrichments = contentEnrichments
    .map(contentEnrichment => contentEnrichment({liClient, component, publication}))
  let enrichments = {}
  for (const pendingEnrichment of pendingEnrichments) {
    const resolvedContentEnrichment = await pendingEnrichment || {}
    enrichments = {...enrichments, ...resolvedContentEnrichment}
  }
  return enrichments
}
