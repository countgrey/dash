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
} 

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
    console.log("I GOT THIS: " +  selectedData)
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
}

LoadData(0 ,true);

let btn = document.getElementById("dropdown2_The_Movie");

btn.addEventListener('click', function()
{
    let dropdownID      = document.getElementById("dropdown2_The_Movie");
    let dropdownValue   = dropdownID.selectedIndex;
    LoadData(dropdownValue);
});