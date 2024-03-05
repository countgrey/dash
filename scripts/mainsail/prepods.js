
var tooltip = {
  useHTML: true,
  backgroundColor: "white",
  borderColor: "",
  borderRadius: 4,
  borderWidth: 0,
  shape: "square",
  shadow: true,
  formatter: function formatter() {
    return "<span style='z-index:9999;background-color:black;'>\n            <div style='font-size:20px;font-weight:bold;'>".concat(this.key, "</div>\n            <div><span style='font-size:20px;font-weight:bold;'>").concat(Math.round(this.y), "</span><span style='font-size:10px;color:rgb(173,173,173);'>  &#1096;&#1090;</span></div>\n            <div style='font-size:14px;font-weight:bold;color:rgb(20, 173, 252)'>").concat(Math.round(this.percentage), " %</div>\n        </span>");
  }
};

var data = [
        {

            "y": 16,
            "name": "Административно-хозяйственный",
            "names": [
                "Административно-хохяйственный персонал"
            ],
            "color": null
        },
        {
            "y": 73,
            "name": "Педагогический",
            "names": [
                "Педагогический состав"
            ],
            "color": null
        },
        {
            "y": 12,
            "name": "Прочий персонал",
            "names": [
                "Прочий персонал"
            ]
        },
        {
            "y": 32,
            "name": "Учебно-вспомогательный ",
            "names": [
                "Учебно-вспомогательный персонал"
            ],
            "color": null
        }]


function getSubtitle() {
    const totalNumber = data.reduce((acc, cur) => acc + cur.y, 0);
    return `<span style="font-size: 22px;">${totalNumber}</span>`;
}

var prepodsPie  = new Highcharts.Chart({
    chart: {
        renderTo: 'PrepodsPie',
        type: "pie",
    },
    tooltip: tooltip,
    title: {
        text: "",
        padding: "left",
        
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
            y: -18
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
                    "textOverflow": "none",

                },
                "enabled": false,
                
                
            },
            "size": "50%",
            "innerSize": "50%",
            "showInLegend": true,
            "animation": true,
            "borderWidth": 0,
            // "center": ["50%", "30%"],
        }
    },

    series: [{
        dashStyle: "solid",
        data: data
    }]
});
// Функция для загрузки Google таблицы и обработки данных
function loadGoogleSheet() {
    // ID вашей таблицы Google
    var spreadsheetId = '1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4';
    // ID листа с данными
    var sheetId = '0';
    // API ключ, полученный после создания проекта и включения Google Sheets API в Google Cloud Console
    var apiKey = 'AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI';
    // URL для запроса к Google Sheets API
    var url = `https://sheets.googleapis.com/v4/spreadsheets/1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4/values/1!A1:E134?key=AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI`;

  // Делаем AJAX запрос к API
$.ajax({
    url: url,
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
 var ageData = [];
    var spreadsheetId = '1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4';
    var sheetId = '0';
    var url = `https://sheets.googleapis.com/v4/spreadsheets/1gwyyF2hdtwDjF4AG3xuaBW2O6Y0GXz0TvvLT5-kdfU4/values/1!P4:Q15?key=AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI`;

    $.ajax({
        url: url,
        success: function(response) {
            var values = response.values;
            if (values && values.length > 1) { // Начинаем с индекса 1
                for (var i = 1; i < values.length; i++) { // Начинаем с индекса 1
                    var row = values[i];
                    var category = row[0];
                    var value = parseFloat(row[1]);
                    ageData.push({ category: category, value: value });

                    // Создаем строку таблицы и заполняем данными из таблицы Google
                    var tr = '<tr>';
                    tr += '<td>' + category + '</td>'; // Ставка нагрузка
                    tr += '<td>' + value + '</td>'; // Количество
                    tr += '</tr>';
                    $('#tableBody').append(tr);
                }
            }
        }
    });

            // Добавляем код для создания круговой диаграммы
            var educationData = [
                { name: 'Высшее образование', y: 46 },
                { name: 'В том числе, педагогическое', y: 34 },
                { name: 'Среднее профессиональное образование', y: 8 },
                { name: 'В том числе, педагогическое', y: 2 }
            ];

            // Инициализируем круговую диаграмму с использованием Highcharts
            var pieChart = new Highcharts.Chart({
                chart: {
                    renderTo: 'educationPie',
                    backgroundColor: 'transparent',
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
               credits:
    {
        enabled: false
    },
    xAxis: {
        type: 'datetime'
    },

   legend: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'middle',
                            layout: 'vertical',
                            itemWidth: 250,
                            itemStyle: {
                                align: 'center',
                                color: 'rgba(255,255,255,1)',
                                fontSize: '14px',
                                fontWeight: 'normal',
                                fontStyle: 'normal'}
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

                series: [{
                    name: '',
                    colorByPoint: true,
                    data: educationData
                }]
            });
 hideChartTrobbler();
}


// Запускаем функцию загрузки таблицы при загрузке страницы
$(document).ready(function() {
    loadGoogleSheet();
});

// Определяем данные
var ageData = [
    { category: 'До 25', value: 12 },
    { category: '26-45', value: 25 },
    { category: '46-60', value: 13 },
    { category: '60 и старше', value: 4 }
];

// Создаем серии данных для гистограммы
var series = [{
    name: 'Возраст',
    data: ageData.map(item => item.value)
}];

// Инициализируем гистограмму с использованием Highcharts
var histogram = new Highcharts.Chart({
    chart: {
        renderTo: 'container',
        type: 'column',
        marginLeft: -50,
        marginRight: -100,
        width: 800,
        height: 300,
        backgroundColor: '#25272f',
        borderRadius: 5,
        fontColor: '#ffffff',
    },

    title: {
        text: undefined,
    },
    xAxis: {
        categories: ageData.map(item => item.category),
        title: {
            text: undefined,
        },
        labels: {
            style: {
                color: '#ffffff',
                fontSize: '12px'
            }
        },
        gridLineWidth: 0 // Отключаем вспомогательные линии по оси X
    },
    yAxis: {
        tickPixelInterval: 10, 
        title: {
            text: undefined,
            style: {
                color: '#333',
                fontSize: '14px'
            }
        },
        labels: {
            style: {
                color: '#333',
                fontSize: '25px',
                
            }
        },
        gridLineWidth: 0 // Отключаем вспомогательные линии по оси Y
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        column: {
          pointPlacement: 'between',
          borderWidth: 0,
          pointWidth: 100, // Задаем ширину столбцов
            
        }
    },
    series: series
});


//AIzaSyB8W0lONxmOxcPGzgrMCrbo3p2_OzrieaI

// Функция для скрытия загрузчика
function hideChartTrobbler() {
    // Реализация функции скрытия загрузчика
    $('#charttrobber').hide();
    /** Вызываем функцию загрузки данных при загрузке страницы**/
$(document).ready(function() {
    loadSheetsAPI();
});
}