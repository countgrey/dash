let cabinetData = 
{
    "floor" : [
      [
        {"cabinet" : 101, "location": [600, 350], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 102, "location": [500, 450], "type": "Обычный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 104, "location": [370, 450], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 105, "location": [300, 350], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 106, "location": [170, 350], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 107, "location": [300, 350], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
      ],
      [
        {"cabinet" : 201, "location": [900, 350], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 202, "location": [200, 450], "type": "Обычный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 204, "location": [470, 450], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 205, "location": [600, 350], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 206, "location": [270, 350], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 207, "location": [800, 350], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
      ],
      [
        {"cabinet" : 301, "location": [900, 450], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 302, "location": [500, 550], "type": "Обычный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 304, "location": [470, 950], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 305, "location": [700, 450], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 306, "location": [970, 350], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 307, "location": [300, 650], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
      ],
      [
        {"cabinet" : 401, "location": [100, 350], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 402, "location": [800, 350], "type": "Обычный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 404, "location": [370, 850], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 405, "location": [300, 250], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 406, "location": [170, 450], "type": "Поточный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
        {"cabinet" : 407, "location": [300, 150], "type": "Компьютерный", "capacity": 30, "students": 15, "groups": ["3са3", "10бу5"]},
      ]
    ]
    
}

fetch('myAss.json')
  .then(response => response.json())
  .then(data => {
    // Work with the JSON data here
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

/*
function getClassrooms() {
    return fetch('http://127.0.0.1:5000/classrooms')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }
            return response.json();
        })
        .then(data => data.classrooms)
        .catch(error => {
            console.error('Произошла ошибка:', error);
            return [];
        });
}

getClassrooms()
    .then(classrooms => {
        drawCabinets(classrooms, 1);
    });
*/

//console.log(cabinetData["floor"])

drawCabinets(cabinetData["floor"], 1)

function drawCabinets(classrooms, floor) {
    classrooms = classrooms[floor -1];
    
    var map = document.getElementById('map');
    var tooltip = document.getElementById('tooltip');

    classrooms.forEach(function(classroom) {
        var room = document.createElement('div');
        room.className = 'room';
        room.style.left = classroom.location[0] + 'px';
        room.style.top = classroom.location[1] + 'px';
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


document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.floor-btn');
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var floorNumber = parseInt(this.getAttribute('data-floor'));
            //console.log(floorNumber)
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
    drawCabinets(cabinetData["floor"], floorNumber);
}
