let mouseheld = false;

function createCanvas(size){
    const canvasDiv = document.querySelector('#canvas');
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            const squareDiv = document.createElement('div');

            squareDiv.style.boxSizing = "border-box";
            squareDiv.style.width = `${canvasDiv.clientWidth / size}px`;
            squareDiv.style.height = `${canvasDiv.clientHeight / size}px`;
            squareDiv.style.flex = "none";
            //squareDiv.style.border = "1px solid #eee";
            
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


createCanvas(32);