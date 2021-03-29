let addToy = false;

const url = 'http://localhost:3000/toys'
const toyCollection = document.querySelector('div#toy-collection')
const toyForm = document.querySelector('form.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function toysCard (card) {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')
  cardDiv.dataset.id = card.id
  const h2 = document.createElement('h2')
  h2.textContent = card.name
  const img = document.createElement('img')
  img.classList.add('toy-avatar')
  img.src = card.image
  const pTag = document.createElement('p')
  pTag.textContent = `${card.likes} Likes`
  const likeButton = document.createElement('button')
  likeButton.classList.add('like-btn')
  likeButton.textContent = 'Likes'
  cardDiv.append(h2, img, pTag, likeButton)
  toyCollection.append(cardDiv)
}
function allToyCards() {
  fetch(url)
  .then(response => response.json())
  .then(toyCardObject => {
    toyCardObject.forEach(cardObject => {
      toysCard(cardObject)
    })
  })
}
toyForm.addEventListener('submit', event => {
  event.preventDefault()
  const name = event.target.name.value
  const image = event.target.image.value
  const newToyObject = {
    name,
    image,
    likes: 0
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(newToyObject)
  })
  .then(response => response.json())
  .then(newToy => {
    toysCard(newToy)
  })
})
toyCollection.addEventListener('click', event => {
  const cardDiv = event.target.closest('div')
  if (event.target.matches('button.like-btn')) {
    const likesPTag = cardDiv.querySelector('p')
    const currentLikes = parseInt(likesPTag.textContent) + 1
    likesPTag.textContent = `${currentLikes} Likes`
    fetch(`${url}/${cardDiv.dataset.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({likes: currentLikes})
    })
    .then(response => response.json())
    .then(like => console.log(like))
  }
})
allToyCards()
