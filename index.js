const express = require('express')

const app = express()
app.use(express.json())

const runServer = async()=>{
  await require("./db/index").connect()
  
  const port = process.env.PORT || 3001

  app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Portfolio Api Application :)</h1>")
  })

  app.use('/api/v1/portfolios',require("./routes/portfolios"))
  app.use('/api/v1/blogs',require("./routes/blogs"))

  app.listen(port,e=>{
    if(e) console.error(e)
    console.log(`Running on ${port}`)
  })
}

runServer()