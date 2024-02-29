url = `https://sheets.googleapis.com/v4/spreadsheets/1e_mgdbLgrCggkIVXwIst4FKCwl_yZLai5B_oSOd9Rmg/values/sheet!A2:E130?key=AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk`;

fetch(url)
    .then(response => response.json())
    .then(data => 
    {
            var rows = data.values;
            rows.forEach(function (item) {
                var row = `<div class="grid-item-proj"><h2>${item[0]}</h2></div>`
                $(".grid-container-proj").append(row);
            }); 
        
    })
    .catch(error => console.error('Error fetching data:', error));