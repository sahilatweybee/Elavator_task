'use strict';

//<------------------------------------------------Global Variables-------------------->//
const movement = 140;
let marginbottom = 0;
let margintop;
let animation = null;
let destBtm;
let destTop;

let array = [
    { id: 1, checked: false, floor: 1 },
    { id: 2, checked: false, floor: 1 },
    { id: 3, checked: false, floor: 1 }
];

let floor = [
    { floor: 1, checked: false },
    { floor: 2, checked: false },
    { floor: 3, checked: false },
    { floor: 4, checked: false },
    { floor: 5, checked: false }
];


//<-----------------------------------------------------Methods------------------------>//
const check = function (i) {
    const index = array.findIndex(x => x.id == i);
    array[index].checked = !array[index].checked;

    for (let el of array) {
        if (el.checked == true) {
            document.querySelector(`.elevator-${el.id}`).style.marginTop = '560px';
            document.querySelector(`.elevator-${el.id}`).style.marginBottom = '0px';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.4';
            document.querySelector(`.elevator-${el.id}`).style.border = '1px solid red';
            document.querySelector(`.indicator-${el.id}`).innerHTML = `G`;
            el.floor = 1;
        } else {
            document.querySelector(`.elevator-${el.id}`).style.border = 'none';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.8';
            if (el.floor > 4) {
                el.floor = 1;
            }
            else {
                el.floor = el.floor;
            }
        }
    }
};

const ElevatorMovments = function (i) {
    var closest = array.map(el => el.floor).reduce(function (prev, curr) {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    console.log(closest);
    for (let el of array) {
        if (closest == el.floor && el.checked == false) {
            marginbottom = Number(el.floor * movement);
            margintop = 700 - marginbottom;
            let floor = i;
            destBtm = movement * floor;
            destTop = 700 - destBtm;
            frame(closest);
            // console.log("current", margintop, marginbottom, "\ndestination", destTop, destBtm);
        }
    }
};

function frame(elevator) {
    if (destBtm > marginbottom && destTop < margintop) {
        while (marginbottom < destBtm) {
            document.querySelector(`.elevator-${elevator.id}`).style.marginBottom = `${marginbottom}px`;
            document.querySelector(`.elevator-${elevator.id}`).style.marginTop = `${margintop}px`;
            ++marginbottom;
            --margintop;
        }
    }
}