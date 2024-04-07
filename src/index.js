// Your code here
//apiURL declaration
const apiURL = 'http://localhost:3000/films'
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
  console.log(data)
//loading the titles in the list
    const allMovieTitles = document.querySelector('#films')
    allMovieTitles.innerHTML = ''
    data.forEach((title, index)=> {
        const movieTitlesList = document.createElement('li')
        movieTitlesList.innerText = title.title

        //delete button
        const deleteTitle = document.createElement('button')
        deleteTitle.innerText = 'Delete'
        deleteTitle.classList.add('delete-button')
        deleteTitle.addEventListener('click', () =>{
          movieTitlesList.remove();
          deleteFromServer(title.id)
        })

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


//End


})


