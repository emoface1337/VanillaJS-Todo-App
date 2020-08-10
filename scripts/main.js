class Database {
    constructor(db) {
        this.db = db
    }

    getItems() {
        return this.db
    }

    addItem(newItem) {
        this.db.push(newItem)
    }
}

let DB = new Database(
    [
        {
            text: 'Cras justo odio',
            completed: false
        },
        {
            text: 'Dapibus ac facilisis in',
            completed: true
        }
    ]
)

const listGroup = document.querySelector('.list-group')

const renderItems = (items) => {
    items.map(item => {
        listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center ${item.completed ? 'done' : null}">
                            <div class="item__left d-flex align-items-center justify-content-center">
                                <input type="checkbox" class="item__checkbox" ${item.completed ? 'checked' : null}>
                                <div class="item__text ml-2">${item.text}</div>
                            </div>
                            <span class="item__remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                                            width="16" height="16"><path fill-rule="evenodd"
                                                                                         d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zm-2 7.75a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5z"></path></svg></span>
                        </li>`
    })
}

renderItems(DB.getItems())



