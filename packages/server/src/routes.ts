import express from 'express'
import { PrismaClient } from '@prisma/client'

const routes = express.Router()
const prisma = new PrismaClient()

routes.get('/', async (_request, response) => {
  const users = await prisma.user.findMany()
  return response.json(users)
})

export default routes
