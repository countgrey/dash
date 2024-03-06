sheetId = '1-x6T_G75fKgqhTIuB4Ku_wC6m-VsvOJ22gZznWP4aVA';
apiKey = 'AIzaSyARrFF4JLqZrtrAEjCOPvcw1PJtyizHuRk';

range = '2024 год!G26:J30';
url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;


function fetchData(selectedData){
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


            
            //document.getElementById("date").innerHTML = "на " + dates[selectedData].toString().split(" ")[2];

            if (typeof valuesMain[selectedData] !== 'undefined' && valuesMain[selectedData] !== null) {document.getElementById("edu-main").innerHTML = valuesMain[selectedData].toLocaleString().replace(/,/g, ' ');}
            else {document.getElementById("edu-main").innerHTML = " ";}
            if (typeof valuesDop[selectedData] !== 'undefined' && valuesDop[selectedData] !== null) {document.getElementById("edu-dop").innerHTML = valuesDop[selectedData].toLocaleString().replace(/,/g, ' ');}
            else {document.getElementById("edu-dop").innerHTML = " ";}
            if (typeof valuesObshaga[selectedData] !== 'undefined' && valuesObshaga[selectedData] !== null) {document.getElementById("edu-obshaga").innerHTML = valuesObshaga[selectedData].toLocaleString().replace(/,/g, ' ');}
            else {document.getElementById("edu-obshaga").innerHTML = " ";}
            if (typeof total[selectedData] !== 'undefined' && total[selectedData] !== null) {document.getElementById("total").innerHTML = total[selectedData].toLocaleString().replace(/,/g, ' ');}
            else {document.getElementById("total").innerHTML = " ";}
     
        })
        .catch(error => console.error('Error fetching data:', error));
}
    
fetchData(0); 
   
function toggleClass(elem,className){
  if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
  }
  else{
    elem.className = elem.className.replace(/\s+/g,' ') +   ' ' + className;
  }

  return elem;
}

function toggleDisplay(elem){
  const curDisplayStyle = elem.style.display;           

  if (curDisplayStyle === 'none' || curDisplayStyle === ''){
    elem.style.display = 'block';
  }
  else{
    elem.style.display = 'none';
  }

}

function toggleMenuDisplay(e){
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.menu');
  const icon = dropdown.querySelector('.fa-angle-right');

  toggleClass(menu,'hide');
  toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
  toggleClass(e.target.parentNode, 'hide');         

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('.dropdown .title');
  const icon = document.querySelector('.dropdown .title .fa');


  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  //trigger custom event
  document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
    //setTimeout is used so transition is properly shown
  setTimeout(() => toggleClass(icon,'rotate-90',0));
}

var datesById = 
  {
    "23.12.23 " : 0,
    "03.01.24 " : 1,
    "29.01.24 " : 2,
    "19.02.24 " : 3
  };

function handleTitleChange(e){
  fetchData(datesById[e.target.textContent]);
}

//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);