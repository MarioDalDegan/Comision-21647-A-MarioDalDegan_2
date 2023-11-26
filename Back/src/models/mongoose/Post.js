const { Schema, model } = require('mongoose');

const Post = new Schema({
    title: String,
    description: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },
    imageURL: String,
    createdAt: Date,
});

const PostModel = model('post', PostSchema);

module.exports = PostModel;
