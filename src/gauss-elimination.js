import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import { det, evaluate, matrix, add } from 'mathjs'

class gauss_elimination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: '',
            bdata: [],
            adata: [],
            xdata: [],
            update: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onB = this.onB.bind(this);
        this.cal = this.cal.bind(this);
        this.sizedata = this.sizedata.bind(this);
        this.onSize = this.onSize.bind(this);
        this.exam = this.exam.bind(this);
    }

    onSize(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.state.adata = this.state.bdata = [];
    }

    onB(e) {
        this.state.bdata[e.target.name - 1] = e.target.value;
        this.setState({ update: '' })
    }

    onChange(e) {
        this.state.adata[e.target.name - 1] = e.target.value;
        this.setState({ update: '' })
    }

    exam() {

        //this.state.xl = this.state.xr = this.state.fxl = this.state.fxr = this.state.fxm = this.state.xm = this.state.error = [];
        if (this.state.size != '') {
            var i = 0;
            axios.get('http://localhost:5000/gauss-elimination/')
                .then(response => {

                    for(i=0;i<response.data.length;i++)
                    {
                        if(response.data[i].size == this.state.size)
                        {
                            break;
                        }
                    }
                    this.setState({
                        adata: response.data[i].A,
                        bdata: response.data[i].B,
                    });

                    console.log(response.data[i].A,
                        response.data[i].B,
                        response.data[i].size);

                    this.cal();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    save() {
        if (this.state.size != '' && this.state.adata.length > 1 && this.state.bdata.length > 1) {
            const eq = {
                A: this.state.adata,
                B: this.state.bdata,
                size: this.state.size
            }

            console.log(eq);

            axios.post('http://localhost:5000/gauss-elimination/add', eq)
                .then(res => console.log(res.data));
        }
    }


    state = {
        isOpen: false
    };

    sizedata() {
        var size = this.state.size;
        var row = [];
        var col = [];
        var i = 0;
        if (size != '') {
            for (i = 0; i < size * size; i++) {
                row[i] = i + 1;
                row[i] = "A" + row[i];
            }
            for (i = 0; i < size; i++) {
                col[i] = i + 1;
                col[i] = "B" + col[i];
            }
            this.setState({ adata: row, bdata: col });
        }
    }

    cal(event) {
        console.log(this.state.adata, this.state.bdata, this.state.size);
        var x = this.state;
        var i = 0, j = 0, k = 0, detA = 0, res;
        if (x.size != '') {
            var n = parseInt(x.size);
            var A = new Array(n);
            var Ax = new Array(n);
            var B = new Array(n);

            var data = new Array(n * n);
            for (i = 0; i < n; i++) {
                A[i] = new Array(2);
                Ax[i] = new Array(2);
            }
            for (i = 0; i < n; i++) {
                B[i] = parseFloat(x.bdata[i]);
                for (j = 0; j < n; j++) {
                    Ax[i][j] = A[i][j] = parseFloat(x.adata[k]);
                    k++;
                }
            }
            detA = det(A);
            if (detA != 0) {

                if (n == 2) {
                    res = (A[1][0] / A[0][0]);
                    for (i = 0; i < n; i++) {
                        A[1][i] = A[1][i] - (res * A[0][i]);
                    }
                    B[1] = B[1] - (res * B[0]);
                    k = 0;
                    for (i = 0; i < n; i++) {
                        for (j = 0; j < n; j++) {
                            data[k] = (A[i][j]).toFixed(3);
                            k++;
                        }
                        B[i] = B[i].toFixed(3);
                    }
                    console.log(data);
                    X[1] = B[1] / A[1][1];
                    X[0] = (B[0] - (A[0][1] * X[1])) / A[0][0];
                    for (i = 0; i < n; i++) {
                        X[i] = X[i].toFixed(3);
                    }
                    this.state.adata = this.state.bdata = [];
                    this.setState({ adata: data, bdata: B });
                }
                else {

                    if (A[0][0] == 0) {
                        var a1 = A[0].slice();
                        A[0] = A[1].slice();
                        A[1] = a1.slice();
                        var a2 = B[0];
                        B[0] = B[1];
                        B[1] = a2;
                    }
                    for (i = 1; i < n; i++) {
                        for (j = 0; j < i; j++) {
                            if (j < i) {
                                const x = A[i][j] / A[j][j];
                                if (x == Infinity || x == -Infinity || x == NaN) {
                                    x = 0;
                                }

                                for (k = 0; k < n; k++) {
                                    A[i][k] -= (A[j][k] * x);
                                }
                                B[i] -= B[j] * x;
                            }
                        }
                    }

                    /*var check = 0;
                    for (var j = 0; j < n; j++) {
                        if (A[n - 1][j] == 0) {
                            echeck = check + 1;
                        }
                    }*/

                    //if (check != n) {
                    //หาค่า X
                    var X = new Array(n);
                    for (i = (n - 1); i >= 0; i--) {
                        var temp = 0;
                        for (j = (n - 1); j > i; j--) {
                            temp += A[i][j] * X[j];
                        }
                        var ex = (B[i] - temp) / A[i][i];
                        if (ex == Infinity || ex == -Infinity || ex == NaN) {
                            ex = 0;
                        }
                        ex = ex.toFixed(3);
                        X[i] = ex;
                    }
                    k = 0;
                    for (i = 0; i < n; i++) {
                        B[i] = parseFloat(B[i]).toFixed(3);
                        for (j = 0; j < n; j++) {
                            A[i][j] = parseFloat(A[i][j]).toFixed(3);
                            data[k] = A[i][j];
                            k++;
                        }
                    }
                    console.log(A, B, X);
                    //}
                    this.setState({ xdata: X, adata: data, bdata: B });
                }
            }
            else {
                var X = [];
                for (i = 0; i < n; i++) {
                    X[i] = "non-available";
                }
                this.setState({ xdata: X });
            }
            this.save();
        }
        console.log(X);
    }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var x = this.state;
        var i = 0, j = 0, k = 0, u = 0, col = 0;
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
                                    {/*}<MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2" style={{ fontWeight: "500" }}>Interpolation and Extrapolation</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu >
                                            <MDBDropdown>
                                                <MDBDropdownToggle nav caret style={{ color: 'black' }}>
                                                    <span>Newton's divided-differences</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem href="/linear">Linear</MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                            <MDBDropdown>
                                                <MDBDropdownToggle nav caret style={{ color: 'black' }}>
                                                    <span>Lagrange polynomials</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem href="/linear">Linear</MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>{*/}
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <div style={{ width: "100%", height: "650px", float: "left", padding: "50px" }}>
                    <div className="formula-block" style={{ height: "600px", width: "35%", float: "left" }}>
                        <h1 style={{ fontSize: "45px", fontWeight: "400" }}>Gauss Elimination</h1><br />
                        <div style={{ padding: "30px", fontWeight: "500" }}>
                            <MDBFormInline>
                                <MDBInput style={{ width: "120px" }} label="Input data size"
                                    name="size"
                                    value={this.state.size}
                                    onChange={this.onSize}
                                    spellCheck={false} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.sizedata}>Submit</MDBBtn>
                            </MDBFormInline>
                            <br /><br />
                            {x.bdata.map(y => (<div>
                                <MDBFormInline>
                                    {x.bdata.map(x => (
                                        <div>
                                            <MDBInput style={{ width: "50px" }} label={"A" + ++k}
                                                name={k}
                                                onChange={this.onChange}
                                                spellCheck={false} /></div>
                                    ), this)}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <MDBInput style={{ width: "50px" }} label={"B" + ++i}
                                        name={i}
                                        onChange={this.onB}
                                        spellCheck={false} />
                                </MDBFormInline><br /></div>
                            ), this)}
                            <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.cal} type="submit">Calculate</MDBBtn>
                            <MDBBtn gradient="peach" onClick={this.exam}>Example</MDBBtn>
                        </div>
                    </div>
                    <center><div style={{ width: "65%", height: "600px", paddingRight: "5px", float: "left", fontSize: "20px", padding: "120px" }}>

                        <div style={{ fontWeight: "500", fontSize: "30px" }}>

                            <div style={{ display: "inline" }}>
                                {x.bdata.map(y => (<div>[
                                    {x.bdata.map(z => (<div style={{ display: "inline" }}>
                                    &nbsp;{x.adata[j++]}&nbsp;
                                    </div>), this)}
                                    ]&nbsp; &nbsp; &nbsp;[ X{++col} ]&nbsp; &nbsp; &nbsp;=&nbsp; &nbsp; {y}<br /></div>), this)}
                            </div>

                            <br /><br />
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "30px" }}>
                            {x.bdata.map(y => (<div>
                                <MDBFormInline> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;X{++u} &nbsp;=  &nbsp;{x.xdata[u - 1]}</MDBFormInline>
                            </div>))}
                        </div>

                    </div></center>
                </div>


            </Router>

        );
    }
}

export default gauss_elimination;