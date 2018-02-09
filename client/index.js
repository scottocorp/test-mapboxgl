import cors from 'cors'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import configFactory from './webpack.config.babel.js'

const PORT = process.env.PORT || 3000

const app = express()
const config = configFactory()
const compiler = webpack(config)
const middleware = webpackDevMiddleware(compiler)

app.use(cors())
app.use(middleware)

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(
    middleware.fileSystem.readFileSync(config.output.path + '/index.html')
  )
})

app.listen(PORT, err => {
  if (err) {
    throw err
  }
  console.log(`Listening on http://localhost:${PORT}/`)
})
