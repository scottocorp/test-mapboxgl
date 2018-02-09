import cors from 'cors'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import configFactory from './client/webpack.config.babel.js'
// import schema from './schema'
import { json } from 'body-parser'
// import { graphql } from 'graphql'
// import Knex from 'knex'
// import { Model } from 'objection'
// import { getConfig } from './resolvers'
// import knexConfig from './knexfile'

const PORT = process.env.PORT || 3002

// So the models have a db instance
//Model.knex(Knex(knexConfig))

const app = express()
const config = configFactory()
const compiler = webpack(config)
const middleware = webpackDevMiddleware(compiler)

app.use(cors())
app.use(middleware)

// app.post('/graphql', json(), (req, res) => {
//   const { query, variables } = req.body
//   const rootValue = {}
//   let operationName
//   const ctx = require('./dev-sitesurvey-config.json')
//   graphql(schema, query, rootValue, ctx, variables, operationName)
//     .then(d => {
//       res
//         .status(200)
//         .set('Content-Type', 'application/json')
//         .send(JSON.stringify(d))
//     })
//     .catch(e => {
//       res
//         .status(500)
//         .set('Content-Type', 'application/json')
//         .send(JSON.stringify(e))
//     })
// })
//
// app.get('/thumb/*', (req, res) => {
//   res.redirect(`https://smc-rozelle.arup.digital${req.url}`)
// })
//
// //TODO - remove this - once we have that sorted.
// app.get('/photos/*', (req, res) => {
//   res.redirect(`https://smc-rozelle.arup.digital${req.url}`)
// })

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
