const sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';

        const apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

        const range = '2024 год!F20:F23';

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => 
            {
                //console.log(data);

                document.getElementById("date").innerHTML = "на " + data.values[0].toString().split(" ")[2];

                let sum = 0;
                for (let i = 1; i < data.values.length; i++) {
                    sum += parseInt(data.values[i].toString().replace(/\s/g, ''));
                }

                document.getElementById("amountOfOstatok").innerHTML = sum.toLocaleString().replace(/,/g, ' ');
                
            })
            .catch(error => console.error('Error fetching data:', error));