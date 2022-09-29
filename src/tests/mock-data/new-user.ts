import { User } from "../../models"

const newUser = {
    password:"1234567",
    email:`${Date.now()}@test.com`,
    id: Date.now(),
    created_at: new Date(),
    salt: Date.now().toString()

}

export default newUser