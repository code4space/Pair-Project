const { User, Profile, Category, Service } = require('../models')
const bcrypt = require('bcrypt')

class Controller {

  static showLandingPage(req, res) {
    // res.send(req.session.username) // prof sayid
    let username = req.session.username
    res.render('landing-page', { username })
  }

  static showAllService(req, res) {
    // let usernameLoggedIn = req.session.username
    // Service.findAll()
    //   .then(dataAllService => {
    //     res.render('service-list', { dataAllService, usernameLoggedIn })
    //   }).catch(err => {
    //     res.send(err)
    //   })
  }

  static showLogin(req, res) {
    req.session.username = null
    let err = req.query.err
    res.render('login', { err })
  }

  static loginMethod(req, res) {
    let { username, password, role } = req.body
    User.findOne({
      where: {
        username
      }
    })
      .then(user => {
        if (user) {
          const isvalidPassword = bcrypt.compareSync(password, user.password);

          if (isvalidPassword) {
            req.session.username = user.username
            req.session.role = user.role
            console.log(user.role === "seller")
            if (user.role === "buyer") {
              console.log('masuk buyer')
              return res.redirect(`/services/buyer/${req.session.username}`)
            }
            if (user.role === "seller") {
              console.log('masuk seller')
              return res.redirect(`/services/seller/${req.session.username}`)
            }
            // return res.redirect('/services')
          }
          else {
            const errorMessage = `invalid username / password`
            return res.redirect(`/login?err=${errorMessage}`)
          }
        } else {
          const errorMessage = `invalid username / password`
          return res.redirect(`/login?err=${errorMessage}`)
        }
      })
      .catch(err => res.send(err))
    // req.session.username = req.body.username // prof sayid
    // res.redirect('/') // prof sayid
    // res.send(req.session.username) // prof sayid
  }

  static showRegister(req, res) {
    res.render('register')
  }

  static registerMethod(req, res) {
    let { username, password, role, email } = req.body
    User.create({ username, password, role, email })
      .then(() => {
        res.redirect('/services')
      })
      .catch(err => res.send(err))
  }

  static logoutMethod(req, res) {
    req.session.destroy(err => {
      if (err) {
        res.send(err)
      } else {
        res.redirect('/')
      }
    })
  }


  // static deleteUserMethod(req, res) {

  // }

  // static showUserProfile(req, res) {

  // }

  // static showUserProfileAddForm(req, res) {

  // }

  // static addUserProfileMethod(req, res) {

  // }

  static showBuyerPage(req, res) {
    let usernameLoggedIn = req.session.username
    let usernameParams = req.params.username
    Service.findAll()
      .then(dataAllService => {
        res.render('service-list-buyer', { dataAllService, usernameLoggedIn, usernameParams })
      }).catch(err => {
        res.send(err)
      })
  }

  static showSellerPage(req, res) {
    let usernameLoggedIn = req.session.username
    let usernameParams = req.params.username

    User.findOne({
      where: {
        username: req.params.username
      }
    })
      .then(userId => {
        Service.findAll({
          where: {UserId: userId.id}
        })
        .then(dataAllService => {
          console.log(userId + '<<< ini userId')
          res.render('service-list-seller', { dataAllService, usernameLoggedIn, usernameParams })
        }).catch(err => {
          res.send(err)
        })
      })
  }


  static showServicesSellerAddForm(req, res) {
    res.render('service-add-seller')
  }

  static addServicesSellerMethod(req, res) {
    // const {nameService, description, price, CategoryId} = req.body

    User.findOne({
      where: {
        username: req.params.username
      }
    })
      .then(userId => {
        console.log(req.body)
        console.log(userId.id + " <<< userId loh!")
        let body = {
          nameService: req.body.nameService,
          description: req.body.description,
          price: +req.body.price,
          UserId: +userId.id,
          CategoryId: +req.body.CategoryId
        }
        Service.create(body)
        .then(() => {
          res.redirect(`/services/seller/:${req.params.username}`)
        }).catch(err => {
          res.send(err)
        })
      })
    
  }

  static showServicesSellerEditForm(req, res) {

  }

  static editServicesSellerMethod(req, res) {

  }

  static deleteSellerServices(req, res) {
    Service.destroy({
      where: {
        id: req.params.idService
      }
    })
      .then(() => {
        res.redirect('/services/seller/nicoline1')
      })
      .catch(err => res.send(err))
  }

}

module.exports = Controller