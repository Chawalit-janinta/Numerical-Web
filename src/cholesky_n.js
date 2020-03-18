import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import { det, evaluate, matrix, add , transpose } from 'mathjs'

class cholesky extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: '',
            bdata: [],
            adata: [],
            xdata: [],
            update: '',
            L: [],
            LT: [],
            LLT: []
        };

        this.onChange = this.onChange.bind(this);
        this.onB = this.onB.bind(this);
        this.cal = this.cal.bind(this);
        this.sizedata = this.sizedata.bind(this);
        this.onSize = this.onSize.bind(this);

    }

    onSize(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.state.adata = this.state.bdata = this.state.L = this.state.LT = this.state.LLT = this.state.xdata = [];
    }

    onB(e) {
        this.state.bdata[e.target.name - 1] = e.target.value;
        this.setState({ update: '' })
    }

    onChange(e) {
        this.state.adata[e.target.name - 1] = e.target.value;
        this.setState({ update: '' })
    }


    state = {
        isOpen: false
    };

    sizedata() {
        var size = this.state.size;
        var row = [], Lrow = [], Urow = [];
        var col = [], LU = [];
        var i = 0;
        if (size != '') {
            for (i = 0; i < size * size; i++) {
                row[i] = i + 1;
                Lrow[i] = "L" + row[i];
                Urow[i] = "LT" + row[i];
                row[i] = "A" + row[i];
            }
            for (i = 0; i < size; i++) {
                col[i] = i + 1;
                col[i] = "B" + col[i];
            }
            LU[0] = "L";
            LU[1] = "LT";
            /*this.state.LU[0] = "L";
            this.state.LU[1] = "U";*/
            this.setState({ adata: row, bdata: col, L: Lrow, LT: Urow, LLT: LU });
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
            var X = new Array(n);
            var data = new Array(n * n);
            var dataB = new Array(n * n);
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
            var AT=transpose(A);

            function check_symmetric(a,at){
                let i,j;
                for (i = 0; i < n; i++) {
                  for (j = 0; j < n; j++) {
                    if (a[i][j] != at[i][j]) {
                            return false; 
                    } 
                  }
                }
                return true;     
            }

            if (detA != 0 && check_symmetric(A,AT)) {
               
            }
            else {
                for (i = 0; i < n; i++) {
                    X[i] = "non-available";
                }
                this.setState({ xdata: X });
            }

        }
        console.log(X);
    }


    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var x = this.state;
        var i = 0, j = 0, k = 0, u = 0, col = 0, L = 0, U = 0;
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
                        <h1 style={{ fontSize: "30px", fontWeight: "400" }}>Cholesky Decomposition Method</h1><br />
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
                            <MDBBtn gradient="peach">Example</MDBBtn>
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
                        <br /><br />

                        <div style={{ fontWeight: "500", fontSize: "30px", float: "left" }}>{x.LLT.map(y => (<div style={{ display: "inline" }}>{y}{x.bdata.map(y => (<div style={{ display: "inline" }}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>))}</div>), this)}
                            <MDBFormInline style={{ fontSize: "30px" }}>
                                <div style={{ fontWeight: "500", display: "inline" }}>
                                    {x.bdata.map(y => (<div>[
                                    {x.bdata.map(z => (<div style={{ display: "inline" }}>
                                        &nbsp;{x.L[L++]}&nbsp;
                                    </div>), this)}
                                        ]</div>), this)}
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            <div style={{ fontWeight: "500", display: "inline" }}>
                                    {x.bdata.map(y => (<div>[
                                    {x.bdata.map(z => (<div style={{ display: "inline" }}>
                                        &nbsp;{x.LT[U++]}&nbsp;
                                    </div>), this)}
                                        ]</div>), this)}
                                </div>
                            </MDBFormInline>
                            <br />
                        </div>

                    </div></center>
                </div>


            </Router>

        );
    }
}

export default cholesky;