/* eslint-disable */

const $ = require('jquery')

module.exports = (function () {
  let scrolled = 0
  let windowHeight = $(window).height()

  const view = {
    handleSimpleTriggerAnimations () {
      const animatedElements = $('*[data-simpleTrigger="true"]:visible')
      animatedElements.each(function () {
        let simpleTriggerPos = 0.9 /* of viewport height */
        const offset = $(this).offset().top
        const triggerPoint = (scrolled + (windowHeight * simpleTriggerPos))

        if (offset < triggerPoint) {
          $(this).addClass('is-triggered')
        }
      })
    },
    triggerAllAnimations () {
      const animatedElements = $('*[data-simpleTrigger="true"]:visible')
      animatedElements.addClass('is-triggered')
    },
    handleResize () {
      view.handleScroll()
      windowHeight = $(window).height()
    },
    handleScroll () {
      scrolled = $(window).scrollTop()
      view.handleSimpleTriggerAnimations()
    },
    init () {
      $(window).scroll(this.handleScroll)
      $(window).resize(this.handleResize)
      view.handleScroll()
    }
  }

  return view
})()
