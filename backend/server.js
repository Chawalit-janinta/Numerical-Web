const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const graphical = require('./routes/graphical');
const bisection = require('./routes/bisection');
const false_position = require('./routes/false_position');
const one_point = require('./routes/one-point');
const newton = require('./routes/newton');
const secant = require('./routes/secant');
const cramer = require('./routes/cramer');
const jacobi = require('./routes/jacobi');
const gauss_seidel = require('./routes/gauss-seidel');
const gauss_elimination = require('./routes/gauss-elimination');
const gauss_jordan = require('./routes/gauss-jordan');

app.use('/graphical', graphical);
app.use('/bisection', bisection);
app.use('/falseposition', false_position );
app.use('/onepoint', one_point );
app.use('/newton', newton );
app.use('/secant', secant );
app.use('/cramer', cramer );
app.use('/jacobi', jacobi );
app.use('/gauss-seidel', gauss_seidel );
app.use('/gauss-elimination', gauss_elimination );
app.use('/gauss-jordan', gauss_jordan );

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});