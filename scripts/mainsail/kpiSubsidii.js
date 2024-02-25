var sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';

var apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

var range = '2024 год!F20:F23';

var url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        console.log(data);

        document.getElementById("date").innerHTML = "на " + data.values[0].toString().split(" ")[2];

        let sum = 0;
        for (let i = 1; i < data.values.length; i++) {
            sum += parseInt(data.values[i].toString().replace(/\s/g, ''));
        }

        document.getElementById("amountOfOstatok").innerHTML = sum.toLocaleString().replace(/,/g, ' ');
        
    })
    .catch(error => console.error('Error fetching data:', error));


range = '2024 год!E21:E23';
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        //console.log(data);

        let sum = 0;
        for (let i = 1; i < data.values.length; i++) {
            sum += parseInt(data.values[i].toString().replace(/\s/g, ''));
        }

        document.getElementById("amountOfRashod").innerHTML = sum.toLocaleString().replace(/,/g, ' ');
        
    })
    .catch(error => console.error('Error fetching data:', error));



range = '2024 год!D21:D23';
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        //console.log(data);

        

        let sum = 0;
        for (let i = 1; i < data.values.length; i++) {
            sum += parseInt(data.values[i].toString().replace(/\s/g, ''));
        }

        document.getElementById("amountOfDohod").innerHTML = sum.toLocaleString().replace(/,/g, ' ');
        
    })
    .catch(error => console.error('Error fetching data:', error));