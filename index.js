// questa è la logica che verrà applicata alla landing page, ovvero index.html
// dobbiamo:
// 1) con una fetch, recuperare gli eventi disponibili
// 2) dobbiamo generare, per ogni evento, una colonna con dentro la sua card di informazioni

const getEvents = function () {
  fetch('https://striveschool-api.herokuapp.com/api/agenda')
    .then((res) => {
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
    })
    .catch((err) => {
      console.log('Si è verificato un errore:', err)
    })
}

getEvents()
