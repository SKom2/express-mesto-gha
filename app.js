const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const app = express();

app.use(express.json());
app.use(router);
// app.use(errors())

app.listen(PORT, () => {
  console.log('Server is running on 3000');
});
