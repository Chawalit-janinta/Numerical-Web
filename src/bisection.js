import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import TeX from '@matejmazur/react-katex';
import createPlotlyComponent from 'react-plotlyjs';
import axios from 'axios';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { evaluate } from 'mathjs'
const PlotlyComponent = createPlotlyComponent(Plotly);

const _ = String.raw;
class bisection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: _``,
            data: '',
            xl: [],
            xr: [],
            xm: [],
            error: [],
            fxr: [],
            fxl: [],
            fxm: [],
            exam: ["-"]
        };
        this.handleChange = this.handleChange.bind(this);
        this.cal = this.cal.bind(this);
        this.plot = this.plot.bind(this);
        this.xl = this.xl.bind(this);
        this.xr = this.xr.bind(this);
        this.save = this.save.bind(this);
        this.exam = this.exam.bind(this);
    }

    handleChange({ target: { value } }) {
        this.setState({ value, data: value });
        console.log(this.state.data);
    }
    xl({ target: { value } }) {
        this.state.xl[0] = parseFloat(value);
        console.log(this.state.xl);
    }
    xr({ target: { value } }) {
        this.state.xr[0] = parseFloat(value);
        console.log(this.state.xr);
    }

    exam() {
        //this.state.xl = this.state.xr = this.state.fxl = this.state.fxr = this.state.fxm = this.state.xm = this.state.error = [];
        this.setState({data:'',value:''});
        axios.get('http://localhost:5000/bisection/')
            .then(response => {
                this.state.exam[0] = response.data[response.data.length - 1].equation;
                this.state.xl[0] = parseFloat(response.data[response.data.length - 1].xl);
                this.state.xr[0] = parseFloat(response.data[response.data.length - 1].xr);

                this.setState({
                    data: response.data[response.data.length - 1].equation,
                });

                console.log(response.data[response.data.length - 1].equation,
                    response.data[response.data.length - 1].xl,
                    response.data[response.data.length - 1].xr);
                this.cal();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    save() {
        if (this.state.value != '' && this.state.xl.length > 1 && this.state.xr.length > 1) {
            const eq = {
                equation: this.state.value,
                xr: this.state.xr[0],
                xl: this.state.xl[0]
            }

            console.log(eq);

            axios.post('http://localhost:5000/bisection/add', eq)
                .then(res => console.log(res.data));
        }
    }

    state = {
        isOpen: false
    };
    cal(v) {
        var value = this.state.data;
        this.state.exam[0] = value;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        console.log(xl, xr);
        var xm = 0, xm_old = 0, error = 0, fxl = 0, fxr = 0, fxm = 0;
        var i, j = 0, fx = '', cal;
        if (value != '') {
            do {
                /*for (i = 0; i < value.length; i++) {
                    if (value[i] == "x") {
                        fx += xl;
                    }
                    else {
                        fx += value[i];
                    }
                }*/
                let scp = {
                    x: xl,
                }
                console.log(value);
                cal = evaluate(value, scp);
                console.log(cal);
                fx = ''
                fxl = 0;
                fxl = parseFloat(cal)
                this.state.fxl[j] = fxl;
                console.log(fxl);
                cal = 0

                let scp1 = {
                    x: xr,
                }
                console.log(value);
                cal = evaluate(value, scp1);
                console.log(cal);
                fx = ''
                fxr = 0;
                fxr = parseFloat(cal)
                this.state.fxr[j] = fxr;
                cal = 0

                xm = (xr + xl) / 2;

                let scp2 = {
                    x: xm,
                }
                console.log(value);
                cal = evaluate(value, scp2);
                console.log(cal);
                fx = ''
                fxm = 0;
                fxm = parseFloat(cal)
                this.state.fxm[j] = fxm;
                cal = 0

                this.state.xm[j] = xm;
                error = Math.abs((xm - xm_old) / xm)
                this.state.error[j] = error;
                console.log("error = ", error);
                xm_old = xm;
                console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr)
                console.log(fxm * fxr);
                j++;
                if (error >= 0.00001) {
                    if ((fxm * fxr) < 0) {
                        this.state.xl[j] = xm;
                        this.state.xr[j] = xr;
                        xl = xm;
                    }
                    else {
                        this.state.xr[j] = xm;
                        this.state.xl[j] = xl;
                        xr = xm;
                    }
                }
                console.log("xl =", this.state.xl[j], "xm = ", this.state.xm[j - 1], "xr = ", this.state.xr[j])

            } while (error >= 0.00001);

            console.log("xl = ", this.state.xl, "xr = ", this.state.xr, "xm = ", this.state.xm)
            console.log("fxl = ", this.state.fxl, "fxr = ", this.state.fxr, "fxm = ", this.state.fxm)
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
        /*const xm_plot = this.state.xm;
        const ym_plot = this.state.fxm;*/
        
            const xl_plot = this.state.xl;
            const yl_plot = this.state.fxl;
            const xr_plot = this.state.xr;
            const yr_plot = this.state.fxr;
            const xm_plot = this.state.xm;
            const ym_plot = this.state.fxm;
            var xm = [], ym = [];
            xm[0] = this.state.xm[this.state.xm.length - 1];
            ym[0] = this.state.fxm[this.state.fxm.length - 1];
            //console.log(x_plot, y_plot)
            var data = [
                /*{
                    type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
                    x: xm_plot,     // more about "x": #scatter-x
                    y: ym_plot,     // #scatter-y
                    marker: {         // marker is an object, valid marker keys: #scatter-marker
                        color: '#f57c00' // more about "marker.color": #scatter-marker-color
                    },
                    name: 'XM'
                },*/
                {
                    type: 'scatter',
                    x: xl_plot,
                    y: yl_plot,
                    marker: {
                        color: '#ff6d00'
                    },
                    name: 'XL'
                },
                {
                    type: 'scatter',
                    x: xr_plot,
                    y: yr_plot,
                    marker: {
                        color: '#ffab00'
                    },
                    name: 'XR'
                },
                {
                    type: 'scatter',
                    x: xm,
                    y: ym,
                    marker: {
                        color: '#CC0000'
                    },
                    name: 'XM'
                }

            ];
            console.log(data);
            return data
        
    }

    render() {
        var i = 0;
        let data = this.plot()
        let layout = {                     // all "layout" attributes: #layout
            title: '',       // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: '',       // more about "layout.xaxis.title": #layout-xaxis-title
            },
        };
        let config = {
            showLink: false,
            displayModeBar: true
        };
        var xl = this.state.xl;
        var xr = this.state.xr;
        var xm = this.state.xm;
        var fxl = this.state.fxl;
        var fxr = this.state.fxr;
        var fxm = this.state.fxm;
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
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <div style={{ width: "100%", height: "650px", float: "left", padding: "50px" }}>
                    <div className="formula-block" style={{ height: "400px", width: "40%", float: "left" }}>
                        <h1 style={{ fontSize: "50px", fontWeight: "400" }}>Bisection Method</h1>
                        <MDBFormInline style={{ fontWeight: "500" }}>
                            <MDBInput style={{ width: "200px" }} label="Enter equation f(x)"
                                //value={this.state.value}
                                onChange={this.handleChange}
                                spellCheck={false} />
                            <MDBBtn style={{ margin: "15px" }} color="warning" onClick={this.cal}>Submit</MDBBtn>
                            <MDBBtn gradient="peach" onClick={this.exam} >Example</MDBBtn>
                        </MDBFormInline>
                        <MDBFormInline>
                            <MDBInput style={{ width: "50px", margin: "5px" }} label="XL"
                                //value={this.state.xl[this.state.xl.length-1]}
                                onChange={this.xl}
                                spellCheck={false} />
                            <MDBInput style={{ width: "50px", margin: "5px" }} label="XR"
                                //value={this.state.xr[this.state.xr.length-1]}
                                onChange={this.xr}
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
                </div>
                <div style={{ width: "100%", height: "550px", padding: "5px", paddingTop: "5px" }}>
                    <MDBTable>
                        <MDBTableHead>
                            <tr style={{ color: "#e65100" }}>
                                <th>Iteration</th>
                                <th>XL</th>
                                <th>XR</th>
                                <th>XM</th>
                                <th>f(XL)</th>
                                <th>f(XR)</th>
                                <th>f(XM)</th>
                                <th>Error</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <td>
                                    {xr.map(x => (
                                        <div>{++i}</div>
                                    ), this)}
                                </td>
                                <td>
                                    {xl.map(xl => (
                                        <div>{xl.toFixed(6)}</div>

                                    ), this)}
                                </td>
                                <td>
                                    {xr.map(xr => (
                                        <div>{xr.toFixed(6)}</div>
                                    ), this)}
                                </td>
                                <td>
                                    {xm.map(xm => (
                                        <div>{xm.toFixed(6)}</div>
                                    ), this)}
                                </td>
                                <td>
                                    {fxl.map(fxl => (
                                        <div>{fxl.toFixed(6)}</div>
                                    ), this)}
                                </td>
                                <td>
                                    {fxr.map(fxr => (
                                        <div>{fxr.toFixed(6)}</div>
                                    ), this)}
                                </td>
                                <td>
                                    {fxm.map(fxm => (
                                        <div>{fxm.toFixed(6)}</div>
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
            </Router>

        );
    }
}

export default bisection;