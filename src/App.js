import React, { Component } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from "./home";
import graphical from "./graphical";
import bisection from "./bisection";
import falseposition from "./false_position";
import onepoint from "./one-point";
import newton from "./newton";
import secant from "./secant";
import cramer from "./cramer";
import gauss_elimination from "./gauss-elimination";
import gauss_jordan from "./gauss-jordan";
import LUdecomposition from "./LUdecomposition";
import cholesky from "./cholesky";
import jacobi from "./jacobi";
import gauss_seidel from "./gauss-seidel";
import conjugate from "./conjugate";
import linear from "./linear";

//import cholesky_n from "./cholesky_n";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/graphical" component={graphical} />
          <Route path="/bisection" component={bisection} />
          <Route path="/falseposition" component={falseposition} />
          <Route path="/onepoint" component={onepoint} />
          <Route path="/newton" component={newton} />
          <Route path="/secant" component={secant} />
          <Route path="/cramer" component={cramer} />
          <Route path="/gauss-elimination" component={gauss_elimination} />
          <Route path="/gauss-jordan" component={gauss_jordan} />
          <Route path="/LUdecomposition" component={LUdecomposition} />
          <Route path="/cholesky" component={cholesky} />
          {/*<Route path="/cho_n" component={cholesky_n} />{*/}

          <Route path="/jacobi" component={jacobi} />
          <Route path="/gauss-seidel" component={gauss_seidel} />
          <Route path="/conjugate" component={conjugate} />
          <Route path="/linear" component={linear} />
        </Switch>
      </Router>
    );
  }
}

export default App;
