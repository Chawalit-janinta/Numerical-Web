const router = require('express').Router();
let User = require('../models/bisection-model');

router.route('/').get((req, res) => {
  User.find()
    .then(bisection => res.json(bisection))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const equation = req.body.equation;
  const xl = req.body.xl;
  const xr = req.body.xr;
  const neweq = new User({equation,xl,xr});

  neweq.save()
    .then(() => res.json('fx added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;