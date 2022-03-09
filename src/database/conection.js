import mongoose from "mongoose";



export default function conection(app){
    mongoose.connect(process.env.DATABASECONNECTION).then(()=>{
        app.emit('conectado')
    })

}

