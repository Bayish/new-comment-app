const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const news = require('./app/news');
const comments = require('./app/comments');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


const port = 8000;


app.use('/news', news)
app.use('/comments', comments);

mysqlDb.connect().catch(e => console.log(e))
app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
