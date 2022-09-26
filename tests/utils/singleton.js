/* eslint-disable no-undef */
const prisma = require("./client")

jest.mock('prisma');

beforeEach(() => {
    jest.resetModules() 
  })


module.exports = prisma 
