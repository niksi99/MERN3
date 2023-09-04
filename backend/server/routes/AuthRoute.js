const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/register", UserController.RegisterUser)
router.post('/login', UserController.Login);
router.get('/logout', UserController.Logout);

module.exports = router;