import HomeModel from "../models/HomeModel.js";
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-codes";


const erros = []


async function BasicAuthenticationMiddleware(req,res,next){
    const auto = req.headers['authorization']
    try{

        const [ basic , basictoken] = auto.split(' ')
        if(basic != 'Basic'){
            erros.push('Metodo de authenticação incorreto')
            throw new Error("Metodo de authenticação incorreto")
        }
        const  buf = Buffer.from(basictoken,'base64').toString('utf-8')
        const [email,password] = buf.split(':')
        const user = await HomeModel.findOne({email})
        if(!user){
            erros.push('Usuario ou senha incorretos')
            throw new Error("Usuario ou senha incorretos")
        }
        const accept =  await bcrypt.compare(password,user.password)
        if(!accept){
            erros.push('Usuario ou senha incorretos ')
            throw new Error("Usuario ou senha incorretos")

        }
        req.user = user;
       
    }catch(err){
        return res.status(StatusCodes.BAD_GATEWAY).json({ err: erros})
        erros = []
       

    }
    next();

    

}

export default BasicAuthenticationMiddleware;