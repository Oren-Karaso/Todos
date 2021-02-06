'use strict';

function onInit() {
    console.log('Hi');
    renderTodos();
}
function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone)? 'done' : '';
        var timestamp = new Date(todo.createdAt);
        console.log('timestamp',timestamp);
                
        return `<li class="${className}" onclick="onToggleTodo('${todo.id}')" title="Set on:${ timestamp.toDateString()}">
                    ${todo.txt}
                    <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                </li>`
    })

    // console.log('strHTMLs', strHTMLs)
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-todos').innerText = getTodosCount();
    document.querySelector('.active-todos').innerText = getActiveTodosCount();
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    //model
    removeTodo(todoId);
    //dom
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos();

}

function onAddTodo(ev) {
    ev.preventDefault();
        
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var txt = elTodoTxt.value;
    var elImportance = document.querySelector('input[name=importanceTxt]');
    var importance = elImportance.value;
    if ( !importance || !txt) {
        console.log('No data was inserted');
        return;
    }
    console.log('Adding todo and priority:', txt, importance);
    addTodo(txt, importance)
    elTodoTxt.value = '';
    elImportance.value = '';
    renderTodos();
}


function onSetFilter() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetSort() {
    var elSortBy = document.querySelector('select[name=sortBy]');
    var sortBy = elSortBy.value;
    console.log('Sort by', sortBy);
    setSort(sortBy);
    renderTodos();
}
