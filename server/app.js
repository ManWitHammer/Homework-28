const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UsersModel = require('./models/UserModel')
const UserModel = require('./models/UserModel')

require('dotenv').config()

const port = process.env.PORT || 3002
const app = express()

mongoose.connect(process.env.MONGO_URI)

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(
	cors({
		origin: ['http://localhost:5173'],
		methods: 'GET, PATCH, POST, DELETE'
	})
)
app.use(bodyParser.json())

app.get('/', async (req, res) => {
	try {
		const users = await UsersModel.find({})
		res.send(users)
	} catch (err) {
		console.error('Произошла ошибка при получении пользователя', err)
		res.send({ error: 'Произошла ошибка при получении пользователя', err })
	}
})

app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id
		console.log(id)
		const user = await UserModel.deleteOne({ _id: id })
		res.send(user)
	} catch (err) {
		console.error('Произошла ошибка при удалении пользователя', err)
		res.send({ error: 'Произошла ошибка при удалении пользователя', err })
	}
})

app.patch('/patch/:id', async (req, res) => {
	try {
		const id = req.params.id
		const user = await UserModel.updateOne({ _id: id }, req.body)
		res.send(user)
	} catch (err) {
		console.error('Произошла ошибка при обновлении пользователя', err)
		res.send({ error: 'Произошла ошибка при обновлении пользователя', err })
	}
})

app.post('/post', async (req, res) => {
	try {
		const user = await UserModel.create(req.body)
		res.send(user)
	} catch (err) {
		console.error('Произошла ошибка при создании пользователя', err)
		res.send({ error: 'Произошла ошибка при создании пользователя', err })
	}
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})