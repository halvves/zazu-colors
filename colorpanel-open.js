const exec = require('child_process').exec
const path = require('path')

const openPanel = () => {
  return 'osascript -e \'tell application \"Finder\"\' -e \'activate\' -e \'choose color\' -e \'end tell\''
}

module.exports = (pluginContext) => {
  return () => {
    return new Promise((resolve, reject) => {
      exec(openPanel(), resolve)
    })
  }
}
