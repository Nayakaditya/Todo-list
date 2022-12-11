require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT;
const db = require('./config/mongoose');
const Tasks = require('./models/task_schema');

const app = express();

app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.get('/', (req, res)=>{
    res.render('home',{
        title : "Ejs home page"
    });
});

app.post('/create-task', (req, res)=>{
    res.send(req.body);
    return res.redirect('/');
});

// app.post('/delete-task', (req, res)=>{
//     return res.redirect('/');
// });

app.listen(port, (err)=>{
    if(err){
        console.log("Server connection error");
    }

    console.log("Server connected succefully on port", port);
});