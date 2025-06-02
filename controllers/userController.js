const { Op } = require("sequelize");
const { User } = require('../models')
const bcrypt = require('bcryptjs') ;

class UserController {
    static async registerForm(req, res) {
        try {
            const role = ['Developer', 'Buyer']
            
            res.render('registerForm', {role})
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async savedRegister(req, res) {
        try {
            const {userName, email, password, role} = req.body

            await User.create({userName, email, password, role})
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async loginForm(req, res) {
        try {
            res.render('loginForm')
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async savedLogin(req, res) {
        try {
            const { email, password } = req.body
            
            res.redirect('/')
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async X(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }
}

module.exports = UserController