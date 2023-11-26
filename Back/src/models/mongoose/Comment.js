const { Schema, model } = require('mongoose');

const Comment = new Schema({
    title: String,
    description: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },
    imageURL: String,
    createdAt: Date,
});

const CommentModel = model('Comment', CommentSchema);

module.exports = CommentModel;
