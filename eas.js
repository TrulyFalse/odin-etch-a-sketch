// globals
const NUM_OF_COLORS = 256;
const canvasDiv = document.querySelector('#canvas');

let mouseheld = false;
let rainbowMode = false;
let lightBrushMode = false;


// DRY code
function clearCanvas(){
    canvasDiv.innerHTML = '';
}

function parseStringToRGBA(RGBA_Str){
    // "rgba(0, 0, 0, 0.03)" -> "0, 0, 0, 0.03" -> ["0","0","0","0.03"] -> [0,0,0,0.03]
    let arr = RGBA_Str.slice(5, -1).split(',').map((str) => +str);
    let RGBA = {
        red: arr[0],
        green: arr[1],
        blue: arr[2],
        alpha: (arr[3] !== undefined) ? arr[3] : 1
    }
    return RGBA;
}

function generateRandomColorRGBA(currentAlpha){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, ${currentAlpha})`;
}

function increaseAlpha(colorStr){
    let RGBA = parseStringToRGBA(colorStr);
    if(RGBA.alpha !== 1.0) RGBA.alpha += 0.1;
    return `rgba(${RGBA.red}, ${RGBA.green}, ${RGBA.blue}, ${RGBA.alpha})`
}

function fillCell(squareDiv){
    let currentColor = (squareDiv.style.backgroundColor === "") ? {red: 0, green: 0, blue: 0, alpha: 0} : parseStringToRGBA(squareDiv.style.backgroundColor);
    let newColor = rainbowMode? generateRandomColorRGBA(currentColor.alpha) : `rgba(0,0,0,${currentColor.alpha})`;
    newColor = lightBrushMode? increaseAlpha(newColor) : newColor.slice(0, newColor.lastIndexOf(",")) + ", 1)";
    squareDiv.style.backgroundColor = newColor;
    return;
}

function createCanvas(size){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            const squareDiv = document.createElement('div');

            squareDiv.style.boxSizing = "border-box";
            squareDiv.style.width = `${canvasDiv.clientWidth / size}px`;
            squareDiv.style.height = `${canvasDiv.clientHeight / size}px`;
            squareDiv.style.flex = "none";
            //squareDiv.style.border = "1px solid #eee"; //add borders to cells for flexbox debugging
            
            squareDiv.addEventListener("mousedown", (e) => {
                e.preventDefault();
                mouseheld = true;
                fillCell(squareDiv);
            });
            squareDiv.addEventListener("mouseenter", () => {
                if(mouseheld) fillCell(squareDiv);
            });
            canvasDiv.appendChild(squareDiv);
        }
    }
}

const html = document.querySelector('html');
html.addEventListener("mouseup", () => {
    mouseheld = false;
});





// Button event-handlers
const newCanvasBtn = document.querySelector("#new-canvas-btn");
newCanvasBtn.addEventListener("click", () => {
    let size;
    do{
        size = prompt("Enter new canvas's square grid length (1 to 100):");
        if(size === null) return; // doing nothing to canvas if cancel button was pressed.
        size = +size; //convert string to number
    }while(Number.isNaN(size) || !Number.isInteger(size) || size <= 0 || size > 100)
    
    clearCanvas();
    createCanvas(size);
});

const rainbowBtn = document.querySelector("#rainbow-btn");
rainbowBtn.addEventListener("click", () => {
    if(rainbowMode){
        rainbowMode = false;
        rainbowBtn.textContent = "Enable Rainbow Mode";
    }else{
        rainbowMode = true;
        rainbowBtn.textContent = "Disable Rainbow Mode";
    }
})

const lightBrushBtn = document.querySelector("#light-brush-btn");
lightBrushBtn.addEventListener("click", () => {
    if(lightBrushMode){
        lightBrushMode = false;
        lightBrushBtn.textContent = "Enable Light Brush";
    }else{
        lightBrushMode = true;
        lightBrushBtn.textContent = "Disable Light Brush";
    }
})


// initialize canvas
createCanvas(24);