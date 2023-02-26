import { mongoose } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = "FASSDFSFDSFKDJASDFSNFASKDFAKASDASD";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})




userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12)
    }


    next()
})

userSchema.methods.generateToken = async function () {
    try {
        let newtoken = jwt.sign({ _id: this._id }, TOKEN_SECRET, {
            expiresIn: "1d"
        })

        this.tokens = this.tokens.concat({ token: newtoken })

        await this.save();
        return newtoken;

    } catch (error) {
        res.status(400).json({ msg: error, status: false })
        console.log(error);

    }

}

const UserModel = new mongoose.model('user', userSchema)
export default UserModel
