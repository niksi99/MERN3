const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required'],
        maxLength: 15
    },
    LastName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required'],
        maxLength: 20
    },
    Email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
    },
    Password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) caracters'],
    },
    Role: {
        type: String,
        default: 'user'
    }
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('Password')) {
        next()
    }

    this.Password = await bcrypt.hash(this.Password, 12);
})

UserSchema.methods.ComparePasswords_Hashed_NonHashed = async function(hashed){
    return await bcrypt.compare(hashed, this.Password);
}

UserSchema.methods.GenerateJWT = function() {
    return jwt.sign(
        {id: this._id, email: this.Email, role: this.Role },
        process.env.JWT_SECRET,
        { expiresIn: 900 }
    )
}

module.exports = mongoose.model('user', UserSchema)