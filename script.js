'use strict';

//<------------------------------------------------Global Variables-------------------->//
const movement = 140;
let marginbottom = 0;
let animation = null;

let array = [
    { id: 1, checked: false, floor: 1 },
    { id: 2, checked: false, floor: 1 },
    { id: 3, checked: false, floor: 1 }
];

let floor = [
    { floor: 1, checked: false },
    { floor: 1, checked: false },
    { floor: 2, checked: false },
    { floor: 3, checked: false },
    { floor: 4, checked: false }
];


//<-----------------------------------------------------Methods------------------------>//
const check = function (i) {
    const index = array.findIndex(x => x.id == i);
    array[index].checked = !array[index].checked;

    for (let el of array) {
        if (el.checked == true) {
            document.querySelector(`.elevator-${el.id}`).style.bottom = '0px';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.4';
            document.querySelector(`.elevator-${el.id}`).style.border = '1px solid red';
            document.querySelector(`.indicator-${el.id}`).innerHTML = `1`;
            el.floor = 1000000000000;
        } else {
            document.querySelector(`.elevator-${el.id}`).style.border = 'none';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.8';
            if (el.floor > array.length) {
                el.floor = 1;
            }
            else {
                el.floor = el.floor;
            }
        }
    }
};

const ElevatorMovments = function (i) {
    var closest = array.map(el => el.floor).reduce((prev, curr) => {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    console.log(closest);
    for (let el of array) {
        if (closest == el.floor && el.checked == false) {

            marginbottom = Number((el.floor - 1) * movement);
            let floor = Number(i);
            let distBtm = movement * (floor - 1);
            let mb = marginbottom;
                     
            marginbottom = distBtm;
            el.floor = floor;
            document.querySelector(`.elevator-${el.id}`).style.bottom = `${marginbottom}px`
            document.querySelector(`.indicator-${el.id}`).textContent = el.floor;
            
            // animation = setInterval(function () {
                
            //     if (marginbottom < distBtm) {
            //         marginbottom++;
            //         document.querySelector(`.elevator-${el.id}`).style.bottom = `${marginbottom}`;
                    
            //     }else if(marginbottom > distBtm){
            //         marginbottom--;
            //         document.querySelector(`.elevator-${el.id}`).style.bottom = `${marginbottom}px`;
            //     }
            //     el.floor = i;
            // },10);
            break;
        }
    }
};


