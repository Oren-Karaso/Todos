'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'all';
var gSortBy = 'alphabeth';

_createTodos();




function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function sortTodos() {
    if (gSortBy === 'alphabeth') {
        gTodos.sort(function (todo1, todo2) {
            return todo1.txt - todo2.txt;
        });
    } else if (gSortBy === 'created') {
        gTodos.sort(function (todo1, todo2) {
            return todo1.createdAt - todo2.createdAt;
        });
    } else {
        gTodos.sort(function (todo1, todo2) {
            return todo1.importance - todo2.importance;
        });
    }
    // else if (gSortBy === 'priority') console.log(sortByPriority(sortBy));
}


function sortByTxt() {
    var sorted = gTodos.map(function (todo) {
        return todo.txt;
    });
    return sorted;
}

function sortByCreated() {
    var sorted = gTodos.map(function (todo) {
        return todo.createdAt;
    });
    return sorted;
}

function sortByPriority() {
    var sorted = gTodos.map(function (todo) {
        return todo.createdAt;
    });
    return sorted;
}



function getTodosForDisplay() {

    sortTodos()

    if (gFilterBy === 'all') return gTodos;
    var todos = gTodos.filter(function (todo) {
        return (gFilterBy === 'done' && todo.isDone) ||
            (gFilterBy === 'active' && !todo.isDone)
    })
    return todos;
}

function removeTodo(todoId) {
    console.log('Removing Todo', todoId);
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    console.log('Toggling Todo', todoId);

    var todoToToggle = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todoToToggle.isDone = !todoToToggle.isDone
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance);
    gTodos.unshift(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

// Those functions are private for this file only

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos || !todos.length) {
        todos = ['Learn CSS', 'Master HTML'].map(_createTodo);
        //diffrent way
        // todos = ['Learn CSS', 'Master HTML'].map(function(txt){
        //     return _createTodo(txt)
        // });
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance = 3) {
    var createdAt = new Date()
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: createdAt.getTime(),
        mportance: importance,
    }
    return todo;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}
