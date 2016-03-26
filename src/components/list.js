var React = require('react')

var Todo = React.createClass({
    render: function () {
        var context = this.props.context
        var todo    = this.props.todo
        return (
            <li
                className="columns"
            >
                <div className="column is-2 is-text-centered">
                    <a
                        className={todo.className + " button"}
                        href="javascript:void(0)"
                        onClick={this.handleTodoStateUpdateClick}
                    >
                        <i className={todo.icon}></i>
                        {todo.stateStr}
                    </a>
                </div>
                <p className="column">
                    {todo.todoText}
                    <span className="is-small">{" (" + todo.createdStr + ")"}</span>
                </p>
                <div className="column is-grouped is-2 is-text-centered">
                    <a
                       className="button"
                       href="javascript:void(0)"
                       onClick={this.handleTodoPrepareToEditClick}
                    >
                        <i className="fa fa-pencil is-small"></i>
                    </a>
                    <a
                       className="button"
                       href="javascript:void(0)"
                       onClick={this.handleTodoRemove}
                    >
                        <i className="fa fa-times is-small"></i>
                    </a>
                </div>
            </li>
        )
    }
  , handleTodoStateUpdateClick: function () {
        this.props.context.actTodos.updateState(this.props.todo)
    }
  , handleTodoPrepareToEditClick: function () {
        this.props.context.actTodo.update(this.props.todo)
    }
  , handleTodoRemove: function () {
        if (window.confirm('本当に消していいんですか?'))
            this.props.context.actTodos.remove(this.props.todo)
    }
})

var List = React.createClass({
    render: function () {
        var context = this.props.context
        return (
            <div>
                <ul>
                    {this.props.todos.map(function (todo, i) {
                        return (<Todo key={String(todo.id)} todo={todo} context={context} />)
                    })}
                </ul>
            </div>
        )
    }
})

module.exports = List
