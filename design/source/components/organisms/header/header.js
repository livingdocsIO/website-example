const $ = require('jquery')

module.exports = (function () {
  const breakpointTablet = 768
  let lastScrolled = -666

  const header = {
    checkForVisibility () {
      const element = $('.o-header')
      const scrolled = $(window).scrollTop()
      const tabletDesktop = $(window).width() >= breakpointTablet
      if (scrolled > 50 && tabletDesktop) {
        element.addClass('is-hidden')
        $('.m-popnavi, .m-mobilenavi, .a-burger').removeClass('is-active')
      } else {
        element.removeClass('is-hidden')
      }
      if (lastScrolled > scrolled) {
        element.removeClass('is-hidden')
      }
      lastScrolled = scrolled
    },
    init () {
      this.checkForVisibility()
      $(window).scroll(this.checkForVisibility)
      $(window).resize(this.checkForVisibility)

      const element = $('.o-header__more a')
      element.click(function () {
        $('.m-popnavi, .m-mobilenavi, .a-burger').toggleClass('is-active')
      })
    }
  }

  return header
})()
