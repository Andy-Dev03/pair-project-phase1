const { Op } = require("sequelize")
const { User, Purchase, Profile, Game, Category, GameCategory } = require('../models')
const user = require("../models/user")

class Controller {
    static async home(req, res) {
        try {
            const { error } = req.query

            res.render('home', { error })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async store(req, res) {
        try {
            const games = await Game.findAll({
                include: [
                    {
                        model: Category,
                        through: { attributes: [] }
                    }
                ]
            })

            res.render('store', { games })
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
                where: {
                    role: {
                        [Op.eq]: 'Developer'
                    }
                }
            })

            res.render('addGameForm', { userDev })
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
            const { id } = req.params
            const userDev = await User.findAll({
                attributes: ['id', 'userName'],
                where: {
                    role: {
                        [Op.eq]: 'Developer'
                    }
                }
            })

            const one = await Game.findOne({
                where: {
                    id: +id
                },
                include: {
                    model: User,
                    where: {
                        role: {
                            [Op.eq]: 'Developer'
                        }
                    }
                }
            });

            res.render('editGameForm', { userDev, one })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async updateGame(req, res) {
        try {
            const { id } = req.params
            const { gameName, imageUrl, UserId } = req.body

            await Game.update(
                {
                    gameName,
                    imageUrl,
                    UserId
                },
                {
                    where: {
                        id: +id
                    }
                }
            )

            res.redirect('/store')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async deleteGame(req, res) {
        try {
            const { id } = req.params

            await Game.destroy({
                where: {
                    id: +id
                }
            })

            res.redirect('/store')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }
}

module.exports = Controller