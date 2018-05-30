import React from 'react';
import { Table } from 'reactstrap';
import ReactCursorPosition from 'react-cursor-position';
import CanvasDraw from "./CanvasDraw";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">{this.props.view} - {this.props.actionView}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button id="topCamera" className="btn btn-sm btn-outline-secondary" onClick={this.props.topView} >Top</button>
                            <button id="fromCamera" className="btn btn-sm btn-outline-secondary" onClick={this.props.fromView} >From</button>
                            <button id="rightCamera" className="btn btn-sm btn-outline-secondary" onClick={this.props.rightView} >Right</button>
                            <button id="isometricCamera" className="btn btn-sm btn-outline-secondary" onClick={this.props.isometricView} >Isometric</button>
                            <button id="4viewCamera" className="btn btn-sm btn-outline-secondary"onClick={this.props.multipleView} >4View</button>
                        </div>
                    </div>
                </div>
                <ReactCursorPosition onPositionChanged = {this.props.mousePosition}>
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <CanvasDraw  canvasDown ={this.props.canvasDown} canvasUp = {this.props.canvasUp} borderColor ={this.props.borderColor}
                                    />
                    </div>

                </ReactCursorPosition>
                <h1 className="h2">Longitudes</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Longitude</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">L1</th>
                        <td>{this.props.legs.l1.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">L2</th>
                        <td>{this.props.legs.l2.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">L3</th>
                        <td>{this.props.legs.l3.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">L4</th>
                        <td>{this.props.legs.l4.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">L5</th>
                        <td>{this.props.legs.l5.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">L6</th>
                        <td>{this.props.legs.l6.toFixed(2)}</td>
                    </tr>
                    </tbody>
                </Table>
                <h1 className="h2">Dimensions</h1>
                <Table id="dimensions">
                    <thead>
                    <tr>
                        <th>Point</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Z</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">T1</th>
                        <td>{this.props.upDimension.t1.x.toFixed(2)}</td>
                        <td>{this.props.upDimension.t1.y.toFixed(2)}</td>
                        <td>{this.props.upDimension.t1.z.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">T2</th>
                        <td>{this.props.upDimension.t2.x.toFixed(2)}</td>
                        <td>{this.props.upDimension.t2.y.toFixed(2)}</td>
                        <td>{this.props.upDimension.t2.z.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">T3</th>
                        <td>{this.props.upDimension.t3.x.toFixed(2)}</td>
                        <td>{this.props.upDimension.t3.y.toFixed(2)}</td>
                        <td>{this.props.upDimension.t3.z.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row">B1</th>
                        <td>{this.props.downDimension.b1.x.toFixed(2)}</td>
                        <td>{this.props.downDimension.b1.y.toFixed(2)}</td>
                        <td>{-139.044}</td>
                    </tr>
                    <tr>
                        <th scope="row">B2</th>
                        <td>{this.props.downDimension.b2.x.toFixed(2)}</td>
                        <td>{this.props.downDimension.b2.y.toFixed(2)}</td>
                        <td>{-139.044}</td>
                    </tr>
                    <tr>
                        <th scope="row">B3</th>
                        <td>{this.props.downDimension.b3.x.toFixed(2)}</td>
                        <td>{this.props.downDimension.b3.y.toFixed(2)}</td>
                        <td>{-139.044}</td>
                    </tr>
                    <tr>
                        <th scope="row">B4</th>
                        <td>{this.props.downDimension.b4.x.toFixed(2)}</td>
                        <td>{this.props.downDimension.b4.y.toFixed(2)}</td>
                        <td>{-139.044}</td>
                    </tr>
                    <tr>
                        <th scope="row">B5</th>
                        <td>{this.props.downDimension.b5.x.toFixed(2)}</td>
                        <td>{this.props.downDimension.b5.y.toFixed(2)}</td>
                        <td>{-139.044}</td>
                    </tr>
                    <tr>
                        <th scope="row">B6</th>
                        <td>{this.props.downDimension.b6.x.toFixed(2)}</td>
                        <td>{this.props.downDimension.b6.y.toFixed(2)}</td>
                        <td>{-139.044}</td>
                    </tr>
                    </tbody>
                </Table>
            </main>
        );
    }
}

export default Canvas;
