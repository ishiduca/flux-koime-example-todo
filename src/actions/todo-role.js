var factory    = require('../apis/todo')
var GET_TODO   = 'getTodo'
module.exports = {
    update: function () {
        this.push(GET_TODO, factory.update.apply(null, arguments))
    }
  , clear: function () {
        this.push(GET_TODO, factory.create())
    }
}
