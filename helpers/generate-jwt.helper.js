const jwt = require('jsonwebtoken');

const generateJTW = ( userId = '', role = '' ) => {
    return new Promise((resolve, reject) => {
        const payload = {userId, role};
        jwt.sign(payload, process.env.SIGN_TOKEN, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject();
            }

            resolve(token);
        });
    });
};

module.exports = {
    generateJTW
}