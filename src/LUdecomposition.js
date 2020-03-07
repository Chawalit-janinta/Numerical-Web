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

class LU extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x11: '0', x12: '0', x13: '0', x21: '0', x22: '0', x23: '0', x31: '0', x32: '0', x33: '0',
            L00: '0', L01: '0', L02: '0', L10: '0', L11: '0', L12: '0', L20: '0', L21: '0', L22: '0',
            U00: '0', U01: '0', U02: '0', U10: '0', U11: '0', U12: '0', U20: '0', U21: '0', U22: '0',
            a: 'a',
            b: 'b',
            c: 'c',
            x1: '-',
            x2: '-',
            x3: '-'
        };

        this.onChange = this.onChange.bind(this);
        this.cal = this.cal.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    state = {
        isOpen: false
    };

    cal(event) {
        var x = this.state;
        var row1 = [];
        var row2 = [];
        var row3 = [];
        const A = [];
        var x1 = 0, x2 = 0, x3 = 0, L00, L10, L20, U01, L11, L21, U02, U12, L22, c = 0, b = 1, y1 = 0, y2 = 0, y3 = 0,detA;
        console.log(x.a, x.b, x.c);
        if (x.a != 'a' && x.b != 'b' && x.c != 'c' && x.a != '' && x.b != '' && x.c != '' &&
            x.x11 != '' && x.x12 != '' && x.x13 != '' && x.x21 != '' && x.x22 != '' && x.x23 != '' && x.x31 != '' && x.x32 != '' && x.x33 != '') {
            row1.push(parseInt(x.x11)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.x13));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.x23));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.x33));

            A.push(row1); A.push(row2); A.push(row3);
            console.log(A);

            detA = det(A);

            if (detA != 0) {
                L00 = A[0][0];
                L10 = A[1][0];
                L20 = A[2][0];
                U01 = A[0][1] / A[0][0];
                L11 = A[1][1] - (L10 * U01);
                L21 = A[2][1] - (L20 * U01);
                U02 = A[0][2] / L00;
                U12 = (A[1][2] - (L10 * U02)) / L11;
                L22 = (A[2][2] - (L20 * U02) - (L21 * U12));

                //console.log(L00,L10,L20,L11,L21,L22,U01,U02,U12);
                this.setState({
                    L00: L00.toFixed(3), L10: L10.toFixed(3), L20: L20.toFixed(3), L11: L11.toFixed(3), L21: L21.toFixed(3), L22: L22.toFixed(3),
                    U01: U01.toFixed(3), U02: U02.toFixed(3), U12: U12.toFixed(3), L01: c.toFixed(3), L02: c.toFixed(3), L12: c.toFixed(3), U10: c.toFixed(3), U20: c.toFixed(3), U21: c.toFixed(3),
                    U00: b.toFixed(3), U11: b.toFixed(3), U22: b.toFixed(3)
                })

                y1 = x.a / L00;
                y2 = (x.b - (L10 * y1)) / L11;
                y3 = (x.c - (L20 * y1) - (L21 * y2)) / L22;

                //console.log(y1,y2,y3);
                x3 = y3;
                x2 = (y2 - (x3 * U12));
                x1 = (y1 - (x2 * U01) - (x3 * U02));

                this.state.x1 = this.state.x2 = this.state.x3 = '';
                this.setState({ x1: x1.toFixed(3), x2: x2.toFixed(3), x3: x3.toFixed(3) })
                console.log("x1 = ", x.x1, "x2 = ", x.x2, "x3 = ", x.x3)
            }
            else {
                var X = '';

                X = "non-available";

                this.setState({ x1: X, x2: X, x3: X });
            }
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
                        <h1 style={{ fontSize: "40px", fontWeight: "400" }}>LU Decomposition Method</h1><br />
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
                            <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.cal} type="submit">Submit</MDBBtn>
                            {/*}<TeX style={{ float: "left" }}
                            block
                            className="output"
                            settings={{ macros: { '*': _`\cdot` } }}
                        >
                            {this.state.fx3}
                         </TeX><br /><br /><br />*/}
                        </div>
                    </div>

                    <center><div style={{ width: "65%", height: "600px", paddingLeft: "50px", float: "left", fontSize: "20px", padding: "50px" }}>

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
                            <br /><br />

                        </div><span style={{ fontWeight: "400", fontSize: "25px" }}>L</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style={{ fontWeight: "400", fontSize: "25px" }}>U</span>
                        <div style={{ fontWeight: "300", fontSize: "30px" }}>
                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.L00} {x.L01} {x.L02} </div>
                            ] &nbsp; &nbsp; &nbsp; &nbsp;

                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.U00} {x.U01} {x.U02} </div>
                            ]
                            <br />

                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.L10} {x.L11} {x.L12} </div>
                            ] &nbsp; &nbsp; &nbsp; &nbsp;
                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.U10} {x.U11} {x.U12} </div>
                            ] <br />

                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.L20} {x.L21} {x.L22} </div>
                            ] &nbsp; &nbsp; &nbsp; &nbsp;
                            [
                            <div style={{ display: "inline" }}><h1 style={{ display: "inline" }}></h1> {x.U20} {x.U21} {x.U22} </div>
                            ]


                        </div><br /><br />

                        <div style={{ fontWeight: "300", fontSize: "30px", paddingLeft: "150px" }}>
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

export default LU;