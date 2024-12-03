var inputTaskName = document.getElementById("inputnametask");
var inputTaskStatus = document.getElementById("inputtaskstatus");
var addTaskBtn = document.getElementById("addtaskbtn");
var inputTaskSearch = document.getElementById("inputsearchtask");
var allTasksContainer = document.getElementById("alltaskscontainer");

var updateTaskBtn = document.getElementById("updataskbtn");


var updateTaskIndex ;


// var tasks = [] ; 

// if(localStorage.getItem("tasks") !== null) {

//   tasks = JSON.parse(localStorage.getItem("tasks"))
// }


var tasks = JSON.parse(localStorage.getItem("tasks")) || []

function clear() {
  inputTaskName.value = "";

}
function addTask() {
  var newTask = {
    name: inputTaskName.value,
    isCompleted: false,
  };


  tasks.push(newTask)
  showTasks(tasks)
  clear()

  localStorage.setItem("tasks" , JSON.stringify(tasks) )

}

addTaskBtn.addEventListener("click", addTask  )



function showTasks(arr) {


  var box =``

for (var i = 0; i < arr.length; i++) {
  box += `
  
          <div class="col-md-12">


            <div class="d-flex align-items-center task ${arr[i].isCompleted == true ? "compted" : ""}">

              <input ${arr[i].isCompleted == true ? "checked" : ""}  onchange="taskDone(${i})" type="checkbox" class="mycheckbox d-none" name="" id="taskcheck-${i}">
              <label class="mylabal"  for="taskcheck-${i}"></label>
              <p class="text-white m-0"> ${arr[i].name} </p>
              <button onclick="readyToUpdate(${i})" class="btn btn-warning ms-auto"> <i class="fa-solid fa-pen-nib"></i> update</button>
              <button onclick="deleteTask(${i})" class="btn btn-danger mx-4"> <i class="fa-solid fa-trash-can"></i> delete</button>

            </div>
          </div>

    
    `;
}
allTasksContainer.innerHTML = box



}
showTasks(tasks)

function deleteTask(index) {





  tasks.splice(index , 1);
  showTasks(tasks)
  localStorage.setItem("tasks", JSON.stringify(tasks));

}

function taskDone(index) {


   
    // if (tasks[index].isCompleted == false) {
    //   tasks[index].isCompleted = true;
    // } else { 
    //   tasks[index].isCompleted = false;
    // }


    console.log("test");
    

    tasks[index].isCompleted = !tasks[index].isCompleted;

    showTasks(tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks));
}




function taskSearch() {
  var searchValue = inputTaskSearch.value.toLowerCase();

    var arr = []
  for(var i = 0; i < tasks.length; i++) { 


    if(tasks[i].name.toLowerCase().includes(searchValue)) { 


      arr.push(tasks[i])
    }

  }

    showTasks(arr)


}



inputTaskSearch.addEventListener("input" , taskSearch)





function readyToUpdate(index) {


  inputTaskName.value = tasks[index].name
 updateTaskIndex = index
  addTaskBtn.classList.add("d-none")
  updateTaskBtn.classList.remove("d-none")

}



function updateTask() {

  tasks[updateTaskIndex].name = inputTaskName.value

  showTasks(tasks)

  addTaskBtn.classList.remove("d-none")
  updateTaskBtn.classList.add("d-none")
  clear()
  localStorage.setItem("tasks", JSON.stringify(tasks));

}


updateTaskBtn.addEventListener("click" , updateTask )



function filterTasks() {

var taskSta = inputTaskStatus.value 
 
  var arr = []

  for(var i =0 ; i < tasks.length; i++) {

      if(taskSta == "All") { 

        arr.push(tasks[i])
      } else if (taskSta == "Pending" && tasks[i].isCompleted === false) { 
        arr.push(tasks[i]) 
      } else if( taskSta == "completed" && tasks[i].isCompleted === true) {
          arr.push(tasks[i])
      }


  }

  showTasks(arr)

}


inputTaskStatus.addEventListener("change" , filterTasks )











// ! not   


// console.log(  !false  );


// var age = 20


// if( age > 30) {
//   console.log(30);
  
// }


// age > 30 ? console.log(30) : ""




//             ||


// var test =  null ||  "name2"

// console.log(test);
