class Database {
    constructor(db) {
        this.db = db
    }

    getItems() {
        return this.db
    }

    getLength() {
        return this.db.length
    }

    getCompleted() {
        return this.db.filter(item => {
            if (item.completed)
                return true
        }).length
    }

    addItem(item) {
        this.db.push(item)
    }

    removeItem(itemToRemove) {
        this.db = this.db.filter(item => item.id !== +itemToRemove.dataset.id)
    }
}

let DB = new Database(
    [
        {
            id: 1,
            text: 'Cras justo odio',
            completed: false
        },
        {
            id: 2,
            text: 'Dapibus ac facilisis in',
            completed: true
        }
    ]
)

const listGroup = document.querySelector('.list-group')
const addButton = document.querySelector('.add__button')
const addText = document.querySelector('.add__text')
const progressBar = document.querySelector('.progress-bar')

addButton.addEventListener('click', () => {
    DB.addItem({
        id: Date.now(),
        text: addText.value,
        completed: false
    })
    renderItems(DB.getItems())
})

const renderItems = (items) => {
    let todoList = ''
    listGroup.innerHTML = ''

    items.map(item => {
        todoList += `<li class="list-group-item d-flex justify-content-between align-items-center${item.completed ? ' done' : ''}" data-id="${item.id}">
                            <div class="item__left d-flex align-items-center justify-content-center">
                                <input type="checkbox" class="item__checkbox" ${item.completed ? 'checked' : ''}>
                                <div class="item__text ml-2">${item.text}</div>
                            </div>
                            <span class="item__remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                                            width="16" height="16"><path fill-rule="evenodd"
                                                                                         d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zm-2 7.75a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5z"></path></svg></span>
                        </li>`
    })
    listGroup.innerHTML = todoList ? todoList : ''

    const todoItems = document.querySelectorAll('.list-group-item')

    todoItems.forEach(item => item.querySelector('.item__remove') ? item.querySelector('.item__remove').addEventListener('click', () => {
        DB.removeItem(item)
        renderItems(DB.getItems())
    }) : null)

    const completedPercentage = ((DB.getCompleted() / DB.getLength()) * 100).toFixed().toString() + '%'
    progressBar.innerHTML = DB.getCompleted() + ' / ' + DB.getLength()
    progressBar.style.width = completedPercentage
}

renderItems(DB.getItems())






