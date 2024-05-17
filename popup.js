let icon = document.getElementById("eyeDropperIcon")

const hexBox = document.querySelector(".hexBox");
const cssBox = document.querySelector(".cssBox");
const recent = document.querySelector(".recent");
const colorBox = document.getElementById("colorGrid");
const recentColor = document.getElementById("recent-color");
const colorGrid = document.getElementById("colorGrid");
const clear = document.getElementById("clear");

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
    const new_colorList = JSON.parse(localStorage.getItem("colorList"));
    new_colorList.map((color) => {
        const div = document.createElement("div");
        div.style.background = color;
        div.style.width = "20px";
        div.style.height = "20px";
        div.style.cursor = "pointer";
        recentColor.appendChild(div);
        colorGrid.style.background = color;
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
            hexBox.innerText = color;
            cssBox.innerText = `rgb(${r}, ${g}, ${b})`;
            colorGrid.style.background = color;
            colorList.push(color);
            localStorage.setItem("colorList", JSON.stringify(colorList));
            const div = document.createElement("div");
            div.style.cursor = "pointer";
            div.style.background = color;
            div.style.width = "20px";
            div.style.height = "20px";
            recentColor.appendChild(div);
            colorGrid.style.background = color;
        }
    } catch (err) {
        console.log(err)
    }
}

clear.addEventListener("click", clearColor)

async function clearColor() {
    localStorage.removeItem("colorList");
    recentColor.innerHTML = "";
}

hexBox.addEventListener("click", async ()=>{
    try {
        await navigator.clipboard.writeText(hexBox.innerText);
    } catch (err) {
        console.error(err);
    }
})

cssBox.addEventListener("click", async ()=>{
    try {
        await navigator.clipboard.writeText(cssBox.innerText);
    } catch (err) {
        console.error(err);
    }
})
