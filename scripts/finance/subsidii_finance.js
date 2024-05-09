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


range = '2024 год!H37'
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        document.getElementById("rashod").innerHTML = data.values[0];
        
    })
    .catch(error => console.error('Error fetching data:', error));



range = '2024 год!B20:F23'
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => 
    {
            var rows = data.values;
            var countRows = 0;

                // Create HTML table
                var table = $('<table>').addClass('table');
                $.each(rows, function(rowIndex, row) {
                    var tr = $('<tr>');
                    $.each(row, function(colIndex, cell) {
                        var td = $('<td>').text(cell);
                        var formattedTdText;
                        if (countRows > 4) {
                            tdText = td.text();
                            formattedTdText = parseFloat(tdText.replace(/\s/g, '').replace(',', '.')) >= 0 ? (parseFloat(tdText.replace(/\s/g, '').replace(',', '.')) / 1000000).toFixed(1) : tdText;
                            tr.append($('<td>').text(formattedTdText));
                        }
                        countRows += 1;
                        if (countRows < 6){
                            if (td.text() != ''){
                                tr.append($('<td>').html(td.text() + '<span style="font-size: 10px"><br>млн.</span>').css('line-height', '1.3'));

                            }
                            else{
                            tr.append(td);
                            }
                        }
                        
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
        .then(data => {
            var rows = data.values;
            var countRows = 0;
    
            // Create HTML table
            var table = $('<table>').addClass('table');
            $.each(rows, function(rowIndex, row) {
                var tr = $('<tr>');
                $.each(row, function(colIndex, cell) {
                    var td = $('<td>').text(cell);
                    // console.log("iiteration: " + countRows + " TDTEXT:" + td.text());
                    var formattedTdText;
                    if (countRows > 4 && countRows != 6) {
                        tdText = td.text();
                        formattedTdText = parseFloat(tdText.replace(/\s/g, '').replace(',', '.')) >= 0 ? (parseFloat(tdText.replace(/\s/g, '').replace(',', '.')) / 1000).toFixed(0) : tdText;
                        tr.append($('<td>').text(formattedTdText));
                    }
    
                    if (countRows < 4 && countRows != 0) {
                        if (td.text() != ''){
                            tr.append($('<td>').html(td.text() + '<span style="font-size: 10px"><br>тыс.</span>').css('line-height', '1.3'));
                        } else {
                            tr.append(td);
                        }
                    } else {
                        if (isNaN(parseFloat(cell))) { // Проверяем, является ли 'cell' нечисловым
                            // console.log("ELSE iiteration: " + countRows + " TDTEXT:" + td.text());
                            tr.append(td);
                        }
                    }
                    countRows += 1;
                });
                table.append(tr);
            }); 
    
            // Append table to container
            $('#table-container-inie').append(table);
        })
        .catch(error => console.error('Error fetching data:', error));
    

