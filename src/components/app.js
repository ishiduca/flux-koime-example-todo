var React        = require('react')
var Error        = require('./error')
var Form         = require('./form')
var List         = require('./list')
var ControlBoard = require('./control-board')

var App = React.createClass({
    render: function () {
        return (
            <section>
                <Error
                    context={this.props.context}
                    error={this.state.error}
                />
                <Form
                    context={this.props.context}
                    todo={this.state.todo}
                />
                <ControlBoard
                    context={this.props.context}
                    sorts={this.state.sorts}
                    sort={ this.state.sort}
                    grep={ this.state.grep}
                />
                <List
                    context={this.props.context}
                    todos={this.state.todos}
                />
            </section>
        )
    }
  , getInitialState: function () {
        var context = this.props.context
        return {
            todo:  context.storeTodo.opt.todo
          , todos: context.storeTodos.opt.todos
          , sorts: context.storeTodos.opt.sorts
          , sort:  context.storeTodos.opt.sort
          , grep:  context.storeTodos.opt.grep
          , error: context.storeError.opt.error
        }
    }
  , componentDidMount: function () {
        var context = this.props.context
        var me      = this
        context.storeTodo.on('data', function (todo) {
            me.setState({todo: todo})
        })
        context.storeTodos.on('data', function (todos) {
            me.setState({todos: todos})
        })
        context.storeError.on('data', function (err) {
            me.setState({error: err})
        })
        context.storeTodos.on('update sort', function (sort) {
            me.setState({sort: sort})
        })
        context.actTodos.getList()
    }
  , componentWillUnMount: function () {
        var context = this.props.context
        var me      = this
        context.storeTodo.removeAllListeners()
        context.storeTodos.removeAllListeners()
        context.storeError.removeAllListeners()
    }
})

module.exports = App
