const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
    surname: {
		type: String,
		required: true
	},
    gender: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
})

const UserModel = mongoose.model('user', userShema)

module.exports = UserModel