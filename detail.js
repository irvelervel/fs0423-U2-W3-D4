// la prima cosa da fare sarà una chiamata API con una fetch tipo:
// fetch('https://striveschool-api.herokuapp.com/api/agenda/6527b1910bdded00189a7954')
// devo riuscire a traportarmi nella pagina detail l'_id dell'evento su cui ho cliccato

// sono riuscito a trasportare l'_id dell'evento su cui ho cliccato tramite i QUERY PARAMETERS
// ora l'indirizzo della pagina details è qualcosa così: http://127.0.0.1:5500/detail.html?eventId=6527b1910bdded00189a7954
// mi manca solamente da recuperare via JS il valore di questo eventId e utilizzarlo per la mia fetch dei dettagli

// una fetch('https://striveschool-api.herokuapp.com/api/agenda') <-- ci torna TUTTI gli eventi dell'agenda
// una fetch('https://striveschool-api.herokuapp.com/api/agenda/6527b1910bdded00189a7954')
// <-- ci torna SOLAMENTE I DETTAGLI DELL'EVENTO con _id "6527b1910bdded00189a7954"

// recuperiamo l'eventId dalla barra degli indirizzi :)
const addressBarContent = new URLSearchParams(location.search)
// questo crea un oggetto di tipo URLSearchParams a partire dal contenuto della barra degli indirizzi
// recupero nello specifico eventId
const eventId = addressBarContent.get('eventId') // <-- recupero solamente il valore di eventId
console.log(eventId)

// ora facciamo una fetch molto specifica per ottenere i dettagli dell'evento su cui ho cliccato
// utilizzerò l'indirizzo "standard", /agenda, e ci concatenerò l'id che ho prelevato dal parametro nella barra degli indirizzi

const deleteEvent = function () {
  // questa funzione servirà ad eliminare l'evento corrente
  fetch('https://striveschool-api.herokuapp.com/api/agenda/' + eventId, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        // EVENTO ELIMINATO CORRETTAMENTE!
        alert('EVENTO ELIMINATO')
        location.assign('./index.html') // facciamo tornare l'utente in homepage
      } else {
        alert("Problema con l'eliminazione dell'evento")
        throw new Error('Errore nella DELETE')
      }
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

const generateEventDetails = function (details) {
  // prendo un riferimento alla row
  const row = document.getElementById('event-details')
  row.innerHTML = `
        <div class="col col-12 col-lg-6">
            <h2 class="text-center">DETTAGLI DELL'EVENTO</h2>
            <img
              src="https://ichef.bbci.co.uk/images/ic/1200x675/p0fq9cyz.jpg"
              class="w-100"
              alt="generic concert picture"
            />
            <h3 class="text-center mt-4">${details.name}</h3>
            <p>
              ${details.description}
            </p>
            <p>Quando:${new Date(details.time).toLocaleDateString('it-IT')}</p>
            <p>Prezzo: ${details.price}€</p>
            <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
            <a class="btn btn-warning" href="./backoffice.html?eventId=${
              details._id
            }">MODIFICA</a>
        </div>
    `
}

const getSingleEventDetails = function () {
  fetch('https://striveschool-api.herokuapp.com/api/agenda/' + eventId)
    .then((res) => {
      if (res.ok) {
        // abbiamo ottenuto i dettagli del singolo evento su cui abbiamo cliccato
        // recuperiamo il suo JSON
        return res.json()
      } else {
        throw new Error('Errore nel caricamento dei dettagli')
      }
    })
    .then((eventData) => {
      // eventData è UN OGGETTO! sono i singoli dettagli dell'evento, il suo name, il suo price, etc.
      generateEventDetails(eventData)
    })
    .catch((err) => console.log('ERRORE', err))
}

getSingleEventDetails()
