const { Op } = require("sequelize");
const { User } = require('../models')
const bcrypt = require('bcryptjs');

class UserController {
    static async registerForm(req, res) {
        try {
            const role = ['Developer', 'Buyer']

            res.render('registerForm', { role })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async savedRegister(req, res) {
        try {
            const { userName, email, password, role } = req.body

            await User.create({ userName, email, password, role })
            res.redirect('/login')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async loginForm(req, res) {
        try {

            const { error } = req.query

            res.render('loginForm', { error })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async savedLogin(req, res) {
        try {
            const { email, password } = req.body

            const error = "Invalid email or password";
            const user = await User.findOne({ where: { email } });
            if (!user) return res.redirect(`/login?error=${error}`);

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return res.redirect(`/login?error=${error}`);

            req.session.userId = user.id
            req.session.role = user.role

            res.redirect('/')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err)
                    return res.send(err)
                }
                res.redirect("/login")
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = UserController