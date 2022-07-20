'use strict';

//<------------------------------------------------Global Variables-------------------->//
let maxHeight = 700;
let positionBtm = 0;
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
    var closeEL = array.map(el => el.floor).reduce((prev, curr) => {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    for (let el of array) {
        if (closeEL == el.floor && el.checked == false) {

            positionBtm = Number((el.floor - 1) * 140);
            let distBtm = 140 * (i - 1);
            let pb = positionBtm;

            clearInterval(animation);
            animation = setInterval(move(), 3000);

            function move() {
                if (positionBtm == distBtm) {
                    clearInterval(animation);
                } else {
                    if (positionBtm < distBtm) {
                        positionBtm++;
                        document.querySelector(`.elevator-${el.id}`).style.bottom = `${positionBtm}px`;
                        if (pb == positionBtm) {
                            pb += 140;
                            document.querySelector(`.indicator-${el.id}`).innerHTML = el.floor;
                            el.floor++;
                        }
                    } else if (positionBtm > distBtm) {

                        positionBtm--;
                        document.querySelector(`.elevator-${el.id}`).style.bottom = `${positionBtm}px`;
                        if (pb == positionBtm) {
                            pb -= 140;
                            document.querySelector(`.indicator-${el.id}`).innerHTML = el.floor;
                            el.floor--;
                        }
                    }
                }
            }
            break;
        }
    }
};


