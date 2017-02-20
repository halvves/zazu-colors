module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return query.match(/^#$/i)
    },
    search: (query, env = {}) => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            icon: 'fa-paint-brush',
            title: 'Open OSX Color Panel',
            subtitle: 'Action this item to open the native color panel.',
            value: ''
          }
        ])
      })
    }
  }
}
