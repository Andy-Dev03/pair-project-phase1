const express = require('express')
const Controller = require('../controllers/allController')
const UserController = require('../controllers/userController')
const router = express.Router()

const isDev = function (req, res, next) {
    if(req.session.userId && req.session.role !== 'Developer') {
        const error = `You not a developer u can't add game (Just can buy)`
        res.redirect(`/?error=${error}`)
    } else {
        next();
    }
}

//Register and Log in
router.get("/register", UserController.registerForm)//V
router.post("/register", UserController.savedRegister)//V
router.get("/login", UserController.loginForm)//V
router.post("/login", UserController.savedLogin)//V
router.get("/", Controller.home)//V

router.use(function (req, res, next) {
    if(!req.session.userId) {
        const error = 'Must be log in First'
        res.redirect(`/login?error=${error}`)
    } else {
        next();
    }
});

router.get("/logout", UserController.logout)//V

// Profile
router.get("/profile", ProfileController.showProfile)
router.get("/profile/edit", ProfileController.editProfileForm)
router.post("/profile/edit", ProfileController.updateProfile)

// Purchases
router.get("/store", Controller.store)//V
router.get("/store/:id/buy", Controller.buyGame)//V
router.get("/purchases", Controller.purchases)//V

//Games
router.get("/games", Controller.games) //V
router.get("/games/add", isDev, Controller.addGameForm) //V
router.post("/games/add", isDev, Controller.saveGame) //V

//Categories
router.get("/categories", Controller.categories) //V
router.get("/categories/add", Controller.addCategoryForm) //V
router.post("/categories/add", Controller.saveCategory) //V

//Params
router.get("/games/:id/edit", isDev, Controller.editGameForm) //V
router.post("/games/:id/edit", isDev, Controller.updateGame) //V
router.get("/games/:id/delete", isDev, Controller.deleteGame) //V

module.exports = router