var kpiFinans = new Highcharts.Chart({
    chart: {
        renderTo: 'FinanceGraphic',
        type: "column"
    },
    xAxis: {
    "lineWidth": 0,
    "title": {
        "text": "",
        
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
    "tickLength": 0,
    "categories": [
        "2021",
        "2022",
        "2023",
        "2024"
    ]},
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
	            "color": "rgba(153,153,153,1)",
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
	            "color": "rgba(0,0,0,1)",
	            "fontFamily": "Arial",
	            "fontSize": "14px",
	            "fontWeight": "normal",
	            "fontStyle": "normal"
	        }
    }},
    legend: {
	    "enabled": true,
	    "align": "center",
	    "verticalAlign": "bottom",
	    "layout": "horizontal",
	    "itemStyle": {
	        "align": "center",
	        "color": "rgba(153,153,153,1)",
	        "fontSize": "14px",
	        "fontWeight": "normal",
	        "fontStyle": "normal"
	    },
	    "itemMarginTop": 1.5
	},
    title: {
   		text: ""
    },
    credits:
    {
    	enabled: false
    },

    series: [
    {
        "id": "\"stud_03_Subsidii_Pokazateli\",\"Postuplenie\"",
        "name": "Поступление",
        "color": "rgba(112,99,250,1)",
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
                "y": 19108902,
                "name": "2021",
                "names": [
                    "2021"
                ]
            },
            {
                "y": 10583782,
                "name": "2022",
                "names": [
                    "2022"
                ]
            },
            {
                "y": 255897459,
                "name": "2023",
                "names": [
                    "2023"
                ]
            },
            {
                "y": 74351404,
                "name": "2024",
                "names": [
                    "2024"
                ]
            }
        ]
    },
    {
        "id": "\"stud_03_Subsidii_Pokazateli\",\"Rashod\"",
        "name": "Расход",
        "color": "rgba(105,185,250,1)",
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
                "y": 48968586,
                "name": "2021",
                "names": [
                    "2021"
                ]
            },
            {
                "y": 14694178,
                "name": "2022",
                "names": [
                    "2022"
                ]
            },
            {
                "y": 254200823,
                "name": "2023",
                "names": [
                    "2023"
                ]
            },
            {
                "y": 2381867,
                "name": "2024",
                "names": [
                    "2024"
                ]
            }
        ]
    }]
});
