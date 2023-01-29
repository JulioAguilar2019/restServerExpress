const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutesPath = '/api/users';

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Reading and parsing of the body
    this.app.use(express.json());

    //public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersRoutesPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
