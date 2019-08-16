require('../stylesheets/styles.scss')

// expose jQuery | $
const $ = require('jquery')
window.jQuery = window.$ = $

// expose Gifffer for e.g. "browser" component
// window.Gifffer = require('gifffer')

// Note: As of version 1.4.0, the IntersectionObserver
// polyfill has been removed from the scrollama build
require('intersection-observer')

const burger = require('../components/atoms/burger/burger')
const mobilenavi = require('../components/molecules/mobilenavi/mobilenavi')
const header = require('../components/organisms/header/header')
const team = require('../components/molecules/team/team')
const view = require('../components/organisms/view/view')

$(document).ready(function () {
  burger.init()
  mobilenavi.init()
  header.init()
  team.init()
  view.init()
})
