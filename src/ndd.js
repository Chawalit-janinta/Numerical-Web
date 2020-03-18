import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,
    MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from "mdbreact";
import createPlotlyComponent from 'react-plotlyjs';
import axios from 'axios';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);


const _ = String.raw;

class linear extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xdata: [],
            ydata: [],
            x: '',
            y: '',
            size: '',
            dissize:''
        };
        this.onChange = this.onChange.bind(this);
        this.sizedata = this.sizedata.bind(this);
        this.cal = this.cal.bind(this);
        this.onX = this.onX.bind(this);
        this.onY = this.onY.bind(this);
        this.onSize = this.onSize.bind(this);
        this.exam = this.exam.bind(this);
    }

    state = {
        isOpen: false
    };

    exam() {

        //this.state.xl = this.state.xr = this.state.fxl = this.state.fxr = this.state.fxm = this.state.xm = this.state.error = [];
        if (this.state.size != '') {
            var i = 0;
            axios.get('http://localhost:5000/newton-divide/')
                .then(response => {

                    for (i = 0; i < response.data.length; i++) {
                        if (response.data[i].size == this.state.size) {
                            break;
                        }
                    }
                    this.state.x = response.data[i].x_value
                    this.setState({
                        xdata: response.data[i].X,
                        ydata: response.data[i].Y,
                    });

                    console.log(response.data[i].X,
                        response.data[i].Y,
                        response.data[i].size,
                        response.data[i].x_value);
                    
                    this.cal();

                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }

    save() {
        if (this.state.size != '' && this.state.xdata.length > 1 && this.state.ydata.length > 1) {
            const eq = {
                X: this.state.xdata,
                Y: this.state.ydata,
                size: this.state.size,
                x_value: this.state.x
            }

            console.log(eq);

            axios.post('http://localhost:5000/newton-divide/add', eq)
                .then(res => console.log(res.data));
        }
    }

    onSize(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.state.xdata = this.state.ydata = [];
    }

    onX(e) {
        this.state.xdata[e.target.name - 1] = e.target.value;
        this.state.dissize = 'T';
    }

    onY(e) {
        this.state.ydata[e.target.name - 1] = e.target.value;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    cal(v) {
        var z = this.state;
        console.log(z.xdata, z.ydata);
        if (z.size != '' && z.xdata[0] != 'x0' && z.ydata[0] != 'y0') {
            var fx = 0;
            var size = parseFloat(z.size);
            if (size >= 2 && size <= 3) {
                fx = parseFloat(z.ydata[0]) + ((parseFloat(z.x) - parseFloat(z.xdata[0])) * ((parseFloat(z.ydata[1]) - parseFloat(z.ydata[0])) / (parseFloat(z.xdata[1]) - parseFloat(z.xdata[0]))))
                console.log(fx);
                if (size == 3) {
                    var fx2 = 0;
                    fx2 = ((parseFloat(z.ydata[2]) - parseFloat(z.ydata[1])) / (parseFloat(z.xdata[2] - z.xdata[1])) - (parseFloat(z.ydata[1]) - parseFloat(z.ydata[0])) / (parseFloat(z.xdata[1] - z.xdata[0]))) / (parseFloat(z.xdata[2] - z.xdata[0]))
                    console.log(fx2);
                    fx2 = fx2 * (parseFloat(z.x) - parseFloat(z.xdata[0])) * (parseFloat(z.x) - parseFloat(z.xdata[1]))
                    fx = fx + fx2;
                    console.log(fx);
                }
            }
            else {
                var i = 0, j = 0, k = 0, n = 1;
                var c = [], en = [];
                var x = [], y = [];
                for (i = 0; i < size; i++) {
                    x[i] = parseFloat(z.xdata[i]);
                    y[i] = parseFloat(z.ydata[i]);
                }
                for (i = 0; i < size - 1; i++) {
                    for (j = 0; j < size - n; j++) {
                        en[j] = (y[j + 1] - y[j]) / (x[j + n] - x[j]);
                    }
                    for (j = 0; j < size - n; j++) {
                        y[j] = en[j];
                    }
                    console.log(y);
                    c[i] = y[0];
                    console.log(c[i]);
                    n++;
                }
                var xt = parseFloat(z.x);
                var xtotal = 1;
                for (i = 0; i < size - 1; i++) {
                    for (j = 0; j <= i; j++) {
                        xtotal *= (xt - x[j]);
                        console.log("x", x[j]);
                    }
                    console.log("xtotal", xtotal, "c", xtotal * c[i]);
                    fx += xtotal * c[i];
                    xtotal = 1;
                }
                fx += parseFloat(z.ydata[0])
                console.log(fx);
            }
            this.setState({ y: fx });
            this.plot();
            if(z.dissize != '')
            {
                this.save();
            }
        }
    }

    plot() {

        const xl_plot = this.state.xdata;
        const yl_plot = this.state.ydata;
        var x = [], y = [];
        x[0] = parseFloat(this.state.x);
        y[0] = parseFloat(this.state.y);
        if (this.state.y != '') {
            var data = [
                {
                    type: 'scatter',
                    x: xl_plot,
                    y: yl_plot,
                    marker: {
                        color: '#ff6d00'
                    },
                    name: 'X,Y'
                },
                {
                    type: 'scatter',
                    x: x,
                    y: y,
                    marker: {
                        color: '#304ffe'
                    },
                    name: 'X,Y value'
                },

            ];
        }
        console.log(data);
        return data

    }

    sizedata() {
        var size = this.state.size;
        this.setState({x:'',y:'',dissize:''});
        if (size != '') {
            var x = [];
            var y = [];
            var i = 0;
            if (size != '') {
                for (i = 0; i < size; i++) {
                    x[i] = "x";
                    y[i] = "y";
                }
                this.setState({ xdata: x, ydata: y });
            }
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    state = {
        modal14: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    render() {
        var x = this.state;
        var i = 0;
        let data = this.plot();
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
        var y = [];

        if (x.y == '') {
            y[0] = '';
        }
        else {
            y[0] = parseFloat(x.y).toFixed(6);
        }

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
                        <h1 style={{ fontSize: "40px", fontWeight: "400" }}>Newton's Divided-Differences</h1><br />
                        <div style={{ padding: "30px" }}>
                            <MDBFormInline style={{ fontWeight: "500" }}>
                                <MDBInput style={{ width: "120px" }} label="Input data size"
                                    name="size"
                                    onChange={this.onSize}
                                    spellCheck={false} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            <MDBBtn style={{ margin: "2px", fontWeight: "500" }} color="warning" onClick={this.sizedata}>Submit</MDBBtn>
                            </MDBFormInline>
                            <br /><br />
                            <div style={{ paddingLeft: "30px" }}>
                                {x.xdata.map(y => (<div>
                                    <MDBFormInline style={{ fontWeight: "500" }}>
                                        <MDBInput style={{ width: "50px" }} label={"X" + ++i}
                                            name={i}
                                            onChange={this.onX}
                                            spellCheck={false} />

                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    <MDBInput style={{ width: "50px" }} label={"Y" + i}
                                            name={i}
                                            onChange={this.onY}
                                            spellCheck={false} />

                                    </MDBFormInline><br /></div>
                                ), this)}
                                <div style={{ fontWeight: "500" }}>
                                    <MDBInput style={{ width: "50px" }} label="X value"
                                        name="x"
                                        onChange={this.onChange}
                                        spellCheck={false} />
                                </div>
                            </div>
                            <MDBBtn style={{ margin: "2px", fontWeight: "500" }} color="warning" onClick={this.cal} type="submit">Calculate</MDBBtn>
                            <MDBBtn style={{ fontWeight: "500" }} gradient="peach" onClick={this.exam}>Example</MDBBtn>

                            <MDBBtn color="deep-orange" onClick={this.toggle(14)} style={{ fontWeight: "500" }}>Data</MDBBtn>
                            <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                                <MDBModalHeader toggle={this.toggle(14)}><span style={{ fontWeight: "500" }}>Data value (X,Y)</span></MDBModalHeader>
                                <MDBModalBody>
                                    <center>
                                        <div style={{ width: "50%", height: "200px" }}>
                                            <MDBTable>
                                                <MDBTableHead>
                                                    <tr style={{ color: "#e65100" ,fontWeight:"500"}}>
                                                        <th>X</th>
                                                        <th>Y</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody>
                                                    <tr>
                                                        <td>
                                                            {x.xdata.map(x => (
                                                                <div>{x}</div>
                                                            ), this)}
                                                        </td>
                                                        <td>
                                                            {x.ydata.map(y => (
                                                                <div>{y}</div>

                                                            ), this)}
                                                        </td>

                                                    </tr>
                                                </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                    </center>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="danger" onClick={this.toggle(14)}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>

                        </div>
                    </div>
                    <div style={{ width: "60%", height: "550px", float: "right", padding: "50px" }}>
                        <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
                        <br />
                        <div style={{ paddingLeft: "300px" }}>
                            <h5 style={{ fontWeight: "500" }}>X = {this.state.x}</h5>
                            {y.map(y => (<div><h5 style={{ fontWeight: "500" }}>Y = {y}</h5></div>), this)}
                        </div>
                    </div>

                </div>
            </Router>

        );
    }
}

export default linear;