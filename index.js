let taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (taskText) {
        let listItem = document.createElement("li");
        listItem.innerText = taskText;

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = function () {
            tasks = tasks.filter(function (text) {
                return text !== taskText;
            });
            getTasks();
            renderTasks();
        };

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

function addTaskOnEnter(event) {
if (event.key === "Enter") {
addTask();
}
}

function addTask() {
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {
        tasks.push(taskInput.value.trim());
        getTasks();
        renderTasks();

        taskInput.value = "";
    }
}

function getTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let addButton = document.getElementById("addButton");
addButton.onclick = addTask;
renderTasks();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ss/mcortes21/pwabuilder-sw.js') // Ruta al archivo del Service Worker
      .then(function(registration) {
        console.log('Service Worker registrado con exito:', registration);
      })
      .catch(function(error) {
        console.error('Error al registrar el Service Worker:', error);
      });
    }
    
    function enviarDatosAlServidor(datos) {
    const rsp = new XMLHttpRequest();
    rsp.open('POST', 'guardarensesion.php', true);
    rsp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        rsp.onreadystatechange = function (){
            if(rsp.readyState === 4 && rsp.status === 200){
                console.log('Datos enviados al servidor con éxito.');
            }
        };

        rsp.send('dato=' + encodeURIComponent(datos));
      }

      enviarDatosAlServidor('Mi dato a enviar al servidor');
        