var sha256  = require('crypto-js/sha256')
var xtend   = require('xtend')
var timeago = require('twitter-timeago')
var states  = ('pending working done').split(' ')

module.exports = {
    create: create
  , update: update
  , updateState: updateState
  , format: format
  , extend: extend
  , sort:   sort
  , grep:   grep
}

function create () {
    return {
        id: null
      , created: null
      , todoText: null
      , state: null
      , stateStr: null
    }
}

function updateState (_todo) {
    var todo = xtend(_todo)
    todo.state = ((todo.state || 0) + 1) % states.length
    todo.stateStr = states[todo.state]
    return todo
}

function update () {
    return xtend.apply(null, arguments)
}

function format (_todo) {
    var todoText = (_todo.todoText || '').trim()
    if (! todoText) throw new TypeError('"todo.todoText" not found')
    var todo = create()
    todo.todoText = todoText
    todo.id       = _todo.id       ? _todo.id      : sha256(_todo.todoText).toString()
    todo.created  = _todo.created  ? _todo.created : Date.now()
    todo.state    = _todo.state    ? _todo.state   : 0
    todo.stateStr = states[todo.state]
    return todo
}

function grep (todos, _grep) {
    var grep = _grep.toLowerCase()
    return todos.filter(function (todo) {
        return todo.todoText.toLowerCase().indexOf(grep) !== -1
    })
}

function sort (todos, sort) {
    return todos.sort(function (_a, _b) {
        var a = _a[sort.key]
        var b = _b[sort.key]
        return (a > b ? 1 : a < b ? -1 : 0) * (sort.direction || +1)
    })
}

var icons = ('pause bolt check').split(' ').map(function (icon) {
    return 'fa fa-' + icon + ' is-small'
})
var classNames = ('is-warning is-info is-success').split(' ')

function extend (todos) {
    return todos.map(function (todo) {
        return xtend(todo, {
            createdStr: timeago(new Date(todo.created))
          , icon: icons[todo.state]
          , className: classNames[todo.state]
        })
    })
}
