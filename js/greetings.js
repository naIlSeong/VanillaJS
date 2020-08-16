const form = document.querySelector(".js-greetingsForm");
const input = form.querySelector("input");

const USER_NAME = "name";

function saveUser(text) {
  localStorage.setItem(USER_NAME, text);
}

// If USER_NAME === null
function askName() {
  form.addEventListener("submit", handleSubmit);
}

// IF USER_NAME !== null
function greetUser(userName) {
  // Todo_1: Remove input
  form.removeChild(input);
  // Todo_2: Load name

  // Todo_3: Display name
  displayUser(userName);
}

function loadUser() {
  const userName = localStorage.getItem(USER_NAME);
  if (userName === null) {
    askName();
  } else {
    greetUser(userName);
  }
}

function displayUser(text) {
  const div = document.createElement("div");
  const greeting = document.createElement("span");
  const name = document.createElement("span");

  greeting.innerText = "Hello! ";
  name.innerText = `${text} :)`;

  div.appendChild(greeting);
  div.appendChild(name);
  form.appendChild(div);
}

function handleSubmit() {
  event.preventDefault();
  const name = input.value;
  saveUser(name);
  greetUser(name);
}

function init() {
  loadUser();
}

init();
