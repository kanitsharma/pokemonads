const path = require('path')
const { PokemonadsADTs } = require('../../webpack.config')

PokemonadsADTs.setOutputPath(path.resolve(__dirname, 'dist')).build()
