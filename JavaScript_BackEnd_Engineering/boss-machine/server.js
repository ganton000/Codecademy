const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = app;

const PORT = process.env.PORT || 4001;

//enable all cors requests
app.use(cors());

//parse application/json
app.use(bodyParser.json());



//Import router
const apiRouter = require('./server/api');

//Mount apiRouter
app.use('/api', apiRouter)


// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`CORS-enabled web server is now listening on PORT: ${PORT}...`)
  })
}
