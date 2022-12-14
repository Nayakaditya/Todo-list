const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');


const taskSchema = new mongoose.Schema({
    tasks : {
        type: String,
        required: true
    },
    category : {
        type : String,
        required: true
    },
    duedate : {
        type : String,
        required : true
    }
});

const tasks_text = process.env.TASK_TEXT;
taskSchema.plugin(encrypt, {secret : tasks_text, encryptedFields: ['tasks']})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;