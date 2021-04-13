const mongoose = require('mongoose')
const config = require('../config/dev');
const fakeDB = require("./FakeDB")

mongoose.connect(config.DB_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},async(e)=>{
  if(e) {
    console.error(e);
  }
  console.log("Starting populating DB");
  await fakeDB.populate()
  await mongoose.connection.close()
  console.log('DB has been populated!');
})


