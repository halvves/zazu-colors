module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return query.match(/#?\d\d\d\d?\d?\d?/)
    },
    search: (query, env = {}) => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            icon: '',
            title: query,
            subtitle: 'Select item to copy the value to the clipboard.',
            value: 'yo'
          }
        ])
      })
    }
  }
}
