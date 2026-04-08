function createCanvas(size){
    const canvasDiv = document.querySelector('#canvas');
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            const squareDiv = document.createElement('div');

            squareDiv.style.boxSizing = "border-box";
            squareDiv.style.width = `${canvasDiv.clientWidth / size}px`;
            squareDiv.style.height = `${canvasDiv.clientHeight / size}px`;
            squareDiv.style.flex = "none";
            squareDiv.style.border = "1px solid #eee";
            
            canvasDiv.appendChild(squareDiv);
        }
    }
}


createCanvas(20);