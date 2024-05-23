let classrooms_ = void 0;
let curFloor = 1;

async function LoadCabinetsData()
{
  url = 'http://localhost:5000/getClassroomsData';
  fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        console.log(data);    
    })
    .catch(error => console.error('Error fetching data:', error));

  const dataShit = await fetch("./myAss.json");
    const fuck = await dataShit.json();
    return fuck["floor"];
}

async function drawCabinets(floor) {

    if(classrooms_ === undefined)
    {
        console.log("Loading Classroms");
        classrooms_ = await LoadCabinetsData();
    }

    let classrooms = classrooms_[floor-1];

    var map = document.getElementById('map');
    var tooltip = document.getElementById('tooltip');

    if(classrooms !== undefined)
    {
        //РЕАЛЬНЫЕ размеры экрана пользователя
        let deviceWidth = window.screen.width;
        let deviceHeight = window.screen.height;

        //Размер окна
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        //Вычисляем процент на сколько уменьшить ебучие кабинеты
        let neededWidth = windowWidth / deviceWidth;
        let neededHeight = windowHeight / deviceHeight;

        classrooms.forEach(function(classroom) {
            var room = document.createElement('div');
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
        var percentage = (students / capacity) * 100;
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
    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var floorNumber = parseInt(this.getAttribute('data-floor'));
            //console.log(floorNumber)
            curFloor = floorNumber;
            changeFloor(floorNumber);
        });
    });
    changeFloor(1);
});

function changeFloor(floorNumber) {
    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active'); // Убираем класс active у всех кнопок
    });
    var button = document.querySelector('.floor-btn[data-floor="' + floorNumber + '"]');
    button.classList.add('active'); // Добавляем класс active к нажатой кнопке

    while (map.firstChild) {
        map.removeChild(map.lastChild);
    }
    drawCabinets(floorNumber);
}


window.addEventListener("resize", function() {
    changeFloor(curFloor);
});
