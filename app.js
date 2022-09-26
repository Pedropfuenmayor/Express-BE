const express = require("express");
const app = express();
const todoListsRoutes = require("./routes/todoLists");
const todosRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

//Instantiate PrismaClient
const prisma = new PrismaClient()

//Parse json data
app.use(express.json());

 //Allow Cross-Origin Resource Sharing
app.use(cors())

//Give access to Prisma through the request object 
  app.use((req, res, next) => {
    req.prisma = prisma
    next();
  });

app.use(todoListsRoutes);

app.use(todosRoutes);

app.use(userRoutes);

app.use((error, req, res, next)=>{
    res.status(error.statusCode || 500).json({message: error.message})
});

module.exports = app