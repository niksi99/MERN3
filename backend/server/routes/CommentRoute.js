const express = require('express');
const router = express.Router();

const AuthMiddleware = require("../middleware/Auth");
CommentController = require("../controllers/CommentController");

router.put("/Comment/:id", AuthMiddleware.IsAuthenticated, CommentController.CreateAComment)

module.exports = router