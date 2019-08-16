const $ = require('jquery')

module.exports = (function () {

  const team = {
    init () {
      const isDesktop = $(window).width() >= 1240

      if (isDesktop) {
        $(document).on('mouseenter', '.m-team .m-frontandback', function () {
          $(this).addClass('is-flipped')
        })

        $(document).on('mouseleave', '.m-team .m-frontandback', function () {
          $(this).removeClass('is-flipped')
        })
      } else {
        $(document).on('click touchstart', '.m-team .m-frontandback', function () {
          $('.m-team .m-frontandback').removeClass('is-flipped')
          $(this).addClass('is-flipped')
        })

        $(document).on('click touchstart', '.m-team .m-team__box:empty', function () {
          $('.m-team .m-frontandback').removeClass('is-flipped')
        })
      }
    }
  }

  return team
})()
