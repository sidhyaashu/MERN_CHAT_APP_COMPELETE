import User from '../models/UserM.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../config/generateToken.js'


const registerUser = asyncHandler(async(req,res)=>{
    const {  name,email,password,confirm_password,pic } = req.body

    if(name && email && password && confirm_password ){
        if(password === confirm_password){
            try {
            const user = await User.findOne({email:email})
            if(!user){

                const hashedPassword = await bcrypt.hash(password,10)

                const user = await User.create({
                    name:name,
                    email:email,
                    password:hashedPassword,
                    pic:pic
                })

                const token = generateToken(user._id)

                if(user){
                    const newUser = {
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        token:token
                    }
                    res.status(201).send({
                    status:"success",
                    message:"Registered succesfully",
                    newUser
                    })

                }else{
                    res.status(400).send({
                    status:"failed",
                    message:"Failed to register please try again!"
                    })
                }

            }else{
                res.status(400).send({
                status:"failed",
                message:"User already exist"
                }) 
            }
            
            } catch (error) {
                res.status(400).send({
                    status:"failed",
                    message:"Server Problem"
                    }) 
                console.log(error)
            }
        }else{
           res.status(400).send({
            status:"failed",
            message:"Password and confirm password dose'n match!"
            }) 
        }

    }else{
        res.status(400).send({
            status:"failed",
            message:"All feids are required!"
        })
    }
})



const loginUser = asyncHandler(async(req,res)=>{
    const { email,password } = req.body
    if(email && password){
        try {
            const user = await User.findOne({email:email})
            if(user){
                const matchPassword = await bcrypt.compare(password,user.password)
                if(matchPassword){
                    res.status(200).send({
                        status:"success",
                        message:"Login succesfully",
                        token:generateToken(user._id)
                    })
                }else{
                    res.status(400).send({
                    status:"failed",
                    message:"Invalid email and password"
                    }) 
                }

            }else{
               res.status(400).send({
                status:"failed",
                message:"User dose't exist!"
                }) 
            }
            
        } catch (error) {
            res.status(400).send({
                    status:"failed",
                    message:"Server Problem"
                    }) 
                console.log(error)
        }

    }else{
        res.status(400).send({
            status:"failed",
            message:"All feids are required!"
        })
    }
})



// /api/user/search-user?search=anyName
const searchUser = asyncHandler(async(req,res)=>{
    const keyWord = req.query.search? {
        $or:[
            {
                name:{ $regex:req.query.search , $options: "i"}
            },
            {
                email:{ $regex:req.query.search , $options: "i"}
            }
        ]
    } : {}

    const users = await User.find(keyWord).find({ _id: { $ne: req.user._id}})  
    res.send(users)


    // const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    // res.send(users);
})


export default {
    registerUser,
    loginUser,
    searchUser
}