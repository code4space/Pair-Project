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

// // profile dulu
// routes.get('/profile/:username', Controller.showUserProfile)
// routes.get('/profile/:username/add', Controller.showUserProfileAddForm)
// routes.post('/profile/:username/add', Controller.addUserProfileMethod)
// routes.get('/profile/:username/edit', Controller.showUserProfileEditForm)
// routes.post('/profile/:username/edit', Controller.editUserProfileMethod)
// routes.get('/profile/:username/delete', Controller.showUserProfileEditForm)

// endpoint buyer
routes.get('/services/buyer/:username', Controller.showBuyerPage)

//TODO : IMPLEMENT BUY UTK BUYER.
//! TAPI PRIORITASIN UTK EDIT ADD DELETE KHUSUS SELLER

routes.get('/services/seller/:username', Controller.showSellerPage)

// req session utk privilege seller :

routes.use(function (req, res, next) {
  if (req.session.username && req.session.role !== 'seller') {
    // const error = 'You have to be a seller'
    // res.redirect(`/login?err=${error}`)
    // res redirect ke endpoint buyer
    // kalo dia buyer, maka redirect ke buyer page
    res.redirect('/services/buyer/' + req.session.username)
  }
  else {
    // kalo dia seller, maka redirect ke seller page. lanjut aja
    res.redirect('/services/seller/' + req.session.username)
    next()
  }
})



routes.get('/services', Controller.showAllService)


// routes.get('/services/:id/delete', Controller.deleteUserMethod)

// TODO: PENTING !
//!  PRIORITASIN UTK EDIT ADD DELETE KHUSUS SELLER

routes.get('/services/seller/:username/add', Controller.showServicesSellerAddForm)
routes.post('/services/seller/:username/add', Controller.addServicesSellerMethod)
routes.get('/services/seller/:username/edit', Controller.showServicesSellerEditForm)
routes.post('/services/seller/:username/edit', Controller.editServicesSellerMethod)
routes.get('/services/seller/:username/delete', Controller.deleteSellerServices)

// routes.use(function (req, res, next) {
//   console.log('Time: ', Date.now(), 'Halo, mecahin next utk login/notlogin')
//   next()
// })


module.exports = routes