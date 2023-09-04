const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.IsAuthenticated = async(req, res, next) => {
    const { TOKEN } = req.cookies;
    console.log(TOKEN)
    if(!TOKEN) {
        res.status(401).json({
            succes: false,
            message: "You re not logged in. First ypu log in than do the rest"
        })
    }

    try {
        const decodedTOKEN = jwt.verify(TOKEN, process.env.JWT_SECRET)

        req.user = await User.findById(decodedTOKEN.id);
        console.log(req.user)
        next();

        if(!req.user) {
            res.status(401).json({
                succes: false,
                message: "Invalid credentials. User with this token/id not found in DB"
            })
        }
    } catch (error) {
        return next(error)
    }
}