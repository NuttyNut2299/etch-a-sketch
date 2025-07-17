const canvas = document.querySelector("#canvas");

// get the total width and height of div canvas
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

// set amount of grid based on slider value
function setGridAmount (sliderValue, randomColor, darkeningEffect) {
    const defaultGridWidth = canvasWidth / sliderValue - 2; // subtract 2 to account for 1px border on each grid
    const defaultGridHeight = canvasHeight / sliderValue - 2;

    for (let i = 0; i < sliderValue; i++) {
        const row = document.createElement("div");

        row.setAttribute("style", "margin: 0; padding: 0; display: flex; flex: 1 1 0; min-width: 0; min-height: 0;");

        for (let j = 0; j < sliderValue; j++) {
            const grid = document.createElement("div");

            grid.setAttribute("style", "width: " + defaultGridWidth + "px; height: " + defaultGridHeight + 
                "px; min-width: 0; min-height: 0; flex: 1 1 0; border: solid 1px #e6e6e6; background-color: white; margin: 0; padding: 0;");

            grid.addEventListener("mouseover", () => {
                if (randomColor) {                   
                    if (grid.style.backgroundColor === "white") { // don't generate color again when there's color
                        grid.style.backgroundColor = generateRandomRGBACode(darkeningEffect);
                    }
                } else if (!randomColor && darkeningEffect){
                    if (grid.style.backgroundColor === "white") { // don't regenerate 0 opacity when called
                        grid.style.backgroundColor = "rgba(0,0,0,0)";
                    }
                } else {
                    grid.style.backgroundColor = "#696969";
                }

                if (darkeningEffect) {
                    // get the individual value of rgba code
                    const rgbaString = grid.style.backgroundColor;
                    const numbers = rgbaString.substring(
                        rgbaString.indexOf('(') + 1,
                        rgbaString.lastIndexOf(')')
                    );

                    const code = numbers.split(',');

                    const red = parseInt(code[0]);
                    const green = parseInt(code[1]);
                    const blue = parseInt(code[2]);
                    var opacity = parseFloat(code[3]);

                    // increase opacity by 10%
                    if (opacity !== 1) {
                        opacity+=0.1;
                        grid.style.backgroundColor = "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
                    }
                }
            });

            row.appendChild(grid);
        }
        canvas.appendChild(row);
    }
}

// defunct, use random rgba value instead
// function generateRandomHexCode () {
//     let hexCode = "#" // start the string with number sign for color hex code

//     while ( hexCode.length < 7 ) { // generate 6 digits
//       hexCode += (Math.round(Math.random() * 15)).toString(16) // pick a random number from 0 to 15, then convert them to base 16 with toString function
//     }

//     return hexCode 
// }

function generateRandomRGBACode(darkening) {
    // generate random rgba value
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    
    if (!darkening) {
        return "rgba(" + red + "," + green + "," + blue + ",1)"
    } else {
        return "rgba(" + red + "," + green + "," + blue + ",0)"
    }
}

var slider = document.querySelector("#grid-range");
var gridValue = document.querySelector("#grid-value-current");

var randomColor = document.querySelector("#random-color");
var darkeningEffect = document.querySelector("#darkening-effect");

gridValue.textContent = "Change Grid: " + slider.value + " x " + slider.value;

// display current grid slider value dynamically
slider.oninput = function() {
    gridValue.textContent = "Change Grid: " + slider.value + " x " + slider.value;
}

const btnApply = document.querySelector("#btn-apply");

// set default amount 16 x 16 grid after loading dom
document.addEventListener("DOMContentLoaded", () => {
    setGridAmount(slider.value, randomColor.checked, darkeningEffect.checked);
});


btnApply.addEventListener("click", () => {
    while (canvas.firstChild) {
        canvas.firstChild.remove(); // remove all grids before resetting the grid
    }
    setGridAmount(slider.value, randomColor.checked, darkeningEffect.checked);

    const randomColorStatus = document.querySelector("#random-color-status");
    const darkeningEffectStatus = document.querySelector("#darkening-effect-status");
    const gridValueCurrent = document.querySelector("#grid-value-display");

    if (randomColor.checked) {
        randomColorStatus.textContent = "Current Status: On";
        randomColorStatus.style.fontWeight = "bold";
    } else {
        randomColorStatus.textContent = "Current Status: Off";
        randomColorStatus.style.fontWeight = "400";
    }

    if (darkeningEffect.checked) {
        darkeningEffectStatus.textContent = "Current Status: On";
        darkeningEffectStatus.style.fontWeight = "bold";
    } else {
        darkeningEffectStatus.textContent = "Current Status: Off";
        darkeningEffectStatus.style.fontWeight = "400";
    }

    gridValueCurrent.textContent = "Current Grid: " + slider.value + " x " + slider.value;
});