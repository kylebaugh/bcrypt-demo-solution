import { User, db } from "./db/model.js";
import bcrypt from 'bcryptjs'

const handlerFunctions = {
    register: async (req, res) => {
        console.log(req.body)
        const {username, password} = req.body

        const salt = bcrypt.genSaltSync(5) // Adds salt (aka extra characters)
        const passHash = bcrypt.hashSync(password, salt) // Mixes extra characters together and adds even more

        const newUser = await User.create({
            username,
            password: passHash
        })



        res.send(newUser)
    },

    login: async (req, res) => {
        // console.log(req.body)
        const {username, password} = req.body

        const valid = await User.findOne({
            where:{
                username: username,
            }}
        )

        const passwordCheck = bcrypt.compareSync(password, valid.password)

        if(passwordCheck){
            res.send(valid)
            return
        }else{
            res.error('failure')
        }

    }
}

export default handlerFunctions