const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    if(!verifyToken(res, req.header("Authorization"))) {
        return res.status(401).send({
            msg: 'Not authorized'
        });
    }
    
    next();
}

const validateJWTAdmin = (req = request, res = response, next) => {
    if(!verifyToken(res, req.header("Authorization"), true)) {
        return res.status(401).send({
            msg: 'Not authorized'
        });
    }
    
    next();
}

const verifyToken = (res, token, validateAdmin = false) => {
    if(!token) {
        return false;
    }

    try{
        const { role } = jwt.verify(token, process.env.SIGN_TOKEN);
        
        return !validateAdmin || 'ADMIN_ROLE' === role;
    } catch(error) {
        return false;
    }
}

module.exports = {
    validateJWT,
    validateJWTAdmin
}