import React, {Component} from 'react';

const CanvasDraw = (props) => {

    return (
        <canvas id="canvas" width="640" height="480" onMouseDown ={props.canvasDown} onMouseUp={props.canvasUp} >
            Not support element HTML5 <code>&lt;canvas&gt;</code>.
        </canvas>
    );
};

export default CanvasDraw;

/*<div className="example__label">
       {`x: ${x}`}<br />
       {`y: ${y}`}<br />
       {`width:: ${width}`}<br />
       {`height: ${height}`}<br />
       {`isActive: ${isActive}`}<br />
       {`isPositionOutside: ${isPositionOutside ? 'true' : 'false'}`}<br />
       {`isMouseDetected: ${isMouseDetected ? 'true' : 'false'}`}<br />
       {`isTouchDetected: ${isTouchDetected ? 'true' : 'false'}`}
   </div>*/