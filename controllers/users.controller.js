const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
    const { id = -1 } = req.query;
    res.json({
        msg: 'GET API - Controller',
        id
    });
};

const usersPost = (req = request, res = response)=> {
    const { name, age } = req.body;
    res.json({
        msg: 'POST API',
        body: {
            name,
            age
        }
    })
};

const usersPut = (req = request, res = response)=> {
    const { id = -1 } = req.params;
    const { name, age } = req.body;
    res.json({
        msg: 'PUT API',
        id,
        body: {
            name,
            age
        }
    })
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

const usersDelete = (req = request, res = response)=> {
    const { id = -1 } = req.params;
    res.json({
        msg: 'DELETE API',
        id
    })
};



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
};