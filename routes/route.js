const Controller = require('../controllers/controller')

const routes = require('express').Router()

routes.get('/', Controller.showHome)

// bikin coba tes route all 

// routes.get('/login', Controller.showLogin)
// routes.post('/login', Controller.loginMethod)

// routes.get('/register', Controller.showRegister)
// routes.post('/register', Controller.registerMethod)

routes.get('/services', Controller.showAllService)



module.exports = routes