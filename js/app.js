const search = document.querySelector('.search-container')
const employeeItem = document.getElementById('gallery')

function fetchData(url){
    return fetch(url)
        .then(res => res.json())
        .then (data => console.log(data.results[0].name))
        .catch(err => console.log('Issue fetching data', err))
}
fetchData('https://randomuser.me/api/')
