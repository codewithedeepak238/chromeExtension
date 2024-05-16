let icon = document.getElementById("eyeDropperIcon")

const colorBox = document.querySelector(".colorBox");
let colorList = [];

//create full hex
const fullHex = (hex) => {
    let r = hex.slice(1, 2);
    let g = hex.slice(2, 3);
    let b = hex.slice(3, 4);

    r = parseInt(r + r, 16);
    g = parseInt(g + g, 16);
    b = parseInt(b + b, 16);

    // return {r, g, b} 
    return { r, g, b };
}

//convert hex to rgb
const hex2rgb = (hex) => {
    if (hex.length === 4) {
        return fullHex(hex);
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // return {r, g, b} 
    return { r, g, b };
}

if (localStorage.getItem("colorList")) {
    colorList = [...JSON.parse(localStorage.getItem("colorList"))]
    const new_colorList = JSON.parse(localStorage.getItem("colorList"));
    new_colorList.map((color) => {
        const { r, g, b } = hex2rgb(color);
        const div = document.createElement('div');
        div.classList.add("mainDiv");
        div.innerHTML = `<span id="colorGrid" style="background-color:${color}"></span>
            <span id="colorValue">${color}</span><span>rgb(${r}, ${g}, ${b})</span>`;
        colorBox.appendChild(div);
    })
}

icon.addEventListener("click", pickColor);

async function pickColor() {
    try {
        let eyeDropper = new EyeDropper();
        let selection = await eyeDropper.open();
        if (selection !== null) {
            const color = selection.sRGBHex;
            const { r, g, b } = hex2rgb(color);
            const div = document.createElement('div');
            div.classList.add("mainDiv");
            div.innerHTML = `<span id="colorGrid" style="background-color:${color}"></span>
            <span id="colorValue" value="${color}">${color}</span><span>rgb(${r}, ${g}, ${b})</span>`;
            colorBox.appendChild(div);
            colorList.push(color);
            localStorage.setItem("colorList", JSON.stringify(colorList));
            try {
                await navigator.clipboard.writeText(color);
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        console.log(err)
    }
}