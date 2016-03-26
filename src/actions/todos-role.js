var factory = require('../apis/todo')

var GET_LIST = 'getList'
var SORT     = 'sort'
var GREP     = 'grep'

module.exports = {
    subscribe: function (_todo) {
        var todo
        try {
            todo = factory.format(_todo)
        } catch (err) {
            return this.emit('error', err)
        }
        var me   = this
        this.opt.storageAPI.put(todo.id, todo, function (err) {
            if (err) me.emit('error', err)
            else     me.getList()
        })
    }
  , getList: function () {
        var me    = this
        var todos = []
        this.opt.storageAPI.createValueStream()
            .on('error', function (err) {me.emit('error', err)})
            .on('data', function (todo) {todos.push(todo)})
            .once('end', function () {
                me.push(GET_LIST, todos)
            })
    }
  , updateState: function (_todo) {
        this.subscribe(factory.updateState(_todo))
    }
  , remove: function (todo) {
        var me = this
        this.opt.storageAPI.del(todo.id, function (err) {
            if (err) me.emit('error', err)
            else     me.getList()
        })
   }
 , sort: function (payload) {
        this.push(SORT, payload)
   }
 , grep: function (payload) {
        this.push(GREP, payload)
   }
}
