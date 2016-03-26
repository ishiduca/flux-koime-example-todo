var React = require('react')

var Form = React.createClass({
    render: function () {
        return (
            <div>
                <form
                    className="control is-grouped is-full"
                    onSubmit={this.handleSubmit}
                 >
                    <input
                        className="input"
                        type="text"
                        placeholder="what needs to be done?"
                        required="required"
                        value={this.props.todo.todoText}
                        onChange={this.handleChange}
                     />
                     <button
                        className="button is-primary"
                        type="submit"
                     >
                        subscribe
                     </button>
                     <button
                        className="button"
                        type="reset"
                        onClick={this.handleRest}
                     >reset</button>
                 </form>
                {
                    this.props.todo.id && (<p>{"edit: id@" + this.props.todo.id}</p>)
                }
             </div>
        )
    }
  , handleSubmit: function (ev) {
        ev.preventDefault()
        this.props.context.actTodos.subscribe(this.props.todo)
        this.props.context.actTodo.clear()
    }
  , handleChange: function (ev) {
        this.props.context.actTodo.update(
            this.props.todo
          , {todoText: ev.target.value}
        )
    }
  , handleRest: function () {
        this.props.context.actTodo.clear()
    }
})

module.exports = Form
