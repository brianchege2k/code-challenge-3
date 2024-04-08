// Your code here
//apiURL
const apiURL = 'https://210e-105-163-158-101.ngrok-free.app/films'
//fetch the data from server
fetch(apiURL,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
})
//conversion to json format
.then((response) => response.json())
.then((data) => {
  console.log(typeof data)
//loading the titles in the list
    const allMovieTitles = document.querySelector('#films')
    allMovieTitles.innerHTML = ''
    data.forEach((title, index)=> {
        const movieTitlesList = document.createElement('li')
        movieTitlesList.innerText = title.title
        //deleteFilm button
        const deleteFilm = document.createElement('button')
        deleteFilm.innerText =  'Delete'
        deleteFilm.addEventListener('click', () =>{
          deleteTitle(title.id) //deletes from server
          movieTitlesList.remove() //remove from html list
        })
        movieTitlesList.append(deleteFilm)

        //add an eventlistener for when a particular title is selected, the showTitleInfo function is called
        movieTitlesList.addEventListener('click', () =>{
          showTitleInfo(title)
        })
        // finally append the titles to the list
        allMovieTitles.append(movieTitlesList)
        //display the first film when page is loaded
        if(index === 0){
          showTitleInfo(title)
        }
    });
})
//function to display the movies
function showTitleInfo(title){
  //selection of various id's in the HTML
  document.querySelector('#title').innerText = title.title
  document.querySelector('#runtime').innerText = title.runtime
  document.querySelector('#film-info').innerText = title.description
  document.querySelector('#showtime').innerText = title.showtime
  document.querySelector('#ticket-num').innerText = `${title.capacity - title.tickets_sold}`
  document.querySelector('#poster').src = title.poster
}

//Buy Tickets Button, event listner used for when the button is clicked
document.querySelector("#buy-ticket").addEventListener('click', () => {
  //Get the current tickets and store in a variable
  const allAvailableTickets = document.querySelector('#ticket-num')
  let availableTickets = parseInt(allAvailableTickets.textContent)
//reduce by one ticket
  if(!isNaN(availableTickets) && availableTickets > 0){
    availableTickets --;
    //update the element
    allAvailableTickets.innerText = availableTickets;

  }
  if (availableTickets === 0){
    document.querySelector('#buy-ticket').innerText = 'Sold Out'
  }

})
//delete Title from server function 
function deleteTitle(id){
  fetch(`${apiURL}/${id}`, {
    method:'DELETE'
  })
  .then(resp => {
    if(resp.ok){
      alert('Title Deleted Successfullly.');
    }else{
      alert('Error deleting Title')
    }
  })
}
  




