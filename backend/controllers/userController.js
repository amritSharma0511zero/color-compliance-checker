import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = async(req, res)=>{
    try{
        const {fullName, userName, email, password, confirmPassword, gender} = req.body;
        if(!fullName||!userName||!password||!confirmPassword||!gender){
            res.status(400).json({
                message:"All fields are required to fill!"
            })
        }
        console.log(req.body);
        if(password!==confirmPassword){
            res.status(400).json({
                message:"Password and confirmPassword are not same!"
            })
        }

        const user = await User.findOne({userName});
        if(user){
            res.status(400).json({
                message:"User with this username already exist!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const userCreated = await User.create({
            fullName, 
            userName,
            email,
            password:hashPassword,
            profilePhoto:gender=="male"?maleProfilePhoto:femaleProfilePhoto,
            gender
        })

        res.status(200).json({
            body: userCreated,
            Success:true
        })
    }catch(error){
        console.log(error);
    }
}

export const login = async(req, res)=>{
    try{
        const {userName, password} = req.body;
        if(!userName||!password){
            res.status(400).json({
                message:"All fields are required!"
            })
        }
        const user = await User.findOne({userName});
        if(!user){
            res.status(400).json({
                message:"User with this userName doest not exist!"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            res.status(400).json({
                message:"Password is incorrect!"
            })
        }
        const tokeData = {
            userId:user._id
        }

        const token = await jwt.sign(tokeData, process.env.JWT_SECRET_KEY, {expiresIn:'1d'});
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            _id:user._id,
            userName:user.userName,
            fullName:user.fullName,
            email:user.email,
            profilePhoto:user.profilePhoto
        })

    }catch(error){
        console.log(error)
    }
}

export const logout = async (req, res) => {
    console.log("logout");
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
            expires: new Date(0), 
        });

        return res.status(200).json({
            message: "Logout successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


export const user = async(req, res)=>{
    try{
        const loggedInUserId = req.id;
        const user = await User.find({_id:loggedInUserId});
        console.log(user);
        return res.status(200).json(user)
    }catch(error){
        console.log(error);
    }
}