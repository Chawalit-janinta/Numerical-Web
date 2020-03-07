import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import TeX from '@matejmazur/react-katex';

const _ = String.raw;

class jacobi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x11: '', x12: '', x13: '', x21: '', x22: '', x23: '', x31: '', x32: '', x33: '',
            a: '',
            b: '',
            c: '',
            x1: [],
            x2: [],
            x3: [],
            er1: [],
            er2: [],
            er3: []
        };

        this.onChange = this.onChange.bind(this);
        this.cal = this.cal.bind(this);
        this.x1 = this.x1.bind(this);
        this.x2 = this.x2.bind(this);
        this.x3 = this.x3.bind(this);
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


    state = {
        isOpen: false
    };

    cal(event) {
        var x = this.state;
        var row1 = [];
        var row2 = [];
        var row3 = [];
        const A = [],er11 = [],er22 = [],er33 = [];
        var x1 = 0, x2 = 0, x3 = 0, i = 0, j = 0, xi1 = 0, xi2 = 0, xi3 = 0, er1 = 0, er2 = 0, er3 = 0;
        console.log(x.a, x.b, x.c, x.x1, x.x2, x.x3);
        if (x.a != 'a' && x.b != 'b' && x.c != 'c' && x.a != '' && x.b != '' && x.c != '' && x.x1 != '' && x.x2 != '' && x.x3 != '' &&
            x.x11 != '' && x.x12 != '' && x.x13 != '' && x.x21 != '' && x.x22 != '' && x.x23 != '' && x.x31 != '' && x.x32 != '' && x.x33 != '') {
            row1.push(parseInt(x.x11)); row1.push(parseInt(x.x12)); row1.push(parseInt(x.x13));
            row2.push(parseInt(x.x21)); row2.push(parseInt(x.x22)); row2.push(parseInt(x.x23));
            row3.push(parseInt(x.x31)); row3.push(parseInt(x.x32)); row3.push(parseInt(x.x33));

            A.push(row1); A.push(row2); A.push(row3);
            console.log(A);
            xi1 = x.x1;
            xi2 = x.x2;
            xi3 = x.x3;

            do {
                x1 = (x.a - (A[0][1] * xi2) - (A[0][2] * xi3)) / A[0][0];
                x2 = (x.b - (A[1][0] * xi1) - (A[1][2] * xi3)) / A[1][1];
                x3 = (x.c - (A[2][0] * xi1) - (A[2][1] * xi2)) / A[2][2];

                er1 = Math.abs((x1 - xi1) / x1);
                er2 = Math.abs((x2 - xi2) / x2);
                er3 = Math.abs((x3 - xi3) / x3);

                er11[i] = parseFloat(er1);
                er22[i] = parseFloat(er2);
                er33[i] = parseFloat(er3);

                i++;

                if (i >= 15) {
                    break;
                }

                if (er1 >= 0.00001 || er2 >= 0.00001 || er3 >= 0.00001) {
                    x.x1[i] = parseFloat(x1);
                    x.x2[i] = parseFloat(x2);
                    x.x3[i] = parseFloat(x3);
                    xi1 = x1;
                    xi2 = x2;
                    xi3 = x3;
                }

            } while (er1 >= 0.00001 && er2 >= 0.00001 && er3 >= 0.00001);

            this.setState({er1:er11,er2:er22,er3:er33});
            console.log(this.state.x1,this.state.x2,this.state.x3);
            console.log(x.er1, x.er2, x.er3);
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
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <div style={{ width: "100%", height: "650px", float: "left", padding: "50px" }}>
                    <div className="formula-block" style={{ height: "600px", width: "35%", float: "left" }}>
                        <h1 style={{ fontSize: "45px", fontWeight: "400" }}>Jacobi Iteration Method</h1><br />
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
                                <MDBInput style={{ width: "50px" }} label="X31"
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

                        </MDBFormInline>
                            <MDBFormInline>
                                <MDBInput style={{ width: "50px" }} label="X1"
                                    name="x1"
                                    //value={this.state.x1}
                                    onChange={this.x1}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X2"
                                    name="x2"
                                    //value={this.state.x2}
                                    onChange={this.x2}
                                    spellCheck={false} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBInput style={{ width: "50px" }} label="X3"
                                    name="x3"
                                    //value={this.state.x3}
                                    onChange={this.x3}
                                    spellCheck={false} />
                            </MDBFormInline><br/>
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
                                    <th>Error (X1)</th>
                                    <th>Error (X2)</th>
                                    <th>Error (X3)</th>
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
                                        {x.er1.map(e1 => (
                                            <div>{e1.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.er2.map(e2 => (
                                            <div>{e2.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.er3.map(e3 => (
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

export default jacobi;