const Role = require('../models/role.model');
const User = require('../models/users.model');

const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if( !existeRol ){
        throw new Error(`Role ${role} is not registered`);
    }
};

const isEmailAlreadyRegistered = async (email) => {
    const emailExists = await User.findOne({email});
    if( emailExists ) {
        throw new Error(`Email is already registered`);
    }
}

const existsUserById = async (id) => {
    const userExists = await User.findById(id);
    if( !userExists ) {
        throw new Error(`User with id ${id} does not exists`);
    }
}

module.exports = {
    isValidRole,
    isEmailAlreadyRegistered,
    existsUserById
}