var React = require('react')

var Grep = React.createClass({
    render: function () {
        return (
            <div className="navbar-left">
                <div className="navbar-item is-text-centered">
                    <p className="subtitle">grep</p>
                </div>
                <div className="navbar-item">
                    <input
                        className="input"
                        type="search"
                        placeholder='grep "todo"'
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
  , handleChange: function (ev) {
        this.props.context.actTodos.grep(ev.target.value)
    }
})

module.exports = Grep
