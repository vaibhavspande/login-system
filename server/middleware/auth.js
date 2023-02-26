import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

  
const TOKEN_SECRET = "FASSDFSFDSFKDJASDFSNFASKDFAKASDASD";
export const Authenticate = async (req, res, next) => {

try {
    const token = req.headers.authorization;
    // console.log(token);
    const verifytoken = jwt.verify(token,TOKEN_SECRET)
    // console.log(verifytoken);
    const user = await UserModel.findOne({_id:verifytoken._id})
    // console.log(user);

    if(!user) {throw new Error("user not found")}
    req.token= token;
    req.user=user;
    req.userId=user._id;
    next()


    
} catch (error) {
    res.status(400).json({ msg: "Unauthorized user", status: 400 })
}
}

