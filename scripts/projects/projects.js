url = `https://sheets.googleapis.com/v4/spreadsheets/1e_mgdbLgrCggkIVXwIst4FKCwl_yZLai5B_oSOd9Rmg/values/sheet!A2:E130?key=AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk`;

fetch(url)
    .then(response => response.json())
    .then(data => 
    {
            var rows = data.values;
            rows.forEach(function (item) {
                var row = `<div class="flex-item">
                <div class="title"><h1>${item[0]}</h1></div>

                <div class="progress-bar" id="${item[0]}"></div>

                <div class="info-container">
                    <div class="info-item"><h2>Дедлайн</h2><br>
                        <span id="deadline">${item[2]}</span>
                    </div>
                    <div class="info-item"><h2>Руководитель</h2><br>
                        <span id="leader">${item[3]}</span>
                    </div>
                </div>
            </div>`
                $(".flex-container").append(row);
                drawProgressBar(parseInt(item[1]), item[0]);
            }); 
        
    })
    .catch(error => console.error('Error fetching data:', error));

function drawProgressBar(completion, renderto) {
    Highcharts.chart({
            chart: {
                renderTo: renderto,
                type: 'bar'
            },

            title: {
                text: ' '
            },

            yAxis: {
                title: {
                    text: ' '
                }
            },

            credits: {
                enabled: false
            },

            legend: {
                enabled: false
            },

            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: ' '
                }
            },

            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false,
                    dataLabels: {
                        enabled: true,
                        format: '{y} %'
                    }
                }
            },

            series: [{
                name: 'Прогресс',
                data: [completion] // Change this value to adjust the progress
            }]
});
}
