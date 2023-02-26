import UserModel from "../models/userModel.js";

import bcrypt from 'bcryptjs'
import cookie from 'cookie-parser'
import router from "../routes/userRoutes.js";
import { Authenticate } from "../middleware/auth.js";
import path from "path";

export const registerCtrl = async (req, res) => {

    // console.log(req.body);
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
        res.status(401).json({ error: "Input all the fields" })
    }
    try {

        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.status(400).json({ status: false, msg: "User already exist" });
        } else if (password !== confirmpassword) {
            res.status(400).json({ status: false, msg: "password and confirm password not match" });
        }
        else {
            const newUser = new UserModel({
                name,
                email,
                password,
                confirmpassword
            })
            const userData = await newUser.save()

            res.status(200).json({ userData, status: 200 })
        }


    } catch (error) {
        res.status(500).json({ msg: error, status: false })
        console.log(error);
    }

}
export const loginCtrl = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({ error: "Input all the fields" })
    }
    // console.log(req.body);
    try {

        const user = await UserModel.findOne({ email: email })
        if (user) {

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ error: "Invalid data", status: false })
            } else {
                console.log("Hello");

                const token = await user.generateToken();
                

                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result= {
                    user,
                    token
                }
                res.status(200).json({status:200,result})
            }
        }











    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", status: false })
        console.log(error);

    }


}

export const logoutCtrl = async(req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((curelm)=>{
            return curelm.token !== req.token;
        })

        res.clearCookie('usercookie',{path:'/'})
        req.user.save()
        res.status(200).json({status:200})
        
    } catch (error) {
        res.status(400).json({status:400,error})
    }
}







