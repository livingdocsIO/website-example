const $ = require('jquery')

module.exports = (function () {
  const mobilenavi = {
    checkForVisibility () {
      const element = $('.m-mobilenavi')
      const scrolled = $(window).scrollTop()
      const distanceToEnd = $(document).height() - $(window).scrollTop() - $(window).height()
      if (scrolled > 50 && distanceToEnd > 100) {
        element.addClass('is-visible')
      } else {
        element.removeClass('is-visible')
      }
    },
    init () {
      this.checkForVisibility()
      $(window).scroll(this.checkForVisibility)
      $(window).resize(this.checkForVisibility)
    }
  }

  return mobilenavi
})()
