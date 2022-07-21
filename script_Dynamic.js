'use strict';

const containerMain = document.querySelector('.container-main');
const containerEl = document.querySelector('.container-elevators');
const buttons = document.querySelector('.block-buttons');

//<------------------------------------------------Global Variables-------------------->//
let floors = prompt("Enter Number of Floors That the system has!");
let noOfEl = prompt("Enter Number of Elevators That the system has!");
let maxHeight;
let positionBtm = 0;
let animate = null;
let Elevators = [];
let floor = [];
let elevator = {
    id: 1,
    checked: false,
    floor: 1
};

//<-----------------------------------------------------View Methods------------------->//
for (let i = 0; i < Elevators; i++) {
    elevator = {
        id: i+1,
        checked: false,
        floor: i+1
    };
    Elevators.push(elevator);
}

let i=0;
while(i < floors) {
    buttons.innerHTML = '<div class="maintenance"><span>MAINTENANCE</span></div>';
    let htmlfloor;
    if (i == 0) {
        htmlfloor = `<div class="floor-${i + 1} floor">
                <div class="floorNo ${i + 1}"><span>${i + 1}</span></div>
                <button class="btns btn-${i + 1}-up" onclick="ElevatorMovments(${i + 1})">
                    <div class="upSide"></div>
                </button>
            </div>`;
       
    } else if (i == floors.length - 1) {
        htmlfloor = `<div class="floor-${i + 1} floor">
                <div class="floorNo ${i + 1}"><span>${i + 1}</span></div>
                <button class="btns btn-${i + 1}-dwn" onclick="ElevatorMovments(${i + 1})">
                    <div class="downSide"></div>
                </button>
            </div>`;
    } else {
        htmlfloor = `<div class="floor-${i + 1} floor">
                <div class="floorNo ${i + 1}"><span>${i + 1}</span></div>
                <button class="btns btn-${i + 1}-up" onclick="ElevatorMovments(${i + 1})">
                    <div class="upSide"></div>
                </button>
                <button class="btns btn-${i + 1}-dwn" onclick="ElevatorMovments(${i + 1})">
                    <div class="downSide"></div>
                </button>
            </div>`;
    }
    buttons.insertAdjacentHTML('beforeend', htmlfloor);
    i++;
}

const DisplayElevators = function (Elevators) {
    containerEl.innerHTML = '';

    Elevators.forEach(i => {
        let html = `<div class="subBlock">
                <div class="block--${i.id} blocks">
                    <div class="elevator-${i.id} el">
                        <div class="floor-no indicator-${i.floor}">${i.floor}</div>
                        <div class="doors">
                            <div class="door-left-${i.id} door"></div>
                            <div class="door-right-${i.id} door"></div>
                        </div>
                    </div>
                </div>
                <label class="switch">
                    <input type="checkbox" class=" switchs switch-${i.id}" onchange="check(${i.id})">
                    <span class="slider round"></span>
                </label>
            </div>`;
        containerEl.insertAdjacentElement('afterbegin', html);
    });
}
DisplayElevators(Elevators);
//<-----------------------------------------------------Methods------------------------>//
const check = function (i) {
    const index = Elevators.findIndex(x => x.id == i);
    Elevators[index].checked = !Elevators[index].checked;

    for (let el of Elevators) {
        if (el.checked == true) {
            document.querySelector(`.elevator-${el.id}`).style.bottom = '0px';
            document.querySelector(`.elevator-${el.id}`).style.opacity = '0.4';
            document.querySelector(`.elevator-${el.id}`).style.border = '3px solid red';
            document.querySelector(`.indicator-${el.id}`).textContent = `1`;
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

const ElevatorMovments = function (i) {
    var closeEL = Elevators.map(el => el.floor).reduce((prev, curr) => {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    for (let lift of Elevators) {
        if (closeEL == lift.floor && lift.checked == false) {

            positionBtm = Number((lift.floor - 1) * 140);
            let distBtm = 140 * (i - 1);
            let tempFloorBtm = positionBtm;
            animate = setInterval(function () {
                if (positionBtm == distBtm) {
                    clearInterval(animate);
                } else {

                    if (positionBtm < distBtm) {
                        if (tempFloorBtm == positionBtm) {
                            tempFloorBtm += 140;
                            lift.floor++;
                            document.querySelector(`.indicator-${lift.id}`).textContent = lift.floor;
                        }
                        positionBtm++;
                        document.querySelector(`.elevator-${lift.id}`).style.bottom = `${positionBtm}px`;

                    } else {
                        if (tempFloorBtm == positionBtm) {
                            tempFloorBtm -= 140;
                            lift.floor--;
                            document.querySelector(`.indicator-${lift.id}`).textContent = lift.floor;
                        }
                        positionBtm--;
                        document.querySelector(`.elevator-${lift.id}`).style.bottom = `${positionBtm}px`;

                    }
                }
            }, (Math.abs(i - lift.floor) * 5));
        }
        break;
    }
};


