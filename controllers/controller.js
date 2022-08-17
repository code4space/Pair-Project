const { User, Profile, Category, Service } = require('../models')

class Controller {

  static showHome(req, res) {
    res.render('home')
  }

  static showAllService(req, res) {
    Service.findAll()
      .then(dataAllService => {
        res.render('service-list', { dataAllService })
      }).catch(err => {
        res.send(err)
      })
  }

  static showLogin (req, res) {
    res.render('login')
  }

  static showRegister (req, res) {
    res.render('register')
  }
}

module.exports = Controller