"use strict "

let mainDiv = document.querySelector('.main-div')

let backButton = document.createElement('button')
backButton.id = 'back-btn'
backButton.setAttribute ("onclick","window.location.reload()")    
backButton.innerHTML = '<i class="bi bi-arrow-return-left"></i>  Back '
let backBtnSpan = document.getElementById('bk-btn')

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
    createCard.style ='border:1px solid;'
    createCard.id = 'removeId'

    const createflag = document.createElement('img')
    createflag.style = 'hieght:150px;width:150px;'

    const createCapital = document.createElement('p')

    data.forEach(country => {
        filter =
            data.filter(country =>
                country.name == selectedValue
            )

    });

    filter.forEach(country => {

        button.remove()
        createDropDown.remove()
        console.log(country);
        backBtnSpan.appendChild(backButton)
        createCapital.innerHTML = country.capital
        createflag.src = country.flag


        let appendedCard = selectedValueDetailsDisplay.appendChild(createCard)
        appendedCard.appendChild(createflag)
        appendedCard.appendChild(createCapital)

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

