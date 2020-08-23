type todoItem = {
    id: string | number,
    text: string,
    completed: boolean
}

class Database {
    db: todoItem[]

    constructor(db: todoItem[]) {
        this.db = db
    }

    addItem(item: todoItem): void {
        this.db.push(item)
        localStorage.setItem('todo-db', JSON.stringify(this.db))
    }

    removeItem(id: number): void {
        this.db = this.db.filter(item => item.id !== id)
        localStorage.setItem('todo-db', JSON.stringify(this.db))
    }

    checkAllCompleted(): void {
        this.db.map(item => item.completed = true)
        localStorage.setItem('todo-db', JSON.stringify(this.db))
    }

    checkItem(id: number): void {
        this.db.map(item => {
            if (item.id === id) {
                item.completed = !item.completed
            }
        })
        localStorage.setItem('todo-db', JSON.stringify(this.db))
    }

    removeAllCompleted(): void {
        this.db = this.db.filter(item => !item.completed)
        localStorage.setItem('todo-db', JSON.stringify(this.db))
    }
}

// const DB: Database = new Database(
//     [
//         {
//             id: 1,
//             text: 'Cras justo odio',
//             completed: false
//         },
//         {
//             id: 2,
//             text: 'Dapibus ac facilisis in',
//             completed: true
//         }
//     ]
// )

const localStorageDatabase: todoItem[] = JSON.parse(localStorage.getItem('todo-db'))

const DB: Database = new Database(localStorageDatabase ? localStorageDatabase : [])

const listGroup: Element = document.querySelector('.list-group')
const addButton: Element = document.querySelector('.add__button')
const addText = <HTMLInputElement>document.querySelector('.add__text')
const progressBar = <HTMLInputElement>document.querySelector('.progress-bar')
const additionalCheckAll: Element = document.querySelector('.additional__check-all')
const allButton: Element = document.querySelector('.all__button')
const activeButton: Element = document.querySelector('.active__button')
const completedButton: Element = document.querySelector('.completed__button')
const removeCompletedButton: Element = document.querySelector('.remove-completed__button')

addButton.addEventListener('click', () => {
    if (addText.value) {
        DB.addItem({
            id: Date.now(),
            text: addText.value,
            completed: false
        })
        renderItems(DB.db)
    }
})

const renderItems = (database: Array<todoItem>): void => {
    let todoList: string = ''
    listGroup.innerHTML = ''

    database.map(item => {
        todoList += `<li class="list-group-item d-flex justify-content-between align-items-center${item.completed ? ' done' : ''}" data-id="${item.id}">
                            <div class="item__left d-flex align-items-center justify-content-center">
                                <input type="checkbox" class="item__checkbox" ${item.completed ? 'checked' : ''}>
                                <div class="item__text ml-2">${item.text}</div>
                            </div>
                            <span class="item__remove"><svg height="24" viewBox="0 0 74 74" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m56.082 72h-38.164a3.079 3.079 0 0 1 -3.05-2.805l-4.36-52.061a1 1 0 0 1 1-1.083h50.992a1 1 0 0 1 1 1.083l-4.36 52.061a3.079 3.079 0 0 1 -3.058 2.805zm-43.49-53.949 4.27 50.977a1.066 1.066 0 0 0 1.056.972h38.164a1.066 1.066 0 0 0 1.057-.972l4.27-50.977z"/><path d="m66.172 18.06h-58.344a2.17 2.17 0 0 1 -2.167-2.167v-5.041a2.169 2.169 0 0 1 2.167-2.167h58.344a2.169 2.169 0 0 1 2.167 2.167v5.042a2.17 2.17 0 0 1 -2.167 2.166zm-58.344-7.375a.167.167 0 0 0 -.167.167v5.042a.167.167 0 0 0 .167.167h58.344a.167.167 0 0 0 .167-.167v-5.042a.167.167 0 0 0 -.167-.167z"/><path d="m45.812 10.685h-17.624a1 1 0 0 1 -1-1v-5.067a2.621 2.621 0 0 1 2.618-2.618h14.388a2.621 2.621 0 0 1 2.618 2.618v5.067a1 1 0 0 1 -1 1zm-16.624-2h15.624v-4.067a.618.618 0 0 0 -.618-.618h-14.388a.618.618 0 0 0 -.618.618z"/><path d="m47.462 56.03c-.029 0-.059 0-.088 0a1 1 0 0 1 -.909-1.083l2.289-26.131a1 1 0 1 1 1.992.175l-2.288 26.127a1 1 0 0 1 -.996.912z"/><path d="m37 56.03a1 1 0 0 1 -1-1v-26.13a1 1 0 1 1 2 0v26.13a1 1 0 0 1 -1 1z"/><path d="m26.538 56.03a1 1 0 0 1 -1-.913l-2.284-26.13a1 1 0 1 1 1.992-.175l2.289 26.131a1 1 0 0 1 -.909 1.083c-.026.003-.059.004-.088.004z"/></svg></span>
                        </li>`
    })

    listGroup.innerHTML = todoList ? todoList : `<div class="text-center"><h5>Задач нет</h5></div>`

    const todoItems: NodeListOf<Element> = document.querySelectorAll('.list-group-item')

    todoItems.forEach(item => item.querySelector('.item__remove') ? item.querySelector('.item__remove').addEventListener('click', () => {
        if (item instanceof HTMLElement) {
            DB.removeItem(Number(item.dataset.id))
            renderItems(DB.db)
        }
    }) : null)

    todoItems.forEach(item => item.querySelector('.item__checkbox') ? item.querySelector('.item__checkbox').addEventListener('click', () => {
        if (item instanceof HTMLElement) {
            DB.checkItem(Number(item.dataset.id))
            renderItems(DB.db)
        }

    }) : null)

    const completedCount: number = database.filter(item => {
        if (item.completed)
            return true
    }).length

    const completedPercentage: string = !isNaN(completedCount / database.length * 100) ? (completedCount / database.length * 100).toFixed().toString() + '%' : '0%'

    progressBar.innerHTML = completedCount + ' / ' + database.length
    progressBar.style.width = completedPercentage
}

additionalCheckAll.addEventListener('click', () => {
    DB.checkAllCompleted()
    renderItems(DB.db)
})

allButton.addEventListener('click', () => renderItems(DB.db))
activeButton.addEventListener('click', () => renderItems(DB.db.filter(item => !item.completed)))
completedButton.addEventListener('click', () => renderItems(DB.db.filter(item => item.completed)))
removeCompletedButton.addEventListener('click', () => {
    DB.removeAllCompleted()
    renderItems(DB.db)
})

renderItems(DB.db)






