let taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let task = JSON.parse(sessionStorage.getItem("task")) || [];


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

      document.addEventListener("DOMContentLoaded", function () {
        const taskForm = document.getElementById("taskForm");
        const taskList = document.getElementById("taskList");
        
        // Función para cargar las tareas desde el servidor.
       // Función para cargar las tareas desde el servidor.
function loadTasks() {
    fetch("/ss/mcortes21/conexion.php")  // Corrige la URL de la solicitud fetch
        .then((response) => response.json())
        .then((tasks) => {
            taskList.innerHTML = ""; // Limpia la lista actual de tareas
            tasks.forEach((task) => {
                const listItem = document.createElement("li");
                listItem.textContent = task;
                taskList.appendChild(listItem);
            });
        });
}

        
        // Manejar el envío del formulario para agregar tareas.
        taskForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const taskNameInput = document.getElementById("taskName");
            const taskName = taskNameInput.value.trim();
            
            if (taskName === "") {
                alert("Por favor, ingresa una tarea válida.");
                return;
            }
            
            fetch("/ss/mcortes21/guardarensesion.php", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ task_name: taskName })
            })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                taskNameInput.value = "";
                loadTasks(); // Vuelve a cargar la lista de tareas después de agregar una nueva tarea.
            });
        });
        
        // Cargar las tareas al cargar la página.
        loadTasks();
    });

    function enviarDatosAlServidor(task) {
        const formData = new FormData();
        formData.append('task', task);
    
        fetch('/ss/mcortes21/guardarensesion.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Debería imprimir "Tarea agregada correctamente"
            // Aquí puedes realizar cualquier otra acción después de guardar los datos en la sesión.
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    }
    
    // Luego, donde tengas el código para obtener el valor del formulario (taskInput), llama a esta función
    // con el valor adecuado cuando el formulario se envíe.
    
    
        