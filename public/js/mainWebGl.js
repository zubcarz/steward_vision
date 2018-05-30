"use strict";
document.addEventListener('contextmenu', event => event.preventDefault());

let gl;
let rotation = 0;
let scale = 0.25;
let angleView = 45;
let indexSize = 0;
let indexSizeCube = 0;
let positionCamera = [ 0, 15, -100];
let orientationCamera = {
    x: -55,
    y: 0,
    z: -45
};

let is4View = false;

//UI Elements
document.getElementById("topCamera").onclick = function() {topCamera()};
document.getElementById("fromCamera").onclick = function() {fromCamera()};
document.getElementById("rightCamera").onclick = function() {rightCamera()};
document.getElementById("isometricCamera").onclick = function() {isometricCamera()};
document.getElementById("4viewCamera").onclick = function() {viewCamera()};

const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

const fsSource = `
 varying lowp vec4 vColor;

    void main() {
        gl_FragColor = vColor;

    }
  `;


//Start Shaders
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    return shaderProgram;
}

// creates a shader of the given type, uploads the source and
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

//Obtener eh inicializar el contexto
function initWebGL(canvas) {
    gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}
    if (!gl) {
        alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
        gl = null;
    }
    return gl;
}

function getBufferPlatform(gl){
    let dimensions = getDimensions();

    let centerDown = [   0, 0, -139.04]; // -> 3
    let positions = dimensions.t1.concat(dimensions.t2,dimensions.t3,centerDown, dimensions.b1, dimensions.b2, dimensions.b3, dimensions.b4, dimensions.b5, dimensions.b6);
    positions = scaleArray(positions, scale);

    let colors = [
        [204/255, 204/255 , 1.0,  0.2],  // Cian
        [1,  204/255,  204/255,  0.2],   // red
    ];

    let generatedColors = [];

    let c1 = colors[0];
    for (let i=0; i<3; i++) {
        generatedColors = generatedColors.concat(c1);
    }

    let c2 = colors[1];
    for (let i=0; i<7; i++) {
        generatedColors = generatedColors.concat(c2);
    }

    let index  = [
        0,  1,  2, // enfrente
        //Down platfomr
        3 , 4 , 5,
        3 , 5 , 6,
        3 , 6 , 7,
        3 , 7 , 8,
        3 , 8 , 9,
        3 , 9 , 4
    ];

    indexSize = index.length;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const colorBuffer = gl.createBuffer();
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(index ), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    }
}

function getBufferBorders(gl) {

    let dimensions = getDimensions();
    let positions = dimensions.t1.concat(dimensions.t2, dimensions.t1, dimensions.t3, dimensions.t2, dimensions.t3, // -> up platform
        dimensions.b1, dimensions.b2, dimensions.b3, dimensions.b4, dimensions.b5, dimensions.b6, // down long connections
        dimensions.t1, dimensions.b1, dimensions.t1, dimensions.b2, dimensions.t2, dimensions.b4, dimensions.t2, dimensions.b3,
        dimensions.t3, dimensions.b5, dimensions.t3, dimensions.b6, // -> between connectors
        dimensions.b1, dimensions.b6, dimensions.b2, dimensions.b3, dimensions.b4, dimensions.b5 // -> down short connections
        );


    positions = scaleArray(positions, scale);

    let colors = [
        [0, 0, 0,  0.5],   // black
    ];

    let generatedColors = [];

    let c1 = colors[0];
    for (let i=0; i<positions.length/3; i++) {
        generatedColors = generatedColors.concat(c1);
    }

    let indices  = [
        0,  1,
        2, 3 ,
        4 , 5,
        6 , 7,
        8 , 9,
        10 , 11,
        12, 13,
        14, 15,
        16, 17,
        18, 19,
        20, 21,
        22, 23,
        24, 25,
        26, 27,
        28, 29
    ];

    indexSizeCube = indices.length;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const colorBuffer = gl.createBuffer();
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
    const indexBuffer= gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices ), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer
    }
}

function drawScene(gl, programInfo, buffers, deltaTime) {

    const fieldOfView = angleView * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 200.0;
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    mat4.translate(modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        positionCamera);  // amount to translate

    mat4.rotate(modelViewMatrix,  // destination matrix
        modelViewMatrix,  // matrix to rotate
        degToRad(orientationCamera.x),   // amount to rotate in radians
        [1, 0, 0]);

    mat4.rotate(modelViewMatrix,  // destination matrix
        modelViewMatrix,  // matrix to rotate
        degToRad(orientationCamera.y),  // amount to rotate in radians
        [0, 1, 0]);

    mat4.rotate(modelViewMatrix,  // destination matrix
        modelViewMatrix,  // matrix to rotate
        degToRad(orientationCamera.z),  // amount to rotate in radians
        [0, 0, 1]);

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// PLATFORM DRAW  ////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    {
        const numComponents = 3;  // pull out 2 values per iteration
        const type = gl.FLOAT;    // the data in the buffer is 32bit floats
        const normalize = false;  // don't normalize
        const stride = 0;         // how many bytes to get from one set of values to the next
                                  // 0 = use type and numComponents above
        const offset = 0;         // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.bufferPlatform.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }

    // into the vertexColor attribute.
    {
        const numComponents = 4;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER,  buffers.bufferPlatform.color);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexColor);
    }

    // Tell WebGL which indices to use to index the vertices
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,  buffers.bufferPlatform.indices);
        gl.useProgram(programInfo.program);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
    }
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, indexSize, type, offset);

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// BORDERS DRAW  ////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    {
        const numComponents = 3;  // pull out 2 values per iteration
        const type = gl.FLOAT;    // the data in the buffer is 32bit floats
        const normalize = false;  // don't normalize
        const stride = 0;         // how many bytes to get from one set of values to the next
                                  // 0 = use type and numComponents above
        const offset = 0;         // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER,  buffers.bufferBorder.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }

    // into the vertexColor attribute.
    {
        const numComponents = 4;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER,  buffers.bufferBorder.color);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexColor);
    }

    // Tell WebGL which indices to use to index the vertices
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,  buffers.bufferBorder.indices);
        gl.useProgram(programInfo.program);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
    }
    const typeCube = gl.UNSIGNED_SHORT;
    const offsetCube = 0;
    gl.drawElements(gl.LINES, indexSizeCube, typeCube, offsetCube);

    rotation += deltaTime;
}

function start() {
    let canvas = document.getElementById("canvas");

    gl = initWebGL(canvas);

    if (gl) {
        //gl.clearColor( 0, 0, 0, 0);  // Clear to black, fully opaque
        gl.clearColor( 1, 1, 1, 0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.clearDepth(1.0);
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    // Info to ShaderProgram
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };


    // Draw the scene
    let then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        resize(gl);
        const deltaTime = now - then;
        then = now;
        let bufferPlatform = getBufferPlatform(gl);
        let bufferBorder = getBufferBorders(gl);

        let buffers = {
            bufferPlatform : bufferPlatform,
            bufferBorder: bufferBorder
        };


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if(is4View) {
            // down Left
            positionCamera = [0, 18, -100];
            orientationCamera = {
                x: -90,
                y: 0,
                z: 270
            };
            gl.viewport(0, 0, gl.canvas.width / 2, gl.canvas.height / 2);
            drawScene(gl, programInfo, buffers, deltaTime);

            // down Right
            positionCamera = [0, 15, -100];
            orientationCamera = {
                x: -55,
                y: 0,
                z: -45
            };
            gl.viewport(gl.canvas.width / 2, 0, gl.canvas.width / 2, gl.canvas.height / 2);
            drawScene(gl, programInfo, buffers, deltaTime);

            // top Left
            positionCamera = [0, 0, -100];
            orientationCamera = {
                x: 0,
                y: 0,
                z: 270
            };
            gl.viewport(0, gl.canvas.height / 2, gl.canvas.width / 2, gl.canvas.height / 2);
            drawScene(gl, programInfo, buffers, deltaTime);

            // top Right
            positionCamera = [0, 18, -100];
            orientationCamera = {
                x: -90,
                y: 0,
                z: 90
            };
            gl.viewport(gl.canvas.width / 2, gl.canvas.height / 2, gl.canvas.width / 2, gl.canvas.height / 2);
            drawScene(gl, programInfo, buffers, deltaTime);
        }else{
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            drawScene(gl, programInfo, buffers, deltaTime);
        }



        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function degToRad(d) {
    return d * Math.PI / 180;
}

function scaleArray(array, scale){
    let count = 0;
    array.forEach(function(element) {
        array[count] = element * scale;
        count++;
    });
    return array;
}

function resize(gl) {

    let realToCSSPixels = window.devicePixelRatio;
    let displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
    let displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

    // Check if the canvas is not the same size.
    if (gl.canvas.width  !== displayWidth ||
        gl.canvas.height !== displayHeight) {

        // Make the canvas the same size
        gl.canvas.width  = displayWidth;
        gl.canvas.height = displayHeight;
    }
}

function topCamera() {
    is4View = false;
    positionCamera = [ 0, 0, -100];
    orientationCamera = {
        x: 0,
        y: 0,
        z: 270
    };
}
function fromCamera() {
    is4View = false;
    positionCamera = [ 0, 18, -100];
    orientationCamera = {
        x: -90,
        y: 0,
        z: 270
    };
}
function rightCamera() {
    is4View = false;
    positionCamera = [ 0, 18, -100];
    orientationCamera = {
        x: -90,
        y: 0,
        z: 90
    };
}
function isometricCamera() {
    is4View = false;
     positionCamera = [ 0, 15, -100];
     orientationCamera = {
        x: -55,
        y: 0,
        z: -45
    };
}
function viewCamera() {
  is4View = true;
}

function getDimensions(){
    let rows = document.getElementsByTagName("table")[1].rows;
    let dimensions = [];

    for(let i=1; i < rows.length; i++){
        let dimension ={};
        dimension.x = rows[i].outerText.split("\t")[1];
        dimension.y = rows[i].outerText.split("\t")[2];
        dimension.z = rows[i].outerText.split("\t")[3];
        dimensions[i-1] = dimension;
    }


    let t1 = [ dimensions[0].x,  dimensions[0].y,   dimensions[0].z]; //t1 -> 0
    let t2 = [ dimensions[1].x,  dimensions[1].y,   dimensions[1].z]; //t2 -> 1
    let t3 = [ dimensions[2].x,  dimensions[2].y,   dimensions[2].z]; //t3 -> 2
    let b1 = [ dimensions[3].x,  dimensions[3].y,   dimensions[3].z]; //b1 -> 4
    let b2 = [ dimensions[4].x,  dimensions[4].y,   dimensions[4].z]; //b2 -> 5
    let b3 = [ dimensions[5].x,  dimensions[5].y,   dimensions[5].z]; //b3 -> 6
    let b4 = [ dimensions[6].x,  dimensions[6].y,   dimensions[6].z]; //b4 -> 7
    let b5 = [ dimensions[7].x,  dimensions[7].y,   dimensions[7].z]; //b5 -> 8
    let b6 = [ dimensions[8].x,  dimensions[8].y,   dimensions[8].z]; //b6 -> 9

    return {
        "t1": t1,
        "t2": t2,
        "t3": t3,
        "b1": b1,
        "b2": b2,
        "b3": b3,
        "b4": b4,
        "b5": b5,
        "b6": b6
    };
}

start();
