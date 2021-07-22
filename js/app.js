const search = document.querySelector('.search-container')
const imgCard = document.querySelector('.card-img-container')
const cardInfo = document.querySelector('.card-info-container')
const promises = []

function fetchData(url){
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log('Issue fetching data', err))
}

fetchData('https://randomuser.me/api/')
    .then(data =>{
    makeImage(data)
    makeCard(data)
    })

// appendData()

/**
 * Functions
 */

function makeImage(data){
    const results = data.results[0]
    const picture = results.picture.medium
    const html = `
    <img class="card-img" src="${picture}" alt="profile photo">
    `

    imgCard.innerHTML = html

}
function makeCard(data){
    console.log(data)
    const result = data.results[0]
    const fName  = result.name.first
    const lName = result.name.last
    const email = result.email
    const city = result.location.city
    const state = result.location.state
    const html = `
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${lName}, ${fName}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
        </div>
    `

    cardInfo.innerHTML = html
}