import { User, db } from "./db/model.js";
import bcrypt from 'bcryptjs'

const handlerFunctions = {
    register: async (req, res) => {
        // console.log(req.body)
        const {username, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            username,
            password: passHash
        })

        res.send(newUser)
    },

    login: async (req, res) => {
        // console.log(req.body)
        const {username, password} = req.body

        const userCheck = await User.findOne({
            where:{
                username: username,
            }}
        )

        const passwordCheck = bcrypt.compareSync(password, userCheck.password)

        if(passwordCheck){
            res.send(userCheck)
        }else{
            res.status(403).send('incorrect credentials')
        }

    }
}

export default handlerFunctions