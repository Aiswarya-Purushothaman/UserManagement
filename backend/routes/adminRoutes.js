import express from 'express'

import{
  UsersList,
  deleteUser,
  editUser,
  
} from '../controllers/adminController.js'

const router = express.Router()


 router.get('/UsersList',UsersList)
 router.post('/deleteUser',deleteUser)
 router.post('/updateuser',editUser)
 
export default router