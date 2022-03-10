// Code taken from discussions on codecademy

const submitButton = document.getElementById('submit-quote');
const deletedQuoteContainer = document.getElementById('deleted-quote');

submitButton.addEventListener('click', () => {
    const quoteId = document.getElementById('quote-id').value;

    fetch(`/api/quotes/${quoteId}`, {method: 'DELETE'})
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(
        ({ quote }) => {
            console.log(quote)
            const deletedQuote = document.createElement('div');
            deletedQuote.innerHTML = `
            <h3> 'You deleted this quote correctly!' </h3>
            <div class ="quote-text">${quote.quote}</div>
            <div class="attribution"> -${quote.person}</div>
            <p>Go to <a href="index.html">home page</a> to request and view more quotes.</p>
            `
            deletedQuoteContainer.appendChild(deletedQuote)
        });

});