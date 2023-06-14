import Chat from '../models/ChatM.js'
import asyncHandler from 'express-async-handler'
import User from '../models/UserM.js'



// creating and fetching one one chat
const accessChat=asyncHandler(async(req,res)=>{
    const { userId } = req.body

    if(!userId){
        console.log("UserId params not send with request")
        return res.statusCode(400)
    }
    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            { users:{ $elemMatch: { $eq: req.user._id }}},
            { users:{ $elemMatch: { $eq: userId }}},
        ]
    }).populate("users","-password")
      .populate("lastMegssage")

      console.log("isChat --> ",isChat)

    isChat = await User.populate(isChat,{
        path: "lastMegssage.sender",
        select: "name pic email"
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }

        try {

            const createChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id: createChat._id}).populate("users","-password")
            res.status(200).send(fullChat)

        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }


})





const fetchChat=asyncHandler(async(req,res)=>{
    try {
        const allChat = await Chat.find({
            users: {
                $elemMatch: {
                    $eq: req.user._id
                }
            }
        })
        .populate("users","-password")
        .populate("lastMegssage")
        .populate("groupAdmin","-password")
        .sort({updatedAt: -1})
        .then(async(result)=>{
            result = await User.populate(result,{
                path: "lastMegssage.sender",
                select: "name pic email"
            })
            res.send(result)
        })


    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})





const createGroupChat=asyncHandler(async(req,res)=>{})





const renameGroup=asyncHandler(async(req,res)=>{})





const removeFromGroup=asyncHandler(async(req,res)=>{})





const addToGroup=asyncHandler(async(req,res)=>{})



export default {
    accessChat,
    fetchChat,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup
}

// 30:12