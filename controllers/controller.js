const { Op } = require("sequelize")

class Controller {
    static async home(req, res) {
        try {
            res.render('home')
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

module.exports = Controller