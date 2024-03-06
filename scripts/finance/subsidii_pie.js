function drawPieDohod() {
    var DohodSubsidiiPie = new Highcharts.Chart(
        {
            chart: {
                "renderTo": "subsidii-dohod-pie",
                "type": "pie",
                "events": {}
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

            series: [
                {
                    "id": "\"stud_03_Subsidii_Pokazateli\",\"Postuplenie\"",
                    "name": "Поступление",
                    "color": "rgba(0,102,255,1)",
                    "marker": {
                        "radius": 0.1,
                        "states": {
                            "select": {
                                "radius": 5
                            },
                            "hover": {
                                "radius": 5
                            }
                        }
                    },
                    "data": [
                        {
                            "y": 371914,
                            "name": "ПД",
                            "names": [
                                "ПД"
                            ]
                        },
                        {
                            "y": 70296190,
                            "name": "гос.зад.+ IT-куб",
                            "names": [
                                "гос.зад.+ IT-куб"
                            ]
                        },
                        {
                            "y": 3683300,
                            "name": "кл.рук.",
                            "names": [
                                "кл.рук."
                            ]
                        }
                    ]
                }
            ],

            legend: {
                enabled: true,
                align: "right",
                verticalAlign: "middle",
                layout: "vertical",
                itemStyle: {
                    align: "center",
                    color: "rgba(255,255,255,1)",
                    fontSize: "16px",
                    fontWeight: "normal",
                    fontStyle: "normal"
                },
                itemMarginTop: 1.5,
                useHTML: true
            },

            tooltip: {
                style: {
                    fontSize: "14px"
                }
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
                    size: "100%",
                    innerSize: "60%",
                    showInLegend: true,
                    animation: false,
                    borderWidth: 0
                }
            },

            drilldown: {
                activeDataLabelStyle: {
                    align: "center",
                    color: "rgba(0,0,0,1)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    textDecoration: "none"
                }
            }
        }
    );

    // Функция для вычисления общей суммы данных серии
    function calculateTotalPieData(seriesData) {
        let total = 0;
        for (let i = 0; i < seriesData.length; i++) {
            total += seriesData[i].y;
        }
        return total;
    }

    // Получаем данные о серии и передаем их в функцию calculateTotalPieData
    let seriesData = DohodSubsidiiPie.series[0].data;
    let totalData = calculateTotalPieData(seriesData);

    // Обновляем подзаголовок графика с суммой данных
    DohodSubsidiiPie.update({
        subtitle: {
            text: `<span style="font-size: 16px; color: #999999">${formatNumber(totalData)}</span>`,
            floating: true,
            verticalAlign: 'middle',
            y: 12,
            x: -78,
        }
    });

    // Функция для форматирования числа в тысячи с пробелами
    function formatNumber(number) {
        if (number >= 1000) {
            let formattedNumber = (number / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' тыс.';
            return formattedNumber;
        } else {
            return number.toString();
        }
    }
}

drawPieDohod();
