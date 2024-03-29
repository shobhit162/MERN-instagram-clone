const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const {MONGOURL} = require('./config/keys')
const cors = require('cors')



mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("conected to mongo")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

// app.use(express.json());
// app.use(cors());
// app.get("/",(req,res) =>{
//     res.setHeader("Access-Control-Allow-Credentials","true");
//     res.send("API is running..");
// });

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ["http://localhost:3000", "https://insta-clone-24-m31j.onrender.com"],
})
);


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
