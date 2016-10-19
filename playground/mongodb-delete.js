// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// to start MongoDB on terminal, use: 
// ~/mongo/bin/mongod --dbpath ~/mongo-data
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then(res => {
    //     console.log(res);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then(res => {
    //     console.log(res);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then(res => {
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({ name: 'DiVieira' });
    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5807c580da94442d70be5a01')
    // }).then(doc => {
    //     console.log(JSON.stringify(doc, undefined, 2));
    // });

    // db.close();
});