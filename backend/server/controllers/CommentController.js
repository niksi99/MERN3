const Comment = require('../models/Comment')
const Post = require("../models/Post");

module.exports.CreateAComment = async (req, res, next) => {

    console.log(req.body)
    const { Text } = req.body 
    console.log(Text)
    try {
       const newComment = await Comment.create({ Text });
       newComment.CommentedBy = req.user.id;
       newComment.CommentedOn = req.params.id;
       const getPost = await Post.findByIdAndUpdate(req.params.id, 
        {$push: {comments: newComment }}, {new: true});

       res.status(200).json({
            success: true,
            getPost
       })
    }
    catch(error) {
        return next(error);
    }
}