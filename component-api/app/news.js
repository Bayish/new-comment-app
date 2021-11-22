const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid')
const config = require('../config');
const mysqlDb = require("../mysqlDb");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});


const upload = multer({storage});
const router = express.Router();



router.get('/', async(req, res) => {
  try{
    const [news] = await mysqlDb.getConnection().query('SELECT * from ??', ['posts']);
    res.send(news);
  }catch{
    res.sendStatus(500)
  }
});

router.get('/:id', async(req, res) => {
  try{
    const [news] = await mysqlDb.getConnection().query(
        `SELECT * from ?? where id = ? `, ['posts',req.params.id]
    );
    if(!news[0]){
      return res.status(404).send({error: 'News not Found'});
    }
    res.send(news[0]);
  }catch{
    res.sendStatus(500);
  }
});

router.post('/', upload.single('image'), async(req, res) => {
  if(!req.body.title || !req.body.description){
    return res.status(404).send({error: 'Date not valid'});
  }

  const newsData = {
    title: req.body.title,
    description: req.body.description,
  }

  if(req.file){
    newsData.image = req.file.filename;
  }else{
    newsData.image = null;
  }

  const [newNews] = await mysqlDb.getConnection().query(
    'INSERT INTO ?? (title,  description, image) values(?, ?, ?)',
    ['posts', newsData.title,  newsData.description, newsData.image]
  );

  res.send({
    ...newsData,
    id: newNews.insertId
  });
});

router.put('/:id', upload.single('image'), async(req, res) => {
  try{
    const news = {
      title: req.body.title,
      description: req.body.description,
    };

    if(req.file) news.image = req.file.filename;

    await mysqlDb.getConnection().query(
        'UPDATE ?? set ? where id = ?',
        ['posts', {...news}, req.params.id]
    );

    res.send({message: `Update successful, id=${req.params.id}`});
  }catch(e){
    res.status(400).send({error: e})
  }
});

router.delete('/:id', async(req, res) => {
  try{
    const news = await mysqlDb.getConnection().query('DELETE FROM ?? WHERE ID = ?', ['posts', req.params.id]);

    if(!news[0].affectedRows){
      res.status(404).send({error: 'News not found'});
    }else {
      res.send({message: `News ID: ${req.params.id} removed`});
    }
  }catch{
    res.sendStatus(500)
  }
})

module.exports = router
