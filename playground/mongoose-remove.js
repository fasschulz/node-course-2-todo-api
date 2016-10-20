const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(res => {
//     console.log(res)
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '580913e9f20b8408d1dd8611'}).then(doc => {
//     console.log(doc);
// });

// Todo.findByIdAndRemove('580913e9f20b8408d1dd8611').then(doc => {
//     console.log(doc);
// });