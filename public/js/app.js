console.log('Client side js is loaded!!!')



//? nakuha sa index.hbs (<form></form>)
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'Loading...'
messageTwo.textContent = ' '


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                messageOne.textContent = data.error
            }
            
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })
})

//? app.js:18 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
//! go to index.hbs to solve this, yung pagkakasunod sunod sa html check first, nilipat yung scrip from tass to ilalim