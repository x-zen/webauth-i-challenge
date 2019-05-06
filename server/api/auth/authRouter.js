// Routes for '/api'
const bcrypt = require('bcryptjs');

const db = require('../../data/dbConfig.js');
const Users = require('./users-model.js');
const protected = require('./protected-middleware.js');

const router = require('express').Router();


//GET (/api/users) - get all users
router.get('/users', (req,res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

//POST (/api/register) - creates a new user
router.post('/register', (req,res) => {
  let user = req.body;
  // check for username and password

  const hash = bcrypt.hashSync(user.password, 8);
  // pass > hashit > hash > hashit > hash > hashit > hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//POST (/api/login) - authenticates a user
router.post('/login', (req,res) => {
  let { username, password } = req.body;

  // we compare the password guess against the database hash
  Users.findBy({ username })
    .first()
    .then(user => {
      //
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


module.exports = router;
