const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    usename: String,
    password: String,
    email: String,
    avatarURL: String,
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;

