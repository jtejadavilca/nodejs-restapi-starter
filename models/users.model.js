const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email es required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    active: {
        type: Boolean,
        default: true
    },
    googleAuth: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );