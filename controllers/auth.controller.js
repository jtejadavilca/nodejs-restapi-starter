const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/users.model');
const { generateJTW } = require('../helpers/generate-jwt.helper');

const login = async (req = request, res = response) => {
    const {email, password} = req.body;

    try{
        console.log('email', email);

        const user = await User.findOne({ email, active: true });
        if(!user) {
            return res.status(401).json({msg: 'Usuario or password incorrect'});
        }

        // //user.password
        const passValid = bcryptjs.compareSync(password, user.password);
        if(!passValid){
            return res.status(401).json({msg: 'Usuario or password incorrect'});
        }

        const jwt = await generateJTW(user.id, user.role);

        res.json({
            user,
            jwt
        })
    } catch(err) {
        res.status(500).json({
            msg: 'Error interno, comunicarse con el administrador del sistema',
            error: true
        });
    }
};

module.exports = {
    login
}