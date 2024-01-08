import { User, db } from "./model.js";
import bcrypt from 'bcryptjs'

console.log("Syncing database ...")
await db.sync({ force: true })
console.log("Seeding database ...")

let i = 1

while (i < 11){

    const salt = bcrypt.genSaltSync(5)
    const passHash = bcrypt.hashSync(`pass${i}`, salt)

    const newUser = await User.create({
        username: `user${i}`,
        password: passHash
    })

    i++
}