const babel = require('@babel/core')
const fs = require('fs-extra')
const nodemon = require('nodemon')
const path = require('path')

const compile = init => new Promise(resolve => {
  init && fs.removeSync('_temp')
  fs.readdirSync('./src')
    .map(x => babel.transformFileSync('src/' + x))
    .map(({ code }) => {
      init && fs.mkdirSync('_temp')
      fs.writeFileSync('_temp/' + 'index.js', code, 'utf8')
    })
    .map(_ => init && console.log('--Compiled--\n'))
    .map(resolve)
})

compile(true).then(_ => {
  nodemon({
    script: path.resolve(process.cwd() + '/_temp/index.js'),
    ext: 'js json'
  })
    .on('quit', _ => compile())
    .on('restart', _ => compile())
})