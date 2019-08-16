const $ = require('jquery')

module.exports = (function () {

  const pagehead = {
    init_header_eagle () {
      const hasPageHeader = $('.m-pagehead__text').length
      if (hasPageHeader) {
        let content = $('.m-pagehead__text').html()
        content = content.replace(/(\w+|\s)/g, '<word>$1</word>')
        $('.m-pagehead__text').html(content)
        pagehead.position_header_eagle()
      }
    },
    position_header_eagle () {
      let totalWidth = 0
      $('.m-pagehead__text word').each(function () {
        const top = $(this)[0].offsetTop
        if (top < 10) {
          totalWidth += $(this).width()
        }
      })
      $('.m-pagehead__eagle').css('left', totalWidth)
    },
    init () {
      setTimeout(function () {
        const isEditor = $('.liEditor').length
        if (!isEditor) {
          pagehead.init_header_eagle()
          $(window).resize(pagehead.position_header_eagle)
        }
      }, 50)
    }
  }

  return pagehead
})()
