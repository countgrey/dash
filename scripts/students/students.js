function getStudentsData()
{
        const sheetId = '1gkRFEOa0eiXl2o99LuzKU5G_d7xIkAMhfyCbYvIMDg0';

        const apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

        let range = 'Sheet1!C1:F64';
        if (localStorage.getItem("isAuthorized") === "true") {
            range = 'Sheet1!C1:j64';
            document.addEventListener('DOMContentLoaded', function() {
                document.querySelectorAll('th').forEach(th => {
                    th.removeAttribute('style');
                    th.style.fontSize = '20px';
                });
            });
        
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        var series_ = [];

        fetch(url)
    .then(response => response.json())
    .then(data => {
        var tableBody = document.querySelector('#studentsTable tbody');

        // Очищаем содержимое таблицы перед заполнением новыми данными
        tableBody.innerHTML = '';

        for (var i = 1; i < data.values.length; i++) {
            var row = document.createElement('tr');
            var rowData = data.values[i];

            // Создаем ячейки для каждого столбца данных
            for (var j = 0; j < rowData.length; j++) {
                var cell = document.createElement('td');
                cell.textContent = rowData[j];
                row.appendChild(cell);
            }

            // Добавляем строку в таблицу
            tableBody.appendChild(row);
        }
        
        hideChartTrobbler();

    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });



        fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data);

                var groups = [];
                var commercials = [];
                var budget = []

                for (var i = 1; i < data.values.length; i++)
                {
                    groups.push(data.values[i][0]);
                    commercials.push(data.values[i][3]);
                    budget.push(data.values[i][2]);
                }

                var divisions = 
                {
                    "б" : "Экономическое",
                    "п" : "IT",
                    "с" : "IT",
                    "в" : "IT",
                    "и" : "IT",
                    "м" : "Креативное",
                    "р" : "Креативное",
                    "а" : "Креативное",
                    "д" : "Креативное"
                    
                };

                var economCountBud = 0;
                var itCountBud = 0;
                var creativeCountBud = 0;
                var economCountCom = 0;
                var itCountCom = 0;
                var creativeCountCom = 0;

                for (var i = 0; i < groups.length; i++)
                {
                    var grp = groups[i];
                    var countOfBud = parseInt(budget[i]);
                    var countOfCom = parseInt(commercials[i]);
                    var name_ = grp.split("");
                    var division = divisions[name_[1]];
                    
                    switch (division)
                    {
                        case "Экономическое":
                            economCountBud += countOfCom;
                            economCountCom += countOfBud;
                            break;
                        case "IT":
                            itCountBud += countOfBud;
                            itCountCom += countOfCom;
                            break;
                        case "Креативное":
                            creativeCountBud += countOfBud;
                            creativeCountCom += countOfCom;
                            break;
                    }
                }
                var allBud = economCountBud + itCountBud + creativeCountBud;
                var allCom = economCountCom + itCountCom + creativeCountCom;
                var totalStudents = allBud + allCom;
                document.getElementById('totalStudents').innerText = allBud + allCom;
                document.getElementById('budgetStudents').innerText = allBud;
                document.getElementById('commercialStudents').innerText = allCom;

                var series_ = [{
                                name: 'Количество',
                                data: [
                                {
                                    name: 'Бюджет',
                                    y: allBud
                                },
                                {
                                    name: 'Коммерция',
                                    y: allCom
                                }
                                ]
                            }];
                function getSubtitle() {
    
                return `<span style="font-size: 2.5vmin">${totalStudents}</span>`}
                
                var chart1 = Highcharts.chart('studentsPie', {
    chart: {
        renderTo: 'studentsPie',
        type: "pie",
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    title: {
        text: "",
        
    },
    credits:
    {
        enabled: false
    },
    subtitle: {
            useHTML: true,
            text: getSubtitle(),
            floating: true,
            verticalAlign: 'middle',
            y: -8
        },
    xAxis: {
        type: 'datetime'
    },

    legend: {
        enabled: true,
        itemStyle: {
            "color": "rgba(204,204,204,1)",
            "fontSize": "12px",
            "fontWeight": "normal",
            "fontStyle": "normal"
        }
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
            "size": "90%",
            "innerSize": "50%",
            "showInLegend": true,
            "animation": true,
            "borderWidth": 0
        }
    },
    series: series_
});

            })

            .catch(error => console.error('Error fetching data:', error));
}
getStudentsData();


// Функция для скрытия элементов с id "charttrobber"
function hideChartTrobbler() {
    // Получаем все элементы с id "charttrobber"
    var chartTrobblerElements = document.querySelectorAll('#charttrobber');

    // Проходимся по каждому элементу и скрываем его
    chartTrobblerElements.forEach(function(element) {
        element.style.display = 'none';
    });
}


