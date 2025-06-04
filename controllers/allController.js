const { Op } = require("sequelize")
const { User, Purchase, Profile, Game, Category, GameCategory } = require('../models')
const user = require("../models/user")

class Controller {
    static async home(req, res) {
        try {
            const { error } = req.query
            const userId = req.session.userId
            const role = req.session.role
            //res.send(userId)
            res.render("home", { error, userId, role })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async store(req, res) {
        try {
            const { error, search } = req.query

            let option = {
                include: [
                    {
                        model: User,
                        attributes: ["userName"],
                    },
                    {
                        model: Category,
                        through: { attributes: [] },
                    },
                ],
            }

            if(search) {
                if(!option.where) option.where = {}
                option.where = {
                    gameName : {
                        [Op.iLike] : `%${search}%`
                    }
                }
            }

            const games = await Game.findAll(option)

            const userId = req.session.userId
            const role = req.session.role
            // res.send(games)
            res.render("store", { games, userId, role, error })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async buyGame(req, res) {
        try {
            const { id } = req.params
            const userId = req.session.userId

            const existingPurchase = await Purchase.findOne({
                where: {
                    UserId: userId,
                    GameId: id,
                },
            })

            if (existingPurchase) {
                return res.redirect("/store?error=You already own this game")
            }

            await Purchase.create({
                UserId: userId,
                GameId: id,
                purchaseDate: new Date(),
            })

            res.redirect("/purchases?success=Game purchased successfully")
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async purchases(req, res) {
        try {
            const userId = req.session.userId
            const { success } = req.query

            const purchases = await Purchase.findAll({
                where: { UserId: userId },
                include: [
                    {
                        model: Game,
                        include: [
                            {
                                model: User,
                                attributes: ["userName"],
                            },
                            {
                                model: Category,
                                through: { attributes: [] },
                            },
                        ],
                    },
                ],
                order: [["purchaseDate", "DESC"]],
            })
            // res.send(purchases)
            res.render("purchases", { purchases, success, error })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async games(req, res) {
        try {
            const userId = req.session.userId
            const role = req.session.role

            let games;
            if (role === "Developer") {
                games = await Game.findAll({
                    where: { UserId: userId },
                    include: [
                        {
                            model: User,
                            attributes: ["userName"],
                        },
                        {
                            model: Category,
                            through: { attributes: [] },
                        },
                    ],
                })
            } else {
                games = await Game.findAll({
                    include: [
                        {
                            model: User,
                            attributes: ["userName"],
                        },
                        {
                            model: Category,
                            through: { attributes: [] },
                        },
                    ],
                })
            }

            res.render("games", { games, role })
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
            const { gameName, imageUrl } = req.body
            const UserId = req.session.userId

            await Game.create({ gameName, UserId, imageUrl })
            res.redirect('/games')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async categories(req, res) {
        try {
            const categories = await Category.findAll({
                include: [
                    {
                        model: Game,
                        through: { attributes: [] },
                        include: [
                            {
                                model: User,
                                attributes: ["userName"],
                            },
                        ],
                    },
                ],
            })
            // res.send(categories)
            res.render("categories", { categories })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async addCategoryForm(req, res) {
        try {
            res.render('addCategories')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async saveCategory(req, res) {
        try {
            const { categoryName } = req.body

            await Category.create({ categoryName })
            res.redirect("/categories")
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }
    static async editGameForm(req, res) {
        try {
            const { id } = req.params

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

            res.render('editGameForm', { one })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async updateGame(req, res) {
        try {
            const { id } = req.params
            const { gameName, imageUrl } = req.body


            await Game.update(
                {
                    gameName,
                    imageUrl
                },
                {
                    where: {
                        id: +id
                    }
                }
            )

            res.redirect('/games')
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

            res.redirect('/games')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }
}

module.exports = Controller