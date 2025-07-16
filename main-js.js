const canvas = document.querySelector("#canvas");

const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

const defaultGridWidth = canvasWidth / 16 - 2;
const defaultGridHeight = canvasHeight / 16 - 2;

for (let i = 0; i < 16; i++) {
    const row = document.createElement("div");
    row.setAttribute("style", "margin: 0; padding: 0; display: flex; flex: 1 1 0; min-width: 0; min-height: 0");
    for (let j = 0; j < 16; j++) {
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