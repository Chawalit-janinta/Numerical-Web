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

class cramer extends Component {

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
        this.det_A = this.det_A.bind(this);
        //this.in_x = this.in_x.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    state = {
        isOpen: false
    };

    /*in_x(fx, row) {
        var i = 0, t_in = 0;
        var fx1 = fx;
        var gx = '';
        do {
            //console.log(fx[i]);
            if (fx1[i] == '-' || fx1[i] == '+') {
                if (fx1[i + 1] == 'x' || fx1[i + 1] == 'y' || fx1[i + 1] == 'z') {
                    gx += fx[i];
                    gx += 1;
                    i++;
                }
            }
            if (i == 0 && fx[0] == 'x') {
                gx += 1;
            }
            /*if (fx1[i] == 'x' || fx1[i] == 'y' || fx1[i] == 'z') {
                if (fx1[i - 1] == '-' || fx1[i - 1] == '+' ) {
                    if (i != 0) {
                        gx += fx1[i - 1];
                        gx += 1;
                        i++;
                    }
                }
                else if (i == 0 ) {
                    gx += '+';
                    gx += 1;
                }
            }
            else if (fx1[i] != 'x' && fx1[i] != 'y' && fx1[i] != 'z') {
                do {
                    gx += fx1[i];
                    i++;
                } while (fx1[i] != 'x' && fx1[i] != 'y' && fx1[i] != 'z');
            }
            if (gx != '') {
                console.log(gx);
                t_in++;
            }
            if (row == 1) {
                if (t_in == 1) {
                    this.state.xrow1[0] = parseInt(gx);
                }
                if (t_in == 2) {
                    this.state.xrow1[1] = parseInt(gx);
                }
                if (t_in == 3) {
                    this.state.xrow1[2] = parseInt(gx);
                }
            }
            else if (row == 2) {
                if (t_in == 1) {
                    this.state.xrow2[0] = parseInt(gx);
                }
                if (t_in == 2) {
                    this.state.xrow2[1] = parseInt(gx);
                }
                if (t_in == 3) {
                    this.state.xrow2[2] = parseInt(gx);
                }
            }
            else if (row == 3) {
                if (t_in == 1) {
                    this.state.xrow3[0] = parseInt(gx);
                }
                if (t_in == 2) {
                    this.state.xrow3[1] = parseInt(gx);
                }
                if (t_in == 3) {
                    this.state.xrow3[2] = parseInt(gx);
                }
            }


            gx = '';
            i++;
        } while (i < fx1.length);
        console.log(this.state.xrow1);
    }*/

    det_A(A)
    {
        var sumA = 0 , sumB = 0;
        sumA = (A[0][0]*A[1][1]*A[2][2])+(A[0][1]*A[1][2]*A[2][0])+(A[0][2]*A[1][0]*A[2][1]);
        sumB = (A[2][0]*A[1][1]*A[0][2])+(A[2][1]*A[1][2]*A[0][0])+(A[2][2]*A[1][0]*A[0][1]);
        console.log(sumA,sumB);
        return sumA - sumB;
    }

    cal(event) {
        var x = this.state;
        var row1 = [];
        var row2 = [];
        var row3 = [];
        const A = []
        var A1 = [] ,A2 = [],A3 = [];
        var detA = 0, x1 = 0, x2 = 0, x3 = 0;
       console.log(x.a,x.b,x.c);
        if (x.a != 'a' && x.b != 'b' && x.c != 'c' && x.a != '' && x.b != '' && x.c != '' &&
            x.x11 != '' && x.x12 != '' && x.x13 != '' && x.x21 != '' && x.x22 != '' && x.x23 != '' && x.x31 != '' && x.x32 != '' && x.x33 != '') {
            row1.push(parseInt(x.x11)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.x13));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.x23));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.x33));

            A.push(row1); A.push(row2); A.push(row3);
            console.log(A);

            detA = det(A);
            console.log(detA);
            
            var Algebrite = require('algebrite')
            row1 = [];row2 = [];row3 = [];
            row1.push(parseInt(x.a)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.x13));
            row2.push(parseInt(x.b)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.x23));
            row3.push(parseInt(x.c)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.x33));
            A1.push(row1); A1.push(row2); A1.push(row3);
            console.log("A1 = ",A1);
            x1 = this.det_A(A1);
            console.log(x1);
            

            row1 = [];row2 = [];row3 = [];
            row1.push(parseInt(x.x11)); row1.push(parseInt(x.a)); row1.push(parseInt(x.x13));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.b)); row2.push(parseInt(x.x23));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.c)); row3.push(parseInt(x.x33));
            A2.push(row1); A2.push(row2); A2.push(row3);
            console.log("A2 = ",A2);
            x2 = this.det_A(A2);
            console.log(x2);
            

            row1 = [];row2 = [];row3 = [];
            row1.push(parseInt(x.x11)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.a));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.b));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.c));
            A3.push(row1); A3.push(row2); A3.push(row3);
            console.log("A3 = ",A3);
            x3 = this.det_A(A3)
            console.log(x3);
            
            x1 = x1/detA;
            x2 = x2/detA;
            x3 = x3/detA;

            this.state.x1 = this.state.x2 = this.state.x3 = '';
            this.setState({x1:x1,x2:x2,x3:x3})
            /*this.state.x1 = x1/detA;
            this.state.x2 = x2/detA;
            this.state.x3 = x3/detA;*/
            console.log("x1 = ",x.x1, "x2 = ",x.x2, "x3 = ", x.x3)
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
                        <h1 style={{ fontSize: "45px", fontWeight: "400" }}>Cramer's Rule</h1><br />
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
                            {/*<TeX style={{ float: "left" }}
                            block
                            className="output"
                            settings={{ macros: { '*': _`\cdot` } }}
                        >
                            {this.state.fx1}
                       </TeX><br /><br /><br />*/}
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
                            {/*}<TeX style={{ float: "left" }}
                            block
                            className="output"
                            settings={{ macros: { '*': _`\cdot` } }}
                        >
                            {this.state.fx2}
                        </TeX><br /><br /><br />*/}
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
                            <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.cal} type = "submit">Submit</MDBBtn>
                            {/*}<TeX style={{ float: "left" }}
                            block
                            className="output"
                            settings={{ macros: { '*': _`\cdot` } }}
                        >
                            {this.state.fx3}
                         </TeX><br /><br /><br />*/}
                        </div>
                    </div>

                    <center><div style={{ width: "50%", height: "600px", paddingRight: "5px", float: "left", fontSize: "20px", padding: "120px" }}>

                        {/*<TeX block style={{ fontSize: "20px" }}>{_`
                          \begin{pmatrix}
                           x11 & x12 & x13 \\
                           x21 & x22 & x23 \\
                           x31 & x32 & x33 \\
                          \end{pmatrix}  
                        \begin{pmatrix}
                          X1 \\
                          X2 \\
                          X3 \\
                       \end{pmatrix}
                         = 
                      \begin{pmatrix}
                         a \\
                         b \\
                         c \\
                      \end{pmatrix}
                 `}</TeX>*/}
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

export default cramer;