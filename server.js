const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(process.env.PORT, () => console.log('listening'));
app.use(express.static('public'));
app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    data.sort((a,b) => {
      if (a.timesticker > b.timesticker) return -1;
      else return 1;
    });
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  data.timesticker = Date.now()
  database.insert(data);
  response.json(data);
});
