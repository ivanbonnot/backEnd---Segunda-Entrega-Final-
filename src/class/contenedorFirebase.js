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