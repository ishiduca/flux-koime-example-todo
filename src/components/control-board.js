var React = require('react')
var Grep  = require('./control-grep')
var Sort  = require('./control-sort')

var ControlBoard = React.createClass({
    render: function () {
        return (
            <div className="navbar">
                <Grep
                    context={this.props.context}
                    grep={   this.props.grep}
                />
                <Sort
                    context={this.props.context}
                    sorts={  this.props.sorts}
                    sort={   this.props.sort}
                />
           </div>
        )
    }
})

module.exports = ControlBoard
