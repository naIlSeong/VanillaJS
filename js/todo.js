const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");

const pendingForm = document.querySelector(".pendingForm");
const finishedForm = document.querySelector(".finishedForm");

let pendingTodos = [];
let finishedTodos = [];

// SAVE
function saveToDo() {
  localStorage.setItem("PENDING", JSON.stringify(pendingTodos));
}

function saveToDo_finished() {
  localStorage.setItem("FINISHED", JSON.stringify(finishedTodos));
}

// LOAD
function loadToDo() {
  // Load Pending
  const loadedPendingToDos = localStorage.getItem("PENDING");
  if (loadedPendingToDos !== null) {
    const parsedPendingToDos = JSON.parse(loadedPendingToDos);
    parsedPendingToDos.forEach(function (toDo) {
      pendingToDo(toDo.text);
    });
  }

  // Load Finished
  const loadedFinishedToDos = localStorage.getItem("FINISHED");
  if (loadedFinishedToDos !== null) {
    const parsedFinishedToDos = JSON.parse(loadedFinishedToDos);
    parsedFinishedToDos.forEach(function (toDo) {
      finishedToDo(toDo.text);
    });
  }
}

// DELETE
function deleteToDo_pending(event) {
  const deleteBtn = event.target;
  const li = deleteBtn.parentNode;
  pendingForm.removeChild(li);
  const cleanToDo = pendingTodos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingTodos = cleanToDo;
  saveToDo();
}

function deleteToDo_finished(event) {
  const deleteBtn = event.target;
  const li = deleteBtn.parentNode;
  finishedForm.removeChild(li);
  const cleanToDo = finishedTodos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedTodos = cleanToDo;
  saveToDo_finished();
}

// SWITCH
function finToDo(event) {
  const finishedBtn = event.target;
  const li = finishedBtn.parentNode;
  const text = li.querySelector("span");
  deleteToDo_pending(event);
  finishedToDo(text.innerText);
}

function undoToDo(event) {
  const switchBtn = event.target;
  const li = switchBtn.parentNode;
  const text = li.querySelector("span");
  deleteToDo_finished(event);
  pendingToDo(text.innerText);
}

// PENDING
function pendingToDo(text) {
  const li = document.createElement("li");
  const finishedBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");

  finishedBtn.innerText = "✅";
  deleteBtn.innerText = "❌";
  span.innerText = text;

  li.appendChild(finishedBtn);
  li.appendChild(deleteBtn);
  li.appendChild(span);
  pendingForm.appendChild(li);

  const newId = pendingTodos.length + 1;
  li.id = newId;

  const pendingObject = {
    id: newId,
    text,
  };
  pendingTodos.push(pendingObject);
  saveToDo();

  deleteBtn.addEventListener("click", deleteToDo_pending);
  finishedBtn.addEventListener("click", finToDo);
}

// FINISHED
function finishedToDo(text) {
  const li = document.createElement("li");
  const switchBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");

  switchBtn.innerText = "🔙";
  deleteBtn.innerText = "❌";
  span.innerText = text;

  li.appendChild(switchBtn);
  li.appendChild(deleteBtn);
  li.appendChild(span);
  finishedForm.appendChild(li);

  const newId = finishedTodos.length + 1;
  li.id = newId;

  const finishedObject = {
    id: newId,
    text,
  };
  finishedTodos.push(finishedObject);
  saveToDo_finished();

  deleteBtn.addEventListener("click", deleteToDo_finished);
  switchBtn.addEventListener("click", undoToDo);
}

// Submit
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  pendingToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
