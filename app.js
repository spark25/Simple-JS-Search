const searchBar = document.querySelector('[data-search-bar]');
const cardsContainer = document.querySelector('[data-cards-container]');

let users = []


searchBar.addEventListener('input', handleSearch);

function isVisible() {

    return true
}
function handleSearch(e) {
    const query = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
        user.element.classList.toggle('hide', !isVisible)
    })

}


// call api
let uri = 'https://jsonplaceholder.typicode.com/users';

fetch(uri)
    .then(res => res.json())
    .then(data => {
        const cardTemplate = document.querySelector('[data-card-template]');

        users = data.map(user => {
            const card = cardTemplate.content.cloneNode(true).children[0];
            card.querySelector('.card-title').textContent = user.name
            card.querySelector('.card-email').textContent = user.email
            cardsContainer.append(card)
            return { name: user.name, email: user.email, element: card }
        });

    })