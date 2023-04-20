const express=require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app= express()
const routes=require('./routes')


require('./config/mongoose')(app)
app.use(cors())
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use(routes)


app.listen(5000,console.log.bind(console,'Server  is listening on port 5000'))