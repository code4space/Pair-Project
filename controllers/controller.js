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

}

module.exports = Controller