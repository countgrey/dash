let headers; // Глобальная переменная для хранения заголовков таблицы

sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

range = '2024 год!C34:H37';
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

function fetchDataAndBuildTable() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            buildTable(data); // Передача данных для построения таблицы
            headers = data.values[0]; // Сохраняем заголовки таблицы
            const totalServices = calculateTotalServices(data); // Вычисление суммы всех коммунальных услуг
            drawPieChart(data, headers, totalServices); // Рисование круговой диаграммы
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function buildTable(data) {
    const container = document.getElementById('table-container-komunal');
    const table = document.createElement('table');

    // Новые заголовки для таблицы
    const headers = ["Объект", "Водоотвод", "ТКО", "Отопление", "Эл. энергия", "Итого"];

    // Создание заголовка таблицы
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Начинаем с i = 1, чтобы пропустить первую строку с заголовками
    for (let i = 1; i < data.values.length; i++) {
        const rowData = data.values[i];
        const row = document.createElement('tr');

        rowData.forEach((cellData, index) => {
            const cell = document.createElement('td');
            // Преобразование чисел
            const value = cellData.replace(/\s/g, '').replace(',', '.');
            // Сокращение чисел до тысячи
            if (!isNaN(value)) {
                const formattedValue = parseFloat(value) >= 1000 ? (parseFloat(value) / 1000).toFixed(0) + ' тыс.' : value;
                cell.textContent = formattedValue;
            } else {
                cell.textContent = value; // Оставляем как есть, если не число
            }
            row.appendChild(cell);
        });

        table.appendChild(row);
    }

    container.appendChild(table);
}

function calculateTotalServices(data) {
    // Индексы столбцов с коммунальными услугами
    const serviceColumns = [1, 2, 3, 4];
    let total = 0;

    for (let i = 1; i < data.values.length; i++) {
        const rowData = data.values[i];
        serviceColumns.forEach(columnIndex => {
            const value = rowData[columnIndex].replace(/\s/g, '').replace(',', '.');
            if (!isNaN(value)) {
                total += parseFloat(value);
            }
        });
    }

    return total;
}

function drawPieChart(data, headers, totalServices) {
    const pieContainer = document.createElement('div');
    pieContainer.id = 'pie-komunal';
    pieContainer.style.width = '50%'; // Установка ширины контейнера для диаграммы
    document.body.appendChild(pieContainer);

    // Получение данных для диаграммы
    const categories = ["Водоотведение", "Вывоз ТКО", "Теплоэнергия", "Электроэнергия"];
    const seriesData = categories.map(category => {
        const index = headers.indexOf(category);
        const sum = data.values.slice(1).reduce((total, row) => {
            const value = row[index];
            // Проверяем, что значение не равно undefined и не пустое
            if (value !== undefined && value.trim() !== "") {
                return total + parseFloat(value.replace(/\s/g, '').replace(',', '.'));
            } else {
                return total;
            }
        }, 0);
        return { name: category, y: sum };
    });

    // Рисование круговой диаграммы Highcharts
    Highcharts.chart('pie-komunal', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        subtitle: {
            useHTML: true,
            text: `<span style="font-size: 14px; color: #999999">${formatNumber(totalServices)}</span>`,
            floating: true,
            verticalAlign: 'middle',
            y: 13,
            x: -85
        },
        plotOptions: {
            "pie": {
                "dataLabels": {
                    "style": {
                        "align": "center",
                        "color": "rgba(0,0,0,1)",
                        "fontSize": "14px",
                        "fontWeight": "bold",
                        "fontStyle": "normal",
                        "textOverflow": "none"
                    },
                    "enabled": false,
                    "distance": -12
                },
                "size": "100%",
                "innerSize": "60%",
                "showInLegend": true,
                "animation": false,
                "borderWidth": 0
            }
        },
        legend: {
            "enabled": true,
            "align": "right",
            "verticalAlign": "middle",
            "layout": "vertical",
            "itemStyle": {
                "align": "center",
                "color": "rgba(255,255,255,1)",
                "fontSize": "16px",
                "fontWeight": "normal",
                "fontStyle": "normal"
            },
            "itemMarginTop": 1.5,
            "useHTML": true
        },
        series: [{
            name: 'Коммунальные услуги',
            colorByPoint: true,
            data: seriesData
        }]
    });
}

function formatNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + ' тыс.';
    } else {
        return number.toString();
    }
}

fetchDataAndBuildTable();
