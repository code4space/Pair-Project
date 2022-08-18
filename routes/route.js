const { Router } = require('express')
const Controller = require('../controllers/controller')

const routes = require('express').Router()

routes.get('/', Controller.showLandingPage)

// bikin coba tes route all 

routes.get('/login', Controller.showLogin)
routes.post('/login', Controller.loginMethod)

routes.get('/register', Controller.showRegister)
routes.post('/register', Controller.registerMethod)

routes.get('/logout', Controller.logoutMethod)

// req session utk is loggin :


routes.use(function (req, res, next) {
  if (!req.session.username) {
    const error = 'Please Login First'
    res.redirect(`/login?err=${error}`)
  } else {
    next()
  }
})

routes.get('/profile/:username', Controller.showProfile)
routes.get('/profile/:username/add', Controller.showUserProfileAddForm)
routes.post('/profile/:username/add', Controller.addUserProfileMethod)
routes.get('/profile/:username/edit', Controller.showUserProfileEditForm)
routes.post('/profile/:username/edit', Controller.editUserProfileMethod)


// endpoint buyer
routes.get('/services/buyer/:username', Controller.showBuyerPage)

//TODO : IMPLEMENT BUY UTK BUYER.
//! TAPI PRIORITASIN UTK EDIT ADD DELETE KHUSUS SELLER

routes.get('/services/seller/:username', Controller.showSellerPage)

// req session utk privilege seller :

routes.use(function (req, res, next) {
  if (req.session.username && req.session.role === 'seller') {
    next()
  }
  else if (req.session.username && req.session.role === 'buyer') {
    next()
  }
})

// routes.get('/services', Controller.showAllService)


// routes.get('/services/:id/delete', Controller.deleteUserMethod)

// TODO: PENTING !
//!  PRIORITASIN UTK EDIT ADD DELETE KHUSUS SELLER

routes.get('/services/seller/:username/add', Controller.showServicesSellerAddForm)
routes.post('/services/seller/:username/add', Controller.addServicesSellerMethod)
routes.get('/services/seller/:username/edit/:idService', Controller.showServicesSellerEditForm)
routes.post('/services/seller/:username/edit/:idService', Controller.editServicesSellerMethod)
routes.get('/services/seller/:username/delete/:idService', Controller.deleteSellerServices)


module.exports = routes