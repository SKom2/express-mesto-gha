const express = require('express');
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
})
app.get('/', (req, res) => {
  res.send('HI1');
});

app.listen(PORT, () => {
  console.log('Server is running on 3000');
})