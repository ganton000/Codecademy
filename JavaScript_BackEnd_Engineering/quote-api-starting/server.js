const { application } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));



app.get('/api/quotes/random', (req, res) => {
    if (req.params.name){
      const response = {
      quote: getRandomElement(quotes)
      }
      res.status(200).send(response)
    } else {
        res.status(404).send()
    }
  
  });

  app.get('/api/quotes', (req, res) => {
      if (req.query.person !== undefined){
          const newQuote = quotes.filter(quote => quote.person === req.query.person);
          res.status(200).json({
              quotes: newQuote
          })
     } else if  (req.query) {
          let response = {
              quotes: quotes
          }
          res.status(200).send(response)
      } else {
          res.status(404).send();
      }
    
    });
  
  app.post('/api/quotes', (req, res) => {
    let quote = req.query.quote;
    let person = req.query.person;
    if (quote && person) {
        quotes.push({quote, person})
        res.status(200).send({ quote: {quote, person} });
    } else {
      res.status(400).send();
    }
  });

  app.listen(PORT, () => {
    console.log(`Server connected and listening on port ${PORT}.`)
  });