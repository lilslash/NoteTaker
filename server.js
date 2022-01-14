const { json } = require('express');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('/api/notes',(req, res) => {
    return res.json(db)
})
app.post('/api/notes',(req, res) => {
    const notes = req.body
    notes.id = Math.floor((Math.random()* 1000)+1)
    db.push(notes)
    return res.json(notes)
})
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    for(let i = 0; i<db.length; i++) {
        if(db[i].id == id){
            db.splice(i,1)
            break
        }
    }
    return res.json(db)
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
})
