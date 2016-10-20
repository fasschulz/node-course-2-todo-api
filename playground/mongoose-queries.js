const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userId = '58080508f6360d75370bfcbb';

User.findById(userId).then(user => {
    if (!user){
        return console.log('Id not found');
    }
    
    console.log('User', user);
}).catch(err => console.log(err.message));

// var id = '5808a3c881bea86344dd9c091';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.findById(id).then(todo => {
//     if (!todo) {
//         return console.log('Id not found');
//     }

//     console.log('Todo by id', todo);
// }).catch(err => {
//     console.log(err.message);
// });

// Todo.find({ _id: id }).then(todos => {
//     if (todos.length < 1) {
//         return console.log('There are no todos');
//     }

//     console.log('Todos', todos);
// });

// Todo.findOne({_id: id}).then(todo => {
//     if (!todo) {
//         return console.log('Id not found');
//     }

//     console.log('Todo', todo);
// });