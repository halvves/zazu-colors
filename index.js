const color = require('color')

module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return query.match(/^#(?:[0-9a-f]{1,6})$/i) ||
        query.match(/^rgb\(.*$/i) ||
        query.match(/^hsl\(.*$/i)
    },
    search: (query, env = {}) => {
      let colorData = query
      if (colorData.match(/^#(?:[0-9a-f]{1,6})$/i)) {
        for (let i = 0; i < 9; i++) {
          if (colorData.length > 1 && colorData.length < 4) {
            colorData = `${colorData}0`
          } else if (colorData.length > 4 && colorData.length < 7) {
            colorData = `${colorData}0`
          }
        }
      }
      const c = color(colorData)
      return new Promise((resolve, reject) => {
        resolve([
          {
            icon: 'fa-paint-brush',
            title: c.hex(),
            subtitle: 'CSS - Hexadecimal',
            value: c.hex(),
            preview: `<style>body{background-color:${c.hex()};}</style>`
          },
          {
            icon: 'fa-paint-brush',
            title: c.rgb().string(),
            subtitle: 'CSS - RGB',
            value: c.rgb().string(),
            preview: `<style>body{background-color:${c.hex()};}</style>`
          },
          {
            icon: 'fa-paint-brush',
            title: c.rgb().percentString(),
            subtitle: 'CSS - RGB Percent',
            value: c.rgb().percentString(),
            preview: `<style>body{background-color:${c.hex()};}</style>`
          },
          {
            icon: 'fa-paint-brush',
            title: c.hsl().round().string(),
            subtitle: 'CSS - HSL',
            value: c.hsl().round().string(),
            preview: `<style>body{background-color:${c.hex()};}</style>`
          }
        ])
      })
    }
  }
}
