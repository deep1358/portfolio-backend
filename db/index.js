const mongoose = require('mongoose')
const config = require('../config/dev')
require("./models/portfolio")

exports.connect = () =>{
  return mongoose.connect(config.DB_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
  },(e)=>{
    if(e) {
      console.error(e);
    }
    console.log('Connected to DB');
  })
}

