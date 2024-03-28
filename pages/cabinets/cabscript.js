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

function drawCabinets(classrooms, floor) {
    var locationsAndTypes = {
        101: {location: [600, 400], type: "Поточный"},
        102: {location: [500, 450], type: "Обычный"},
        104: {location: [350, 450], type: "Компьютерный"},
        105: {location: [300, 450], type: "Компьютерный"},
        106: {location: [200, 400], type: "Поточный"},
        107: {location: [300, 350], type: "Компьютерный"}
    };

    classrooms.forEach(classroom => {
        classroom.location = locationsAndTypes[classroom.number].location;
        classroom.type = locationsAndTypes[classroom.number].type;
    });

    var map = document.getElementById('map');
    var tooltip = document.getElementById('tooltip');

    classrooms.forEach(function(classroom) {
        var room = document.createElement('div');
        room.className = 'room';
        room.style.left = classroom.location[0] + 'px';
        room.style.top = classroom.location[1] + 'px';
        room.style.backgroundColor = getColor(classroom.students, classroom.capacity);
        room.innerText = classroom.number;
        if (classroom.type === 'Компьютерный') {
            room.classList.add('computer-room');
        }
        if (classroom.type === 'Поточный') {
            room.classList.add('stream-room');
        }
        room.addEventListener('mouseover', function() {
            tooltip.innerHTML = `Кабинет №${classroom.number}<br>Тип: ${classroom.type}<br>Вместимость: ${classroom.capacity}<br>Сейчас в кабинете: ${classroom.students} студентов<br>Группы: ${classroom.groups.join(', ')}`;
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
