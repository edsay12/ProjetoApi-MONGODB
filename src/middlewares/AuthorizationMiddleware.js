import { StatusCodes } from "http-status-codes"
import jsonwebtoken from "jsonwebtoken"


const AuthorizationMiddleware = (req, res, next) => {
    console.log('passou por aqui ')
    try {
        const autorization = req.headers['authorization']
        const [type, token] = autorization.split(' ')
        if (type != 'Bearer') {
            
            throw new Error("erro")
        }
        const autoriza = jsonwebtoken.verify(token,process.env.JSONWEBTOKENSECRET)
        
        if(!autoriza){
        
            throw new Error("erro")
        }

        req.userId = autoriza.Id
        next()

    } catch (err) {
        res.status(StatusCodes.BAD_GATEWAY).json({'err': 'Token error'})

    }


}



export default AuthorizationMiddleware