const express = require('express');
const fetch = require('node-fetch');

const app = express();

const { quotes } = require('./data');
const { getRandomElement, generateIds, getIndexById } = require('.utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Get routes - get data from quotes array

app.get('/api/quotes', (req, res) => {
    let quoteMatch;
    let quoteSearch = req.query.person;
    if (quoteSearch === undefined) {
        res.send({quotes: quotes})
    } else {
        quotesMatch = quotes.filter(quote => {
            quote.person === (quoteSearch && quote);
        });
        if (quoteMatch) {
            res.send( { quotes: quotesMatch })
        } else {
            res.status(404).send('Author not found!');
        }
    }
})

app.get('/api/quotes/random', (req, res) => {
    let randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote})
})

//Post route - add new quotes to the array

app.put('/api/quotes/:id', (req, res) => {
    if (req.query.person && req.query.quote) {
        const quoteIndex = getIndexById(req.params.id, quotes);

        if (quoteIndex !== -1){
            quotes[quoteIndex] = req.query
            getPersonInfo(quotes);
            res.send({quote: req.query});
        } else {
            res.status(404).send('Quote not found with the id provided!');
        }
    } else {
        res.status(400).send("There's a missing parameter with the rest")
    }
})

//Delete route - handles delete requests
app.delete('/api/quotes/:id', (req, res) => {
    const quoteIndex = getIndexById(req.params.id, quotes);
    if (quoteIndex !== -1) {
        quotes.splice(quoteIndex, 1)
        res.send( {quote: quotes[quoteIndex]});
    } else {
        res.status(404).send('Quote not found with the id provided!')
    }
})


const getPersonInfo = (arr) => {
    //makes get request ot wikipedia API with a Title param as value of quotes.person
    // the GET request returns a Json with short description of person being searched

    arr.forEach(quote => {
        if (!quote.description) {
            fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${quote.person}`)
            .then( response => {
                return response.json()
            })
            .then(jsonResponse => {
                let pageInfo = jsonResponse.query.pages;
                Object.keys(pageInfo).forEach(item => {
                    quote.description = pageInfo[item].extract;
                });
            })
            .catch(error => {
                console.log(error)
                quote.description ='No Description Available'
            })
        }
    })
}


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    // assign an id for all quotes already in array
    generateIds(quotes);
    //each time server is started, will get biographical blurbs for all persons
    getPersonInfo(quotes);
})

