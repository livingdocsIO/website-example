const includesConfig = require('../includes')

module.exports = {
  navigation: {
    headerMenuHandle: 'shortcuts',
    popnaviMenuHandle: 'popnavi',
    footerMenuHandle: 'footer'
  },
  includes: includesConfig,
  design: {
    repository: 'https://server.livingdocs.io'
  },
  imageServices: {
    liImageProxy: {
      host: 'https://server.livingdocs.io',
      proxyEndpoint: 'api/v1/images',
      preferWebp: true,
      backgroundImage: {maxWidth: 1024},
      srcSet: {
        defaultWidth: 1024,
        widths: [1024, 750, 620, 450, 320],
        sizes: [
          '(min-width: 1024px) 994px',
          '(min-width: 768px) 726px',
          '(min-width: 480px) 428px', '100vw'
        ]
      }
    },
    imgix: {
      host: 'https://livingdocs-images.imgix.net',
      preferWebp: true,
      backgroundImage: {
        maxWidth: 1024
      },
      srcSet: {
        defaultWidth: 1024,
        widths: [1024, 750, 620, 450, 320],
        sizes: [
          '(min-width: 1024px) 994px',
          '(min-width: 768px) 726px',
          '(min-width: 480px) 428px', '100vw'
        ]
      }
    }
  },
  defaultContentType: {
    layoutComponents: {
      layout: 'view',
      header: 'header',
      headerItem: 'headeritem',
      popnaviItem: 'popnaviitem',
      popnaviSubitem: 'popnavisubitem',
      breadcrumbItem: 'breadcrumbitem',
      footer: 'footer',
      footerItem: 'footeritem',
      mobilenavi: 'mobilenavi'
    }
  },
  contentTypes: {
    'page-dark': {
      layoutComponents: {
        layout: 'view-dark',
        header: 'header',
        headerItem: 'headeritem',
        popnaviItem: 'popnaviitem',
        popnaviSubitem: 'popnavisubitem',
        breadcrumbItem: 'breadcrumbitem',
        footer: 'footer',
        footerItem: 'footeritem',
        mobilenavi: 'mobilenavi'
      }
    },
    'page-start': {
      layoutComponents: {
        layout: 'view-start',
        header: 'header',
        headerItem: 'headeritem',
        popnaviItem: 'popnaviitem',
        popnaviSubitem: 'popnavisubitem',
        breadcrumbItem: 'breadcrumbitem',
        footer: 'footer',
        footerItem: 'footeritem',
        mobilenavi: 'mobilenavi'
      }
    },
    'regular': {
      layoutComponents: {
        layout: 'view-regular',
        header: 'header',
        headerItem: 'headeritem',
        popnaviItem: 'popnaviitem',
        popnaviSubitem: 'popnavisubitem',
        breadcrumbItem: 'breadcrumbitem',
        footer: 'footer',
        footerItem: 'footeritem',
        mobilenavi: 'mobilenavi'
      }
    }
  }
}
