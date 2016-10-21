const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid e-mail'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

// THE METHODS BELLOW ARE, INSTANCE METHODS
// THEY CAN BE ACCESSED ONLY BY AN INSTANTIATED USER

// this overrides the built in toJSON methods.
// overriding toJSON, the response sent by express,
// will only contains the pick fields (security reasons).
// the client don't need to know password and tokens
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

// not using lambda, because on lambdas [this] keyword isn't valid 
// this function will be used when a new user is created
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    // returning a promise, for chaining
    return user.save().then(() => {
        return token;
    });
}

// THE METHODS BELLOW ARE MODEL METHODS, THEY CAN BE
// ACCESSED FROM THE USER SCHEMA, WITHOUT AN INSTANCE.
// THEY ARE STATIC, LIKE IN C#

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });

        // same as above
        return Promise.reject();
    }

    // returning a promise, for chaining
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = { User }