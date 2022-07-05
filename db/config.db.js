const mongoose = require('mongoose');

const dbConnection = () => {
    try{
        mongoose
            .connect(process.env.MONGO_DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(c => console.log('Connected to DB'));
    } catch(err) {
        throw new Error('Error connecting to MongoBD');
    }
};

module.exports = {
    dbConnection
};