const admin = require("firebase-admin")
const serviceAccount = require("../../db/ecommerce-be-ch-firebase-adminsdk-m6y02-593b737273.json")

let isConected

const connectToDd = async () => {
  if(!isConected) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://ecommerce-be-ch.firebaseio.com'
    })
    console.log('Connected to Firebase...')
    return
  }

  console.log("Conexion existente")
  return
}


module.exports = connectToDd 