// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// to start MongoDB on terminal, use: 
// ~/mongo/bin/mongod --dbpath ~/mongo-data
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5807e72ce100da61314b06a5')
    // }, { $set: { completed: true } },
    //     { returnOriginal: false }
    // ).then(doc => {
    //     console.log(doc);
    // });

    // db.collection('Users')
    //     .findOneAndUpdate({
    //         _id: new ObjectID('5807c645bfb50a2d7fe27780')
    //     }, {
    //         $set: { name: 'Isa' },
    //         $inc: { age: 1 }
    //     }, {
    //         returnOriginal: false
    //     }).then(doc => {
    //         console.log(doc);
    //     });

    // db.close();
});