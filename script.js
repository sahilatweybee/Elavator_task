'use strict';

//<------------------------------------------------Global Variables-------------------->//
let maxHeight = 700;
let positionBtm = 0;


let Elevators = [
    { id: 1, checked: false, floor: 1, movingEL: false },
    { id: 2, checked: false, floor: 1, movingEL: false },
    { id: 3, checked: false, floor: 1, movingEL: false }
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
    const index = Elevators.findIndex(x => x.id == i);
    Elevators[index].checked = !Elevators[index].checked;

    for (let el of Elevators) {
        if (el.checked == true) {
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

const ElevatorMovments = function (i) {
    let animate = null;
    let closeEL = Elevators.map(el => el.floor).reduce((prev, curr) => {
        return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
    });
    for (let lift of Elevators) {
        if (closeEL == lift.floor && !lift.checked) {
            positionBtm = Number((lift.floor - 1) * 140);
            let distBtm = 140 * (i - 1);
            let tempFloorBtm = positionBtm;
            let tempFloor = lift.floor;
            clearInterval(animate);
            animate = setInterval(function () {
                if (positionBtm == distBtm && lift.movingEL == true) {
                    lift.movingEL = false;
                    // animateDoors = setInterval(function () {
                    //     if (doorPosition == 0) {
                    //         clearInterval(animateDoors);
                    //     } else {
                    //         doorPosition--;
                    //         doorLeft.style.left -= `${doorPosition}px`;
                    //         doorRight.style.right -= `${doorPosition}px`;
                    //     }
                    // }, 5);
                    clearInterval(animate);
                } else {

                    if (positionBtm < distBtm) {
                        lift.movingEL = true;
                        if (tempFloorBtm === positionBtm) {
                            lift.floor = i;
                            tempFloorBtm += 140;
                            tempFloor++;
                            document.querySelector(`.indicator-${lift.id}`).innerHTML = tempFloor;
                        }
                        positionBtm++;
                        document.querySelector(`.elevator-${lift.id}`).style.bottom = `${positionBtm}px`;

                    } else if (positionBtm > distBtm) {
                        lift.movingEL = true;
                        if (tempFloorBtm === positionBtm) {
                            lift.floor = i;
                            tempFloorBtm -= 140;
                            tempFloor--;
                            document.querySelector(`.indicator-${lift.id}`).innerHTML = tempFloor;
                        }
                        positionBtm--;
                        document.querySelector(`.elevator-${lift.id}`).style.bottom = `${positionBtm}px`;
                    }
                    lift.movingEL = false;
                }
            }, (Math.abs(i - lift.floor)));
            lift.floor = i;
            break;
        }
    }
};

const btnUp = function (i) {
    ElevatorMovments(i);
}

const btnDown = function (i) {
    ElevatorMovments(i);
}