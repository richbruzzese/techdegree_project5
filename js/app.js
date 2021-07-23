const search = document.querySelector('.search-container')
const imgCard = document.querySelector('.card-img-container')
const cardInfo = document.querySelector('.card-info-container')
const gallery = document.querySelector('.gallery')
const searchError = document.querySelector('#error')
let employeeData = []

function fetchData(url){
    return fetch(url)
        .then(res => res.json())
        .then(data => employeeData = data)
        .catch(err => console.log('Issue fetching data', err))
}
        fetchData('https://randomuser.me/api/?results=12&nat=us')
            .then(employeeCard)
/**
 * Functions
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
            <h3 id="name" class="card-name cap">${employee.name.first}, ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `)
        newDiv.addEventListener('click', () => displayModal(employee, i))
    }

}

function displayModal(employee, index){
    let card = index
    const location = employee.location
    const streetInfo = location.street
    let date = new Date(employee.dob.date)
    let phone = formatPhone(employee.phone)
    

    document.body.insertAdjacentHTML('beforeend',`
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first}, ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${streetInfo.number} ${streetInfo.name}, ${location.city}, ${location.state} ${location.postcode}</p>
            <p class="modal-text">${date.getMonth()}/${date.getDay()}/${date.getFullYear()}</p>
        </div>
        <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    </div>    
    `)
    let modalButton = document.querySelector('#modal-close-btn')
    modalButton.addEventListener('click', () => {
        modalButton.parentNode.parentNode.remove()
        search.firstElementChild.firstElementChild.value = ''
    })


}

search.addEventListener('submit', () =>{
    let searchInput = search.firstElementChild.firstElementChild.value.toLowerCase();
    console.log(searchInput)
    for(let i = 0; i< employeeData.results.length; i++){
        let fName = employeeData.results[i].name.first.toLowerCase()
        let lName = employeeData.results[i].name.last.toLowerCase()
        if(fName.includes(searchInput) || lName.includes(searchInput)){
                displayModal(employeeData.results[i])
                searchError.innerHTML=''
                break;
            }else{
                searchError.innerHTML = 'Employee not found'
        }
    }
    
})
