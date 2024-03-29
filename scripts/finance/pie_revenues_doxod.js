sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA'; // Идентификатор вашей Google Таблицы
apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk'; // Ваш ключ API Google

let range1 = '2024 год!B2:J2'; // Новый диапазон данных вашей таблицы
let range2 = '2024 год!B15:J15'; // Новый диапазон данных вашей таблицы

let url1 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range1}?key=${apiKey}`;
let url2 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range2}?key=${apiKey}`;

function fetchData(){
    fetch(url1)
        .then(response => response.json())
        .then(heads => {
            // console.log(heads);
            fetch(url2)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    let categories = data.values[0];
                    let seriesData = [];

                    for (let i = 1; i < heads.values[0].length; i++) {
                        let name = heads.values[0][i];
                        let value = parseFloat(data.values[0][i].replace(/\s/g, '').replace(/\./g, '').replace(',', '.')); // Преобразуем числовые строки в числа, убирая пробелы и меняя разделитель тысячи
                        seriesData.push({
                            name: name,
                            y: value
                        });
                    }

                    // Построение круговой диаграммы с помощью Highcharts
                    Highcharts.chart('pie-revenues', {
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
                            text: `<span style="font-size: 18px; color: #999999">${formatNumber(calculateTotal(data.values[0].slice(1)))}</span>`, // Вывод суммы данных, отформатированной в тысячи
                            floating: true,
                            verticalAlign: 'middle',
                            y: 10,
                            x: -137
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    style: {
                                        align: 'center',
                                        color: 'rgba(0,0,0,1)',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        fontStyle: 'normal',
                                        textOverflow: 'none'
                                    },
                                    enabled: false,
                                    distance: -12
                                },
                                size: '100%',
                                innerSize: '60%',
                                showInLegend: true,
                                animation: false,
                                borderWidth: 0
                            }
                        },
                        legend: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'middle',
                            layout: 'vertical',
                            itemWidth: 250,
                            itemStyle: {
                                align: 'center',
                                color: 'rgba(153,153,153,1)',
                                fontSize: '14px',
                                fontWeight: 'normal',
                                fontStyle: 'normal'
                            },
                            itemMarginTop: 1.5,
                            useHTML: true
                        },
                        series: [{
                            name: 'Доход ',
                            data: seriesData
                        }]
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Функция для форматирования числа в тысячи
function formatNumber(number) {
    if (number >= 1000) {
        let formattedNumber = (number / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' тыс.';
        return formattedNumber;
    } else {
        return number.toString();
    }
}

// Функция для вычисления общей суммы данных
function calculateTotal(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += parseFloat(data[i].replace(/\s/g, '').replace(/\./g, '').replace(',', '.'));
    }
    return total;
}

fetchData();