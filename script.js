'use strict';

//<------------------------------------------------Global Variables-------------------->//
let floors = prompt("Enter number of floor your system has!", 5);
let numElevators = prompt("Enter the number of Elevators your System has!", 3);

let maxHeight = Number(floors) * 90;
let positionBtm = 0;
let animate = null;
let el;
let Elevators = [];



//<-----------------------------------------------------Methods------------------------>//
document.querySelector('.container-main').innerHTML = '';

const displayElevators = function () {
    for (let i = 1; i <= numElevators; i++) {
        let html = `<div class="subBlock">
            <div class="block--${i} blocks" style="height:${maxHeight}px">
                <div class="elevator-${i} el" >
                    <span class="indicator-${i}">1</span>
                    <div class="doors">
                    <div class="left-door left-door--${i}"></div>
                    <div class="right-door right-door--${i}"></div>
                    </div>
                </div>
            </div>
            <label class="switch">
                <input type="checkbox" class=" switchs switch-${i}" onchange="check('${i}')">
                <span class="slider round"></span>
            </label>
        </div>`;
        Elevators.push({ id: i, lift: i, checked: false, floor: 1, moving: false });
        document.querySelector('.container-main').insertAdjacentHTML("beforeend", html);
    }
    document.querySelector('.container-main').insertAdjacentHTML("beforeend", `<div class="block-buttons"></div>`);
    document.querySelector(`.block-buttons`).style.height = `${maxHeight}px`;
    for (let i = floors; i >= 1; i--) {
        let html;
        if (i == 1) {
            html = `<div class="floor-${i} floor">
            <div class="floorNo ${i}"><span>${i}</span></div>
            <button class="btns btn-${i}-up" onclick="btnUp(${i})">
                <div class="upSide"></div>
            </button>
        </div>`;
        }
        else if (i == floors) {
            html = `<div class="floor-${i} floor">
            <div class="floorNo ${i}"><span>${i}</span></div>
          <button class="btns btn-${i}-dwn" onclick="btnDown(${i})">
            <div class="downSide"></div>
          </button>
        </div>`;
        }
        else {
            html = `<div class="floor-${i} floor">
            <div class="floorNo ${i}"><span>${i}</span></div>
            <button class="btns btn-${i}-Up" onclick="btnUp(${i})">
                <div class="upSide"></div>
            </button>
          <button class="btns btn-${i}-dwn" onclick="btnDown(${i})">
            <div class="downSide"></div>
          </button>
        </div>`;
        }
        document.querySelector('.block-buttons').insertAdjacentHTML("afterbegin", html);
    }
    document.querySelector(`.block-buttons`).insertAdjacentHTML("afterbegin", `<div class="maintenance"><span >MAINTENANCE</span></div>`);
}
displayElevators();



const check = function (i) {
    const index = Elevators.findIndex(x => x.id == i);
    Elevators[index].checked = !Elevators[index].checked;

    for (let el of Elevators) {
        if (el.checked == true) {
            clearInterval(animate);
            el.moving = false;
            document.querySelector(`.elevator-${el.id}`).style.bottom = '0px';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.4';
            document.querySelector(`.elevator-${el.id}`).style.border = '1px solid red';
            document.querySelector(`.indicator-${el.id}`).innerHTML = `1`;
            el.floor = 1000000000000;
        } else {
            document.querySelector(`.elevator-${el.id}`).style.border = 'none';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.8';
            if (el.floor > Elevators.length) {
                el.floor = 1;
            }
            else {
                el.floor = el.floor;
            }
        }
    }
};

const ElevatorMovments = function (Elevators, i) {
    let closeEL = Elevators.map(el => el.floor).reduce((prev, curr) => {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    el = Elevators.findIndex(el => el.floor === closeEL);
    let lift = Elevators[el];

    if (closeEL === lift.floor && !lift.checked) {
        animate = null;
        positionBtm = (lift.floor - 1) * 90;
        let distBtm = 90 * (i - 1);
        let tempFloorBtm = positionBtm;
        let tempFloor = lift.floor;

        lift.floor = i;

        // console.log(lift.floor);

        clearInterval(animate);
        animate = setInterval(function () {
            if (positionBtm == distBtm) {

                lift.moving = false;
                clearInterval(animate);

            } else {
                lift.moving = true;
                if (positionBtm < distBtm) {
                    if (tempFloorBtm === positionBtm) {
                        tempFloorBtm += 90;
                        tempFloor++;
                        document.querySelector(`.indicator-${lift.id}`).innerHTML = tempFloor;
                    }
                    positionBtm++;
                    document.querySelector(`.elevator-${lift.id}`).style.bottom = `${positionBtm}px`;

                } else {

                    if (tempFloorBtm === positionBtm) {
                        tempFloorBtm -= 90;
                        tempFloor--;
                        document.querySelector(`.indicator-${lift.id}`).innerHTML = tempFloor;
                    }
                    positionBtm--;
                    document.querySelector(`.elevator-${lift.id}`).style.bottom = `${positionBtm}px`;
                }
            }
        }, 10);

    }
};

const btnUp = function (i) {
    let elevators; 
    for(let el of Elevators){
        if(el.floor < i){
            let index = Elevators.indexOf(el);
            elevators = Elevators.slice().splice(index, 1);
        }
        else {
            elevators = Elevators;
        }
    }
    ElevatorMovments(elevators, i);
}

const btnDown = function (i) {
    let elevators; 
    for (let el of Elevators) {
        if (el.floor < i) {
            let index = Elevators.indexOf(el);
            elevators = Elevators.slice().splice(index, 1);
        }
        else{
            elevators = Elevators;
        }
        
    }
    ElevatorMovments(elevators, i);
}