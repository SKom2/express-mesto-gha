const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '646a4983092ac7c6b4de1a7a'
  };

  next();
});
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
});
app.use(router);

app.listen(PORT, () => {
  console.log('Server is running on 3000');
});
