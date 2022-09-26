const { isEmpty } = require('validator')

exports.getTodoLists = async (req, res) => {
    let errors = { fields: [] }
    try {
        //fetch todo lists
        const todolist = await req.prisma.todolists.findMany()
        return res.status(200).json(todolist)
    } catch (error) {
        console.log(error)
        res.status(500).json(errors)
    }
}

exports.getTodoListById = async (req, res) => {
    const id = +req.params.id

    let errors = { fields: [] }

    try {
        //fetch todo list
        const todolist = await req.prisma.todolists.findUnique({
            where: {
                id,
            },
        })
         //validate todo list exist
        if (!todolist) {
            errors.fields.push({ field: 'id', value: id })

            let error = new Error()

            error.statusCode = 404

            throw error
        }
        return res.status(200).json(todolist)
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.postTodoList = async (req, res) => {
    let errors = { fields: [] }

    const { name, userid, id } = req.body

    try {
        // validate todo list name is not empty
        if (isEmpty(name.trim())) {
            errors.fields.push({ field: 'name', value: name })

            let error = new Error()

            error.statusCode = 400

            throw error
        }

        //create todo list
        const todolist = await req.prisma.todolists.create({
            data: {
                name,
                userid,
                id
            },
        })
        return res.status(201).json(todolist)
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.putTodoList = async (req, res) => {
    const id = +req.params.id

    const { name } = req.body

    let errors = { fields: [] }

    try {
        // validate todo list name is not empty
        if (isEmpty(name.trim())) {
            errors.fields.push({ field: 'name', value: name })
        }

        //fetch todo list
        const todolist = await req.prisma.todolists.findUnique({
            where: {
                id,
            },
        })

        //validate todo list exist
        if (!todolist) {
            errors.fields.push({ field: 'id', value: id })
        }

        if (errors.fields.length) {
            let error = new Error()

            error.statusCode = 400

            throw error
        }

        //update todo list
        const updatedtodolist = await req.prisma.todolists.update({
            where: { id },
            data: {
                name,
            },
        })
        return res.status(201).json(updatedtodolist)
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(errors)
    }
}

exports.deleteTodoList = async (req, res) => {
  const id = +req.params.id

  let errors = { fields: [] }

  try {
      //fetch todo list
      const todolist = await req.prisma.todolists.findUnique({
          where: {
              id,
          },
      })
       //validate todo list exist
      if (!todolist) {
          errors.fields.push({ field: 'id', value: id })

          let error = new Error()

          error.statusCode = 404

          throw error
      }
      await req.prisma.todolists.delete({
        where: {
            id,
        },
    })

      return res.status(204).json()

  } catch (error) {
      console.log(error)
      res.status(error.statusCode || 500).json(errors)
  }
}
