const express = require('express')
const router = express.Router()

const PostController = require("../controllers/PostController");
const AuthMiddleware = require("../middleware/Auth");

//CRUD
router.post('/create', 
    AuthMiddleware.IsAuthenticated, 
    PostController.CreateAPost);

router.get('/showAll', PostController.showAllPosts)
router.get('/showOne/:id', PostController.showAPost)

router.put('/updateOne/:id', PostController.UpdateAPost);

router.delete("/delete/:id", AuthMiddleware.IsAuthenticated, PostController.deleteAPost)

//LIKES
router.put('/addLike/:id', AuthMiddleware.IsAuthenticated, PostController.AddLike)
router.put('/deleteLike/:id', AuthMiddleware.IsAuthenticated, PostController.DeleteLike)
module.exports = router
