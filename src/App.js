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
        platform = new Steward( 160, 120, 20);

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
            legs: platform.getLegs()
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
        platform.changeParameters(event.target.value, this.state.b, this.state.d);
        this.cinematic();
        this.setState ({
            a: event.target.value,
            downDimension : platform.getVerticesDownPlatform(),
            upDimension : platform.getVerticesUpPlatform(),
            legs: platform.getLegs()
        });
    };

    bChange = (event) =>{
        platform.changeParameters(this.state.a, event.target.value, this.state.d);
        this.cinematic();
        this.setState({
            b: event.target.value,
            downDimension : platform.getVerticesDownPlatform(),
            upDimension : platform.getVerticesUpPlatform(),
            legs: platform.getLegs()
        });
    };

    dChange = (event) =>{
        platform.changeParameters(this.state.a, this.state.b, event.target.value);
        this.cinematic();
        this.setState ({
            d: event.target.value,
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

    render() {
        return (
          <div className="App">
            <Header click={this.reset}/>
            <LateralMenu aChange = {this.aChange} bChange = {this.bChange} dChange = {this.dChange} valueA = {this.state.a} valueB ={this.state.b} valueD={this.state.d}
            valueX={this.state.valueX} valueY={this.state.valueY} valueZ={this.state.valueZ} valuePitch={this.state.valuePitch} valueRoll={this.state.valueRoll}
            valueYaw={this.state.valueYaw} xChange={this.xChange} yChange={this.yChange} zChange={this.zChange} pitchChange={this.pitchChange} yawChange={this.yawChange}
            rollChange={this.rollChange}/>
            <Canvas  downDimension={this.state.downDimension} upDimension = {this.state.upDimension} legs = {this.state.legs}/>
          </div>
        );
    }
}

export default App;
