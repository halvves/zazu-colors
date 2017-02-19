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
      const prev = (bgColor, textColor, text) => (`
        <style>
          body {
            background-color:${bgColor};
            display:flex;
            align-items: center;
            justify-content: center;
          }
          .prev-text {
            font-family: monospace;
            color: ${textColor};
          }
        </style>
        <div class="prev-text">${text}</div>`)
      const tColor = c.dark() ? '#fff' : '#000'
      const cHex = c.hex()
      const cRgb = c.rgb().string()
      const cRgbPerc = c.rgb().percentString()
      const cHsl = c.hsl().round().string()
      return new Promise((resolve, reject) => {
        resolve([
          {
            icon: 'fa-paint-brush',
            title: cHex,
            subtitle: 'CSS - Hexadecimal',
            value: cHex,
            preview: prev(cHex, tColor, cHex)
          },
          {
            icon: 'fa-paint-brush',
            title: cRgb,
            subtitle: 'CSS - RGB',
            value: cRgb,
            preview: prev(cHex, tColor, cRgb)
          },
          {
            icon: 'fa-paint-brush',
            title: cRgbPerc,
            subtitle: 'CSS - RGB Percent',
            value: cRgbPerc,
            preview: prev(cHex, tColor, cRgbPerc)
          },
          {
            icon: 'fa-paint-brush',
            title: cHsl,
            subtitle: 'CSS - HSL',
            value: cHsl,
            preview: prev(cHex, tColor, cHsl)
          }
        ])
      })
    }
  }
}
