const express = require('express');

const authRouter = require('./authRouter.js');

const server = express();

server.use(express.json());

server.use('/api', authRouter);



server.get('/', (req, res) => {
  res.status(200).json({ message: 'The Auth Server | By: x-zen' });
});

module.exports = server;
