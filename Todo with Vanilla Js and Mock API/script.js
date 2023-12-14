// Showing the data from api
document.addEventListener("DOMContentLoaded", function () {
  // Call the function to fetch todos from the API
  fetchTodos();
  renderCompletedTodoInLocalStorage();
});

function fetchTodos() {
  fetch("https://657983ff1acd268f9af93ea2.mockapi.io/api/todo")
    .then((response) => response.json())
    .then((data) => {
      // Call a function to render the todos in the HTML
      renderTodos(data);
    })
    .catch((error) => console.log("Error fetching todos:", error));
}

function renderTodos(todos) {
  const todosContainer = document.getElementById("yet-to-do");
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    console.log(todo);
    // Create a new todo element
    const todoElement = document.createElement("div");
    todoElement.id = `todo-${todo.id}`;
    todoElement.classList.add("todo");

    // Create and set the text for the p element
    const todoText = document.createElement("p");
    todoText.classList.add("todo-text");
    todoText.textContent = todo.title;

    // Create buttons for edit, delete, and complete
    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteTodoFromAPI(todo.id);
      todoElement.remove();
    });

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.textContent = "Complete";

    // Append elements to the todo container
    todoElement.appendChild(todoText);
    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);
    todoElement.appendChild(completeButton);

    completeButton.addEventListener("click", () => {
      moveTodoToLocalStorage(todo);

      // delete Todo From api
      deleteTodoFromAPI(todo.id);
      todoElement.remove();

      renderCompletedTodoInLocalStorage();
    });

    // Append the todo element to the container
    todosContainer.appendChild(todoElement);
  });
}

function moveTodoToLocalStorage(todo) {
  // This retrieve existing todos from localStorage
  const completedTodos =
    JSON.parse(localStorage.getItem("completedTodos")) || [];

  // Add current todo to completed todos
  completedTodos.push(todo);
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

// Deleting todo From API
function deleteTodoFromAPI(todoID) {
  fetch(`https://657983ff1acd268f9af93ea2.mockapi.io/api/todo/${todoID}`, {
    method: "DELETE",
  }).then(() => {
    fetchTodos();
  });
}

function renderCompletedTodoInLocalStorage() {
  const completedTodosContainer = document.getElementById("completed-to-do");

  // Clear existing completed todos before rendering new ones
  completedTodosContainer.innerHTML = "";

  // Retrieve completed todos from local storage
  const completedTodos =
    JSON.parse(localStorage.getItem("completedTodos")) || [];

  completedTodos.forEach((completedTodo, index) => {
    // Create a new text node with the completed todo text and numbering
    const completedTodoText = document.createTextNode(
      `${index + 1}. ${completedTodo.title}`
    );

    // Append the text node to the completed todos container
    completedTodosContainer.appendChild(completedTodoText);

    // Add a line break for better separation (optional)
    completedTodosContainer.appendChild(document.createElement("br"));
  });
}

// Deleting all completed todos
const deleteAllButton = document.getElementById("clear-completed-button");

deleteAllButton.addEventListener("click", () => {
  localStorage.removeItem("completedTodos");
  renderCompletedTodoInLocalStorage();
});

//making post request
const addTodoButton = document.getElementById("add-todo-button");
addTodoButton.addEventListener("click", addTodo);

function addTodo() {
  const todoText = document.getElementById("new-to-do").value;

  // Check if the input is not empty
  if (todoText.trim() === "") {
    alert("Please enter a todo title.");
    return;
  }

  fetch("https://657983ff1acd268f9af93ea2.mockapi.io/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todoText,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Call a function to render the todos in the HTML
      fetchTodos();
      document.getElementById("new-to-do").value = "";
    })
    .catch((error) => console.log("Error fetching todos:", error));
}
