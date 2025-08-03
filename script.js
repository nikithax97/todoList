const addBtn = document.getElementById('task-btn');
const input = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
let tasks = [];
const buttons = document.querySelectorAll('.filter-btn');
console.log(buttons);
let currentFilter = 'all';
let filterArr = [];
const taskCounter = document.querySelector('.completed');
const clearCompletedButton = document.getElementById('clear-btn');

addBtn.addEventListener("click",() => {
    let taskText = input.value;
    console.log(taskText);

    addTask(taskText);
    //
    //tasks.push(taskText);
    console.log(tasks);

    applyFilter()

    input.value = '';
});

input.addEventListener("keypress", (e) => {
    if(e.key === 'Enter') {
        let taskText = input.value;
        console.log(taskText);
        addTask(taskText);
        console.log(tasks);
        

        applyFilter();

        input.value = '';
    }
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttons.forEach((b) => {
            b.classList.remove('active');
        })
        btn.classList.add('active');
        currentFilter = btn.getAttribute("data-filter");
        //console.log(currentFilter);
        applyFilter();
    });
});

function applyFilter(){
    if(currentFilter === 'all') {
        filterArr = tasks;
    } else if (currentFilter === 'active') {
        filterArr = tasks.filter(task => task.completed === false);
    } else{
        filterArr = tasks.filter(task => task.completed === true);
    }
    showTasks();
 };

 function addTask(userInput) {
    const newTask = {
        id : generateTaskId(),
        text : userInput,
        completed : false
    };
    console.log('the new task is', newTask);
    tasks.push(newTask);
 };

 function showTasks() {
    taskList.innerHTML = "";
    if(tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">Your to-do list is empty</li>'
    };
    filterArr.forEach((task) => {
        let li = document.createElement('li');
        li.setAttribute("data-id", task.id); 
        //create elements inside li
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const deleteBtn = document.createElement('button');
        //adding attributes and values
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed; //false

        checkbox.addEventListener('change', () => {
            handleToggle(task.id);
        })
        span.innerText = task.text;
        if(checkbox.checked === true) {
            span.classList.add('completed');
        }
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            applyFilter();
        })
        updateCounter();
        //append inside li
        li.append(checkbox);
        li.append(span);
        li.append(deleteBtn);
        //append li to taskList
        console.log(li);
        taskList.append(li);
    })
 };

 function handleToggle(id) {
    //grab array of objects
    //right now each object has completed status to false
    //don't change the complete status in any of those objects
    //except the one which user is clicked
    tasks = tasks.map((task) => {
        if(task.id === id) {
            return {...task, completed : !task.completed}
        } else {
            return task;
        }
    })
    applyFilter();
    updateCounter();
 };

 function updateCounter() {
    const activeTasks = tasks.filter((task) => !task.completed).length;
    taskCounter.innerText = `${activeTasks} item${activeTasks !== 1 ? 's' : ''} left`;
 };

 clearCompletedButton.addEventListener("click",() => {
    tasks = tasks.filter(task => !task.completed);
    applyFilter();
    updateCounter();
 });

 function generateTaskId() {
    return  Math.floor(1000 + Math.random() * 9000);
 };

document.addEventListener("DOMContentLoaded", () => {
    applyFilter();
 });
