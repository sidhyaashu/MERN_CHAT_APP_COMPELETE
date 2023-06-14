import express from 'express'
const router = express.Router()
import chatController from '../controllers/chatC.js'
import protect from '../middleware/authMiddleware.js'


router.post('/',protect,chatController.accessChat) // to create chat
router.get('/',protect,chatController.fetchChat) // to fetch chat from database
router.post('/group',protect,chatController.createGroupChat) // to create a group chat
router.put('/rename-group',protect,chatController.renameGroup) // to rename the group
router.put("/remove-from-group",protect,chatController.removeFromGroup) // to remove someone frome the group
router.put("add-to group",protect,chatController.addToGroup) // to add someone in group


export default router