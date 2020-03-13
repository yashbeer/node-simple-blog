const express = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const router = new express.Router()

router.post('/api/posts', auth, async (req, res) => {
    
    const post = new Post({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await post.save()
        res.status(201).send(post)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/api/posts', async (req, res) => {
    const limit = parseInt(req.query.limit) || 0
    const skip = Math.max(0, parseInt(req.query.page) - 1) * limit
    
    try {
        const posts = await Post.find().limit(limit).skip(skip)
        res.send(posts)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        
        if(!post) {
            return res.status(404).send({ error: 'No post found!' })
        }
        
        await post.populate('owner').execPopulate()
        await post.populate('comments.owner').execPopulate()
        
        res.send(post)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/api/posts/:id', auth, async (req, res) => {
    const allowedUpdates = ['title', 'description', 'is_censored']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try {
        const post = await Post.findOne({ _id: req.params.id, owner: req.user._id })
        
        if(!post) {
            return res.status(404).send({ error: 'No post found!' })
        }
        
        updates.forEach((update) => {
            return post[update] = req.body[update]
        })
        
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, owner: req.user._id })
        
        if(!post) {
            return res.status(404).send({ error: 'No post found!' })
        }
        
        await post.remove()
        res.send(post)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/api/comments', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId)
        
        if(!post) {
            return res.status(404).send({ error: 'No post found!' })
        }
        
        post.comments = post.comments.concat({ comment: req.body.comment, owner: req.user._id })
        
        await post.save()
        res.send(post)
        
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/api/comments/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ 'comments': { $elemMatch: {_id: req.params.id, owner: req.user._id}} })
        
        if(!post) {
            return res.status(404).send({ error: 'No post with this comment found!' })
        }
        
        post.comments.forEach((comment, index) => {
            if(comment._id.toString() === req.params.id) {
                post.comments[index].comment = req.body.comment
            }
        })
        
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/comments/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ 'comments': { $elemMatch: {_id: req.params.id, owner: req.user._id}} })
        
        if(!post) {
            return res.status(404).send({ error: 'No post with this comment found!' })
        }
        
        post.comments = post.comments.filter((comment) => {
            return comment._id.toString() !== req.params.id
        })
        
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Admin related routes

router.patch('/api/moderate/posts/:id', authAdmin, async (req, res) => {
    const allowedUpdates = ['is_censored']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try {
        const post = await Post.findOne({ _id: req.params.id })
        
        if(!post) {
            return res.status(404).send({ error: 'No post found!' })
        }
        
        updates.forEach((update) => {
            return post[update] = req.body[update]
        })
        
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/moderate/posts/:id', authAdmin, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        
        if(!post) {
            return res.status(404).send({ error: 'No post found!' })
        }
        
        await post.remove()
        res.send(post)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/api/moderate/comments/:id', authAdmin, async (req, res) => {
    const allowedUpdates = ['is_censored']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try {
        const post = await Post.findOne({ 'comments': { $elemMatch: {_id: req.params.id} } })
        
        if(!post) {
            return res.status(404).send({ error: 'No post with this comment found!' })
        }
        
        post.comments.forEach((comment, index) => {
            if(comment._id.toString() === req.params.id) {
                post.comments[index].is_censored = req.body.is_censored
            }
        })
        
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/moderate/comments/:id', authAdmin, async (req, res) => {
    try {
        const post = await Post.findOne({ 'comments': { $elemMatch: {_id: req.params.id} } })
        
        if(!post) {
            return res.status(404).send({ error: 'No post with this comment found!' })
        }
        
        post.comments = post.comments.filter((comment) => {
            return comment._id.toString() !== req.params.id
        })
        
        await post.save()
        res.send(post)
    } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router