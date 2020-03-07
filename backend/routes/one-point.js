const router = require('express').Router();
let User = require('../models/one-point-model');

router.route('/').get((req, res) => {
  User.find()
    .then(onepoint => res.json(onepoint))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const equation = req.body.equation;
  const x0 = req.body.x0;
  const neweq = new User({equation,x0});

  neweq.save()
    .then(() => res.json('fx added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;