sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';

apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

range = '2024 год!A2:K15';

url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;


fetch(url)
    .then(response => response.json())
    .then(data => {

        let series = [];
        let categories = [];
        let seriesData = [];

        
        for (let month = 1; month <= 12; month++) {
            var FoormattedDate = data.values[month][0].substring(0, 3);
            categories.push(FoormattedDate);
        }

        for (let index = 1; index <= data.values[0].length-2; index++) {
            seriesData = {name: data.values[0][index], data: []};
            for (let month = 1; month <= 12; month++) {
                let tempData = String(data.values[month][index]);
                seriesData.data.push(parseInt(tempData.toString().replace(/\s/g, '')));
            }
            series.push(seriesData);
        }

        seriesData = {name: "Всего", data: [], type: 'line'};
        for (let month = 1; month <= 12; month++) {
            let tempData = String(data.values[month][data.values[0].length-1]);
            seriesData.data.push(parseInt(tempData.toString().replace(/\s/g, '')));
        }
        series.push(seriesData);

        
        var hisogramDohod = new Highcharts.Chart({
            chart: {
                renderTo: 'dohodHistogram',
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
                        "fontSize": "8px",
                        "fontWeight": "normal",
                        "fontStyle": "normal"
                    }
                },
                "labels": {
                    "enabled": true,
                    "style": {
                        "align": "center",
                        "color": "rgba(153,153,153,1)",
                        "fontSize": "10px",
                        "fontWeight": "normal",
                        "fontStyle": "normal"
                    }
                },
                "gridLineWidth": 0,
                "opposite": false,
                "type": "category",
                "plotLines": [],
                "plotBands": [],
                "categories": categories
            },
            yAxis: {
                "lineWidth": 0,
                "title": {
                    "text": "",
                    "style": {
                        "align": "center",
                        "color": "rgba(0,0,0,1)",
                        "fontSize": "8px",
                        "fontWeight": "normal",
                        "fontStyle": "normal"
                    }
                },
                "labels": {
                    "enabled": true,
                    "style": {
                        "align": "center",
                        "color": "rgba(102,102,102,1)",
                        "fontSize": "12px",
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
                    "formatter": function() {
                        return formatNumber(this.total);
                    },
                    "style": {
                        "align": "center",
                        "color": "rgba(153,153,153,1)",
                        "fontSize": "10px",
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
                            "fontSize": "8px",
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
                layout: 'horizontal', // Horizontal layout
                align: 'center', // Align to the center
                verticalAlign: 'bottom', // Align to the bottom
                itemWidth: 150, // Set item width to fit two columns
                itemMarginTop: 5, // Adjust top margin between legend items
                itemMarginBottom: 5, // Adjust bottom margin between legend items
                itemStyle: {
                    "color": "rgba(153,153,153,1)",
                    "fontSize": "10px",
                    "fontWeight": "normal",
                    "fontStyle": "normal"
                },
            },

            series: series
        });

    })

    .catch(error => console.error('Error fetching data:', error));
