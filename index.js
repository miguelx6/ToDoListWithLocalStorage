let taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let task = JSON.parse(sessionStorage.getItem("tasks")) || [];


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
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

let addButton = document.getElementById("addButton");
addButton.onclick = addTask;
renderTasks();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ss/mcortes21/pwabuilder-sw.js')
        .then(function (registration) {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(function (error) {
            console.error('Error al registrar el Service Worker:', error);
        });
}


//Guardar en la sesión
let dato = localStorage.getItem("dato");  // Obtener el dato de la sesión
sessionStorage.setItem("task", dato);
sessionStorage.getItem("task", dato);



let xhr = new XMLHttpRequest();
xhr.open("POST", "conexion.php", true);  
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded" );
xhr.send("dato=" + dato);

document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    // Función para cargar las tareas desde el servidor.
    function loadTasks() {
        fetch("/ss/mcortes21/conexion.php", {
            credentials: "include"
        })  
            .then((response) => response.json())
            .then((tasks) =>{
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

        const taskNameInput = document.getElementById("taskInput");
        // Obtener el nombre de la tarea del campo de entrada.
        const taskName = taskNameInput.value;
        
        if (taskName === "") {
            alert("Tu tarea a sido agregada con exito :) .");

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

const formularioTarea = document.getElementById("taskForm");
formularioTarea.addEventListener("submit", function (event) { 
    event.preventDefault();

    const tarea = document.getElementById("taskInput").value;
    const fecha = document.getElementById("fecha").value;

    const newtask = { 
        task: tarea,
        fecha: fecha
    };

    fetch("https://sistemas.cruzperez.com/ss/mcortes21/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newtask)
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            formularioTarea.reset();
    })
        .catch((error) => console.error(error));
    });

    // Función para transferir datos de localStorage a sessionStorage
function transferData() {
    const localStorageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    sessionStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

// Llama a la función de transferencia cuando lo necesites, por ejemplo, al cargar la página.
transferData();

//FUNCION PARA INICIO DE SESION EN LA PWA CON AUTENTIFICACION de licencia desde el servidor
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", function (event) { 
    event.preventDefault();

    const newtask = { 
        username: username.value,
        password: password.value
    };

    fetch("https://sistemas.cruzperez.com/ss/mcortes21/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newtask)
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            form.reset();
    })
        .catch((error) => console.error(error));
    }
);