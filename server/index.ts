import {createServer} from 'http'
import * as next from 'next'
import {parse} from 'url'
  
import home from './api/home'
import prepareTypeorm from '../connect-db'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

Promise.all([
  prepareTypeorm(),
  nextApp.prepare(),
]).then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const {pathname, query} = parsedUrl

    if (pathname === '/api/home') {
      res.setHeader('Content-Type', 'application/json')
      res.write(await home({query}))
      res.end()
    } else {
      handle(req, res)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})