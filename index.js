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

// to show the task in home page
app.get('/', (req, res) => {
    Tasks.find({}, (err, tasks) => {
        if (err) {
            console.log("Error in fething tasks from the database");
            return;
        }
        // console.log('task', tasks);
        res.render('home', {
            title: "Todo_list App",
            tasks_list: tasks,
            noDeadline : "NO DEADLINE"
        })
    });
    // console.log(Tasks.find().model());
});

// to create a new task
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

// to search any task a/c to their category
app.get('/search-task', (req, res)=>{
    Tasks.find({category : req.body.search_task}, (err, task)=>{
        if(err){
            console.log("Unable to find");
            return;
        }
        res.send(task);
    })
});

// to delete every tasks at once
app.post('/delete-task', (req, res) => {
    Tasks.deleteMany({}, (err, deleteTask)=>{
        if(err){
            console.log("Error in deleting task");
            return;
        }
        return res.redirect('back'); 
    });
});

// to delete each task individually
app.get('/del-task/', (req, res)=>{
    let id = req.query.id;
    Tasks.findByIdAndDelete(id, (err)=>{
        if(err){
            return console.error("Error in deleting task from database");
        }

        return res.redirect('back');
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server connection error");
    }

    console.log("Server connected succefully on port", port);
});