const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    Text: {
        type: String,
        required: true,
        trim: true
    },
    CommentedBy: {
        type: ObjectId,
        ref: 'User',
    },
    CommentedOn: {
        type: ObjectId,
        ref: 'Post',
    },
    CreatedAt: { 
        type: Date, default: Date.now 
    },
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema);