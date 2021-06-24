let colorContainer = document.getElementById("colorContainer");
let hexInput = document.querySelector('.hex');

const lightenDarkenColor = (color, amount) => {
    let colorWithoutHash = color.replace("#", "")
    if (colorWithoutHash.length === 3) {
        colorWithoutHash = colorWithoutHash
            .split("")
            .map(c => `${c}${c}`)
            .join("")
    }

    const getColorChannel = substring => {
        let colorChannel = parseInt(substring, 16) + amount
        colorChannel = Math.max(Math.min(255, colorChannel), 0).toString(16)

        if (colorChannel.length < 2) {
            colorChannel = `0${colorChannel}`
        }

        return colorChannel
    }

    const red = getColorChannel(colorWithoutHash.substring(0, 2))
    const green = getColorChannel(colorWithoutHash.substring(2, 4))
    const blue = getColorChannel(colorWithoutHash.substring(4, 6))

    return `#${red}${green}${blue}`
}

function generateColor(){
    colorContainer.innerHTML = '';
    let amount = 0;
    let color = hexInput.value;
    if(color.replace('#','').length != 3 && color.replace('#','').length != 6){
        alert("Hex length should be 3 or 6");
        return;
    }
    hexInput.value = '';
    for(let i=0; i<20; i++){
        let colorResult = lightenDarkenColor(color, amount);
        let colorDiv = document.createElement('div');
        colorDiv.classList.add('color');
        let innerTextDiv = document.createElement('div');
        innerTextDiv.classList.add('innerText')
        innerTextDiv.innerHTML = colorResult;
        colorDiv.appendChild(innerTextDiv);
        colorDiv.style.backgroundColor = colorResult;
        colorContainer.appendChild(colorDiv)

        amount += 10;
    }


}

colorContainer.addEventListener("click", function () {
    if(event.target.classList[0] === 'innerText'){
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(event.target);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        alert("Copied !")
    }
})

hexInput.addEventListener('keyup',function () {
    if(event.keyCode == 13){
        generateColor();
    }
})

document.addEventListener("scroll", function () {
    if(window.scrollY > 100){
        document.querySelector('.upper').classList.add('active');
    }else{
        document.querySelector('.upper').classList.remove('active');
    }
})

document.querySelector('.upper').addEventListener('click', function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})

