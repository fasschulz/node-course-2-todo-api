const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    user.tokens.push({ access, token });

    // returning a promise, for chaining
    return user.save().then(() => {
        return token;
    });
}

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: { tokens: { token } }
    });
}

// THE METHODS BELLOW ARE MODEL METHODS, THEY CAN BE
// ACCESSED FROM THE USER SCHEMA, WITHOUT AN INSTANCE.
// THEY ARE STATIC, LIKE IN C#

// get the user using one of its tokens.
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
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

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then(user => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, success) => {
                if (success) {
                    return resolve(user);
                }

                reject(err);
            });
        });
    });
}

// MIDDLEWARES
UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User }