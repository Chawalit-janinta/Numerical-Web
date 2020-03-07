import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import axios from 'axios';
import { det, evaluate, matrix, add } from 'mathjs'

class jacobi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: '',
            bdata: [],
            adata: [],
            xdata: [],
            error: [],
            update: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onB = this.onB.bind(this);
        this.onX = this.onX.bind(this);
        this.cal = this.cal.bind(this);
        this.sizedata = this.sizedata.bind(this);
        this.onSize = this.onSize.bind(this);
        this.exam = this.exam.bind(this);
    }

    onSize(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.state.adata = this.state.bdata = this.state.xdata = [];
    }

    onB(e) {
        this.state.bdata[e.target.name - 1] = e.target.value;
        this.setState({ update: '' })
    }

    onChange(e) {
        this.state.adata[e.target.name - 1] = e.target.value;
        this.setState({ update: '' })
    }

    onX(e) {
        this.state.xdata[e.target.name - 1] = e.target.value;
    }

    exam() {

        //this.state.xl = this.state.xr = this.state.fxl = this.state.fxr = this.state.fxm = this.state.xm = this.state.error = [];
        if (this.state.size != '') {
            var i = 0;
            axios.get('http://localhost:5000/jacobi/')
                .then(response => {

                    for (i = 0; i < response.data.length; i++) {
                        if (response.data[i].size == this.state.size) {
                            break;
                        }
                    }
                    this.setState({
                        adata: response.data[i].A,
                        bdata: response.data[i].B,
                        xdata: response.data[i].X,
                    });

                    console.log(response.data[i].A,
                        response.data[i].B,
                        response.data[i].X,
                        response.data[i].size);

                    this.cal();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    save() {
        if (this.state.size != '' && this.state.adata.length > 1 && this.state.bdata.length > 1 && this.state.xdata.length > 1) {
            const eq = {
                A: this.state.adata,
                B: this.state.bdata,
                X: this.state.xdata,
                size: this.state.size
            }

            console.log(eq);

            axios.post('http://localhost:5000/jacobi/add', eq)
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
        var i = 0, j = 0, k = 0, detA = 0;
        if (x.size != '') {
            var n = parseInt(x.size);
            var A = new Array(n);
            var Ax = new Array(n);
            var B = new Array(n);
            var X = [];
            for (i = 0; i < n; i++) {
                A[i] = new Array(2);
                Ax[i] = new Array(2);
            }
            for (i = 0; i < n; i++) {
                B[i] = parseFloat(x.bdata[i]);
                X[i] = parseFloat(x.xdata[i]);
                for (j = 0; j < n; j++) {
                    Ax[i][j] = A[i][j] = parseFloat(x.adata[k]);
                    k++;
                }
            }
            detA = det(A);
            if (detA != 0) {
                var sym = new Array(n);
                var er = [];
                var vx = 0, check_er = 0;
                k = n;

                for (i = 0; i < n; i++) {
                    er[i] = 0.000000;
                }

                do {
                    for (i = 0; i < n; i++) {
                        for (j = 0; j < n; j++) {
                            vx += (X[k - n + j] * A[i][j]);
                        }
                        sym[i] = parseFloat(vx);
                        vx = 0;
                    }
                    //console.log("symเก่า",sym);

                    j = 0;
                    for (i = k; i < k + n; i++) {
                        X[i] = parseFloat((B[j] - (sym[j] - (A[j][j] * X[i - n]))) / A[j][j]);
                        er[i] = Math.abs(X[i] - X[i - n]) / X[i];
                        //console.log("i = ",i-n,"er = ",er[i]);
                        //console.log("xใหม่",X[i],"xเก่า",X[i-n]);
                        if (er[i] <= 0.00001) {
                            check_er = 1;
                        }
                        j++;
                    }

                    k = i;
                } while (check_er != 1);

                this.setState({ xdata: X, error: er });
                console.log(X);


            }

            this.save();
        }
        //console.log(X);
    }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var x = this.state;
        var i = 0, j = 0, k = 0, u = 0, col = 0, xi = 0, xrow = 0, xcol = 0, ite = 0, eri = 0;
        var itr = (x.xdata.length / 3);
        var n = (x.size);
        var index = new Array(itr);
        var xe = new Array(n);
        var err = new Array(n);
        for (i = 0; i < itr - 1; i++) {
            index[i] = i;
        }

        for (i = 0; i < n; i++) {
            xe[i] = new Array(itr);
            err[i] = new Array(itr);
        }
        for (i = 0; i < n; i++) {
            for (j = i; j < x.xdata.length; j++) {
                xe[i][k] = parseFloat(x.xdata[j]).toFixed(6);
                err[i][k] = parseFloat(x.error[j]).toFixed(6);
                j += n - 1;
                k++;
                if (k == itr - 1) {
                    break;
                }
            }

            k = 0;
            console.log(xe[i], err[i]);
        }
        i = 0;
        j = 0;
        k = 0;
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


                            <MDBFormInline>
                                {x.bdata.map(x => (
                                    <div>
                                        <MDBInput style={{ width: "50px", margin: "5px" }} label={"X" + ++xi}
                                            name={xi}
                                            onChange={this.onX}
                                            spellCheck={false} /></div>
                                ), this)}
                            </MDBFormInline><br />


                            <MDBBtn style={{ margin: "2px" }} color="warning" onClick={this.cal} type="submit">Calculate</MDBBtn>
                            <MDBBtn gradient="peach" onClick={this.exam}>Example</MDBBtn>
                        </div>
                    </div>
                    <center><div style={{ width: "60%", height: "600px", paddingTop: "20px", float: "left", fontSize: "20px", padding: "120px" }} >
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
                        <MDBTable>
                            <MDBTableHead>
                                <tr style={{ color: "#e65100" }}>
                                    <th>Iteration</th>

                                    {x.bdata.map(x => (
                                        <th>X{++u}</th>
                                    ), this)}

                                    {x.bdata.map(x => (
                                        <th>Error (X{++eri})</th>
                                    ), this)}
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        {index.map(x => (
                                            <div>{++ite}</div>
                                        ), this)}
                                    </td>

                                    {x.bdata.map(x => (<td>
                                        {xe[xrow++].map(x => (
                                            <div>{x}</div>
                                        ), this)}
                                    </td>
                                    ), this)}

                                    {x.bdata.map(x => (<td>
                                        {err[xcol++].map(x => (
                                            <div>{x}</div>
                                        ), this)}
                                    </td>
                                    ), this)}

                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div></center>
                </div>


            </Router >

        );
    }
}

export default jacobi;