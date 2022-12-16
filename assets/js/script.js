// var checkbox = document.getElementById('complete_task');
// console.log(checkbox);
// var taskList = document.getElementById('task-list-id');
// checkbox.addEventListener('click', taskCompleted);
// function taskCompleted(){
//     taskList.classList.toggle('task-completed');
// }


document.getElementById('complete_task').addEventListener('click', ()=>{
    document.getElementById('task-list-id').classList.toggle('task-completed');
});