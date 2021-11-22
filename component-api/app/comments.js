const express = require('express');
const mysqlDb = require("../mysqlDb");

const router = express.Router();


router.get('/', async (req, res) => {
    let comments = '';
    try {
        if (req.query.posts_id) {
            [comments] = await mysqlDb.getConnection().query('select * from ?? where posts_id = ?;', ['comments', req.query.posts_id]);
        } else {
            [comments] = await mysqlDb.getConnection().query('SELECT * FROM comments');
        }
        res.send(comments);
    } catch {
        res.sendStatus(500)
    }
});


router.post('/', async (req, res) => {
    if (!req.body.comment || !req.body.posts_id) {
        return res.status(404).send({error: 'Date not valid'});
    }

    const [news] = await mysqlDb.getConnection().query('SELECT * FROM ?? WHERE ID = ?', ['posts', req.body.posts_id])

    if(!news[0]){
        res.status(404).send({error: 'News not found'})
    }
    const comment = {
        posts_id: req.body.posts_id,
        author: req.body.author || "Anonymous",
        comment: req.body.comment,
    };

    try {
        const [newComment] = await mysqlDb.getConnection().query(
            'INSERT INTO ?? (posts_id, author, comment) values(?, ?, ?)',
            ['comments', comment.posts_id, comment.author, comment.comment]
        );

        res.send({
            ...comment,
            id: newComment.insertId
        });
    } catch (e) {
        console.log(e)
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query(
            'Delete from ?? where id = ?',
            ['comments', req.params.id]
        )
        res.send('Deleted successful!')
    } catch (e) {
        res.status(401).send(e.sqlMessage)
    }
});

module.exports = router
