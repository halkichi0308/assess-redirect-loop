const express = require('express')
const app = express()

const port = 3000
const access_limit = 10
app.locals.access_count = 0

app.get('/redirect', (req, res) => {
  if(app.locals.access_count < access_limit){
    res.redirect(req.path); // reffer to HTTP request Header.
    console.log('client ip:' + req.connection.remoteAddress)
    app.locals.access_count++
  }else{
    console.log('Access limit reached.')
    res.send(200, 'Sorry, Access limit reached.')
    //app.locals.access_count = 0
  }
})
app.get('/reset', (req,res) => {
  console.log('Access limit reset.')
  res.send(200, 'Access limit reset.')
  app.locals.access_count = 0
})

app.listen(port)

console.log(`-Server listening at ${port} port -`)
console.log('GET /redirect is .available.')

