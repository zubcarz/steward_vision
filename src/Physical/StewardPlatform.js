class StewardPlatform {

    constructor(a, b , d){
        if(!arguments.length) {
            this.reset();
        }
        else {
            this.changeParameters(a, b, d);
            this.configOrientation();
        }
    }

    configOrientation(){
        let position = {};
        let orientation = {};
        position.x =0;
        position.y =0;
        position.z =0;
        orientation.pitch = 0;
        orientation.yaw = 0;
        orientation.roll = 0;
        this.inverseCinematic( position, orientation);
    }

    changeParameters(a, b , d ){
        this.a = a;
        this.b = b;
        this.d = d;

        this.dimension = {};
        this.legs = {};

        this.calculateVerticesUpPlatform();
        this.calculateVerticesDownPlatform();
    }

    reset (){
        this.changeParameters(160, 120, 20);
        this.configOrientation();
    }

    calculateVerticesUpPlatform() {

        let t1 = {
            x: (Math.pow(3, 1 / 2) * this.a) / 6,
            y: 0.5 * this.a,
            z:0
        };

        let t2 = {
            x: -(Math.pow(3, 1 / 2) * this.a) / 3,
            y: 0,
            z:0
        };

        let t3 = {
            x: (Math.pow(3, 1 / 2) * this.a) / 6,
            y: -0.5 * this.a,
            z:0
        };

        let upVertices = {
            "t1": t1,
            "t2": t2,
            "t3": t3
        };

        this.dimension.upVertices = upVertices;

        return upVertices;

    }

    calculateVerticesDownPlatform(){

        let b1 = {
            x : (Math.pow(3,1/2) * ( (2 * this.b) + this.d)) /6,
            y : 0.5 * (this.d)
        };

        let b2 = {
            x : ( -1 * Math.pow (3 , 0.5)  * (this.b - this.d) )/6,
            y : 0.5 * ( this.b + this.d)
        };

        let b3 = {
            x : ( -1 * Math.pow(3,0.5)  * ( this.b + ( 2 * this.d )))/6,
            y : 0.5 * (this.b)
        };

        let b4 = {
            x : ( -1 * Math.pow(3,0.5)  * ( this.b + ( 2 * this.d )))/6,
            y : -0.5 *(this.b)
        };

        let b5 = {
            x : ( -1 * Math.pow(3,0.5) * ( this.b - this.d ))/6,
            y : -0.5 * (this.b + this.d)
        };

        let b6 = {
            x :( Math.pow(3,0.5)  * ( ( 2 * this.b ) + this.d ))/6,
            y : -0.5 * this.d
        };

        let downVertices = {
            "b1":b1,
            "b2":b2,
            "b3":b3,
            "b4":b4,
            "b5":b5,
            "b6":b6,
        };

        this.dimension.downVertices = downVertices;
        return  downVertices;

    }

    inverseCinematic (position, orientation) {

        // calculate Triangle a pitch b yaw y roll
        // Triangle const
        const r = Math.pow(3, 0.5);
        const k = this.a / r;
        const radians =  Math.PI/180;


       let xt1 = position.x
            + ((k) * ((Math.sin(orientation.pitch * radians) * Math.sin(orientation.roll * radians) * Math.sin((orientation.yaw + 60) * radians ))
                + (Math.cos(orientation.roll * radians) * Math.cos((orientation.yaw + 60) * radians ))));
        let yt1 = position.y
            + ((k) * (Math.cos(orientation.pitch * radians) * Math.sin((orientation.yaw + 60) * radians)));
        let zt1 = position.z
            + ((k) * ((Math.sin(orientation.pitch * radians) * Math.cos(orientation.roll * radians) * Math.sin((orientation.yaw + 60) * radians))
                - (Math.sin(orientation.roll * radians) * Math.cos((orientation.yaw + 60) * radians))));

        let xt2 = position.x
            + ((-k) * ((Math.sin(orientation.pitch * radians) * Math.sin(orientation.roll * radians) * Math.sin(orientation.yaw * radians))
                + (Math.cos(orientation.roll * radians) * Math.cos(orientation.yaw * radians))));
        let yt2 = position.y
            + (-this.a * (Math.cos(orientation.pitch * radians) * Math.sin(orientation.yaw * radians))) / Math.pow(3, 0.5);
        let zt2 = position.z
            + ((-k) * ((Math.sin(orientation.pitch * radians) * Math.cos(orientation.roll * radians) * Math.sin(orientation.yaw * radians))
                - (Math.sin(orientation.roll * radians) * Math.cos(orientation.yaw * radians))));

        let xt3 = position.x
            + ((k) * ((Math.sin(orientation.pitch * radians) * Math.sin(orientation.roll * radians) * Math.sin((orientation.yaw - 60)  * radians))
                + (Math.cos(orientation.roll * radians) * Math.cos((orientation.yaw - 60) * radians))));
        let yt3 = position.y
            + ((k) * (Math.cos(orientation.pitch * radians) * Math.sin((orientation.yaw - 60) * radians)));
        let zt3 = position.z
            + ((k) * ((Math.sin(orientation.pitch * radians) * Math.cos(orientation.roll * radians) * Math.sin((orientation.yaw - 60) * radians))
                - (Math.sin(orientation.roll * radians) * Math.cos((orientation.yaw - 60) * radians))));


        let upVertices = {
            "t1": {
                x: xt1,
                y: yt1,
                z: zt1,
            },
            "t2": {
                x: xt2,
                y: yt2,
                z: zt2,
            },
            "t3": {
                x: xt3,
                y: yt3,
                z: zt3,
            },
        };
        // Update Vertices
        this.dimension.upVertices = upVertices;

        // calculate longitudes of legs
        this.legs.l1 = (Math.pow( (Math.pow((xt1) - (this.d/(2 * (Math.pow( 3, 0.5)))) - (this.b / Math.pow(3, 0.5)) , 2)) + (Math.pow( yt1 - (this.d/2),2)) + (Math.pow(zt1,2)) , 0.5)) * 2;
        //this.legs.l1 = Math.pow( Math.pow((xt1 - (this.d / (2 * r)) - (this.b / ((r)))), 2) + (Math.pow(yt1 - (this.d / 2), 2) + Math.pow(zt1, 2)),0.5)* 2;
        this.legs.l2 = Math.pow( Math.pow((xt1 - (this.d / (2 * r)) + (this.b / (2 * (r)))), 2) + Math.pow (yt1 - (this.d / 2) - (this.b / 2), 2) + Math.pow(zt1, 2), 0.5) * 2;

        this.legs.l3 = Math.pow( Math.pow((xt2 + (this.d / (r)) + (this.b / (2 * (r)))),2) + Math.pow(yt2 - (this.b / 2), 2) + Math.pow(zt2, 2), 0.5) * 2;
        this.legs.l4 = Math.pow( Math.pow((xt2 + (this.d / (r)) + (this.b / (2 * (r)))),2) + Math.pow(yt2 + (this.b / 2), 2) + Math.pow(zt2, 2), 0.5) * 2;

        this.legs.l5 = Math.pow( Math.pow((xt3 - (this.d / (2 * r)) + (this.b / (2 * (r)))),2) + Math.pow(yt3 + (this.b / 2) + (this.d / 2), 2) + Math.pow(zt3, 2), 0.5) * 2;
        this.legs.l6 = Math.pow( Math.pow((xt3 - (this.d / (2 * r)) - (this.b / ((r)))),2) + Math.pow(yt3 + (this.d / 2), 2) + Math.pow(zt3, 2), 0.5) * 2;
    }

    getVerticesUpPlatform()
    {
        return this.dimension.upVertices;
    }

    getVerticesDownPlatform()
    {
        return this.dimension.downVertices;
    }

    getLegs() {
        return this.legs;
    }
}

export default  StewardPlatform;