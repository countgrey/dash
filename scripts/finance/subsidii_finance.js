sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
var apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk'
var range = '2024 год!K15'
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;


fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        document.getElementById("dohod").innerHTML = data.values[0];
        
    })
    .catch(error => console.error('Error fetching data:', error));



range = '2024 год!B20:F23'
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => 
    {
            var rows = data.values;

                // Create HTML table
                var table = $('<table>').addClass('table');
                $.each(rows, function(rowIndex, row) {
                    var tr = $('<tr>');
                    $.each(row, function(colIndex, cell) {
                        var td = $('<td>').text(cell);
                        tr.append(td);
                    });
                    table.append(tr);
                });

                // Append table to container
                $('#table-container-goszad').append(table);
        
    })
    .catch(error => console.error('Error fetching data:', error));

range = '2024 год!H20:K23'
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => 
    {
            var rows = data.values;

                // Create HTML table
                var table = $('<table>').addClass('table');
                $.each(rows, function(rowIndex, row) {
                    var tr = $('<tr>');
                    $.each(row, function(colIndex, cell) {
                        var td = $('<td>').text(cell);
                        tr.append(td);
                    });
                    table.append(tr);
                });

                // Append table to container
                $('#table-container-inie').append(table);
        
    })
    .catch(error => console.error('Error fetching data:', error));

