const Controller = require('../controllers/controller')

const routes = require('express').Router()

routes.get('/', Controller.showLandingPage)

// bikin coba tes route all 

routes.get('/login', Controller.showLogin)
routes.post('/login', Controller.loginMethod)

routes.get('/register', Controller.showRegister)
routes.post('/register', Controller.registerMethod)

// req session utk is loggin :

/*
router.use(function (req, res, next) {
  if (!req.session.userId) {
    const error = 'Please Login First'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})
*/


// req session utk privilege seller :
/*
router.use(function(req,res,next){
  if(req.session.userId && req.session.role !== 'seller') {
    const error = 'You have to be a seller'
    res.redirect(`/login?error=${error}`)
  }
  else {
    next()
  }
})

*/


routes.get('/services', Controller.showAllService)


// routes.get('/services/:id/delete', Controller.deleteUserMethod)


// // profile dulu
// routes.get('/profile/:UserId', Controller.showUserProfile)
// routes.get('/profile/:UserId/add', Controller.showUserProfileAddForm)
// routes.post('/profile/:UserId/add', Controller.addUserProfileMethod)
// routes.get('/profile/:UserId/edit', Controller.showUserProfileEditForm)
// routes.post('/profile/:UserId/edit', Controller.editUserProfileMethod)
// routes.get('/profile/:UserId/delete', Controller.showUserProfileEditForm)

routes.get('/services/:UserId', Controller.showServicesById)
routes.get('/services/:UserId/add', Controller.showServicesAddForm)
routes.post('/services/:UserId/add', Controller.addServicesMethod)
routes.get('/services/:UserId/edit', Controller.showServicesEditForm)
routes.post('/services/:UserId/edit', Controller.editServicesMethod)
routes.get('/services/:UserId/delete', Controller.deleteServices)

// routes.use(function (req, res, next) {
//   console.log('Time: ', Date.now(), 'Halo, mecahin next utk login/notlogin')
//   next()
// })


module.exports = routes