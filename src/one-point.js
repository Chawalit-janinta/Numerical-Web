import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import TeX from '@matejmazur/react-katex';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { evaluate } from 'mathjs';
import axios from 'axios';
const PlotlyComponent = createPlotlyComponent(Plotly);

const _ = String.raw;
class onepoint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: _``,
            data: '',
            x: [],
            error: [],
            fx: [],
            exam: ['-']  ///////////////////////////
        };
        this.handleChange = this.handleChange.bind(this);
        this.cal = this.cal.bind(this);
        this.plot = this.plot.bind(this);
        this.x = this.x.bind(this);
        this.exam = this.exam.bind(this);
        this.save = this.save.bind(this);

    }

    handleChange({ target: { value } }) {
        this.setState({ value, data: value });
        console.log(this.state.data);
    }
    x({ target: { value } }) {
        this.state.x[0] = parseFloat(value);
        console.log(this.state.x);
    }

    state = {
        isOpen: false
    };

    exam() {
        //this.state.xl = this.state.xr = this.state.fxl = this.state.fxr = this.state.fxm = this.state.xm = this.state.error = [];
        this.setState({data:'',value:''});
        axios.get('http://192.168.99.100:5000/onepoint/')
            .then(response => {
                this.state.exam[0] = response.data[response.data.length - 1].equation;
                this.state.x[0] = parseFloat(response.data[response.data.length - 1].x0);

                this.setState({
                    data: response.data[response.data.length - 1].equation,
                });

                console.log(response.data[response.data.length - 1].equation,
                    response.data[response.data.length - 1].x0);
                this.cal();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    save() {
        if (this.state.value != '' && this.state.x.length > 1 ) {
            const eq = {
                equation: this.state.value,
                x0: this.state.x[0],
            }

            console.log(eq);

            axios.post('http://192.168.99.100:5000/onepoint/add', eq)
                .then(res => console.log(res.data));
        }
    }

    cal(v) {
        var value = this.state.data;
        this.state.exam[0] = value;
        var x = parseFloat(this.state.x);
        console.log("x ", x);
        var x_old = 0, error = 0, fxi = 0;
        var i, j = 0, fx = '', cal;
        if (value != '') {
            do {
                let scp = {
                    x: x,
                }
                console.log(value);
                cal = evaluate(value, scp);
                console.log(cal);
                fx = ''
                fxi = 0;
                fxi = parseFloat(cal)
                this.state.fx[j] = fxi;
                console.log(fxi);
                cal = 0
                x_old = x;
                console.log("x_old = ", x_old);
                x = fxi;
                console.log("x = ", x);

                error = Math.abs((x - x_old) / x)
                this.state.error[j] = error;
                console.log("error = ", error);
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x[j] = x;
                }

            } while (error >= 0.00001);

            console.log("x = ", this.state.x)
            console.log("fxi = ", this.state.fxi)
            console.log("error = ", this.state.error)
            this.setState({ data: '' })
            this.plot();
            if(this.state.value!='') //////////////////////
            {
                this.save();
            }    
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    plot() {
        const x_plot = this.state.x;
        const y_plot = this.state.fx;
        console.log(x_plot, y_plot)
        var data = [
            {
                type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
                x: x_plot,     // more about "x": #scatter-x
                y: y_plot,     // #scatter-y
                marker: {         // marker is an object, valid marker keys: #scatter-marker
                    color: '#f57c00' // more about "marker.color": #scatter-marker-color
                }
            },

        ];
        console.log(data);
        return data
    }

    render() {
        var i = 0;
        let data = this.plot()
        let layout = {                     // all "layout" attributes: #layout
            title: '',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: ''         // more about "layout.xaxis.title": #layout-xaxis-title
            },

        };
        let config = {
            showLink: false,
            displayModeBar: true
        };
        var x = this.state.x;
        var fx = this.state.fx;
        var error = this.state.error;
        var gra = this.state.exam;
        return (
            <Router>
                <MDBNavbar color="orange accent-3" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text"><a href="/" style={{ color: "White" }}>Numerical method</a></strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
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
                    <div className="formula-block" style={{ height: "400px", width: "40%", float: "left" }}>
                        <h1 style={{ fontSize: "45px", fontWeight: "400" }}>One-Point Iteration Method</h1>
                        <MDBFormInline>
                            <MDBInput style={{ width: "200px" }} label="Enter equation f(x)"
                                value={this.state.value}
                                onChange={this.handleChange}
                                spellCheck={false} />
                            <MDBBtn style={{ margin: "15px" }} color="warning" onClick={this.cal}>Submit</MDBBtn>
                            <MDBBtn gradient="peach" onClick={this.exam} >Example</MDBBtn>
                        </MDBFormInline>
                        <MDBFormInline>
                            <MDBInput style={{ width: "50px", margin: "5px" }} label="X0"
                                //value={this.state.xl}
                                onChange={this.x}
                                spellCheck={false} />
                        </MDBFormInline>
                        {gra.map(x => (<div>  
                            <TeX style={{ float: "left" }}
                                block
                                className="output"
                                settings={{ macros: { '*': _`\cdot` } }}
                            >
                                {x}
                            </TeX>
                        </div>
                        ), this)}
                        <br /><br /><br /><br />

                    </div>

                    <div style={{ width: "60%", height: "550px", float: "right", padding: "50px" }}>
                        <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
                    </div>

                    <center><div style={{ width: "50%", height: "550px", padding: "5px", paddingTop: "5px" }}>
                        <MDBTable>
                            <MDBTableHead>
                                <tr style={{ color: "#e65100" }}>
                                    <th>Iteration</th>
                                    <th>Xi</th>
                                    <th>f(Xi)</th>
                                    <th>Error</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        {x.map(x => (
                                            <div>{++i}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x.map(x => (
                                            <div>{x.toFixed(6)}</div>

                                        ), this)}
                                    </td>
                                    <td>
                                        {fx.map(fx => (
                                            <div>{fx.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {error.map(er => (
                                            <div>{er.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    </center>
                </div>

            </Router>

        );
    }
}

export default onepoint;