import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import TeX from '@matejmazur/react-katex';
import { det, evaluate, matrix, add } from 'mathjs'

const _ = String.raw;

class gauss_elimination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x11: '0', x12: '0', x13: '0', x21: '0', x22: '0', x23: '0', x31: '0', x32: '0', x33: '0',
            a: 'a',
            b: 'b',
            c: 'c',
            x1: '-',
            x2: '-',
            x3: '-'
        };

        this.onChange = this.onChange.bind(this);
        this.cal = this.cal.bind(this);
        //this.det_A = this.det_A.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    state = {
        isOpen: false
    };


    /* det_A(A)
     {
         var sumA = 0 , sumB = 0;
         sumA = (A[0][0]*A[1][1]*A[2][2])+(A[0][1]*A[1][2]*A[2][0])+(A[0][2]*A[1][0]*A[2][1]);
         sumB = (A[2][0]*A[1][1]*A[0][2])+(A[2][1]*A[1][2]*A[0][0])+(A[2][2]*A[1][0]*A[0][1]);
         console.log(sumA,sumB);
         return sumA - sumB;
     }*/

    cal(event) {
        var x = this.state;
        var row1 = [];
        var row2 = [];
        var row3 = [];
        const A = []
        var A1 = [], A2 = [], A3 = [], R1, R2, R3, res, a, b, c;
        var detA = 0, x1 = 0, x2 = 0, x3 = 0, i;
        console.log(x.a, x.b, x.c);
        if (x.a != 'a' && x.b != 'b' && x.c != 'c' && x.a != '' && x.b != '' && x.c != '' &&
            x.x11 != '' && x.x12 != '' && x.x13 != '' && x.x21 != '' && x.x22 != '' && x.x23 != '' && x.x31 != '' && x.x32 != '' && x.x33 != '') {
            row1.push(parseInt(x.x11)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.x13));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.x23));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.x33));

            A.push(row1); A.push(row2); A.push(row3);
            console.log(A);

            res = (A[1][0] / A[0][0]);
            for (i = 0; i < 3; i++) {
                A[1][i] = A[1][i] - (res * A[0][i]);
            }
            x.b = x.b - (res * x.a);

            res = (A[2][0] / A[0][0]);
            for (i = 0; i < 3; i++) {
                A[2][i] = A[2][i] - (res * A[0][i]);
            }
            x.c = x.c - (res * x.a);

            res = (A[2][1] / A[1][1]);
            for (i = 1; i < 3; i++) {
                A[2][i] = A[2][i] - (res * A[1][i]);
            }
            x.c = x.c - (res * x.b);

            x3 = x.c / A[2][2];
            x2 = (x.b - (x3*A[1][2])) / A[1][1];
            x1 = (x.a - (x3*A[0][2]) - (x2*A[0][1])) / A[0][0];
            a = x.a;
            b = x.b;
            c = x.c;

            this.setState({ a: parseFloat(a).toFixed(2), b: parseFloat(b).toFixed(2), c: parseFloat(c).toFixed(2)});
            this.state.x1 = this.state.x2 = this.state.x3 = '';
            this.setState({ x1: parseFloat(x1).toFixed(2), x2: parseFloat(x2).toFixed(2), x3: parseFloat(x3).toFixed(2) })
            this.setState({ x11: A[0][0].toFixed(2), x12: A[0][1].toFixed(2), x13: A[0][2].toFixed(2), x21: A[1][0].toFixed(2), x22: A[1][1].toFixed(2), x23: A[1][2].toFixed(2), x31: A[2][0].toFixed(2), x32: A[2][1].toFixed(2), x33: A[2][2].toFixed(2) })
            console.log(A);
            console.log("x1 = ", x.x1, "x2 = ", x.x2, "x3 = ", x.x3)
        }

    }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var x = this.state;
        return (
            <Router>
                <MDBNavbar color="orange accent-3" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text"><a href="/" style={{ color: "White" }}>Numerical method</a></strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem >
                                <MDBFormInline>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2" style={{ fontWeight: "500" }}>Root of Equations</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/graphical">Graphical Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/bisection">Bisection Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/falseposition">False Position Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/onepoint">One-Point Iteration Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/newton">Newton-Raphson Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/secant">Secant Method</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2" style={{ fontWeight: "500" }}>Linear Algebra</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/cramer">Cramer's Rule</MDBDropdownItem>
                                            <MDBDropdownItem href="/gauss-elimination">Gauss Elimination</MDBDropdownItem>
                                            <MDBDropdownItem href="/gauss-jordan">Gauss Jordan</MDBDropdownItem>
                                            <MDBDropdownItem href="/LUdecomposition">LU Decomposition Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/cholesky">Cholesky Decomposition Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/jacobi">Jacobi Iteration Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/gauss-seidel">Gauss Seidel Iteration Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/conjugate">Conjugate Gradient Method</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <div style={{ width: "100%", height: "650px", float: "left", padding: "50px" }}>
                    <div className="formula-block" style={{ height: "600px", width: "35%", float: "left" }}>
                        <h1 style={{ fontSize: "45px", fontWeight: "400" }}>Gauss Elimination</h1><br />
                        <div style={{ padding: "30px" }}>
                            <MDBFormInline>
                                <MDBInput style={{ width: "50px" }} label="X11"
                                    name="x11"
                                    value={this.state.x11}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X12"
                                    name="x12"
                                    value={this.state.x12}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X13"
                                    name="x13"
                                    value={this.state.x13}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDBInput style={{ width: "55px" }} label="Value a"
                                    name="a"
                                    value={this.state.a}
                                    onChange={this.onChange}
                                    spellCheck={false} />
                            </MDBFormInline>

                            <MDBFormInline>
                                <MDBInput style={{ width: "50px" }} label="X21"
                                    name="x21"
                                    value={this.state.x21}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                            <MDBInput style={{ width: "50px" }} label="X22"
                                    name="x22"
                                    value={this.state.x22}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                            <MDBInput style={{ width: "50px" }} label="X23"
                                    name="x23"
                                    value={this.state.x23}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDBInput style={{ width: "55px" }} label="Value b"
                                    name="b"
                                    value={this.state.b}
                                    onChange={this.onChange}
                                    spellCheck={false} />
                            </MDBFormInline>

                            <MDBFormInline>
                                <MDBInput style={{ width: "50px" }} label="X31"
                                    name="x31"
                                    value={this.state.x31}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                            <MDBInput style={{ width: "50px" }} label="X32"
                                    name="x32"
                                    value={this.state.x32}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                            <MDBInput style={{ width: "50px" }} label="X33"
                                    name="x33"
                                    value={this.state.x33}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDBInput style={{ width: "55px" }} label="Value c"
                                    name="c"
                                    value={this.state.c}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        </MDBFormInline><br /><br /><br />
                            <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.cal} type="submit">Submit</MDBBtn>

                        </div>
                    </div>

                    <center><div style={{ width: "55%", height: "600px", paddingRight: "5px", float: "left", fontSize: "20px", padding: "120px" }}>

                        <div style={{ fontWeight: "300", fontSize: "30px" }}>
                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.x11} {x.x12} {x.x13} </div>
                            ]&nbsp; &nbsp; &nbsp; &nbsp;[<h1 style={{ display: "inline" }}></h1> x1 ] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{x.a}<br />
                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.x21} {x.x22} {x.x23} </div>
                            ]&nbsp; &nbsp; &nbsp; &nbsp;[<h1 style={{ display: "inline" }}></h1> x2 ] &nbsp; &nbsp;&nbsp;=&nbsp; &nbsp;&nbsp;&nbsp;{x.b}<br />
                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.x31} {x.x32} {x.x33} </div>
                            ]&nbsp; &nbsp; &nbsp; &nbsp;[<h1 style={{ display: "inline" }}></h1> x3 ] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{x.c}
                            <br /><br /><br />

                        </div>
                        <div style={{ fontWeight: "300", fontSize: "30px" }}>
                            <MDBFormInline> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;X1 &nbsp;=  &nbsp;{x.x1}</MDBFormInline>
                            <MDBFormInline> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;X2 &nbsp;=  &nbsp;{x.x2}</MDBFormInline>
                            <MDBFormInline> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;X3 &nbsp;=  &nbsp;{x.x3}</MDBFormInline>
                        </div>


                    </div></center>
                </div>


            </Router>

        );
    }
}

export default gauss_elimination;