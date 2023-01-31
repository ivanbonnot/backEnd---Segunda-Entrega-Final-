
  
  const MongoClient = require("mongodb").MongoClient;
  
  class MongoDBManager {
    constructor(url) {
      this.url = url;
      this.dbName = "myDatabase";
    }
    
    connect() {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.url, { useNewUrlParser: true }, (err, client) => {
          if (err) {
            reject(err);
          } else {
            console.log("Connected to MongoDB server");
            this.client = client;
            this.db = client.db(this.dbName);
            resolve(this.db);
          }
        });
      });
    }
    
    getData(collection, query) {
      return this.db.collection(collection).find(query).toArray();
    }
    
    setData(collection, data) {
      return this.db.collection(collection).insertOne(data);
    }
    
    updateData(collection, query, data) {
      return this.db.collection(collection).updateOne(query, { $set: data });
    }
    
    deleteData(collection, query) {
      return this.db.collection(collection).deleteOne(query);
    }
    
    close() {
      return this.client.close();
    }
  }
  
  
  
  const mongoDBManager = new MongoDBManager("mongodb://localhost:27017");
  
  mongoDBManager
    .connect()
    .then(() => {
      return mongoDBManager.getData("myCollection", {});
    })
    .then((docs) => {
      console.log(docs);
      return mongoDBManager.close();
    })
    .catch((error) => {
      console.error(error);
      mongoDBManager.close();
    });
  
  
   
  
  const MongoClient = require("mongodb").MongoClient;
  
  class MongoDB {
    constructor(url) {
      this.url = url;
      this.dbName = "myDatabase";
    }
    
    connect() {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.url, { useNewUrlParser: true }, (err, client) => {
          if (err) {
            reject(err);
          } else {
            console.log("Connected to MongoDB server");
            this.client = client;
            this.db = client.db(this.dbName);
            resolve(this.db);
          }
        });
      });
    }
    
    create(collection, data) {
      return this.db.collection(collection).insertOne(data);
    }
    
    read(collection, query) {
      return this.db.collection(collection).find(query).toArray();
    }
    
    update(collection, query, data) {
      return this.db.collection(collection).updateOne(query, { $set: data });
    }
    
    delete(collection, query) {
      return this.db.collection(collection).deleteOne(query);
    }
    
    close() {
      return this.client.close();
    }
  }
  
  
  
  const mongoDB = new MongoDB("mongodb://localhost:27017");
  
  mongoDB
    .connect()
    .then(() => {
      return mongoDB.create("myCollection", { name: "John Doe" });
    })
    .then(() => {
      return mongoDB.read("myCollection", { name: "John Doe" });
    })
    .then((docs) => {
      console.log("Read:", docs);
      return mongoDB.update("myCollection", { name: "John Doe" }, { age: 30 });
    })
    .then(() => {
      return mongoDB.read("myCollection", { name: "John Doe" });
    })
    .then((docs) => {
      console.log("Updated:", docs);
      return mongoDB.delete("myCollection", { name: "John Doe" });
    })
    .then(() => {
      return mongoDB.read("myCollection", { name: "John Doe" });
    })
    .then((docs) => {
      console.log("Deleted:", docs);
      return mongoDB.close();
    })
    .catch((error) => {
      console.error(error);
      mongoDB.close();
    });
  
  
  
  