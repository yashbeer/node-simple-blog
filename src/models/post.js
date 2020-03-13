const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    is_censored : {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    comments: [{
        comment: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        is_censored : {
            type: Boolean,
            default: false
        },
        createdAt : {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post