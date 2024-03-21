sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

range = '2024 год!G26:AA30';
const urls = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

const dataEnum = {
    "Date"    : 0,
    "MainEdu" : 1,
    "DopEdu"  : 2,
    "ObsEdu"  : 3,
    "Total"   : 4
};

//Ждём дату из с гугла
async function fetchData(selectedData = 0){
    const dataResponse = await fetch(urls);
    const data = await dataResponse.json();
    return data;
}

function PutInHtml(ElementID, value)
{
    document.getElementById(ElementID).innerHTML = value;
}

function MakeCoolDropdown(text, value)
{
    //document.getElementById("dropdown2_The_Movie");
    let newDate = document.createElement('option');
    newDate.text = text;
    newDate.value = value;

    dropdown2_The_Movie.add(newDate);
}


async function LoadData(selectedData = 0, loadThing = false)
{
    //console.log("I GOT THIS: " +  selectedData)
    const data = await fetchData();

    if(loadThing)
    {
        for(let i = 0; i < 5; i++)
            MakeCoolDropdown(data.values[dataEnum.Date][i], i);  
    }

    let keys = Object.keys(dataEnum);
    for(let i = 1; i < 5; i++)
    {
        let key = keys[i];
        PutInHtml(key, data.values[dataEnum[key]][selectedData]);
    }

    let shit = data.values[dataEnum.Total];
    let newCoolArrayThing = [];

    for(let i = 0; i < shit.length; i++)
    {
        let tempCrap = shit[i].replace(/\s/g, '').replace(',' , '.');
        newCoolArrayThing.push(parseFloat(tempCrap));
    }

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
            categories: data.values[dataEnum.Date],
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
                data: newCoolArrayThing
            },
        ]
    });

    console.log(newCoolArrayThing)
}

LoadData(0 ,true);

let btn = document.getElementById("dropdown2_The_Movie");

btn.addEventListener('click', function()
{
    let dropdownID      = document.getElementById("dropdown2_The_Movie");
    let dropdownValue   = dropdownID.selectedIndex;
    LoadData(dropdownValue);
});