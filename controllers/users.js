const { isEmpty, isEmail } = require('validator')


exports.getUsers = async (req, res) => {
    let errors = { fields: [] }
    try {
        //fetch todo lists
        const todolist = await req.prisma.users.findMany()
        return res.status(200).json(todolist)
    } catch (error) {
        console.log(error)
        res.status(500).json(errors)
    }
}

exports.login = async (req, res) => {

    const id = +req.params.id
    let errors = { fields: [] }
    try {
        //fetch todo lists
        const user = await req.prisma.users.findUnique({
            where: { id },
        })
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(errors)
    }
}

exports.signup = async (req, res) => {
    const { password, email, id } = req.body

    let errors = { fields: [] }

    try {
        // validate user email
        if (!isEmail(email)) {
            errors.fields.push({ field: 'email', value: email })
        }
        // validate user password is not empty
        if (isEmpty(password.trim())) {
            errors.fields.push({ field: 'password', value: password })
        }

        //fetch users
        const user = await req.prisma.users.findUnique({
            where: {
                id,
            },
        })
        //validate user exist
        if (user) {
            errors.fields.push({ field: 'id', value: id })
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }

        const newuser = await req.prisma.users.create({
            data: {
                id,
                email,
                password,
            },
        })

        return res.status(201).json(newuser)

    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.deleteUser = async (req, res) => {

    const id = +req.params.id

    let errors = { fields: [] }

    try {
        
        //fetch user
        const user = await req.prisma.users.findUnique({
            where: {
                id
            },
        })

        //validate user exist
        if (!user) {
            errors.fields.push({ field: 'id', value: id})
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }
    
          await req.prisma.users.delete({
                where: { id },
                
            })
        
        return res.status(204).json()
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

