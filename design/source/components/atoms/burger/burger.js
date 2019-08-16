const $ = require('jquery')

module.exports = (function () {

  const burger = {
    init () {
      const element = $('.a-burger')
      element.click(function () {
        $('.m-popnavi, .m-mobilenavi, .a-burger').toggleClass('is-active')
      })
    }
  }

  return burger
})()
