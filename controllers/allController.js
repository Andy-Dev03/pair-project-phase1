const { Op } = require("sequelize")
const { User, Purchase, Profile, Game, Category, GameCategory } = require('../models')
const user = require("../models/user")

class Controller {
    static async home(req, res) {
        try {
           
            res.render('home')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async store(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async buyGame(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async purchases(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async games(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async addGameForm(req, res) {
        try {
            const userDev = await User.findAll({
                attributes: ['id', 'userName'],
                where : {
                    role : {
                        [Op.eq] : 'Developer'
                    }
                }
            }) 

            res.render('addGameForm', {userDev})
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async saveGame(req, res) {
        try {
            const { gameName, imageUrl, UserId } = req.body
            
            await Game.create({ gameName, UserId, imageUrl })
            res.redirect('/')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async categories(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async addCategoryForm(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async saveCategory(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }
    static async editGameForm(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async updateGame(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async deleteGame(req, res) {
        try {
            res.send('X')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }
}

module.exports = Controller