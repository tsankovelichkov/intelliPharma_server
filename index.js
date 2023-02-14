const express=require('express')
const cors = require('cors')
const app= express()
const routes=require('./routes')


require('./config/mongoose')(app)

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(5000,console.log.bind(console,'Server  is listening on port 5000'))