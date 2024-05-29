let classrooms_ = void 0;
let dataClassrooms = void 0;
let curFloor = 1;

async function LoadMoreCabinetsData() {
    const url = 'http://localhost:5000/getClassroomsData';
    const dataNOW = await fetch(url);
    return dataNOW.json();
}

async function LoadCabinetsData() {
    const dataShit = await fetch("./myAss.json");
    const fuck = await dataShit.json();
    return fuck["floor"];
}

async function drawCabinets(floor) {
    if (classrooms_ === undefined) {
        console.log("Loading Classrooms");
        classrooms_ = await LoadCabinetsData();
    }

    if (dataClassrooms === undefined) {
        console.log("loading more things");
        dataClassrooms = await LoadMoreCabinetsData();
    }

    let classrooms = classrooms_[floor - 1];

    const map = document.getElementById('map');
    const tooltip = document.getElementById('tooltip');

    if (classrooms !== undefined) {
        // Actual user screen dimensions
        const deviceWidth = window.screen.width;
        const deviceHeight = window.screen.height;

        // Window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate percentage to reduce classrooms
        const neededWidth = windowWidth / deviceWidth;
        const neededHeight = windowHeight / deviceHeight;

        classrooms.forEach(function(classroom) {
            let curPara = 0;
            // TODO: Get info about the current period
            if (classroom.cabinet === dataClassrooms[curPara][0].classroom) {
                classroom.groups = dataClassrooms[curPara][0].group;
                classroom.students = dataClassrooms[curPara][0].present;
            }
            const room = document.createElement('div');
            room.className = 'room';
            room.style.left = (classroom.location[0] * neededWidth) + 'px';
            room.style.top = (classroom.location[1] * neededHeight) + 'px';
            room.style.backgroundColor = getColor(classroom.students, classroom.capacity);
            room.innerText = classroom.cabinet;
            if (classroom.type === 'Компьютерный') {
                room.classList.add('computer-room');
            }
            if (classroom.type === 'Поточный') {
                room.classList.add('stream-room');
            }
            room.addEventListener('mouseover', function() {
                tooltip.innerHTML = `Кабинет №${classroom.cabinet}<br>Тип: ${classroom.type}<br>Вместимость: ${classroom.capacity}<br>Сейчас в кабинете: ${classroom.students} студентов<br>Группы: ${classroom.groups.join(', ')}`;
                tooltip.style.left = (classroom.location[0] + 40) + 'px';
                tooltip.style.top = (classroom.location[1] - 20) + 'px';
                tooltip.style.display = 'block';
            });
            room.addEventListener('mouseout', function() {
                tooltip.style.display = 'none';
            });
            map.appendChild(room);
        });
    }

    function getColor(students, capacity) {
        const percentage = (students / capacity) * 100;
        if (percentage < 25) {
            return 'green';
        } else if (percentage < 50) {
            return 'lightgreen';
        } else if (percentage < 75) {
            return 'yellow';
        } else if (percentage < 90) {
            return 'orange';
        } else {
            return 'red';
        }
    }
}

drawCabinets(curFloor);

document.addEventListener('DOMContentLoaded', function() {
    function setActiveFloor(floorNumber) {
        // Remove active class from all floor numbers
        document.querySelectorAll('.floor-number').forEach(function(element) {
            element.classList.remove('active');
        });

        // Add active class to the specified floor number
        const activeElement = document.querySelector(`.floor-number[data-floor="${floorNumber}"]`);
        if (activeElement) {
            activeElement.classList.add('active');
        }

        // Update the current floor and redraw the cabinets
        curFloor = floorNumber;
        while (map.firstChild) {
            map.removeChild(map.lastChild);
        }
        drawCabinets(floorNumber);
    }

    function setActivePair(pairNumber) {
        // Remove active class from all pair numbers
        document.querySelectorAll('.pair-number').forEach(function(element) {
            element.classList.remove('active');
        });

        // Add active class to the specified pair number
        const activeElement = document.querySelector(`.pair-number[data-pair="${pairNumber}"]`);
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }

    // Set initial active floor and pair
    setActiveFloor(1);
    setActivePair(1);

    // Event listener for floor numbers
    document.querySelectorAll('.floor-number').forEach(function(element) {
        element.addEventListener('click', function() {
            const floorNumber = parseInt(this.getAttribute('data-floor'));
            setActiveFloor(floorNumber);
        });
    });

    // Example interval for changing the active pair for demonstration
    let currentPair = 1;
    setInterval(() => {
        setActivePair(currentPair);
        currentPair = currentPair < 6 ? currentPair + 1 : 1;
    }, 3000);
});

window.addEventListener("resize", function() {
    drawCabinets(curFloor);
});
