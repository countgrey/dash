let sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
let _apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

let dataEnumSub = {
    0   : "amountOfDohod",
    1   : "amountOfRashod",
    2   : "amountOfOstatok"
}

let dataArray = [
    ["D21:D23", "E21:E23", "F21:F23"],
]

let subsidTypeOfData = {
    "Dohod" : 0,
    "Rashod": 1,
    "Ostatok":2
}

//Ждём дату из с гугла
async function fetchDataSuper(url)
{
    let _data_Response = await fetch(url);
    let _data_ = await _data_Response.json();
    return _data_;
}

let subData = void 0;

let twoTwo      = [];

async function LoadData(page)
{
    let sum = 0;
    let array = []
    for(let i = 0; i < 3; i++)
    {
        let colum   = dataArray[0][i];
        let _url     = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${page + colum}?key=${_apiKey}`;
        subData    = await fetchDataSuper(_url);

        sum = 0;
        for(let j = 0; j < subData.values.length; ++j)
        {
            if(subData.values[j][0] != undefined)
            {
                let tmpData = subData.values[j][0].replace(/\s/g, '').replace(',' , '.');
                let tmpInt = parseInt(tmpData);
                
                // tmpInt = isNaN(tmpInt) ? 0 : tmpInt;
                sum += tmpInt;
            }
            document.getElementById(dataEnumSub[i]).innerHTML = sum.toLocaleString().replace(/,/g, ' ');
            
        }
        array.push(sum);
    }

    let _fullPathToFile = document.location.href
    if(_fullPathToFile.includes("index.html"))
        SubdidCharts(array)
}

LoadData("2024 год!");