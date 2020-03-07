const router = require('express').Router();
let User = require('../models/gauss-seidel-model');

router.route('/').get((req, res) => {
    User.find()
      .then(gaussseidel => res.json(gaussseidel))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const A = req.body.A;
  const B = req.body.B;
  const X = req.body.X;
  const size = req.body.size;
  const neweq = new User({A,B,X,size});
  //console.log(A,B);
  neweq.save()
    .then(() => res.json('matrix added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;