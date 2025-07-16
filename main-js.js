const canvas = document.querySelector("#canvas");

// get the total width and height of div canvas
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

// set amount of grid based on slider value
function setGridAmount (sliderValue) {
    const defaultGridWidth = canvasWidth / sliderValue - 2; // subtract 2 to account for 1px border on each grid
    const defaultGridHeight = canvasHeight / sliderValue - 2;
    for (let i = 0; i < sliderValue; i++) {
        const row = document.createElement("div");
        row.setAttribute("style", "margin: 0; padding: 0; display: flex; flex: 1 1 0; min-width: 0; min-height: 0");
        for (let j = 0; j < sliderValue; j++) {
            const grid = document.createElement("div");
            grid.setAttribute("style", "width: " + defaultGridWidth + "px; height: " + defaultGridHeight + 
                "px; min-width: 0; min-height: 0; flex: 1 1 0; border: solid 1px #e6e6e6; margin: 0; padding: 0;");
            grid.addEventListener("mouseover", (e) => {
                e.target.style.backgroundColor = "#696969";
            });
            row.appendChild(grid);
        }
        canvas.appendChild(row);
    }
}

var slider = document.querySelector("#grid-range");
var gridValue = document.querySelector("#grid-value-display");
gridValue.textContent = "Grid: " + slider.value + " x " + slider.value;

// display current grid slider value dynamically
slider.oninput = function() {
    gridValue.textContent = "Grid: " + slider.value + " x " + slider.value;
}

const btnApply = document.querySelector("#btn-apply");

// set default amount 16 x 16 grid after loading dom
setGridAmount(slider.value);

btnApply.addEventListener("click", () => {
    while (canvas.firstChild) {
        canvas.firstChild.remove(); // remove all grids before resetting the grid
    }
    setGridAmount(slider.value);
});