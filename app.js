import express from "express";
import userRoute from "./src/routes/userRoute.js";
import conection from './src/database/conection.js'
import dotEnv from 'dotenv'
import tokenRoute from "./src/routes/tokenRoute.js";
dotEnv.config();



class App{
    constructor(){
        this.app = express();
        conection(this.app);
        this.app.use(express.json());
        this.routs();
        

    }

    routs(){
        this.app.use("/token",tokenRoute)
        this.app.use("/user",userRoute)
    

    }


}

export default new App().app;