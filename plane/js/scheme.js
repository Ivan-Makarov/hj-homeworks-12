'use strict'

const showSchemeBtn = document.getElementById('btnSeatMap');
const seatMap = document.getElementById('seatMapDiv');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');

function resetTotals() {
    totalAdult.textContent = 0;
    totalHalf.textContent = 0;
    totalPax.textContent = 0;
}

showSchemeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const plane = document.getElementById('acSelect').value;

    getPlaneData(plane)
        .then(data => {
            showScheme(data)
        })
        .then(activateSeats)
});

function getPlaneData(plane) {
    return fetch(`https://neto-api.herokuapp.com/plane/${plane}`)
        .then(response => {
            // console.log(response);
            return response.json()
        })
        .catch(err => {
            console.warn(err);
        });
}

function showScheme(data) {
    resetTotals();
    activateBtnSetEmpty();
    activateBtnSetFull();

    while (seatMap.hasChildNodes()) {
        seatMap.removeChild(seatMap.firstChild);
    }

    const seatMapTitle = document.getElementById('seatMapTitle');
    seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;

    data.scheme.forEach(createRow);

    function createRow(seatsInRow, number) {
        const row = document.createElement('div');
        row.className = 'row seating-row text-center';

        const rowNumber = document.createElement('div');
        rowNumber.className = 'col-xs-1 row-number';

        const rowNumberValue = document.createElement('h2');
        rowNumberValue.textContent = number + 1;

        rowNumber.appendChild(rowNumberValue);
        row.appendChild(rowNumber);

        const rowLeft = document.createElement('div');
        const rowRight = document.createElement('div');
        rowLeft.className = 'col-xs-5';
        rowRight.className = 'col-xs-5';

        const emptySeat = document.createElement('div');
        emptySeat.className = 'col-xs-4 no-seat';

        const seatNode = document.createElement('div');
        seatNode.className = 'col-xs-4 seat'

        const seatLabelNode = document.createElement('span');
        seatLabelNode.className = 'seat-label';

        switch(seatsInRow) {
            case 0:
                for (let i = 0; i <= 2; i++) {
                    rowLeft.appendChild(emptySeat.cloneNode());
                    rowRight.appendChild(emptySeat.cloneNode());
                }
                break;
            case 4:
                rowLeft.appendChild(emptySeat.cloneNode());
                for (let i = 0; i <= 3; i++) {
                    const seat = seatNode.cloneNode();
                    const seatLabel = seatLabelNode.cloneNode();
                    seatLabel.textContent = data.letters4[i];
                    seat.appendChild(seatLabel)
                    i <= 1 ? rowLeft.appendChild(seat) : rowRight.appendChild(seat);
                }
                rowRight.appendChild(emptySeat.cloneNode());
                break;
            case 6:
                for (let i = 0; i <= 5; i++) {
                    const seat = seatNode.cloneNode();
                    const seatLabel = seatLabelNode.cloneNode();
                    seatLabel.textContent = data.letters6[i];
                    seat.appendChild(seatLabel)
                    i <= 2 ? rowLeft.appendChild(seat) : rowRight.appendChild(seat);
                }
                break;
            default:
                break;
        }
        row.appendChild(rowLeft);
        row.appendChild(rowRight);
        seatMap.appendChild(row)
    }
}


function activateSeats() {
    const seats = [...document.querySelectorAll('.seat')];
    seats.forEach(seat => {
        seat.addEventListener('click', toggleSeat);

        function toggleSeat(e) {
            if (e.altKey && !e.currentTarget.classList.contains('adult')) {
                e.currentTarget.classList.add('half')
            } else if (e.currentTarget.classList.contains('half')) {
                e.currentTarget.classList.remove('half')
            }
            else if (!e.currentTarget.classList.contains('half')) {
                e.currentTarget.classList.toggle('adult')
            }

            updateTotals()
        }

        function updateTotals() {
            const ta = [...document.querySelectorAll('.seat.adult')].length;
            const th = [...document.querySelectorAll('.seat.half')].length;
            const tx = ta + th;

            totalAdult.textContent = ta;
            totalHalf.textContent = th;
            totalPax.textContent = tx;
        }
    });
}

function activateBtnSetEmpty() {
    btnSetEmpty.addEventListener('click', (e) => {
        e.preventDefault();
        resetTotals();
        const seats = [...document.querySelectorAll('.seat')];
        seats.forEach(seat => {
            seat.classList.remove('adult');
            seat.classList.remove('half');
        })
    });
}

function activateBtnSetFull() {
    btnSetFull.addEventListener('click', (e) => {
        e.preventDefault();
        const seats = [...document.querySelectorAll('.seat')];
        seats.forEach(seat => {
            if (!seat.classList.contains('adult') && !seat.classList.contains('half')) {
                seat.click()
            }
        })
    });
}
