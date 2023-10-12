// com'è fatto un evento?

// - name (string)
// - description (string)
// - price (number / string)
// - time (string)

// dobbiamo recuperare i dati dal form, impacchettarli, e spedirli alla API tramite una fetch con metodo POST

// prendiamo un riferimento al form, e lavoriamo con il suo submit
const formReference = document.getElementById('form')
formReference.addEventListener('submit', function (e) {
  e.preventDefault() // fermiamo il comportamento di default
  console.log("invio i dati all'API")

  // dobbiamo ora recuperare i valori individuali degli input
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const timeInput = document.getElementById('time')

  // ora mi basterà leggere le loro proprietà "value" per ottenere i valori correnti del form

  const newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    time: timeInput.value,
  }

  console.log("Ecco l'oggetto che manderò alle API", newEvent)

  // METODI HTTP
  // GET -> chiedo dati
  // POST -> creo un nuovo dato
  // PUT -> modifico un dato esistente
  // DELETE -> elimino un dato esistente

  // oggetto pronto! è arrivato il momento di spedirlo all'API
  fetch('https://striveschool-api.herokuapp.com/api/agenda', {
    method: 'POST', // dichiaro che questa chiamata non è una GET, ma una POST
    body: JSON.stringify(newEvent), // invio il mio evento alle API, ma devo prima trasformarlo in stringa!
    headers: {
      // headers è un oggetto in cui inseriamo le nostre "meta-informazioni"
      'Content-Type': 'application/json', // informiamo l'API che anche se il nostro body sta arrivando sotto forma
      // di stringa, in origine era un oggetto! e che quindi va ri-parsato a destinazione
    },
  })
    .then((res) => {
      console.log('OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST', res)
      if (res.ok) {
        // la nostra chiamata POST è andata a buon fine, e l'evento è stato salvato!
        alert('EVENTO SALVATO CORRETTAMENTE!')
      } else {
        // la nostra chiamata POST NON è andata a buon fine, e c'è stato un errore!
        // esplora il tab "Network" per capire cosa è andato storto
        alert("ERRORE NEL SALVATAGGIO DELL'EVENTO")
        throw new Error('Errore nella POST')
      }
    })
    .catch((err) => {
      console.log('Si è verificato un errore:', err)
    })
})
