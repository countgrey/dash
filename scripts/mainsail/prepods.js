
var prepodsPie	= new Highcharts.Chart({
    chart: {
        renderTo: 'PrepodsPie',
        type: "pie",
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
            "size": "90%",
            "innerSize": "50%",
            "showInLegend": true,
            "animation": true,
            "borderWidth": 0,

        }
    },

    series: [{
        dashStyle: "solid",
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