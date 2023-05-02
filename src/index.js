const express = require('express')
const morgan = require('morgan')
const setupRoutes = require('../src/routes')
const cors = require('cors')
const app = express()
//settings
app.set('port', process.env.PORT ||  31337)
app.set('json spaces', 2)
//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(
    cors({
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'AnonymousId',
        'X-Request-Id',
      ],
    })
  )

setupRoutes(app)

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})
app.get('/', (req, res) => {

    return {'message':"Hello"}
  })