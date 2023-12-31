const express = require('express');
const router = express.Router();
const cors = require('cors')
const {test, registerUser,loginUser} = require('../controllers/authController')

//middleware


//<------------------------------REPLACE ORIGIN WITH IP FOR FRONT END------------------------------------------>
router.use(
    cors({
        credentials: true,
        origin: 'https://tubular-crepe-678e4c.netlify.app'
    })
)


router.get('/',test)
router.post('/register', registerUser)
router.post('/login',loginUser)

module.exports = router
