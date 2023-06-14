import express from 'express'
const router = express.Router()
import userControllers from '../controllers/userC.js'
import protect from '../middleware/authMiddleware.js'

// public
router.post('/register',userControllers.registerUser)
router.post('/login',userControllers.loginUser)


//protected
router.get('/search-user',protect,userControllers.searchUser)



export default router