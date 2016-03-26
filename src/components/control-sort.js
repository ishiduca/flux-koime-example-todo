var React = require('react')

var w = {
    "1": 'chevron-up'
  , "-1": 'chevron-down'
}

var Tab = React.createClass({
    render: function () {
        return (
            <li
                className={this.props.isCurrent ? 'is-active' : ''}
            >
                <a
                    href="javascript:void(0)"
                    onClick={this.handleClick}
                >
                    <i className={"fa is-small fa-" + w[String(this.props.payload.direction)]}></i>
                    {this.props.payload.key}
                </a>
            </li>
        )
    }
  , handleClick: function () {
        this.props.context.actTodos.sort(this.props.payload)
    }
})

var Sort = React.createClass({
    render: function () {
        var me = this
        return (
            <div className="navbar-left">
                <div className="navbar-item is-text-centered">
                    <div className="tabs">
                        <ul>
                            {this.props.sorts.map(function (payload, i) {
                                return (
                                    <Tab key={i}
                                        context={me.props.context}
                                        payload={payload}
                                        isCurrent={
                                            !! (me.props.sort.key === payload.key &&
                                                me.props.sort.direction === payload.direction)
                                        }
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Sort
