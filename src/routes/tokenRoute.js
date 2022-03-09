import { Router } from "express";
import BasicAuthenticationMiddleware from "../middlewares/BasicAuthenticationMiddleware.js";
import jsonwebtoken from "jsonwebtoken";
import StatusCodes from 'http-status-codes'
const erros = []

const tokenRoute = Router();

tokenRoute.post('/',BasicAuthenticationMiddleware,(req,res)=>{
    const user = req.user 
    try{
        if(!user){
            erros.push('Usuario nao existe')
            return res.status(StatusCodes.BAD_GATEWAY).json({ err: 'Usuario nao existe' })
    
        }
        const payload = {
            "Id":user.id
        }
        const secret = process.env.JSONWEBTOKENSECRET
        const options =  {
            subject:user.name,
            expiresIn:'1d'
        }
       const jwt = jsonwebtoken.sign(payload,secret,options)
       res.status(StatusCodes.OK).json(jwt)

       

    }catch(err){
        console.log(err)
        res.status(StatusCodes.BAD_GATEWAY).send(err)

    }
    

})

export default tokenRoute