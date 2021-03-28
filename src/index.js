let addToy = false;

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


function allToysCard(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => { 
        toys.forEach(toy => {
          toysCard(toy)
        })
    })
}
// toys.forEach(function (toyObject){

function toysCard(toyObject) {
  const divCard = document.createElement('div')
  divCard.classList.add('card')
  divCard.dataset.id = toyObject.id

        divCard.innerHTML = `  
          <h2>${toyObject.name}</h2>
          <img src="${toyObject.image}" class="toy-avatar" />
          <p>${toyObject.likes} Likes </p>
          <button class="like-btn">Like <3</button>`

  const collection = document.querySelector('div#toy-collection')
  collection.append(divCard)
}

const form = document.querySelector('form.add-toy-form')

form.addEventListener('submit', function(e){
    e.preventDefault()

    const name = e.target[0].value
    const image = e.target[1].value

    const newToyObject = {

      name,
      image,
      likes: 0
    }
    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newToyObject)
    })
          .then(response => response.json())
          .then(newToy => {
            toysCard(newToy)
          })
      form.reset()
})

const toyCollection = document.querySelector("div#toy-collection")

toyCollection.addEventListener("click", event => {

      const divCard = event.target.closest('div')

      //console.log(divCard)
      if(event.target.matches('button.like-btn')) {

        const likesPTag = divCard.querySelector('p')
        const currLikes = parseInt(likesPTag.textContent) + 1
        likesPTag.textContent = `${currLikes} Likes`

        fetch(`http://localhost:3000/toys/${divCard.dataset.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },

          body: JSON.stringify({ likes: currLikes})

      })
        .then(resp => resp.json())
        .then(data => console.log(data))
      }
})

allToysCard()