$(document).ready(function() {
    const taskList = $("#taskList");
    const taskInput = $("#taskInput");
    const addButton = $("#addButton");
    const taskForm = $("#taskForm");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.empty();
        tasks.forEach(function(taskText, index) {
            const listItem = $("<li>").text(taskText);
            const buttonContainer = $("<div>").addClass("buttonContainer");
            const doneButton = $("<button>").text("Hecho").addClass("doneButton").click(function() {
                completeTask(index);
            });
            const editButton = $("<button>").text("Editar").addClass("editButton").click(function() {
                startEditTask(index);
            });
            const deleteButton = $("<button>").text("Eliminar").addClass("deleteButton").click(function() {
                deleteTask(index);
            });
            buttonContainer.append(editButton, doneButton, deleteButton);
            listItem.append(buttonContainer);
            taskList.append(listItem);
        });
    }

    function completeTask(index) {
        const listItem = taskList.children().eq(index);
        listItem.toggleClass("done");
        if (listItem.hasClass("done")) {
            showMessage("¡Tarea completada!");
            setTimeout(function() {
                tasks.splice(index, 1);
                updateTasks();
                renderTasks();
            }, 2000);
        }
    }

    function startEditTask(index) {
        const editInput = $("<input>").attr("type", "text").val(tasks[index]);
        const confirmButton = $("<button>").text("Confirmar").click(function() {
            finishEditTask(index, editInput.val());
        });
        const cancelButton = $("<button>").text("Cancelar").click(function() {
            renderTasks();
        });
        const listItem = taskList.children().eq(index);
        listItem.empty().append(editInput, confirmButton, cancelButton);
    }

    function finishEditTask(index, newText) {
        if (newText.trim() !== "") {
            tasks[index] = newText.trim();
            updateTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            tasks.splice(index, 1);
            updateTasks();
            renderTasks();
        }
    }

    function addTask() {
        const taskText = taskInput.val().trim();
        if (taskText !== "") {
            tasks.push(taskText);
            updateTasks();
            renderTasks();
            taskInput.val("");
        }
    }

    function updateTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function showMessage(message) {
        const messageElement = $("<div>").text(message);
        $("body").append(messageElement);
        setTimeout(function() {
            messageElement.remove();
        }, 2000);
    }

    addButton.click(addTask);
    taskForm.submit(function(e) {
        e.preventDefault();
        addTask();
    });

    taskForm.submit(function(e) {
        e.preventDefault();

        const taskNameInput = $("#taskInput");
        const taskName = taskNameInput.val();

        if (taskName === "") {
            showMessage("Tu tarea ha sido agregada con éxito :)");
            return;
        }

    renderTasks();

    // Registro de Service Worker
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

                    // Llama a showMessage después de cargar las tareas
                    showMessage("Tareas cargadas con éxito.");
                },
                error: function(error) {
                    console.error(error);
                    // Llama a showMessage con un mensaje de error
                    showMessage("Error al cargar las tareas.");
                }
            });
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


