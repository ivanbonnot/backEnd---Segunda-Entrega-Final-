//___CRUD Firebase___///

class FireBaseCRUD {

    constructor(file) {
        this.file = file
    }


    async create(collection) {
        const db = admin.firestore();
        const query = db.collection(collection);
        const doc = query.doc()

        await doc.create()

        console.log('Create done');
    };


    async read() {
        const db = admin.firestore();
        const query = db.collection('colors');

        const querySnapshot = await query.get();

        if (querySnapshot.empty) {
            console.log('Colección vacía');
        } else {
            querySnapshot.forEach(doc => {
                console.log(JSON.stringify(doc.data(), null, 2));
            });
        }
    }

    async update() {
        const db = admin.firestore();
        const query = db.collection('colors');

        await query.doc('blue').set({ newName: 'navy' }, { merge: true });
    }

    async deleteColor() {
        const db = admin.firestore();
        const query = db.collection('colors');

        await query.doc('green').delete();
    }

}

module.exports = new FireBaseCRUD() 


class FirebaseManager {
    constructor(firebaseConfig) {
      this.firebaseConfig = firebaseConfig;
      this.firebase = require("firebase/app");
      require("firebase/database");
      this.firebase.initializeApp(this.firebaseConfig);
      this.db = this.firebase.database();
    }
    
    getData(path) {
      return this.db.ref(path).once("value");
    }
    
    setData(path, data) {
      return this.db.ref(path).set(data);
    }
    
    updateData(path, data) {
      return this.db.ref(path).update(data);
    }
    
    deleteData(path) {
      return this.db.ref(path).remove();
    }
  }
  

  const firebaseManager = new FirebaseManager({
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
  });
  
  firebaseManager
    .getData("/some/path")
    .then((snapshot) => {
      console.log(snapshot.val());
    })
    .catch((error) => {
      console.error(error);
    });
  
  