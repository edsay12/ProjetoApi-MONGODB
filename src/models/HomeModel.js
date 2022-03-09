import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    email:{
        type:String,
        unique:true
    },
    creatAt:{
        type:String
    }
});
const HomeModel = mongoose.model('Home',HomeSchema)

export default HomeModel