let tasks = []
let lastCompleted;
const addBtn = document.getElementById("add-btn");
const inputEl = document.getElementById("input-el");
const tasklistEl = document.getElementById("tasklist");
const deleteBtn = document.getElementsByClassName("delete-btn");
const editBtn = document.getElementsByClassName("edit-btn");
let l=0;
addBtn.addEventListener("click", function () {
    let addEmptyError = document.getElementById("add-empty-error")
    if (inputEl.value != "") {
        addEmptyError.innerText = "";
        let string = inputEl.value;
        tasks.push(string);
        inputEl.value = "";
        tasklistEl.innerHTML = "";
        tasks.forEach(renderList)
    } else {
        addEmptyError.innerText = "Kindly enter task first!"
    }
})

tasks.forEach(renderList);

tasklistEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon") || event.target.classList.contains("delete-btn")) {
        let index = JSON.parse(event.target.dataset.index);
        for (let i = 0; i < tasks.length; i++) {
            if (index == i) {
                lastCompleted = tasks.splice(i, 1);
                tasklistEl.innerHTML = "";
                tasks.forEach(renderList)
                break;
            }
        }
    } else if (event.target.classList.contains("edit-btn") || event.target.classList.contains("edit-icon")) {
        let index = JSON.parse(event.target.dataset.index);
        for (let i = 0; i < tasks.length; i++) {
            if (index == i) {
                let itemID=document.getElementById(`item-${index}`)
                itemID.innerHTML+=`<input type="text" id="edit-${index}" class="edit-input" data-index="${index}">`
                document.getElementById(`edit-${index}`).setAttribute("value",tasks[index]);
                itemID.innerHTML+=`<button class="edit-done" id="edit-btn-${index}">Done</button>`
                document.getElementById(`edit-btn-${index}`).addEventListener("click", function (){
                    if(document.getElementById(`edit-${index}`).value!="")
                    tasks[index]=document.getElementById(`edit-${index}`).value;
                    tasklistEl.innerHTML="";
                    tasks.forEach(renderList);
                })
                break;
            }
        }
    } else if (event.target.classList.contains("done-btn") || event.target.classList.contains("done-icon")) {
        let index = JSON.parse(event.target.dataset.index);
        for (let i = 0; i < tasks.length; i++) {
            if (index == i) {
                lastCompleted = tasks.splice(i, 1);
                tasklistEl.innerHTML = "";
                let lastTaskEl=document.getElementById("last-task")
                lastTaskEl.innerText=`Recently Completed Task: ${lastCompleted}\n Total completed Tasks: ${++l}`;
                tasks.forEach(renderList)
                break;
            }
        }
    }
})

function renderList(list, position) {
    let toHtml = `<li id="item-${position}">
    <button class="delete-btn list-btn" data-index="${position}">
    <i class="fa-solid fa-xmark delete-icon" data-index="${position}"></i>
    </button>
                    ${(position + 1) + ". " + list} 
    <button class="edit-btn list-btn" data-index="${position}">
    <i class="fas fa-edit edit-icon" data-index="${position}"></i>
    </button>  
    
    <button class="done-btn list-btn" data-index="${position}">
    <i class="fa-solid fa-check done-icon" data-index="${position}"></i>
    </button> 
                    </li>
    `;
    tasklistEl.innerHTML += toHtml;

}