const path = require('path')
const { PokemonadsCombinators } = require('../../webpack.config')

PokemonadsCombinators.setOutputPath(path.resolve(__dirname, 'dist')).build()
