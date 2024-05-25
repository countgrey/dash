function LoadDolgiCharts(date ,arrayOfDolgi)
{
    let chartDolgi = new Highcharts.Chart({
        chart: {
            renderTo: 'dolgi-huigi',
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
            categories: date,
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
            "plotBands": []
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
            enabled: false
        },
        series: [
            {
                name: 'Итого',
                data: arrayOfDolgi
            },
        ]
    });
}