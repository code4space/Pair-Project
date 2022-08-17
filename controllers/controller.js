const { User, Profile, Category, Service } = require('../models')
const bcrypt = require('bcrypt')

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
    let err = req.query.err
    res.render('login', {err})
  }

  static loginMethod (req, res) {
    let {username, password, role} = req.body
    User.findOne({
      where: {
        username
      }
    })
      .then(user => {
        if (user) {
          const invalidPassword = bcrypt.compareSync(password, user.password);
          
          if (invalidPassword) return res.redirect('/')
          else res.redirect('/login?err=ERROR')
        }
      })
      .catch (err => res.send(err))
  }

  static showRegister (req, res) {
    res.render('register')
  }

  static registerMethod (req, res) {
    let {username, password, role, email} = req.body
    User.create({username, password, role, email})
      .then(() => {
        res.redirect('/')
      })
      .catch(err => res.send(err))
  }
}

module.exports = Controller