const Post = require("../models/Post");
const User = require("../models/User");

//CRUD
module.exports.CreateAPost = async (req, res, next) => {
    const { title, content, postedBy, likes } = req.body

    try {
        const newPost = await Post.create({
            title, content, postedBy, likes
        })

        res.status(201).json({
            succes: true,
            newPost
        })
    } catch (error) {
        next(error);
    }
}

module.exports.showAllPosts = async (req, res, next) => {
    
    try {
        const posts = await Post
            .find()
            .sort({ createdAt: -1})
            //.populate('postedBy', 'FirstName')

        res.status(200).json({
            succes: true,
            posts
        })
    } catch (error) {
        next(error);
    }
}

module.exports.showAPost = async (req, res, next) => {
    try {
        const aPost = await Post.findById(req.params.id)
        res.status(200).json({
            succes: true,
            aPost
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports.deleteAPost = async (req, res, next) => {
    try {
        const postToDelete = await Post.findByIdAndRemove(req.params.id)
        
        if(!postToDelete) {
            res.json({
                message: "Bad post"
            })
        }

        res.status(200).json({
            succes: true,
            message: "Deleted post"
        })
    } catch (error) {
        next(error);
    }
}

module.exports.UpdateAPost = async (req, res, next) => {

    const currentPost = await Post.findById(req.params.id)
    const { title, content } = req.body
    
    const data = {
        title: title || currentPost.title,
        content: content || currentPost.content
    }

    try {
        const postToUpdate = await Post.findById(
            req.params.id, data, {new: true}
        )

        res.status(200).json({
            succes: true,
            postToUpdate
        })
    } catch (error) {
        next(error);
    }
}

//LIKES
module.exports.AddLike = async (req, res, next) => {
    try {
        const thisPost = await Post.findByIdAndUpdate(
            req.params.id, {
                $addToSet: { likes: req.user.id }
            }, {new: true}
        )

        res.status(200).json({
            succes: true,
            thisPost
        })
    } catch (error) {
        next(error);
    }
}

module.exports.DeleteLike = async (req, res, next) => {
    try {
        const thisPost = await Post.findByIdAndUpdate(
            req.params.id, {
                $pull: { likes: req.user.id }
            }, {new: true}
        )

        res.status(200).json({
            succes: true,
            thisPost
        })
    } catch (error) {
        next(error);
    }
}