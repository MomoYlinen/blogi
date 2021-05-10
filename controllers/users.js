const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Logger = require('../utils/logger')

usersRouter.post('/',async (request, response, next) => {
    const body = request.body

    console.log(request)

    if (body.password === undefined) {
        return response.status(400).json({error:'password missing'})
    }

    if (body.password.length <3) {
        return response.status(400).json({error:'password must be longer than 3 characters'})
    }

    saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name:body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs',{author:1, title:1, url:1, likes:1})
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
