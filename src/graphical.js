import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import TeX from '@matejmazur/react-katex';
import axios from 'axios';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { evaluate } from 'mathjs'
const PlotlyComponent = createPlotlyComponent(Plotly);

const _ = String.raw;

class graphical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: _``,
            data: '',
            x: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            exam: ['-']  ///////////////////////////
        };
        this.handleChange = this.handleChange.bind(this);
        this.cal = this.cal.bind(this);
        this.plot = this.plot.bind(this);
        this.save = this.save.bind(this);
        this.exam = this.exam.bind(this);
    }

    handleChange({ target: { value } }) {
        this.setState({ value, data: value });
        console.log(this.state.data);
    }

    state = {
        isOpen: false
    };
    cal(v) {
        var value = this.state.data;
        this.state.exam[0] = value; //////////////////////////////////
        var test = this.state.x;
        var i, j, fx = '', cal;
        if (value != '') {
            for (j = 0; j < test.length; j++) {
                /* for (i = 0; i < value.length; i++) {
                     if (value[i] == "x") {
                         fx += test[j];
                     }
                     else {
                         fx += value[i];
                     }
                 }*/
                let scp = {
                    x: test[j],
                }
                console.log(value);
                cal = evaluate(value, scp);
                console.log(cal);
                fx = ''
                this.state.y[j] = parseFloat(cal);
                cal = 0
            }
            console.log(this.state.y)
            this.setState({ data: '' })
            this.plot();
            this.save();
            //return this.render();
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    exam() {
        axios.get('http://localhost:5000/graphical/')
            .then(response => {
                this.state.exam[0] = response.data[response.data.length - 1].equation;
                this.setState({ data: response.data[response.data.length - 1].equation })
                console.log(response.data[response.data.length - 1].equation);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    save() {
        if (this.state.value != '') {
            const eq = {
                equation: this.state.value,
            }

            console.log(eq);

            axios.post('http://localhost:5000/graphical/add', eq)
                .then(res => console.log(res.data));
        }
    }

    plot() {

        const x_plot = this.state.x;
        const y_plot = this.state.y;
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
        var i = 0, j = 0;
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
        var y = this.state.y;
        var gra = this.state.exam;   //////////////////////////
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
                        <h1 style={{ fontSize: "50px", fontWeight: "400" }}>Graphical Method</h1>
                        <MDBFormInline style={{ fontWeight: "500" }}>
                            <MDBInput style={{ width: "200px" }} label="Enter equation f(x)"
                                value={this.state.value}
                                onChange={this.handleChange}
                                spellCheck={false} />
                            <MDBBtn style={{ margin: "15px" }} color="warning" onClick={this.cal}>Submit</MDBBtn>
                            <MDBBtn gradient="peach" onClick={this.exam} >Example</MDBBtn>
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
                        <div style={{ width: "50%", height: "550px", padding: "50px", paddingTop: "5px" }}>
                            <MDBTable>
                                <MDBTableHead>
                                    <tr style={{ color: "#e65100" }}>
                                        <th>Iteration</th>
                                        <th>X</th>
                                        <th>Y</th>
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
                                                <div>{x}</div>

                                            ), this)}
                                        </td>
                                        <td>
                                            {y.map(y => (
                                                <div>{y}</div>
                                            ), this)}
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </div>
                    <div style={{ width: "60%", height: "550px", float: "right", padding: "50px" }}>
                        <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
                    </div>
                </div>
            </Router>

        );
    }
}

export default graphical;