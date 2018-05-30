import React, { Component } from 'react';
//import './App.css';
import Header from './UI/Header'
import  Canvas from './UI/Canvas'
import LateralMenu from './UI/LateralMenu'
import Steward from './Physical/StewardPlatform'

let  platform = {};

class App extends Component {

    constructor(props) {
        super(props);
        platform = new Steward();

        this.state = {
            a: 160,
            b: 120,
            d: 20,
            valueX: 0,
            valueY: 0,
            valueZ: 0,
            valuePitch: 0,
            valueYaw: 0,
            valueRoll: 0,
            downDimension: platform.getVerticesDownPlatform(),
            upDimension: platform.getVerticesUpPlatform(),
            legs: platform.getLegs(),
            mouseY : 0,
            mouseX: 0,
            canvasWidth: 0,
            canvasHeight: 0,
            mouseIsCLick: false,
            view: "Isometric",
            actionView: "Pitch, Roll",
            borderColor: { color : "black"},
            keyButton: 0,
        }
    };

    reset = () =>{
        platform.reset();
        this.setState({
            a: 160,
            b: 120,
            d: 20,
            valueX: 0,
            valueY: 0,
            valueZ: 0,
            valuePitch: 0,
            valueYaw: 0,
            valueRoll: 0,
            downDimension: platform.getVerticesDownPlatform(),
            upDimension: platform.getVerticesUpPlatform(),
            legs: platform.getLegs()
        });
    };

    cinematic = () => {
        let position = {
            x: this.state.valueX,
            y: this.state.valueY,
            z: this.state.valueZ
        };

        let orientation = {
            pitch : this.state.valuePitch,
            yaw : this.state.valueYaw,
            roll: this.state.valueRoll,
        };
        platform.inverseCinematic(position, orientation);
    };

    aChange = (event) =>{
        platform = new Steward(Number(event.target.value), this.state.b, this.state.d);
        this.cinematic();
        this.setState ({
            a: Number(event.target.value),
            downDimension : platform.getVerticesDownPlatform(),
            upDimension : platform.getVerticesUpPlatform(),
            legs: platform.getLegs()
        });
    };

    bChange = (event) =>{
        platform = new Steward(this.state.a, Number(event.target.value), this.state.d);
        this.cinematic();
        this.setState({
            b: Number(event.target.value),
            downDimension : platform.getVerticesDownPlatform(),
            upDimension : platform.getVerticesUpPlatform(),
            legs: platform.getLegs()
        });
    };

    dChange = (event) =>{
        platform = new Steward(this.state.a, this.state.b, Number(event.target.value));
        this.cinematic();
        this.setState ({
            d: Number(event.target.value),
            downDimension : platform.getVerticesDownPlatform(),
            upDimension : platform.getVerticesUpPlatform(),
            legs: platform.getLegs()
        });
    };

    xChange = (value) =>{

        let position = {
            x: value,
            y: this.state.valueY,
            z: this.state.valueZ
        };

        let orientation = {
            pitch : this.state.valuePitch,
            yaw : this.state.valueYaw,
            roll: this.state.valueRoll,
        };
        platform.inverseCinematic(position, orientation);
        this.setState(
            {
                valueX: value,
                upDimension : platform.getVerticesUpPlatform(),
                legs: platform.getLegs()
            }
        );
    };

    yChange = (value) =>{
        let position = {
            x: this.state.valueX,
            y: value,
            z: this.state.valueZ
        };

        let orientation = {
            pitch : this.state.valuePitch,
            yaw : this.state.valueYaw,
            roll: this.state.valueRoll,
        };
        platform.inverseCinematic(position, orientation);
        this.setState(
            {
                valueY: value,
                upDimension : platform.getVerticesUpPlatform(),
                legs: platform.getLegs()
            }
        );
    };

    zChange = (value) =>{
        let position = {
            x: this.state.valueX,
            y: this.state.valueY,
            z: value
        };

        let orientation = {
            pitch : this.state.valuePitch,
            yaw : this.state.valueYaw,
            roll: this.state.valueRoll,
        };
        platform.inverseCinematic(position, orientation);
        this.setState(
            {
                valueZ: value,
                upDimension : platform.getVerticesUpPlatform(),
                legs: platform.getLegs()
            }
        );
    };

    pitchChange = (value) =>{
        let position = {
            x: this.state.valueX,
            y: this.state.valueY,
            z: this.state.valueZ,
        };

        let orientation = {
            pitch : value,
            yaw : this.state.valueYaw,
            roll: this.state.valueRoll,
        };
        platform.inverseCinematic(position, orientation);
        this.setState(
            {
                valuePitch: value,
                upDimension : platform.getVerticesUpPlatform(),
                legs: platform.getLegs()
            }
        );
    };

    yawChange = (value) =>{
        let position = {
            x: this.state.valueX,
            y: this.state.valueY,
            z: this.state.valueZ,
        };

        let orientation = {
            pitch : this.state.valuePitch,
            yaw : value,
            roll: this.state.valueRoll,
        };
        platform.inverseCinematic(position, orientation);
        this.setState(
            {
                valueYaw: value,
                upDimension : platform.getVerticesUpPlatform(),
                legs: platform.getLegs()
            }
        );
    };

    rollChange = (value) =>{
        let position = {
            x: this.state.valueX,
            y: this.state.valueY,
            z: this.state.valueZ,
        };

        let orientation = {
            pitch : this.state.valuePitch,
            yaw : this.state.valueYaw,
            roll: value,
        };
        platform.inverseCinematic(position, orientation);
        this.setState(
            {
                valueRoll: value,
                upDimension : platform.getVerticesUpPlatform(),
                legs: platform.getLegs()
            }
        );
    };

    onChangePosition = (event) =>{
        this.setState(
            {
                mouseY : event.position.y,
                mouseX: event.position.x,
                canvasWidth:  (event["elementDimensions"] != undefined) ? event.elementDimensions.width : 0,
                canvasHeight:  (event["elementDimensions"] != undefined) ? event.elementDimensions.height : 0,
                borderColor: { color : "black"}
            }
        );

        if(this.state.mouseIsCLick){
            /*console.log( "y : " + this.state.mouseY);
            console.log( "x : " + this.state.mouseX);
            console.log( "w : " + this.state.canvasWidth);
            console.log( "w : " + this.state.canvasHeight);*/
            let color ="#ccccff";
            let boxShadow : "1px 1px 1px 1px #ccccff";

            let isSelect = false;
            switch(this.state.view){
                case "Top":
                    if(this.state.mouseX > this.state.canvasWidth * 0.40 && this.state.mouseX < this.state.canvasWidth * 0.56
                    && this.state.mouseY > this.state.canvasHeight * 0.31 && this.state.mouseY < this.state.canvasHeight * 0.62){
                        if(this.state.keyButton == 0) {
                            this.yChange(this.LineRegression(this.state.canvasWidth * 0.56, this.state.canvasWidth * 0.40, 50, -50, this.state.mouseX));
                            this.xChange(this.LineRegression(this.state.canvasHeight * 0.62, this.state.canvasHeight * 0.31, 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.yawChange(this.LineRegression(this.state.canvasWidth * 0.56, this.state.canvasWidth * 0.40, 45, -45, this.state.mouseX));
                        }
                        isSelect = true;
                    }else{
                        isSelect = false;
                    }
                    break;
                case "Right":
                    if(this.state.mouseX > this.state.canvasWidth * (505/this.state.canvasWidth) && this.state.mouseX < this.state.canvasWidth * (774/this.state.canvasWidth)
                        &&  this.state.mouseY > this.state.canvasHeight * (29/this.state.canvasHeight) && this.state.mouseY < this.state.canvasHeight * (275/this.state.canvasHeight)){
                        if(this.state.keyButton == 0) {
                            this.zChange(-this.LineRegression(this.state.canvasHeight * (275 / this.state.canvasHeight), this.state.canvasHeight * (29 / this.state.canvasHeight), 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.rollChange(-this.LineRegression(this.state.canvasHeight * (275 / this.state.canvasHeight), this.state.canvasHeight * (29 / this.state.canvasHeight), 45, -45, this.state.mouseY));

                        }
                        isSelect = true;
                    }else{
                        isSelect = false;
                    }
                    break;
                case "From":
                    if(this.state.mouseX > this.state.canvasWidth * (479/this.state.canvasWidth) && this.state.mouseX < this.state.canvasWidth * (803/this.state.canvasWidth)
                        &&  this.state.mouseY > this.state.canvasHeight * (69/this.state.canvasHeight) && this.state.mouseY < this.state.canvasHeight * (275/this.state.canvasHeight)){
                        if(this.state.keyButton == 0) {
                            this.zChange(-this.LineRegression(this.state.canvasHeight * (275 / this.state.canvasHeight), this.state.canvasHeight * (69 / this.state.canvasHeight), 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.pitchChange(-this.LineRegression(this.state.canvasHeight * (275 / this.state.canvasHeight), this.state.canvasHeight * (69 / this.state.canvasHeight), 45, -45, this.state.mouseY));
                        }
                        isSelect = true;
                    }else{
                        isSelect = false;
                    }
                    break;
                case "Isometric":
                    if(this.state.mouseX > this.state.canvasWidth * (525/this.state.canvasWidth) && this.state.mouseX < this.state.canvasWidth * (777/this.state.canvasWidth)
                        &&  this.state.mouseY > this.state.canvasHeight * (123/this.state.canvasHeight) && this.state.mouseY < this.state.canvasHeight * (296/this.state.canvasHeight)){
                        if(this.state.keyButton == 0) {
                            this.zChange(-this.LineRegression(this.state.canvasHeight * (296 / this.state.canvasHeight), this.state.canvasHeight * (123 / this.state.canvasHeight), 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.rollChange(this.LineRegression(this.state.canvasHeight * (296 / this.state.canvasHeight), this.state.canvasHeight * (123 / this.state.canvasHeight), 45, -45, this.state.mouseY));
                            this.pitchChange(this.LineRegression(this.state.canvasWidth * (777/this.state.canvasWidth), this.state.canvasWidth * (525/this.state.canvasWidth) , 45, -45, this.state.mouseX));
                        }
                        isSelect = true;
                    }else{
                        isSelect = false;
                    }
                    break;
                case "4View":
                    // Top
                    if(this.state.mouseX > this.state.canvasWidth * 0.1556 && this.state.mouseX < this.state.canvasWidth * 0.3439
                        &&  this.state.mouseY > this.state.canvasHeight * 0.056 && this.state.mouseY < this.state.canvasHeight * 0.5136){
                        if(this.state.keyButton == 0) {
                            this.yChange(this.LineRegression(this.state.canvasWidth * 0.3439, this.state.canvasWidth * 0.1556, 50, -50, this.state.mouseX));
                            this.xChange(this.LineRegression(this.state.canvasHeight * 0.5136, this.state.canvasHeight * 0.056, 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.yawChange(this.LineRegression(this.state.canvasWidth * 0.3439, this.state.canvasWidth * 0.1556, 50, -50, this.state.mouseX));
                        }
                        isSelect = true;
                        //Right
                    }else if(this.state.mouseX > this.state.canvasWidth * (898/this.state.canvasWidth) && this.state.mouseX < this.state.canvasWidth * (1025/this.state.canvasWidth)
                        &&  this.state.mouseY > this.state.canvasHeight * (23/this.state.canvasHeight) && this.state.mouseY < this.state.canvasHeight * (150/this.state.canvasHeight)){
                        if(this.state.keyButton == 0) {
                            this.zChange(-this.LineRegression(this.state.canvasHeight * (150/this.state.canvasHeight), this.state.canvasHeight * (23/this.state.canvasHeight), 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.rollChange(-this.LineRegression(this.state.canvasHeight * (150/this.state.canvasHeight), this.state.canvasHeight * (23/this.state.canvasHeight), 45, -45, this.state.mouseY));
                        }
                        isSelect = true;
                        //From
                    }else if(this.state.mouseX > this.state.canvasWidth * (237/this.state.canvasWidth) && this.state.mouseX < this.state.canvasWidth * (401/this.state.canvasWidth)
                        &&  this.state.mouseY > this.state.canvasHeight * (362/this.state.canvasHeight) && this.state.mouseY < this.state.canvasHeight * (447/this.state.canvasHeight)){
                        if(this.state.keyButton == 0) {
                            this.zChange(-this.LineRegression(this.state.canvasHeight * (447/this.state.canvasHeight), this.state.canvasHeight * (362/this.state.canvasHeight), 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.pitchChange(-this.LineRegression(this.state.canvasHeight * (447/this.state.canvasHeight), this.state.canvasHeight * (362/this.state.canvasHeight), 45, -45, this.state.mouseY));
                        }
                        isSelect = true;
                        //Isometrics
                    }else if(this.state.mouseX > this.state.canvasWidth * (900/this.state.canvasWidth) && this.state.mouseX < this.state.canvasWidth * (1033/this.state.canvasWidth)
                        &&  this.state.mouseY > this.state.canvasHeight * (344/this.state.canvasHeight) && this.state.mouseY < this.state.canvasHeight * (465/this.state.canvasHeight)){
                        if(this.state.keyButton == 0) {
                            this.zChange(-this.LineRegression(this.state.canvasHeight * (465 / this.state.canvasHeight), this.state.canvasHeight * (344 / this.state.canvasHeight), 50, -50, this.state.mouseY));
                        }else{
                            color ="#ffcccc";
                            boxShadow : "1px 1px 1px 1px #ffcccc";
                            this.rollChange(this.LineRegression(this.state.canvasHeight * (465 / this.state.canvasHeight), this.state.canvasHeight * (344 / this.state.canvasHeight), 45, -45, this.state.mouseY));
                            this.pitchChange(this.LineRegression(this.state.canvasWidth * (1033/this.state.canvasWidth), this.state.canvasWidth * (900/this.state.canvasWidth) , 45, -45, this.state.mouseX));
                        }
                        isSelect = true;
                    }else{
                        isSelect = false;
                    }
            }

            if(isSelect){
                this.setState(
                    {
                        borderColor: {
                            color : color,
                            boxShadow : boxShadow
                        }
                    }
                );
            }
        }
    };

     LineRegression = (x2, x1, y2, y1, value) => {
        const m = (y2-y1)/(x2-x1);
        const b = -((x2+x1)/2) * m;
        let result  = m*value + b;
        if (result > y2){
            result = y2;
        }
        if(result < y1){
            result = y1;
        }
        return result;
    };

    canvasDown = (event) => {
        this.setState(
            {
                mouseIsCLick: true,
                keyButton: event.button,
            });
    };

    canvasUp = (event) => {
        this.setState(
            {
                mouseIsCLick: false
            });
    };

    topView = (event) => {
        this.setState(
            {
                view: "Top",
                actionView: "X, Y, Yaw"
            });
    };

    rightView = (event) => {
        this.setState(
            {
                view: "Right",
                actionView: "Z, Roll"
            });
    };

    fromView = (event) => {
        this.setState(
            {
                view: "From",
                actionView: "Z, Pitch"
            });
    };

    isometricView = (event) => {
        this.setState(
            {
                view: "Isometric",
                actionView: "Pitch, Roll"
            });
    };

    multipleView = (event) => {
        this.setState(
            {
                view: "4View",
                actionView: "X, Y, Z, Pitch, Yaw, Roll"
            });
    };

    render() {
        return (
          <div className="App">
            <Header click={this.reset}/>
            <LateralMenu aChange = {this.aChange} bChange = {this.bChange} dChange = {this.dChange} valueA = {this.state.a} valueB ={this.state.b} valueD={this.state.d}
            valueX={this.state.valueX} valueY={this.state.valueY} valueZ={this.state.valueZ} valuePitch={this.state.valuePitch} valueRoll={this.state.valueRoll}
            valueYaw={this.state.valueYaw} xChange={this.xChange} yChange={this.yChange} zChange={this.zChange} pitchChange={this.pitchChange} yawChange={this.yawChange}
            rollChange={this.rollChange}/>
            <Canvas  downDimension={this.state.downDimension} upDimension = {this.state.upDimension} legs = {this.state.legs} mousePosition ={this.onChangePosition}
                     canvasDown ={this.canvasDown} canvasUp = {this.canvasUp} view = {this.state.view} actionView = {this.state.actionView} topView={this.topView} fromView={this.fromView}
                     rightView={this.rightView} isometricView={this.isometricView} multipleView={this.multipleView} borderColor ={this.state.borderColor}
                     />
          </div>
        );
    }
}

export default App;
