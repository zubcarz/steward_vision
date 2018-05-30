import React from 'react';
import { Nav, Collapse, CardBody, Card, CardTitle, CardImg, Form, FormGroup, Label, Input} from 'reactstrap';
import "./LateralMenu.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-input-range/lib/css/index.css'
import PlatformUP from '../Image/PlatfomrUP.png'
import PlatformDown from '../Image/PlatfomrDown.png'
import InputRange from 'react-input-range';


class LateralMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            configurationIsOpen : false,
            cinematicIsOpen: false,
            planingIsOpen : false,
        };
    }

    toggleConfiguration = () => {
        this.setState({
            configurationIsOpen: !this.state.configurationIsOpen,
            cinematicIsOpen: false,
            planingIsOpen: false
        });
    };

    toggleCinematic = () => {
        this.setState({
            cinematicIsOpen: !this.state.cinematicIsOpen,
            configurationIsOpen: false,
            planingIsOpen: false
        });
    };

    togglePlaning = () => {
        this.setState({
            planingIsOpen: !this.state.planingIsOpen,
            cinematicIsOpen: false,
            configurationIsOpen: false
        });
    };

    render() {
        return (
            <div className="col-md-2 d-none d-md-block bg-light sidebar">
                <Nav>
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item text-left">
                                <a className="nav-link active">
                                    Dashboard <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item text-left">
                                <a className="nav-link" onClick={this.toggleConfiguration}>
                                    Configuración
                                </a>
                                <Collapse isOpen={this.state.configurationIsOpen}>
                                    <Card>
                                        <CardBody>
                                            <Form>
                                            <CardTitle>Plataforma Superior</CardTitle>
                                            <CardImg top width="100%" src={PlatformUP} alt="Card image cap" />
                                            <FormGroup>
                                                <Label for="exampleNumber">Parametro A</Label>
                                                <Input
                                                    type="number"
                                                    name="number"
                                                    id="exampleNumber"
                                                    placeholder="number"
                                                    value = {this.props.valueA}
                                                    onChange={this.props.aChange}/>
                                            </FormGroup>
                                            <CardTitle>Plataforma Inferior</CardTitle>
                                            <CardImg top width="100%" src={PlatformDown} alt="Card image cap" />
                                            <FormGroup>
                                                <Label for="exampleNumber">Parametro D</Label>
                                                <Input
                                                    type="number"
                                                    name="number"
                                                    id="exampleNumber"
                                                    placeholder="number"
                                                    value = {this.props.valueD}
                                                    onChange={this.props.dChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleNumber">Parametro B</Label>
                                                <Input
                                                    type="number"
                                                    name="number"
                                                    id="exampleNumber" placeholder="number"
                                                    value = {this.props.valueB}
                                                    onChange={this.props.bChange}/>
                                            </FormGroup>
                                            </Form>
                                     </CardBody>
                                    </Card>
                                </Collapse>
                            </li>
                            <li className="nav-item text-left">
                                <a className="nav-link"  onClick={this.toggleCinematic}>
                                    Cinematica Inversa
                                </a>
                                <Collapse isOpen={this.state.cinematicIsOpen}>
                                    <Card>
                                        <CardBody>
                                            <Label  className="cinematicLabel"> X Position</Label>
                                            <br/> <br/>
                                            <InputRange
                                                formatLabel={value => `${value} mm`}
                                                minValue={-50}
                                                maxValue={50}
                                                value={this.props.valueX}
                                                onChange= {this.props.xChange} />
                                            <br/><hr/>
                                            <Label className="cinematicLabel" > Y Position</Label>
                                            <br/> <br/>
                                            <InputRange
                                                formatLabel={value => `${value} mm`}
                                                minValue={-50}
                                                maxValue={50}
                                                value={this.props.valueY}
                                                onChange= {this.props.yChange} />
                                            <br/><hr/>
                                            <Label className="cinematicLabel" > Z Position</Label>
                                            <br/> <br/>
                                            <InputRange
                                                formatLabel={value => `${value} mm`}
                                                minValue={-50}
                                                maxValue={50}
                                                value={this.props.valueZ}
                                                onChange= {this.props.zChange} />
                                            <br/><hr/>
                                            <Label className="cinematicLabel" > Pitch </Label>
                                            <br/> <br/>
                                            <InputRange
                                                formatLabel={value => `${value} mm`}
                                                minValue={-30}
                                                maxValue={30}
                                                value={this.props.valuePitch}
                                                onChange= {this.props.pitchChange} />
                                            <br/><hr/>
                                            <Label className="cinematicLabel" > Yaw </Label>
                                            <br/> <br/>
                                            <InputRange
                                                formatLabel={value => `${value} mm`}
                                                minValue={-30}
                                                maxValue={30}
                                                value={this.props.valueYaw}
                                                onChange= {this.props.yawChange} />
                                            <br/><hr/>
                                            <Label className="cinematicLabel" > Roll </Label>
                                            <br/> <br/>
                                            <InputRange
                                                formatLabel={value => `${value} mm`}
                                                minValue={-30}
                                                maxValue={30}
                                                value={this.props.valueRoll}
                                                onChange= {this.props.rollChange}/>
                                            <br/><hr/>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </li>
                            <li className="nav-item text-left" >

                                <a className="nav-link" onClick={this.togglePlaning}>
                                    Planificación
                                </a>

                                <Collapse className="w-100" isOpen={this.state.planingIsOpen}>
                                    <Card className="w-100" >
                                        <CardBody className="w-100">
                                            <Label > En esta seccion puede grabar los puntos para realizar una trayectoria </Label>
                                            <div className="btn-toolbar mb-2 mb-md-0">
                                                <div className="btn-group mr-2">
                                                    <button className="btn btn-sm btn-outline-secondary">Record</button>
                                                    <button className="btn btn-sm btn-outline-secondary">Play</button>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </li>
                        </ul>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default LateralMenu;
