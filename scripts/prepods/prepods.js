// Изменяем функцию загрузки Google таблицы и обработки данных
function loadGoogleSheet() {
    // ID вашей таблицы Google
    var spreadsheetId = '1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4';
    // ID листа с данными
    var sheetId = '0';
    // API ключ, полученный после создания проекта и включения Google Sheets API в Google Cloud Console
    var apiKey = 'AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI';
    // URL для запроса к Google Sheets API для загрузки данных в таблицу
    var tableUrl = `https://sheets.googleapis.com/v4/spreadsheets/1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4/values/1!A1:E134?key=AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI`;
    // URL для запроса к Google Sheets API для загрузки данных для круговой диаграммы
    var chartUrl = `https://sheets.googleapis.com/v4/spreadsheets/1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4/values/1!M1:N5?key=AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI`;
    // URL для запроса к Google Sheets API для загрузки данных для гистограммы
    var histogramUrl = `https://sheets.googleapis.com/v4/spreadsheets/1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4/values/1!P4:Q15?key=AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI`;
    // URL для запроса к Google Sheets API для загрузки данных для круговой диаграммы
    

    // Делаем AJAX запрос к API для загрузки данных в таблицу
    $.ajax({
        url: tableUrl,
        success: function(response) {
            var values = response.values;
            if (values && values.length > 0) {
                // Начинаем с 1, чтобы пропустить заголовок таблицы
                for (var i = 1; i < values.length; i++) {
                    var row = values[i];
                    
                    // Определяем переменные для фамилии, имени и отчества
                    var surname = row[0];
                    var name = row[1];
                    var patronymic = row[2];
                    
                    // Формируем ФИО в нужном формате
                    var fioFormatted = surname + ' ' + name.charAt(0) + '.' + patronymic.charAt(0) + '.';
                    
                    // Создаем строку таблицы и заполняем данными из таблицы Google
                    var tr = '<tr>';
                    tr += '<td>' + fioFormatted + '</td>'; // ФИО
                    tr += '<td>' + row[3] + '</td>'; // Должность
                    tr += '<td>' + row[4] + '</td>'; // Отдел
                    tr += '</tr>';
                    $('#perssonaleTable').append(tr);
                }
            }
        }
    });

    // Делаем AJAX запрос к API для загрузки данных для круговой диаграммы
    $.ajax({
        url: chartUrl,
        success: function(response) {
            var values = response.values;
            if (values && values.length > 0) {
                var educationData = [];
                // Начинаем с 1, чтобы пропустить заголовок таблицы
                for (var i = 1; i < values.length; i++) {
                    var row = values[i];
                    var category = row[0];
                    var value = parseFloat(row[1]);
                    educationData.push({ name: category, y: value });
                }
                // Создаем серию данных для круговой диаграммы
                var series_ = [{
                    type: 'pie',
                    name: 'Преподователей',
                    data: educationData
                }];

                // Инициализируем круговую диаграмму с использованием Highcharts
                var pieChart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'education',
                        type: "pie",
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                    },
                    title: {
                        text: "",
                    },
                    credits: {
                        enabled: false
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
                            "size": "130%",
                            "innerSize": "50%",
                            "showInLegend": true,
                            "animation": true,
                            "borderWidth": 0
                        }
                    },
                    series: series_
                });
            }
        }
    }).catch(error => console.error('Error fetching data:', error));

    // Делаем AJAX запрос к API для загрузки данных для гистограммы
   $.ajax({
        url: histogramUrl,
        success: function(response) {
            var values = response.values;
            if (values && values.length > 0) {
                var categories = [];
                var data = [];

                // Проходим по каждой строке данных
                for (var i = 0; i < values.length; i++) {
                    var row = values[i];
                    // Первый столбец содержит категории
                    categories.push(row[0]);
                    // Второй столбец содержит значения
                    data.push(parseFloat(row[1]));
                }

                // Создаем гистограмму с использованием Highcharts
                Highcharts.chart('container', {
    chart: {
        name: 'Работник',
        renderTo: 'container',
        type: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        
    },
    title: {
        text: "",
    },
    credits: {
        enabled: false
    },
    xAxis: {
      categories: categories,
        type: 'datetime'
    },
    yAxis: {
        gridLineWidth: 0,
        
    },
    legend: {
        enabled: false,
        itemStyle: {
            "color": "rgba(204,204,204,1)",
            "fontSize": "12px",
            "fontWeight": "normal",
            "fontStyle": "normal"

        }
    },
   plotOptions: {
    "column": {
        "dataLabels": {
            "borderWidth": 1, // Устанавливаем толщину рамки
            "borderColor": "transparent", // Устанавливаем цвет рамки как прозрачный
            enabled: true, // Включаем метки данных
            formatter: function() {
                return this.y; // Отображаем значение данных
            },
            "text":{

                borderWidth: 0,

            },
            "style": {
                "align": "center",
                "color": "rgba(0,0,0,1)",
                "fontSize": "14px",
                "fontWeight": "bold",
                "fontStyle": "normal",
                "textOverflow": "none"
            },
            "distance": -12
        },
        "size": "50%",
        "innerSize": "60%",
        "showInLegend": false,
        "animation": true,
        "borderWidth": 0 // Устанавливаем толщину рамки столбцов в 0
    }
},

    series: [{
        data: data,
        name:'Преподователей'
    }]
});

            }
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
}
//Круговая диаграмма возраст

// Делаем AJAX запрос к API для загрузки данных для круговой диаграммы
 chartUrl = `https://sheets.googleapis.com/v4/spreadsheets/1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4/values/1!J1:K5?key=AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI`;
$.ajax({
    url: chartUrl,
    success: function(response) {
        var values = response.values;
        if (values && values.length > 0) {
            var educationData = [];
            // Проходим по каждой строке данных
            for (var i = 0; i < values.length; i++) {
                var row = values[i];
                var category = row[0];
                var value = parseFloat(row[1]);
                educationData.push({ name: category, y: value });
            }
            // Создаем серию данных для круговой диаграммы
            var series_ = [{
                type: 'pie',
                name: 'Человек',
                data: educationData
            }];

            // Инициализируем круговую диаграмму с использованием Highcharts
            var pieChart = new Highcharts.Chart({
                chart: {
                    renderTo: 'educationPie',
                    type: "pie",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                },
                title: {
                    text: "",
                },
                credits: {
                    enabled: false
                },
                 subtitle: {
                useHTML: true,
                text: 11,
                floating: true,
                verticalAlign: 'middle',
                y: -18
            },
                legend: {
                    "marginTop":50,
                "itemWidth": 250,
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
                
                "useHTML": true
    },

               
                plotOptions: {
                    pie: {
                        dataLabels: {
                            style: {
                                align: "center",
                                color: "rgba(0,0,0,1)",
                                fontSize: "14px",
                                fontWeight: "bold",
                                fontStyle: "normal",
                                textOverflow: "none"
                            },
                            enabled: false,
                            distance: -12
                        },
                        "size": "70%",
                        "innerSize": "50%",
                        showInLegend: true,
                        animation: true,
                        borderWidth: 0
                    }
                },
                
                series: series_,

            });
        }
    },
    error: function(error) {
        console.error('Error fetching data:', error);
    }
});

// Вызываем функцию загрузки Google таблицы и обработки данных при загрузке страницы
$(document).ready(function() {
    loadGoogleSheet();
});
