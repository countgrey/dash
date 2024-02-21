function getStudentsData()
{
        const sheetId = '1gkRFEOa0eiXl2o99LuzKU5G_d7xIkAMhfyCbYvIMDg0';

        const apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

        const range = 'Sheet1!C1:F64';

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        var series_ = [];

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

                series_ = 
                [
                    {name: 'Бюджет', data: [creativeCountBud, itCountBud, economCountBud]},
                    {name: 'Коммерция', data: [creativeCountCom, itCountCom, economCountCom]}
                ]
                
                var hisogramStudents    = new Highcharts.Chart({
                    chart: {
                        renderTo: 'StudentsHistogram',
                        type: "column",
                        shadow: true    
                    },
                    
                    title: {
                        text: ""
                    },

                    credits:
                    {
                        enabled: false
                    },

                    xAxis: {
                        "lineWidth": 1,
                        "title": {
                            "text": "",
                            "style": {
                                "align": "center",
                                "color": "rgba(0,0,0,1)",
                                "fontFamily": "Arial",
                                "fontSize": "14px",
                                "fontWeight": "normal",
                                "fontStyle": "normal"
                            }
                        },
                        "labels": {
                            "enabled": true,
                            "style": {
                                "align": "center",
                                "color": "rgba(153,153,153,1)",
                                "fontSize": "14px",
                                "fontWeight": "normal",
                                "fontStyle": "normal"
                            }
                        },
                        "gridLineWidth": 0,
                        "opposite": false,
                        "type": "category",
                        "plotLines": [],
                        "plotBands": [],
                        "categories": [
                            "Креативное отделение",
                            "IT отделение",
                            "Экономическое отделение"
                        ]
                    },
                    yAxis: {
                        "lineWidth": 0,
                        "title": {
                            "text": "",
                            "style": {
                                "align": "center",
                                "color": "rgba(0,0,0,1)",
                                "fontSize": "14px",
                                "fontWeight": "normal",
                                "fontStyle": "normal"
                            }
                        },
                        "labels": {
                            "enabled": true,
                            "style": {
                                "align": "center",
                                "color": "rgba(102,102,102,1)",
                                "fontSize": "14px",
                                "fontWeight": "normal",
                                "fontStyle": "normal"
                            }
                        },
                        "min": null,
                        "max": null,
                        "allowDecimals": true,
                        "tickLength": 0,
                        "gridLineWidth": 0,
                        "plotLines": [],
                        "plotBands": [],
                        "stackLabels": {
                            "enabled": true,
                            "style": {
                                "align": "center",
                                "color": "rgba(153,153,153,1)",
                                "fontSize": "18px",
                                "fontWeight": "normal",
                                "fontStyle": "normal",
                                "textOutline": false
                            }
                        }
                    },

                    plotOptions: {
                        "series": {
                            "dataLabels": {
                                "enabled": false,
                                "style": {
                                    "align": "center",
                                    "color": "rgba(0,0,0,1)",
                                    "fontFamily": "Arial",
                                    "fontSize": "14px",
                                    "fontWeight": "normal",
                                    "fontStyle": "normal"
                                },
                                "allowOverlap": true
                            },
                            "cropThreshold": 100000,
                            "states": {
                                "inactive": {
                                    "opacity": 1
                                },
                                "select": {
                                    "color": null,
                                    "borderWidth": 0,
                                    "borderColor": "transparent"
                                },
                                "unselect": {
                                    "alpha": 0.31999999999999995
                                }
                            },
                            "stacking": "normal",
                            "grouping": true,
                            "animation": false,
                            "borderColor": "transparent"
                        }
                    },

                    legend:
                    {
                        "enabled": true,
                        "itemStyle": {
                            "align": "center",
                            "color": "rgba(153,153,153,1)",
                            "fontSize": "14px",
                            "fontWeight": "normal",
                            "fontStyle": "normal"
                        },
                        "itemMarginTop": 1.5
                    },

                    series: series_
                });

            })

            .catch(error => console.error('Error fetching data:', error));
}



getStudentsData();

