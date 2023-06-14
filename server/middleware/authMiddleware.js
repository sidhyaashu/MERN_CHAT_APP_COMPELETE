import jwt from 'jsonwebtoken'
import User from '../models/UserM.js'
import asyncHandler from 'express-async-handler'


const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            
            token = req.headers.authorization.split(" ")[1];

            // decode token 
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

            req.user = await User.findById(decode.id).select("-password")

            next()
        } catch (error) {
            res.status(400).send({
                "status":"failed",
                "message":"Not Authorized, token failed"
            })
        }
        
    }

    if(!token){
       res.status(401).send({
                "status":"failed",
                "message":"Not Authorized, no token"
            }) 
    }
})

export default protect