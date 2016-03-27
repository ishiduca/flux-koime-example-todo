'use strict'
var React    = require('react')
var ReactDOM = require('react-dom')
var levelup  = require('levelup')
var action   = require('flux-koime/action')
var store    = require('flux-koime/store')
var koime    = require('flux-koime')
var App      = require('./components/app')
// vars
var STORAGE_NAME   = 'flux-koime-example-todolist'
var VALUE_ENCODING = 'json'
var TODO           = 'Todo'
var TODOS          = 'Todos'
var ERROR          = 'Error'
var SORT_PAYLOADS  = [
    {key: 'state', direction: +1}
  , {key: 'state', direction: -1}
  , {key: 'created', direction: +1}
  , {key: 'created', direction: -1}
]
var DEFAULT_SORT_PAYLOAD = SORT_PAYLOADS[0]
// api
var storageAPI = levelup(STORAGE_NAME, {
    db: require('localstorage-down')
  , valueEncoding: VALUE_ENCODING
})
var factory = require('./apis/todo')
// actions
var actTodo  = action(TODO, null, require('./actions/todo-role'))
var actTodos = action(TODOS, {storageAPI: storageAPI}, require('./actions/todos-role'))
var actError = action(ERROR, null, require('./actions/error-role'))
// stores
var storeTodo  = store(TODO, {todo: factory.create()}, require('./stores/todo-role'))
var storeTodos = store(TODOS, {
                    todos: []
                  , grep: null
                  , sort: DEFAULT_SORT_PAYLOAD
                 }, require('./stores/todos-role'))
var storeSort  = store(TODOS, {sort: DEFAULT_SORT_PAYLOAD, sorts: SORT_PAYLOADS}, require('./stores/sort-role'))
var storeError = store(ERROR, {error: null}, require('./stores/error-role'))
// piping !!
koime(
    actTodo
  , actTodos
  , actError
)(
    storeTodo
  , storeTodos
  , storeSort
  , storeError
)(function onError (err) {
    actError.error(err)
})
// mount
ReactDOM.render(<App context={{
    actTodo: actTodo
  , actTodos: actTodos
  , actError: actError
  , storeTodo: storeTodo
  , storeTodos: storeTodos
  , storeSort: storeSort
  , storeError: storeError
}} />, document.querySelector('#react-app'))
