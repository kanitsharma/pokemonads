const Lectro = require('@lectro/core')
const Buildutils = require('@lectro/enhancer-buildutils')

process.env.NODE_ENV = 'production'
// What? No webpackconfig, don't worry this will spit out webpack config
exports.PokemonadsADTs = new Lectro('node')
  .use(Buildutils)
  .devtool('none')
  .addProgressBar({ name: 'ADTS', color: 'yellow' })

exports.PokemonadsCombinators = new Lectro('node')
  .use(Buildutils)
  .devtool('none')
  .addProgressBar({ name: 'Combinators', color: 'red' })
  .setOutputPath('dist')
