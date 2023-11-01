let localList = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];

///////////  SETUP   ///////////
// const inputContainer = document.createElement("div")
const inputContainer = document.querySelector(".inputContainer")
// const h1 = document.createElement("h1")
// h1.classList.add("documentTitle")
// h1.textContent = "Post It"
inputContainer.classList.add("inputContainer")
// inputContainer.appendChild(h1)
document.body.appendChild(inputContainer)

const form = document.createElement("form")
inputContainer.appendChild(form)

const container = document.createElement("div")
container.classList.add("container")
document.body.appendChild(container)

const title = document.createElement("input")
title.placeholder = "Title"
title.maxLength = "50"
form.appendChild(title)

const input = document.createElement("textarea")
input.classList.add("inputTextarea")
form.appendChild(input)
input.placeholder = "Insert task"

const button = document.createElement("button")
button.classList.add("addBtn")
button.textContent = "Add"
form.appendChild(button)

const list = document.createElement("ul")
container.appendChild(list)

getFromLocalStorage()

function getFromLocalStorage(){
    localList.map( (item) => {
        const task = document.createElement("div")
        const textArea = document.createElement("textarea")
        const h3 = document.createElement("h3")
        const id = item.id

        h3.textContent = item.title 
        h3.appendChild(returnDate())
        addRemoveBtn(h3, id)
        expandAreaBtn(h3)
        task.appendChild(h3)
        task.appendChild(textArea)
        task.classList.add("task")
        textArea.addEventListener('input', function() {
            this.style.height = (this.scrollHeight) + 'px';
        });
        textArea.addEventListener("blur", function() {
            modifyTask(this.id)
        })
        textArea.textContent = item.input
        textArea.classList.add("textarea")
        textArea.id = id 
        list.appendChild(task)
    })
}
///////////  SETUP   ///////////


form.onsubmit =  (event) => {
    // event.preventDefault();
    createTask()
}

function createTask(){
    if(input.value != "" || title.value != "" ){
        const task = document.createElement("div")
        const textArea = document.createElement("textarea")
        const h3 = document.createElement("h3")
        const id = Date.now();        h3.textContent = title.value + " - " + returnDate()
        addRemoveBtn(h3, id)
        expandAreaBtn(h3)
        task.appendChild(h3)
        task.appendChild(textArea)
        task.classList.add("task")
        textArea.addEventListener('input', function() {
            this.style.height = (this.scrollHeight) + 'px';
        });
        textArea.addEventListener("blur", function() {
            modifyTask(this.id)
        })
        textArea.textContent = input.value
        textArea.classList.add("textarea")
        textArea.id = id 
        addToLocalStorage(id ,title.value, input.value)
        input.value = ""
        title.value = ""
        list.appendChild(task)
    }
}

const addToLocalStorage = (id, title,input) => {
    localList.push({id: id, title: title, input: input})
    localStorage.setItem("todoList", JSON.stringify(localList))
}

function removeFromLocalStorage(id){
    localList = localList.filter( item => item.id != id )
    localStorage.setItem("todoList", JSON.stringify(localList));
}

function modifyTask(id){
    let toModify = localList.find( item => item.id == id)
    toModify.input = document.getElementById(id).value 
    localStorage.setItem("todoList", JSON.stringify(localList));

}

function addRemoveBtn(h3, id) {
    const btn = document.createElement("button")
    btn.classList.add("deleteBtn")
    btn.addEventListener("click", () => {
        h3.parentElement.remove()
        removeFromLocalStorage(id)
    })
    // btn.textContent = "Delete"
    h3.appendChild(btn)
}


function expandAreaBtn (h3) {
    const btn = document.createElement("button")
    btn.classList.add("expandBtn")
    btn.addEventListener("click", () => {
        const sibling =   h3.nextElementSibling
        if( sibling.style.height != sibling.scrollHeight + "px"){
            sibling.style.height = sibling.scrollHeight + "px"
        }else{
            sibling.style.height =  "auto"
        }
    })
    // btn.textContent = "Expand / Shrink"
    h3.appendChild(btn)
}


function returnDate(){
    let date = new Date().toString().split(" ")
    let span = document.createElement("span")
    span.textContent = " - " + date[1] + " " + date[2] + " " + date[3]
    return span
}




const postItTab = document.querySelector(".postItTab")
postItTab.addEventListener("click", function() {
   // TODO condicional para activar postit y desactivar todo
})


const toDoTab = document.querySelector(".todoTab")


