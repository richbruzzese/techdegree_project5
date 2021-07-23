/**
 * Dom Elements
 */
const search = document.querySelector('.search-container')
const imgCard = document.querySelector('.card-img-container')
const cardInfo = document.querySelector('.card-info-container')
const gallery = document.querySelector('.gallery')
const searchError = document.querySelector('#error')
const modal = document.querySelector('.modal-container')
const modalCloseButton = document.querySelector('#modal-close-btn')
const modalPrev = document.querySelector('#modal-prev')
const modalNext = document.querySelector('#modal-next')

//Array of employee data fetched
let employeeData = []

//Get data from random user API
fetchData('https://randomuser.me/api/?results=12&nat=us')      
    .then(employeeCard)

/**
 * 
 * @param {*} url to fetch
 * @returns json data and stores into employeeData array
 */
function fetchData(url){
    return fetch(url)
        .then(res => res.json())
        .then(data => employeeData = data)
        .catch(err => console.log('Issue fetching data', err))
}


/**
 * 
 * @param {*} str passed is phone number object from employeeData
 * @returns formatted phone number in (xxx) xxx-xxxx format
 */
function formatPhone(str){
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

/**
 * 
 * @param {*} data passed is employeeData pulled from fetch request
 * Function will create and insert div elements onto the page for each employee
 */
function employeeCard(data){
    for(let i = 0; i< data.results.length; i++){
        let employee = data.results[i]
        let newDiv = document.createElement('div')
        newDiv.classList.add('card')
        gallery.appendChild(newDiv)
        newDiv.insertAdjacentHTML('beforeend',`
        
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.medium}" alt="profile-photo">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `)
        newDiv.addEventListener('click', () => displayModal(employee, i))
    }

}

/**
 * 
 * @param {*} employee is employee item to display in the modal windo
 * @param {*} index is the current index value to allow to cycle through employee objects
 */
function displayModal(employee, index){
    let card = index
    const location = employee.location
    const streetInfo = location.street
    let date = new Date(employee.dob.date)
    let phone = formatPhone(employee.phone)
    modal.style.display = 'flex'    
        
    // Only display buttons for previous and next in modal if they are not the first and last items
        if(card === 0){modalPrev.style.display = 'none'}else{
        modalPrev.style.display = 'inline-block'
        }
        if(card === 11){modalNext.style.display = 'none'}else{
        modalNext.style.display = 'inline-block'
        }

    // Replace the elements within the modal inner html
    modal.firstElementChild.firstElementChild.nextElementSibling.innerHTML = `
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first}, ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${streetInfo.number} ${streetInfo.name}, ${location.city}, ${location.state} ${location.postcode}</p>
            <p class="modal-text"><b>Birthday</b>: ${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()}</p>
    `
    //Event Listeners for closing the modal, viewing previous, and viewing next
    modalCloseButton.addEventListener('click', () => {
        modal.style.display = 'none'
        search.firstElementChild.firstElementChild.value = ''
    })
    modalNext.addEventListener('click', () =>{
        if(card < 11){
            card++
            displayModal(employeeData.results[card], card)
        }
    })
    modalPrev.addEventListener('click', () =>{
        if(card > 0){
            card--
            displayModal(employeeData.results[card], card)
        }
    })
    


}
/**
 * Event listener for search bar.  Will display the modal for the matched search.
 * If no match, display an error that employee not found
 */
search.addEventListener('submit', () =>{
    let searchInput = search.firstElementChild.firstElementChild.value.toLowerCase();
    console.log(searchInput)
    for(let i = 0; i< employeeData.results.length; i++){
        let fName = employeeData.results[i].name.first.toLowerCase()
        let lName = employeeData.results[i].name.last.toLowerCase()
        if(fName.includes(searchInput) || lName.includes(searchInput)){
                displayModal(employeeData.results[i], i)
                searchError.innerHTML=''
                break;
            }else{
                searchError.innerHTML = 'Employee not found'
                setTimeout(() => searchError.innerHTML = '', 3000)
        }
    }
    
})
