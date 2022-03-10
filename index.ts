import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

app.get('/users', async (req,res) => {
    const users = await prisma.user.findMany({include: {Order: {select: {itemId: true, quantity: true}}}})
    res.send(users)
})

app.get('users/:id', async (req,res) => {
    const id = req.params.id
    try{
        const user = await prisma.user.findUnique({where: {id: id}})
        res.send(user)
    } catch(err) {
        res.status(400).send(`<pre>${err.message}</pre>`)
    }
})

app.get('/items', async (req,res) => {
    const items = await prisma.item.findMany({include: {Order: {select: {userId: true, quantity: true}}}})
    res.send(items)
})

app.get('/items/:id', async (req,res) => {
    const id = req.params.id
    try{
        const item = prisma.item.findUnique({where: {id: id}})
        res.send(item)
    } catch(err) {
        res.status(400).send(`<pre>${err.message}</pre>`)
    }
})

app.listen(4000, () => {
    console.log('Server up: http://localhost:4000');
})