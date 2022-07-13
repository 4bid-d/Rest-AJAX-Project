"use strict "

let mainDiv = document.querySelector('.main-div')




let button = document.createElement('button')
button.id = 'countryBtn'
button.innerHTML = 'Countries  <i class="bi bi-search"></i> '
mainDiv.appendChild(button)

let dropDownSpan = document.getElementById('ddspan')

let createDropDown = document.createElement('select')
createDropDown.setAttribute('id', 'options')
createDropDown.setAttribute('onchange', 'checkForExistingCard()')

let data

let getDropDown

let filter

async function fetchData() {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'https://restcountries.com/v2/all', true)
        xhr.onload = function () {
            if (xhr.status != 200) { 
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else { 
                data = JSON.parse(this.response)


                dropDownSpan.appendChild(createDropDown)
               
                getDropDown = document.getElementById('options')
                data.forEach(country => {

                    let newOption = document.createElement('option')
                    newOption.innerHTML = country.name
                    getDropDown.appendChild(newOption)
                });

            }
        };
        xhr.send()

    })
}

function getDetails() {

    var redirect = 'details.html'
   
    var selectedValue = document.getElementById("options").value;

    const selectedValueDetailsDisplay = document.getElementById("card");

    const createCard = document.createElement('div')
    createCard.style =''
    createCard.id = 'removeId'

    const createflag = document.createElement('img')
    createflag.style = 'hieght:150px;width:150px;'
    createflag.id = 'flag'

    const createCapital = document.createElement('p')
    createCapital.id = 'capital'
    const createName = document.createElement('h4')
    createName.id = 'name'
    const createLanguage = document.createElement('p')
    createLanguage.id = 'language'
    const createCurrency = document.createElement('p')
    createCurrency.id = 'currency'
    const createContinent = document.createElement('p')
    createContinent.id = 'continent'
   

    data.forEach(country => {
        filter =
            data.filter(country =>
                country.name == selectedValue
            )

    });

    filter.forEach(country => {

        
     
        console.log(country);
       
        createCapital.innerHTML = `<strong>Capital </strong>: ${country.capital}`
        createflag.src = country.flag
        createName.innerHTML = `<strong>Name  </strong>: ${country.name}`
        createLanguage.innerHTML = `<strong>Language  </strong>: ${country.languages[0].name}`
        createCurrency.innerHTML = `<strong>Currency  </strong>: ${country.currencies[0].name}`
        createContinent.innerHTML = `<strong>Continent </strong> : ${country.region}`
        


        let appendedCard = selectedValueDetailsDisplay.appendChild(createCard)
        appendedCard.appendChild(createName)
        appendedCard.appendChild(createflag)
        appendedCard.appendChild(createCapital)
        appendedCard.appendChild(createLanguage)
        appendedCard.appendChild(createCurrency)
        appendedCard.appendChild(createContinent)
       

    })

    
}


function checkForExistingCard(){
    let removeCreateCard = document.getElementById('removeId')
    if(!removeCreateCard) getDetails()
    else{
        removeCreateCard.remove()
        getDetails()
    }

}


button.addEventListener('click', fetchData)

