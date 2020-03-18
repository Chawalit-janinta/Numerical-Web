const router = require('express').Router();
let User = require('../models/lagrange-model');

router.route('/').get((req, res) => {
    User.find()
      .then(lagrange => res.json(lagrange))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const X = req.body.X;
  const Y = req.body.Y;
  const x_value = req.body.x_value;
  const size = req.body.size;
  const neweq = new User({X,Y,x_value,size});
  //console.log(A,B);
  neweq.save()
    .then(() => res.json('lagrange added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;