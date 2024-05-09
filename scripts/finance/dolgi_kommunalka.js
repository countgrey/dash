//let sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
//let apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

range = '2024 год!G26:AA30';
const urls = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

let _dolgiData = void 0;
const dataEnum = {
    "Date"    : 0,
    "MainEdu" : 1,
    "DopEdu"  : 2,
    "ObsEdu"  : 3,
    "Total"   : 4
};

//Ждём дату из с гугла
async function fetchData(){
    const dataResponse = await fetch(urls);
    const data = await dataResponse.json();
    return data;
}

function PutInHtml(ElementID, value)
{
    value = value === '' ? "Нет данных" : value; 
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

async function LoadDolgiData(selectedData = 0, loadThing = false)
{
    if(_dolgiData === undefined)
        _dolgiData = await fetchData();

    let keys = Object.keys(dataEnum);
    for(let i = 1; i < 5; i++)
    {
        let key = keys[i];
        PutInHtml(key, _dolgiData.values[dataEnum[key]][selectedData]);

    }

    if (loadThing) {
        let dateArray = _dolgiData.values[dataEnum.Date];
        for (let i = 0; i < dateArray.length; i++)
            MakeCoolDropdown(dateArray[i], i);  
    }

    let newCoolArrayThing = [];
    let shit = _dolgiData.values[dataEnum.Total];
    for(let i = 0; i < shit.length; i++)
    {
        let tempCrap = shit[i].replace(/\s/g, '').replace(',' , '.');
        newCoolArrayThing.push(parseFloat(tempCrap));
    }
    

    LoadDolgiCharts(_dolgiData.values[dataEnum.Date] ,newCoolArrayThing);
}

LoadDolgiData(0, true);

let btn = document.getElementById("dropdown2_The_Movie");

btn.addEventListener('click', function()
{
    let dropdownID      = document.getElementById("dropdown2_The_Movie");
    let dropdownValue   = dropdownID.selectedIndex;
    LoadDolgiData(dropdownValue);
});