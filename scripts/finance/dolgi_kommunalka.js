sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

range = '2024 год!G26:J30';
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;


function fetchData(){
    fetch(url)
        .then(response => response.json())
        .then(data => 
        {
            //console.log(data);

            let dates = [];
            let valuesMain = [];
            let valuesDop = [];
            let valuesObshaga = [];
            let total = [];

            data.values[0].forEach((element) => {
                let date = element.split(" ");
                date = date[date.length-1];
                dates.push(date);
            });

            data.values[1].forEach((element) => {
                valuesMain.push(element);
            });

            data.values[2].forEach((element) => {
                valuesDop.push(element);
            });

            data.values[3].forEach((element) => {
                valuesObshaga.push(element);
            });

            data.values[4].forEach((element) => {
                total.push(element);
            });


            
            //document.getElementById("date").innerHTML = "на " + data.values[0].toString().split(" ")[2];

            document.getElementById("edu-main").innerHTML = valuesMain[0].toLocaleString().replace(/,/g, ' ');
            document.getElementById("edu-dop").innerHTML = valuesDop[0].toLocaleString().replace(/,/g, ' ');
            document.getElementById("edu-obshaga").innerHTML = valuesObshaga[0].toLocaleString().replace(/,/g, ' ');
            document.getElementById("total").innerHTML = total[0].toLocaleString().replace(/,/g, ' ');
            
        })
        .catch(error => console.error('Error fetching data:', error));
}
    




fetchData();