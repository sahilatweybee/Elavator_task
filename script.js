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
let call = 0;
let marginbottom = 0;
let margintop = 740;
let margin = 148;

let animation = null;
let animationDoors = null;

let array = [
    { id: 1, Elevator: 1, checked: false, floor: 1 },
    { id: 2, Elevator: 2, checked: false, floor: 1 },
    { id: 3, Elevator: 3, checked: false, floor: 1 }
];

let floor = [
    { floor: 1, checked: false },
    { floor: 2, checked: false },
    { floor: 3, checked: false },
    { floor: 4, checked: false },
    { floor: 5, checked: false }
];


// -----------------------------------------------------Methods-------------------------//
const ElevatorMovments = function (i) {
    
};

const btnUp = function(i){

    liftMovments(i);
};

const btnDown = function(i){
    liftMovments(i);
};

const check = function(i){
    const index = array.findIndex(x => x.id == i);
    array[index].checked = !array[index].checked;
}