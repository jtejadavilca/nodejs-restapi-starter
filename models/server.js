require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usersPath = '/api/users';

        // Connection to DB
        this.dbConnect();

        // Middlewares
        this.middlewares();

        // Application routes
        this.routes();
    }

    async dbConnect() {
        dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Parse of body
        this.app.use( express.json() );

        // Public directory for static files
        this.app.use( express.static('public') );
        
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth.routes') );
        this.app.use( this.usersPath, require('../routes/user.routes') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening in port ${this.port}`);
        });
    }
}

module.exports = Server;