let mouseheld = false;
const canvasDiv = document.querySelector('#canvas');


function clearCanvas(){
    canvasDiv.innerHTML = '';
}

function createCanvas(size){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            const squareDiv = document.createElement('div');

            squareDiv.style.boxSizing = "border-box";
            squareDiv.style.width = `${canvasDiv.clientWidth / size}px`;
            squareDiv.style.height = `${canvasDiv.clientHeight / size}px`;
            squareDiv.style.flex = "none";
            squareDiv.style.border = "1px solid #eee";
            
            squareDiv.addEventListener("mousedown", (e) => {
                e.preventDefault();
                mouseheld = true;
                squareDiv.style.backgroundColor = "black";
            });
            squareDiv.addEventListener("mouseenter", () => {
                if(mouseheld){
                    squareDiv.style.backgroundColor = "black";
                }
            });

            canvasDiv.appendChild(squareDiv);
        }
    }
}

const html = document.querySelector('html');
html.addEventListener("mouseup", () => {
    mouseheld = false;
});


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


createCanvas(16);