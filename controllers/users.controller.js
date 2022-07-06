const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users.model');

const usersGetAll = async (req = request, res = response) => {
    const { page = 0, limit = 100 } = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments({active:true}),
        User.find({active:true}).skip(page*limit).limit(limit)
    ]);

    return res.json({
        total,
        users
    });
};

const usersGet = async (req = request, res = response) => {
    const { id = -1 } = req.params;
    const user = await User.findById(id);

    res.json({
        user
    });
};

const usersPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;

    const user = new User( { name, email, password, role } );

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync( user.password, salt );

    user.save();

    res.json({
        body: user
    });
};

const usersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, googleAuth, email, ...remainder } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        remainder.password = bcryptjs.hashSync( user.password, salt );
    }

    const user = await User.findByIdAndUpdate( id, remainder, {new: true})

    res.json({
        msg: 'PUT API',
        id,
        body: {
            user
        }
    });
};

const usersPatch = (req = request, res = response)=> {
    const { id = -1 } = req.params;
    const { name, age } = req.body;
    res.json({
        msg: 'PATCH API',
        id,
        body: {
            name,
            age
        }
    })
};

// const usersDelete = async (req = request, res = response)=> {
//     const { id = -1 } = req.params;

//     const user = await User.findByIdAndDelete(id);

//     res.json(
//         user
//     );
// };

const usersDelete = async (req = request, res = response)=> {
    const { id = -1 } = req.params;

    const user = await User.findByIdAndUpdate(id, {active:false}, {new: true});

    res.json(user);
};



module.exports = {
    usersGetAll,
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
};