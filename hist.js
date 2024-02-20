var dataOfHistogram = [1, 1, 1, 20, 1, 1, 1, 10, 15, 12, 12, 11];
var categoriesOfHistogram = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];









var economCountBud = 0;
var itCountBud = 0;
var creativeCountBud = 0;
var economCountCom = 0;
var itCountCom = 0;
var creativeCountCom = 0;


Highcharts.setOptions({
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgba(0, 190, 0, 0)'],
                [1, 'rgba(240, 240, 255, 0)']
            ]
        },
        borderWidth: 0,
        plotBackgroundColor: 'rgba(255, 255, 255, 0)',
        plotShadow: true,
        plotBorderWidth: 1,
    }
});


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

var hisogramStudents	= new Highcharts.Chart({
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
        type: 'category',
        categories: ["Креативное", "IT", "Экономическое"],
        gridLineColor: "rgba(0, 0, 0, 0)"
    },
    yAxis: {
    	gridLineColor: "rgba(0, 0, 0, 0)",
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    legend:
    {
	    "enabled": true,
//	    "align": "right",
//	    "verticalAlign": "middle",
//	    "layout": "vertical",
	    "itemStyle": {
	        "align": "center",
	        "color": "rgba(153,153,153,1)",
	        "fontSize": "14px",
	        "fontWeight": "normal",
	        "fontStyle": "normal"
	    },
	    "itemMarginTop": 1.5
	},

    series: [{
        name: 'Бюджет',
        data: [
    {
        "y": 202,
        "name": "Бюджет",
        "names": [
            "1а1"
        ]
    },
    {
        "y": 570,
        "name": "Бюджет",
        "names": [
            "1бд1"
        ]
    },
    {
        "y": 143,
        "name": "Бюджет",
        "names": [
            "1бд3"
        ]
    }]
    }, {
        name: 'Коммерция',
        data: [
    {
        "y": 135,
        "name": "Коммерция",
        "names": [
            "1а1"
        ]
    },
    {
        "y": 325,
        "name": "Коммерция",
        "names": [
            "1бд1"
        ]
    },
    {
        "y": 221,
        "name": "Коммерция",
        "names": [
            "1бд3"
        ]
    }]
    }]
});

var prepodsPie	= new Highcharts.Chart({
    chart: {
        renderTo: 'PrepodsPie',
        type: "pie"
    },
    title: {
    	text: "",
        
    },
    credits:
    {
    	enabled: false
    },
    xAxis: {
        type: 'datetime'
    },
    series: [{
        data: [
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
    }]
});