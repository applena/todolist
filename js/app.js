'use strict';

//Removes the fireworks at start-up


var addDaily = document.getElementById('dailyForm');
var addToDo = document.getElementById('todoForm');
var dailyListHead = document.getElementById('dailyLegend');
var todoListHead = document.getElementById('todoLegend');

//Need a task object; should use a constructor
function Task(taskName, taskDescript, taskType, dueDate, pointValue){
  this.name = taskName;
  this.description = taskDescript;
  this.taskType = taskType;
  this.dueDate = dueDate;
  this.value = pointValue;
  Task.allTasks.push(this);
}
Task.allTasks = [];


function buildTasks(){
  new Task('task 1', 'task 1 description - synch', 'daily', 'now', 1);
  new Task('task 2', 'task 2 description - synch', 'daily', 'soon', 5);
  new Task('task 3', 'task 3 description - asynch', 'toDo', 'later', 8);
  localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
}

function addTask(taskName, taskDescript, taskType, dueDate, pointValue){
  //check for uniqueness for all tasks, regardless of type
  let index = getTaskIndexByName(taskName);
  if( !( index || index === 0 ) ){
    new Task(taskName, taskDescript, taskType, dueDate, pointValue);
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    //How do we need to handle duplicate task names?
    console.log('Task name already in use, use something else');

  }
}

function getTaskIndexByName(taskName){
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].name === taskName){
      return i;
    }
  }
}

function updateTask(taskName, taskDescript, taskType, dueDate, pointValue){
  let index = getTaskIndexByName(taskName);
  if( index || index === 0 ){
    Task.allTasks[index].description = taskDescript;
    Task.allTasks[index].taskType = taskType;
    Task.allTasks[index].dueDate = dueDate;
    Task.allTasks[index].value = pointValue;
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    //How do we need to handle updating a non-existent task?
    console.log('Task does not exist; try adding a task with that name instead');
  }
}

function removeTask(taskName){
  let index = getTaskIndexByName(taskName);
  if( index || index === 0 ){
    let removedTask = Task.allTasks.splice(index,1);
    console.log('removing ' + removedTask);
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    console.log('No task with that name exists.');
  }
}

function generateTasks(){
  var myTasks = localStorage.getItem('tasks');
  if(!myTasks || myTasks.length === 0){
    buildTasks();
  }
  else{
    Task.allTasks = JSON.parse(myTasks);
  }
}

generateTasks();

function renderDaily(){
  let fieldsetElement = addElement('fieldset','',dailyListHead);
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].taskType === 'daily'){
      let labelElement = addElement('label', Task.allTasks[i].name, fieldsetElement);
      let inputElement = addElement('input','',labelElement);
      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);
    }
    else{
      console.log('Not a daily task - type is: ' + Task.allTasks[i].taskType);
    }
  }
}
renderDaily();

function renderToDo(){
  let fieldsetElement = addElement('fieldset','',todoListHead);
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].taskType === 'toDo'){
      let labelElement = addElement('label', Task.allTasks[i].name, fieldsetElement);
      let inputElement = addElement('input', '', labelElement);
      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);
    }
    else{
      console.log('Not a toDo task - type is: ' + Task.allTasks[i].taskType);
    }
  }
}
renderToDo();

function addElement(tag,elementContent,parentElement){
  let newElement = document.createElement(tag);
  if(elementContent){
    let newElementContent = document.createTextNode(elementContent);
    newElement.appendChild(newElementContent);
  }
  parentElement.appendChild(newElement);
  return(newElement);
}

//need a handler to update daily task list

function updateDaily(event){
  console.log('Before the preventDefault');
  event.preventDefault();
  console.log('updateDaily submitted');
}

// //  change the object to delete the list & add the new update list.
addDaily.addEventListener('submit', updateDaily);




//need a handler to update non-daily To Do list
//  change the object to delete the list & add the new update list.
function updateToDo(event){
  console.log('Before the preventDefault');
  event.preventDefault();
  console.log('updateToDo submitted');
}

addToDo.addEventListener('submit', updateToDo);


// function for adding fireworks then setting timer to remove
//if points = 5, 10, 15, 20....false  else true
// function myFunction(true) {
//   setTimeout(function(){ alert("Hello"); }, 3000);
// else{
//   var sheetToBeRemoved = document.getElementById('fireworksOnOff');
// var sheetParent = sheetToBeRemoved.parentNode;
// sheetParent.removeChild(sheetToBeRemoved);
// }
// }

if (true) {
  var sheetToBeRemoved = document.getElementById('fireworksOnOff');
  var sheetParent = sheetToBeRemoved.parentNode;
  sheetParent.removeChild(sheetToBeRemoved);
}



