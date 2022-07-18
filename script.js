'use strict';

const subBlock = document.querySelector('.subBlock');

const block1 = document.querySelector('.block--1');
const elevator1 = document.querySelector('.elevator1');
const switch1 = document.querySelector('.switch-1');

const block2 = document.querySelector('.block--2');
const elevator2 = document.querySelector('.elevator2');
const switch2 = document.querySelector('.switch-2');

const block3 = document.querySelector('.block--3');
const elevator3 = document.querySelector('.elevator3');
const switch3 = document.querySelector('.switch-3');

// ------------------------------------------------Global Variables---------------------//
let marginbottom = 0;
let margintop = 580;
let movement = 145;
let animation = null;

let array = [
    { id: 1, Elevator: 1, checked: false, floor: 0 },
    { id: 2, Elevator: 2, checked: false, floor: 0 },
    { id: 3, Elevator: 3, checked: false, floor: 0 }
];

let floor = [
    { floor: 0, checked: false },
    { floor: 1, checked: false },
    { floor: 2, checked: false },
    { floor: 3, checked: false },
    { floor: 4, checked: false }
];


// -----------------------------------------------------Methods-------------------------//
const ElevatorMovments = function (i) {
    var closest = array.map(el => el.floor).reduce(function (prev, curr) {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    for (let el of array) {
        if (closest == el.floor && el.checked == false) {
            // for (let id = el.id; id >= el.id; id--) {
            marginbottom = Number(movement * i);
            console.log(marginbottom);
            margintop = 725 - marginbottom;
            var posbtm = Number(movement * el.floor);
            var postop = 725 - posbtm;
            let n = el.floor + 1;
            let pb = posbtm;
            let pt = postop;

            clearInterval(animation);
            animation = setInterval(frame, 10);

            function frame() {
                if (postop == margintop || posbtm == marginbottom) {
                    if (posbtm == marginbottom) {
                        if (pt == posbtm) {
                            pt += 145;
                            document.querySelector(`.indicator${el.id}`).textContent = `${n}`;
                            n++;
                        } else {
                            if (pb == postop) {
                                pb += 145;
                                n--;
                                document.querySelector(`.indicator${el.id}`).textContent = `${n}`;
                            }
                        }
                    }
                    clearInterval(animation);
                } else {
                    if (postop > margintop) {
                        if (pb == posbtm) {
                            pb += 145;
                            document.querySelector(`.indicator${el.id}`).textContent = `${n}`;
                            n++;
                        }
                        postop--;
                        posbtm++;
                        document.querySelector(`.elevator${el.id}`).style.maarginTop = `${postop}px`;
                        document.querySelector(`.elevator${el.id}`).style.marginBottom = `${posbtm}px`;

                    }
                    else {
                        if (pt == postop) {
                            pt += 145;
                            n--;
                            document.querySelector(`.indicator${el.id}`).textContent = `${n}`;
                        }
                        postop++;
                        posbtm--;

                        document.querySelector(`.elevator${el.id}`).style.maarginTop = `${postop}px`;
                        document.querySelector(`.elevator${el.id}`).style.marginBottom = `${posbtm}px`;

                    }
                    array[el.id - 1].floor = i;
                }
            }
            // }
            break;
        }
    };
};

const check = function (i) {
    const index = array.findIndex(x => x.id == i);
    array[index].checked = !array[index].checked;
    // maintainance();
        if (array[index].checked == true) {
            document.querySelector(`.elevator${array[index].id}`).style.marginTop = '580px';
            document.querySelector(`.elevator${array[index].id}`).style.marginBottom = '0';
            document.querySelector(`.elevator${array[index].id}`).style.opacity = '0.3';
            document.querySelector(`.elevator${array[index].id}`).style.border = '2px solid red';
            document.querySelector(`.el${array[index].id}`).value = `1`;
            array[index].floor = 100;
            //break
        } else {
            document.querySelector(`.elevator${array[index].id}`).style.border = 'none';
            document.querySelector(`.elevator${array[index].id}`).style.opacity = '0.8';
            if (array[index].floor > 5) {
                array[index].floor = 1;
            }
            else {
                array[index].floor = array[index].floor;
            }
        }
};

// const maintainance = function () {
   
// };