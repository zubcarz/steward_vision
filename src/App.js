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
            view: "Isometric"
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

    onChange = (event) =>{

        this.setState(
            {
                mouseY : event.position.y,
                mouseX: event.position.x,
                canvasWidth:  event.width ,
                canvasHeight: event.height
            }
        );

        if(this.state.mouseIsCLick){
            console.log("mouse active");
        }
    };

    canvasDown = (event) => {
        this.setState(
            {
                mouseIsCLick: true
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
                view: "Top"
            });
    };

    rightView = (event) => {
        this.setState(
            {
                view: "Right"
            });
    };

    fromView = (event) => {
        this.setState(
            {
                view: "From"
            });
    };

    isometricView = (event) => {
        this.setState(
            {
                view: "Isometric"
            });
    };

    multipleView = (event) => {
        this.setState(
            {
                view: "4View"
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
            <Canvas  downDimension={this.state.downDimension} upDimension = {this.state.upDimension} legs = {this.state.legs} mousePosition ={this.onChange}
                     canvasDown ={this.canvasDown} canvasUp = {this.canvasUp} view = {this.state.view} topView={this.topView} fromView={this.fromView}
                     rightView={this.rightView} isometricView={this.isometricView} multipleView={this.multipleView}/>
          </div>
        );
    }
}

export default App;
