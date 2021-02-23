const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../../config/secret")

module.exports = (req,res,next) => {
    const token = req.headers.authorization
    !token ?
    res.status(401).json("need token") :
    jwt.verify(token,jwtSecret, (err, decoded) => {
        if(err){
            res.status(401).json("bad token" + err.message)
        }else{
            req.decodedToken = decoded
            next()
        }
    })
}