const { User, Profile, Category, Service } = require('../models')
const bcrypt = require('bcrypt')

class Controller {

  static showLandingPage(req, res) {
    res.render('landing-page')
  }

  static showAllService(req, res) {
    Service.findAll()
      .then(dataAllService => {
        res.render('service-list', { dataAllService })
      }).catch(err => {
        res.send(err)
      })
  }

  static showLogin(req, res) {
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
            return res.redirect('/')
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
  }

  static showRegister(req, res) {
    res.render('register')
  }

  static registerMethod(req, res) {
    let { username, password, role, email } = req.body
    User.create({ username, password, role, email })
      .then(() => {
        res.redirect('/')
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