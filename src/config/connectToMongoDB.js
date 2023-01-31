const mongoose = require('mongoose')

let isConnected

const connectToDd = async () => {
  if(!isConnected) {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://coderhouse:coderhouse123@cluster0.xvejx.gcp.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          isConnected = true
          console.log('MongoDB Connected')})
        .catch(err => console.log(err))   
    return
  }

  console.log("Conexion existente")
  return
}


module.exports = connectToDd 

