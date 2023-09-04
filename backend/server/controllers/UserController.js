const User = require("../models/User")

module.exports.RegisterUser = async (req, res, next) => {

    const UserExists = await User.findOne({Email: req.body.Email})
    if(UserExists) {
        res.json({
            success: false,
            poruka: "Vec postoji sa ovakav mejl"
        })
    }

    try {
        const newUser = await User.create(req.body);
        res.json({
            success: true,
            newUser
        })
    }
    catch(error) {
        next(error);
    }
}

module.exports.Login = async (req, res, next) => {
    
    const { Email, Password } = req.body;

    if(Email == "") {
        return res.json({
            success: false,
            message: "Prazno mejl polje"
        })
    }

    if(Password == "") {
        return res.json({
            success: false,
            message: "Prazno lozinka polje"
        })
    }

    const UserExists = await User.findOne({ Email })
    if(!UserExists) {
        return res.json({
            success: false,
            poruka: "Не постоји корисник с овај мејл"
        })
    }


    const arePasswordsMatched = await UserExists.ComparePasswords_Hashed_NonHashed(Password)
    if(!arePasswordsMatched) {
        return res.json({
            status: false,
            message: "Lozinke nisu iste"
        })
    }

    const TOKEN = await UserExists.GenerateJWT();

    try {
        res.cookie('TOKEN', TOKEN, {
            maxAge: 900 * 1000,
            httpOnly: true,
            expiresIn: new Date(Date.now() + process.env.EXPIRE_JWT)
        }).json({
            succes: true,
            TOKEN
        })
    }
    catch(error) {
        next(error);
    }
}

module.exports.Logout = (req, res, next) => {
    res.clearCookie('TOKEN');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}