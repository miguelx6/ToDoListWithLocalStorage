$(document).ready(function() {
    let taskList = $("#taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.empty();
        $.each(tasks, function(index, taskText) {
            let listItem = $("<li>").text(taskText);

            let buttonContainer = $("<div>").addClass("buttonContainer");

            let editButton = $("<button>").text("Editar").addClass("editButton").click(function() {
                startEditTask(index);
            });

            let deleteButton = $("<button>").text("Eliminar").addClass("deleteButton").click(function() {
                if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
                    tasks = tasks.filter(function(text) {
                        return text !== taskText;
                    });
                    getTasks();
                    renderTasks();
                }
            });

            buttonContainer.append(editButton, deleteButton);
            listItem.append(buttonContainer);
            taskList.append(listItem);
        });
    }

    function startEditTask(index) {
        let editInput = $("<input>").attr("type", "text").val(tasks[index]);

        let confirmButton = $("<button>").text("Confirmar").click(function() {
            finishEditTask(index, editInput.val());
        });

        let cancelButton = $("<button>").text("Cancelar").click(function() {
            renderTasks();
        });

        let listItem = taskList.children().eq(index);
        listItem.empty().append(editInput, confirmButton, cancelButton);
    }

    function finishEditTask(index, newText) {
        if (newText.trim() !== "") {
            tasks[index] = newText.trim();
            getTasks();
            renderTasks();
        }
    }

    function addTaskOnEnter(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function addTask() {
        let taskInput = $("#taskInput");

        if (taskInput.val().trim() !== "") {
            tasks.push(taskInput.val().trim());
            getTasks();
            renderTasks();

            taskInput.val("");
        }
    }

    function getTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    $("#addButton").click(addTask);
    renderTasks();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/ss/mcortes21/pwabuilder-sw.js')
            .then(function(registration) {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(function(error) {
                console.error('Error al registrar el Service Worker:', error);
            });
    }

    let dato = localStorage.getItem("dato");
    sessionStorage.setItem("task", dato);
    sessionStorage.getItem("task", dato);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "conexion.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("dato=" + dato);

    $(document).on("DOMContentLoaded", function() {
        const taskForm = $("#taskForm");
        const taskList = $("#taskList");

        function loadTasks() {
            $.ajax({
                url: "/ss/mcortes21/conexion.php",
                method: "GET",
                dataType: "json",
                success: function(tasks) {
                    taskList.empty();
                    $.each(tasks, function(index, task) {
                        const listItem = $("<li>").text(task);
                        taskList.append(listItem);
                    });
                }
            });
        }

        taskForm.submit(function(e) {
            e.preventDefault();

            const taskNameInput = $("#taskInput");
            const taskName = taskNameInput.val();

            if (taskName === "") {
                showMessage("Tu tarea ha sido agregada con éxito :)");
                return;
            }

            $.ajax({
                url: "/ss/mcortes21/guardarensesion.php",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ task_name: taskName }),
                success: function(data) {
                    showMessage(data.message);
                    taskNameInput.val("");
                    loadTasks();
                }
            });
        });

        function showMessage(message) {
            const messageElement = $("<div>").text(message);
            $("body").append(messageElement);

            setTimeout(function() {
                messageElement.remove();
            }, 2000);
        }

        loadTasks();
    });

    const formularioTarea = $("#taskForm");
    formularioTarea.submit(function(event) {
        event.preventDefault();

        const tarea = $("#taskInput").val();
        const fecha = $("#fecha").val();

        const newtask = {
            task: tarea,
            fecha: fecha
        };

        $.ajax({
            url: "https://sistemas.cruzperez.com/ss/mcortes21/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newtask),
            success: function(data) {
                alert(data.message);
                formularioTarea[0].reset();
            },
            error: function(error) {
                console.error(error);
            }
        });
    });

    function transferData() {
        const localStorageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        sessionStorage.setItem("tasks", JSON.stringify(localStorageTasks));
    }

    transferData();

    const form = $("#form");
    const username = $("#username");
    const password = $("#password");

    form.submit(function(event) {
        event.preventDefault();

        const newtask = {
            username: username.val(),
            password: password.val()
        };

        $.ajax({
            url: "https://sistemas.cruzperez.com/ss/mcortes21/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newtask),
            success: function(data) {
                alert(data.message);
                form[0].reset();
            },
            error: function(error) {
                console.error(error);
            }
        });
    });
});