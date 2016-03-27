var clone   = require('clone')
var factory = require('../apis/todo')

module.exports = {
    getList: function (_todos, done) {
        done(null, this._getList((this.opt.todos = _todos)))
    }
  , grep: function (payload, done) {
        this.opt.grep = payload
        done(null, this._getList(this.opt.todos))
   }
 , sort: function (payload, done) {
        this.opt.sort = payload
        done(null, this._getList(this.opt.todos))
   }
 , _getList: function (_todos) {
        var todos = clone(_todos)
        if (this.opt.grep) todos = factory.grep(todos, this.opt.grep)
        if (this.opt.sort) todos = factory.sort(todos, this.opt.sort)
        return factory.extend(todos)
   }
}
