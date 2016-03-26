var React = require('react')

var Error = React.createClass({
    render: function () {
        if (! this.props.error || ! this.props.error.message) return (<span></span>)
        return (
            <div className="notification is-danger">
                <button
                    className="delete"
                    onClick={this.handleClick}
                ></button>
                {this.props.error.name && (<h4 className="title is-4">{this.props.error.name}</h4>)}
                <p>{this.props.error.message}</p>
            </div>
        )
    }
  , handleClick: function () {
        this.props.context.actError.off()
    }
})

module.exports = Error
