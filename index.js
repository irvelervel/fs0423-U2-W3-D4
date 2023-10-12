// questa è la logica che verrà applicata alla landing page, ovvero index.html
// dobbiamo:
// 1) con una fetch, recuperare gli eventi disponibili
// 2) dobbiamo generare, per ogni evento, una colonna con dentro la sua card di informazioni

const renderEvents = function (arrayOfEvents) {
  // riferimento alla riga
  const row = document.getElementById('events-row')

  arrayOfEvents.forEach((event) => {
    // ora qua creerò una col nel DOM per ogni evento!
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
    // <div class="col col-12 col-sm-6 col-md-3"></div>
    newCol.innerHTML = `
    <div class="card">
        <img src="https://ichef.bbci.co.uk/images/ic/1200x675/p0fq9cyz.jpg" class="card-img-top" alt="generic concert picture">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <p class="card-text">${new Date(event.time).toLocaleDateString(
              'it-IT'
            )} - Prezzo: ${event.price}€</p>
            <a href="./detail.html?eventId=${
              event._id
            }" class="btn btn-primary">DETTAGLI</a>
        </div>
    </div>
    `
    row.appendChild(newCol)
  })
}

const hideSpinner = function () {
  // nascondo lo spinner, perchè la Promise non è più in pending
  const spinner = document.getElementById('loading-spinner')
  spinner.classList.add('d-none')
}

const getEvents = function () {
  fetch('https://striveschool-api.herokuapp.com/api/agenda')
    .then((res) => {
      hideSpinner()

      console.log('Response ottenuta dalla GET', res)
      if (res.ok) {
        // la chiamata è terminata correttamente con un 200
        return res.json()
      } else {
        throw new Error('Errore nel contattare il server')
      }
    })
    .then((events) => {
      console.log('EVENTS', events)
      // qua ora dovremmo creare delle cards per ogni evento ricevuto!
      // delego questo codice ad una funzione separata che chiamo renderEvents
      renderEvents(events)
    })
    .catch((err) => {
      hideSpinner()
      console.log('Si è verificato un errore:', err)
    })
}

getEvents()
