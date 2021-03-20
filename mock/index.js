// eslint-disable-next-line @typescript-eslint/no-var-requires
const modules = require('./modules')

module.exports = (app) => {
  modules.forEach((item) => {
    for (const [path, target] of Object.entries(item)) {
      const protocol = path.split('|')
      app[protocol[0]]([`/mock${protocol[1]}`], (req, res) => {
        res.send(target)
      })
    }
  })
}
