require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const db = require('./config/mongoose');
const Tasks = require('./models/task_schema');

const app = express();

// to set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded());
app.use(express.static('./assets'));

// const tasks_list = [
//     {
//         title : "First Todo app",
//         category : "Sports",
//         duedate : '2022-12-13'
//     }
// ]

app.get('/', (req, res) => {
    Tasks.find({}, (err, tasks) => {
        if (err) {
            console.log("Error in fething tasks from the database");
            return;
        }
        console.log('task', tasks);
        res.render('home', {
            title: "Todo_list App",
            tasks_list: tasks
        })
    });
    console.log(Tasks.find().model());
});

app.post('/create-task', (req, res)=> {
    Tasks.create({
        tasks: req.body.tasks,
        category: req.body.category,
        duedate: req.body.duedate
    }, function (err, newTask) {
        if (err) {
            res.send("Error in creating a task");;
            return;
        }

        console.log("New task ", newTask);
        return res.redirect('back');
    });
});

app.post('/delete-task', (req, res) => {
    return res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server connection error");
    }

    console.log("Server connected succefully on port", port);
});