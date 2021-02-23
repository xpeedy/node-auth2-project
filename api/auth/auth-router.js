const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const Users = require("../users/users-model")
const { isValid } = require("../users/users-services")
const { jwtSecret } = require("../../config/secret")


router.post("/register", (req,res) => {
    const credentials = req.body
    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8
        const hash = bcryptjs.hashSync(credentials.password, rounds)
        credentials.password = hash

        Users.add(credentials).then(user => {
            res.status(201).json({ data:user })
        })
        .catch(error => {
            res.status(400).json({ message: error.message })
        })

    }else{
        res.status(400).json({message: "please provie username and password"})
    }
});

router.post("/login",(req,res) => {
    const { username, password } = req.body
    if(isValid(req.body)) {
        Users.findBy({ username: username})
        .then(([user]) => {
            if(user && bcryptjs.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    message: "Welcome " + user.username,
                    token
                })
            }else{
                res.status(401).json({ message: "invalid credentials" })
            }
        })
        .catch(error => {
            res.status(400).json({ message: error.message})
        })
    }else {
        res.status(400).json({
            message:"please provie username and password"
        })
    }
})

function generateToken(user){
    const payload = {
        subject:user.id,
        username:user.username
    }
    const options = {
        expiresIn: "600s"
    }
    return jwt.sign(payload,jwtSecret,options)
}

module.exports = router;