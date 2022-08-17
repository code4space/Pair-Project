const { User, Profile, Category, Service } = require('../models')
const bcrypt = require('bcrypt')

class Controller {

  static showLandingPage(req, res) {
    // res.send(req.session.username) // prof sayid
    let username = req.session.username
    res.render('landing-page', { username })
  }

  static showAllService(req, res) {
    let usernameLoggedIn = req.session.username
    Service.findAll()
      .then(dataAllService => {
        res.render('service-list', { dataAllService, usernameLoggedIn })
      }).catch(err => {
        res.send(err)
      })
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
            return res.redirect('/services')
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


  // static deleteUserMethod(req, res) {

  // }

  // static showUserProfile(req, res) {

  // }

  // static showUserProfileAddForm(req, res) {

  // }

  // static addUserProfileMethod(req, res) {

  // }

  static showServicesById(req, res) {
    let UserId = +req.params.UserId
    Service.findAll(
      { where: { UserId: UserId } }
    )
      .then(dataAllServiceId => {
        res.render('service-list-id', { dataAllServiceId })
      }).catch(err => {
        res.send(err)
      })
  }

  static showServicesAddForm(req, res) {

  }

  static addServicesMethod(req, res) {

  }

  static showServicesEditForm(req, res) {

  }

  static editServicesMethod(req, res) {

  }

  static deleteServices(req, res) {

  }

}

module.exports = Controller