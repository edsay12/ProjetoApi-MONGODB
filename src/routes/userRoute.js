import { Router } from "express";
import userController from "../controllers/userController.js";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware.js";

const userRoute = Router();



userRoute.get('/',userController.find) // find all users 
userRoute.post('/',userController.create) // create new user

userRoute.use(AuthorizationMiddleware); // authenticação do token 
userRoute.get('/:id',userController.findByid)
userRoute.delete('/',userController.delete)
userRoute.put('/',userController.update)
    


export default userRoute;