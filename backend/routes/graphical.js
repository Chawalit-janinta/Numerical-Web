const router = require('express').Router();
let User = require('../models/graphical-model');

router.route('/').get((req, res) => {
  User.find()
    .then(graphical => res.json(graphical))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const equation = req.body.equation;
  const neweq = new User({equation});

  neweq.save()
    .then(() => res.json('fx added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req,res) => {
    User.findOne(req.params.id)
      .then(graphical => res.json(graphical))
      .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;