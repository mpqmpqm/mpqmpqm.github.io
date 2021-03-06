let xCoords = [];
let yCoords = [];
let field = document.querySelector(`svg`);
let forceRefreshCount = 0;
const body = document.querySelector(`body`);


function setField (){
    field.style.height = window.innerHeight;
    field.style.width = window.innerWidth;
}
// document.addEventListener (`mousemove`, showCoords);
// window.addEventListener (`click`, saveCoords);
window.addEventListener(`resize`, setField);
setField();

function showCoords(){
    console.log(event.clientX, event.clientY);
}

function saveCoords(){
    
    xCoords.push(event.clientX);
    yCoords.push(event.clientY);

    if (xCoords.length>1){
        console.log(slope.calc(xCoords[0], yCoords[0], xCoords[1], yCoords[1]));
        newLine([xCoords[0],yCoords[0],xCoords[1],yCoords[1]])
        xCoords = [];
        yCoords=[];
    }
    
}

function newLine (array){
    
    let line = document.createElement(`line`)
    
    line.setAttribute(`x1`, String((array[0]/window.innerWidth)*100) + `%`);
    line.setAttribute(`y1`, String((array[1]/window.innerHeight)*100) + `%`);
    line.setAttribute(`x2`, String((array[2]/window.innerWidth)*100) + `%`);
    line.setAttribute(`y2`, String((array[3]/window.innerHeight)*100) + `%`);

    field.append(line);
    forceRefresh();
}

function newLineCool(array){
    let line = document.createElement(`line`);

    line.setAttribute(`x1`, array[0]);
    line.setAttribute(`y1`, array[1]);
    line.setAttribute(`x2`, array[2]);
    line.setAttribute(`y2`, array[3]);


    field.append(line);
    
}


function forceRefresh (){
    let fieldCurrent = field.innerHTML;
    field.innerHTML = fieldCurrent;    
}

function drawCool () {
    
    let left = 0;
    let right = 100;
    let top = 0
    let bottom = 100;

    for (i=0; i<25; i++){
        newLineCool([left + `%`, top + `%`, right + `%`, bottom +`%`]);
        // left++;
        // right--;
        top+=4;
        bottom-=4;
    }

    top = 0;
    bottom = 100;

    left = 100;
    right = 0;

    for (i=0; i<25; i++){
        newLineCool([left + `%`, top + `%`, right + `%`, bottom +`%`]);
        left-=4;
        right+=4;
    }

    forceRefresh();


}

// function forceRefresh (){
//     if (forceRefreshCount%2==0){body.innerHTML+=`<div></div>`}
//     else {
//         let reactor = body.querySelector(`div`)
//         body.removeChild(reactor);
//     }
//     forceRefreshCount++;
// }


const slope = {
    calc: function (x1, y1, x2, y2){
        return -(y2-y1)/(x2-x1);
    },

    show: function (){
        console.log(this.calc);;
    }
}

drawCool();

const lines = Array.from(field.querySelectorAll(`line`));

function strokeSwitch (x){
    
    if (lines[x].zeroSwitch){
            lines[x].style.opacity = `1`;
            
            // if (getComputedStyle(lines[x]).stroke == `rgb(255, 0, 0)`){
            //     lines[x].style.stroke = `rgb(0, 0, 255)`;
            // }

            // else {
            //     lines[x].style.stroke = `rgb(255, 0, 0)`; 
            // }
    }

    else {
        lines[x].style.opacity = `0`;
    }

    lines[x].zeroSwitch = !lines[x].zeroSwitch;
}



setInterval(function(){
    if (document.getElementById(`canvas`).zeroSwitch){
        document.getElementById(`canvas`).style.backgroundColor = `rgb(255, 255, 255)`;
        lines.forEach(elem => {
            elem.style.stroke = `rgb(0, 0, 0)`
        })
        // getComputedStyle(document.querySelector(`line`)).style.stroke = `rgb(255, 255, 255)`
    }
    
    else{
        document.getElementById(`canvas`).style.backgroundColor = `rgb(0, 0, 0)`
        lines.forEach(elem => {
            elem.style.stroke = `rgb(255, 255, 255)`
        })
    }

    document.getElementById(`canvas`).zeroSwitch = !document.getElementById(`canvas`).zeroSwitch
},1400);

// setInterval(same, 1000, `yay`);
// setTimeout(setInterval, 1000, same, 1000, `ok`);

// let zeroSwitch = true;

for (let i = 0; i<50; i++){
    setTimeout(setInterval, 1000-i*20, strokeSwitch, 100, i);
    // setTimeout(setInterval, 0, colorSet.box1Set, 3000);
}

// undulateUp();
// setInterval(undulateUp, 1000, param);
// setTimeout(setInterval(undulateDown, 2000), 2000);

// setTimeout (undulateDown, 2000);
// setTimeout(setInterval(undulateDown, 1000), 1000);


// function undulateUp (){
//     let lines = Array.from(field.querySelectorAll(`line`));
    
//     lines.forEach(line => {line.style.strokeWidth = `5px`});
    
//     // while (strokeWidth <=  
// }

// function undulateDown(){
//     let lines = Array.from(field.querySelectorAll(`line`));
    
//     lines.forEach(line => {line.style.strokeWidth = `.2px`});
// }

console.log(lines.length);
