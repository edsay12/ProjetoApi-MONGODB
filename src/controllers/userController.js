import HomeModel from "../models/HomeModel.js";
import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes";

const erros = []


class UserController {
    async create(req, res) {
        try {
            //Validações basicas ---------------
            if (!req.body || !req.body.password || !req.body.name || !req.body.email) {
                erros.push('Você digitou um valor inválido ou existem dados vazios')
                throw new Error("Você digitou um valor inválido ou existem dados vazios ")
            }
            if (req.body.password.length <= 5) {
                erros.push('Senha deve possuir 5 ou mais caracteres')
                throw new Error("Senha deve possuir 5 ou mais caracteres")
            }

            //-----------------------------------

            const person = await HomeModel.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                creatAt: new Date().toLocaleString()
            })
            return res.status(StatusCodes.CREATED).json(person)
        } catch (e) {

            if (e.code == 11000) {
                erros.push('Email já cadastrado no sistema')
                return res.status(StatusCodes.BAD_GATEWAY).json({ err: 'Email já cadastrado no sistema' })
            }
            return res.status(StatusCodes.BAD_GATEWAY).json({ err: erros })
            erros = []
        }

    }
    async find(req, res){
        try {
            const users = await HomeModel.find().all();
            console.log(users)
            return res.status(StatusCodes.CREATED).json(users)

        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.BAD_GATEWAY).json({ err: 'Database error' })


        }

    }
    async findByid(req, res) {
        try {
            const user = await HomeModel.findById(req.params.id);
            return res.status(StatusCodes.CREATED).json(user)

        } catch (e) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ err:'Usuario nao encontrado ou inexistente'})


        }

    }
    async delete(req, res) {
        try {
            const user = await HomeModel.findByIdAndDelete(req.userId);
            if(!user){
                erros.push("Usuario nao existe")
                throw new Error("Usuario nao existe")
            }
            return res.status(StatusCodes.CREATED).json('Deleted')
          


        } catch (e) {
            // console.log(e)
            return res.status(StatusCodes.BAD_GATEWAY).json({ err: erros|| 'Usuario inexistente'})


        }

    }
    async update(req, res) {

        try {
            
            if(Object.keys(req.body).length <= 0){
                erros.push("Dados nao inseridos")
                throw new Error("Dados nao inseridos")
            }

            const user = await HomeModel.findByIdAndUpdate(req.userId, req.body);
            if(!user){
                erros.push("Usuario nao existe")
                throw new Error("Usuario nao existe")
            }
            return res.status(StatusCodes.CREATED).json('Updated1')

        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.BAD_GATEWAY).json({ err: erros|| 'Usuario inexistente' })
            erros = []


        }

    }

}


export default new UserController();