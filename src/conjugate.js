import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import TeX from '@matejmazur/react-katex';
import { evaluate, multiply, zeros, sqrt } from 'mathjs'


const _ = String.raw;

class conjugate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x11: '', x12: '', x13: '', x14: '',
            x21: '', x22: '', x23: '', x24: '',
            x31: '', x32: '', x33: '', x34: '',
            x41: '', x42: '', x43: '', x44: '',
            a: '',
            b: '',
            c: '',
            d: '',
            lambda: [],
            alpha: [],
            er: [],
            x1: [],
            x2: [],
            x3: [],
            x4: []
        };

        this.onChange = this.onChange.bind(this);
        this.cal = this.cal.bind(this);
        this.x1 = this.x1.bind(this);
        this.x2 = this.x2.bind(this);
        this.x3 = this.x3.bind(this);
        this.x4 = this.x4.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    x1({ target: { value } }) {
        this.state.x1[0] = parseFloat(value);
        console.log(this.state.x1);
    }

    x2({ target: { value } }) {
        this.state.x2[0] = parseFloat(value);
        console.log(this.state.x2);
    }

    x3({ target: { value } }) {
        this.state.x3[0] = parseFloat(value);
        console.log(this.state.x3);
    }

    x4({ target: { value } }) {
        this.state.x4[0] = parseFloat(value);
        console.log(this.state.x4);
    }


    state = {
        isOpen: false
    };

    cal(event) {
        var x = this.state;
        var row1 = [];
        var row2 = [];
        var row3 = [];
        var row4 = [];
        const A = [];
        var R = [], X = [[0], [0], [0], [0]], D = [[0], [0], [0], [0]], B = [[0], [0], [0], [0]], lambda = [], alpha = [], DT = [], RT = [], er = [];
        var x1 = 0, x2 = 0, x3 = 0, x4 = 0, i = 0, j = 0, xi1 = 0, xi2 = 0, xi3 = 0, xi4 = 0, error = 0, DR, AD, DAD, RAD;
        console.log(x.a, x.b, x.c, x.d, x.x1, x.x2, x.x3, x.x4);
        if (x.d != '' && x.a != '' && x.b != '' && x.c != '' && x.x1 != '' && x.x2 != '' && x.x3 != '' && x.x4 != '' &&
            x.x11 != '' && x.x12 != '' && x.x13 != '' && x.x21 != '' && x.x22 != '' && x.x23 != '' && x.x31 != '' && x.x32 != '' && x.x33 != '' &&
            x.x14 != '' && x.x24 != '' && x.x34 != '' && x.x44 != '' && x.x41 != '' && x.x42 != '' && x.x43 != '') {

            row1.push(parseInt(x.x11)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.x13)); row1.push(parseInt(x.x14));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.x23)); row2.push(parseInt(x.x24));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.x33)); row3.push(parseInt(x.x34));
            row4.push(parseInt(x.x41)); row4.push(parseInt(x.x42)); row4.push(parseInt(x.x43)); row4.push(parseInt(x.x44));

            A.push(row1); A.push(row2); A.push(row3); A.push(row4);
            console.log(A);

            X[0][0] = parseFloat(x.x1[0]); X[1][0] = parseFloat(x.x2[0]); X[2][0] = parseFloat(x.x3[0]); X[3][0] = parseFloat(x.x4[0]);
            B[0][0] = parseFloat(x.a); B[1][0] = parseFloat(x.b); B[2][0] = parseFloat(x.c); B[3][0] = parseFloat(x.d);
            R = multiply(A, X);
            for (j = 0; j < 4; j++) {
                R[j][0] = R[j][0] - B[j][0];
            }
            console.log(R, X);
            //console.log(B);

            for (j = 0; j < 4; j++) {
                D[j][0] = (R[j][0]) * (-1);
            }
            console.log(D);
            //รอบที่ k = 0 เริ่มได้ vvvv
            do {
                for (j = 0; j < 4; j++) {
                    DT[j] = D[j][0];
                }
                DR = multiply(DT, R);
                //console.log(DR);

                AD = multiply(A, D);
                DAD = multiply(DT, AD);
                lambda[i] = -(DR / DAD);

                for (j = 0; j < 4; j++) {
                    X[j][0] = X[j][0] + (D[j][0]*lambda[i]);
                }

                R = multiply(A, X);

                for (j = 0; j < 4; j++) {
                    R[j][0] = R[j][0] - B[j][0];
                }

                for (j = 0; j < 4; j++) {
                    RT[j] = R[j][0];
                }
                console.log(R);

                er[i] = sqrt(multiply(RT, R));
                RAD = multiply(RT, AD);
                alpha[i] = (RAD / DAD);

                console.log("er", er[i], "alpha", alpha[i], "lambda", lambda[i]);

                for (j = 0; j < 4; j++) {
                    D[j][0] = (D[j][0] * alpha[i]);
                }


                for (j = 0; j < 4; j++) {
                    D[j][0] = D[j][0] + R[j][0]*(-1);
                }
                console.log(R, D);
                i++;
                DT = [];
                if (i < 15 && er[i-1] >= 0.00001) {
                    x.x1[i] = X[0][0];
                    x.x2[i] = X[1][0];
                    x.x3[i] = X[2][0];
                    x.x4[i] = X[3][0];
                }


            } while (er[i-1] >= 0.00001);

            console.log(alpha, lambda);

            this.setState({ lambda: lambda, alpha: alpha, er: er });


        }


    }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var x = this.state;
        var i = 0;
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
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2" style={{ fontWeight: "500" }}>Interpolation and Extrapolation</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu >
                                            <MDBDropdownItem href="/newton-divide">Newton's Divided-Differences</MDBDropdownItem>
                                            <MDBDropdownItem href="/lagrange">Lagrange Interpolation</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <div style={{ width: "100%", height: "650px", float: "left", padding: "50px" }}>
                    <div className="formula-block" style={{ height: "600px", width: "35%", float: "left" }}>
                        <h1 style={{ fontSize: "40px", fontWeight: "400" }}>Conjugate Gradient Method</h1><br />
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
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X14"
                                    name="x14"
                                    value={this.state.x14}
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
                                    spellCheck={false} />&nbsp;&nbsp;
                            <MDBInput style={{ width: "50px" }} label="X24"
                                    name="x24"
                                    value={this.state.x24}
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
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X34"
                                    name="x34"
                                    value={this.state.x34}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBInput style={{ width: "55px" }} label="Value c"
                                    name="c"
                                    value={this.state.c}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            </MDBFormInline>
                            <MDBFormInline>
                                <MDBInput style={{ width: "50px" }} label="X41"
                                    name="x41"
                                    value={this.state.x41}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X42"
                                    name="x42"
                                    value={this.state.x42}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X43"
                                    name="x43"
                                    value={this.state.x43}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X44"
                                    name="x44"
                                    value={this.state.x44}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBInput style={{ width: "55px" }} label="Value d"
                                    name="d"
                                    value={this.state.d}
                                    onChange={this.onChange}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            </MDBFormInline>
                            <MDBFormInline>
                                <MDBInput style={{ width: "50px" }} label="X1"
                                    name="x1"
                                    //value={this.state.x11}
                                    onChange={this.x1}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X2"
                                    name="x2"
                                    //value={this.state.x22}
                                    onChange={this.x2}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X3"
                                    name="x3"
                                    //value={this.state.x33}
                                    onChange={this.x3}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                 <MDBInput style={{ width: "50px" }} label="X4"
                                    name="x4"
                                    //value={this.state.x33}
                                    onChange={this.x4}
                                    spellCheck={false} />
                            </MDBFormInline><br />
                            <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.cal} type="submit">Submit</MDBBtn>

                        </div>
                    </div>

                    <center><div style={{ width: "60%", height: "600px", paddingTop: "20px", float: "left", fontSize: "20px", padding: "120px" }} >
                        <MDBTable>
                            <MDBTableHead>
                                <tr style={{ color: "#e65100" }}>
                                    <th>Iteration</th>
                                    <th>X1</th>
                                    <th>X2</th>
                                    <th>X3</th>
                                    <th>X4</th>
                                    <th style={{ fontSize: "20px" }}>&lambda;</th>
                                    <th>Error</th>
                                    <th style={{ fontSize: "20px" }}>&alpha;</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        {x.x1.map(x => (
                                            <div>{++i}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.x1.map(x1 => (
                                            <div>{x1.toFixed(3)}</div>

                                        ), this)}
                                    </td>
                                    <td>
                                        {x.x2.map(x2 => (
                                            <div>{x2.toFixed(3)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.x3.map(x3 => (
                                            <div>{x3.toFixed(3)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.x4.map(x4 => (
                                            <div>{x4.toFixed(3)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.lambda.map(e1 => (
                                            <div>{e1.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.er.map(e2 => (
                                            <div>{parseFloat(e2).toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.alpha.map(e3 => (
                                            <div>{e3.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div></center>
                </div>


            </Router>

        );
    }
}

export default conjugate;