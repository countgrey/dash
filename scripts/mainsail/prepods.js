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

var prepodsPie	= new Highcharts.Chart({
    chart: {
        renderTo: 'PrepodsPie',
        type: "pie",
    },
    tooltip: tooltip,
    title: {
    	text: "",
        
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
            "size": "90%",
            "innerSize": "50%",
            "showInLegend": true,
            "animation": true,
            "borderWidth": 0,

        }
    },

    series: [{
        dashStyle: "solid",
        data: data
    }]
});