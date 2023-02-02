import mongoose from 'mongoose'
import admin from "firebase-admin"
import serviceAccount from "../../db/ecommerce-be-ch-firebase-adminsdk-m6y02-593b737273.json" assert { type: "json" };
import ControllerMongoDb from '../controllers/controllerMongoDB.js'

let isConnected;
let dbController;

const connectToDb = async (db) => {

    if (!isConnected && db === "mongo") {

        // try {
            mongoose.set('strictQuery', true);
            await mongoose.connect('mongodb+srv://coderhouse:coderhouse123@cluster0.xvejx.gcp.mongodb.net/test',
                { useNewUrlParser: true, useUnifiedTopology: true })

                .then(() => {
                    isConnected = true
                    console.log('MongoDB Connected', isConnected)
                })
                .catch(err => console.log(err))

            dbController = new ControllerMongoDb();
            //  return;
        // }

        // catch (e) {
        //     console.log(e.message);
        // }
        return;
    }

    if (!isConnected && db === "firebase") {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://ecommerce-be-ch.firebaseio.com'
        });

        dbController = new ControllerFirebase();
        isConnected = true;
        return;
    };
}

export { connectToDb, dbController };
