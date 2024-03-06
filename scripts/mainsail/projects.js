url = `https://sheets.googleapis.com/v4/spreadsheets/1e_mgdbLgrCggkIVXwIst4FKCwl_yZLai5B_oSOd9Rmg/values/sheet!A2:E130?key=AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk`;

fetch(url)
    .then(response => response.json())
    .then(data => 
    {
            var rows = data.values;
            
            rows.forEach(function (item) {
                var color = "grey";
                var completion = parseInt(item[1]);

                if (completion <= 30) color = "red";
                else if (completion <= 70) color = "yellow";
                else if (completion < 100) color = "green";
                else color = "purple";

                var row = `<div class="grid-item-proj"><h2 style="color: ${color}">${item[0]}</h2></div>`
                $(".grid-container-proj").append(row);
            }); 
            hideChartTrobbler();
        
    })
    .catch(error => console.error('Error fetching data:', error));

    function hideChartTrobbler() {
    // Получаем все элементы с id "charttrobber"
    var chartTrobblerElements = document.querySelectorAll('#charttrobber');

    // Проходимся по каждому элементу и скрываем его
    chartTrobblerElements.forEach(function(element) {
        element.style.display = 'none';
    });
}
