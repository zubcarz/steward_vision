import React, {Component} from 'react';
import './Canvas.css'

const CanvasDraw = (props) => {


    return (
        <canvas id="canvas" width="640" height="480" onMouseDown ={props.canvasDown} onMouseUp={props.canvasUp} style={props.borderColor}>
            Not support element HTML5 <code>&lt;canvas&gt;</code>.
        </canvas>
    );
};

export default CanvasDraw;
