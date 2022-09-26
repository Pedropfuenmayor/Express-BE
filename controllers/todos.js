const { isEmpty } = require('validator')

exports.getTodos = async (req, res) => {
    const todolistId = +req.query.todolistId

    let errors = { fields: [] }

    try {
        //validate validate todo list exist only if there is todolist Id
        if (todolistId) {
            //fetch todo list
            const todolist = await req.prisma.todolists.findUnique({
                where: {
                    id: todolistId,
                },
            })
            //validate todo list exist
            if (!todolist) {
                errors.fields.push({ field: 'todolistId', value: todolistId })
            }
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }
        let todos

        //add todo if there is a relationship to a todo list
        if (todolistId) {
            todos = await req.prisma.todos.findMany({
                where: {
                    todolistid: todolistId,
                },
            })
        } else {
            todos = await req.prisma.todos.findMany()
        }
        return res.status(201).json(todos)
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.postTodo = async (req, res) => {
    const { name, done, id } = req.body

    const todolistId = +req.query.todolistId

    let errors = { fields: [] }

    try {
        // validate todo list name is not empty
        if (isEmpty(name.trim())) {
            errors.fields.push({ field: 'name', value: name })
        }

        //validate done field is boolean
        if (typeof done !== 'boolean') {
            errors.fields.push({ field: 'done', value: done })
        }

        //validate validate todo list exist only if there is todolist Id
        if (todolistId) {
            //fetch todo list
            const todolist = await req.prisma.todolists.findUnique({
                where: {
                    id: todolistId,
                },
            })
            //validate todo list exist
            if (!todolist) {
                errors.fields.push({ field: 'todolistId', value: todolistId })
            }
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }
        let todo

        //add todo if there is a relationship to a todo list
        if (todolistId) {
            todo = await req.prisma.todos.create({
                data: {
                    name,
                    done,
                    todolistid: todolistId,
                    id,
                },
            })
        } else {
            todo = await req.prisma.todos.create({
                data: {
                    name,
                    done,
                    id,
                },
            })
        }
        return res.status(201).json(todo)
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.putTodo = async (req, res) => {
    const { name, done, todolistid } = req.body

    const id = +req.params.id

    let errors = { fields: [] }

    try {
        // validate todo list name is not empty
        if (isEmpty(name.trim())) {
            errors.fields.push({ field: 'name', value: name })
        }

        //validate done field is boolean
        if (typeof done !== 'boolean') {
            errors.fields.push({ field: 'done', value: done })
        }

        //validate validate todo list exist only if there is todolist Id
        if (todolistid) {
            //fetch todo list
            const todolist = await req.prisma.todolists.findUnique({
                where: {
                    id: todolistid ,
                },
            })
            //validate todo list exist
            if (!todolist) {
                errors.fields.push({ field: 'todolistId', value: todolistid })
            }
        }

        //fetch todo 
        const todo = await req.prisma.todos.findUnique({
            where: {
                id
            },
        })
        //validate todo exist
        if (!todo) {
            errors.fields.push({ field: 'id', value: id})
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }
        let updatedTodo

        //add todo if there is a relationship to a todo list
        if (todolistid ) {
            updatedTodo = await req.prisma.todos.update({
                where: { id },
                data: {
                    name,
                    done,
                    todolistid: todolistid ,
                },
            })
        } else {
            updatedTodo = await req.prisma.todos.update({
                where: { id },
                data: {
                    name,
                    done,
                    id,
                },
            })
        }
        return res.status(201).json(updatedTodo)
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.deleteTodo = async (req, res) => {

    const id = +req.params.id

    let errors = { fields: [] }

    try {
        
        //fetch todo 
        const todo = await req.prisma.todos.findUnique({
            where: {
                id
            },
        })

        //validate todo exist
        if (!todo) {
            errors.fields.push({ field: 'id', value: id})
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }
    
          await req.prisma.todos.delete({
                where: { id },
                
            })
        
        return res.status(204).json()
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

