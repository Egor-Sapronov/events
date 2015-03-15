'use strict';

var PreviewCard = React.createClass({
    updateProps() {

    },
    render: function () {
        return <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img src={this.props.image} className="darken" />
                <span className="card-title">{this.props.title}</span>
            </div>
            <div className="card-content">
                <div className="event-reveal-card-header">
                    <a href="#" className="btn-floating waves-effect waves-block waves-light">
                        <img src="http://materializecss.com/images/yuna.jpg" className="circle responsive-img" />
                    </a>
                    <p>
                        <small className="secondary-text-color">{this.props.place} - {this.props.date}</small>
                    </p>
                </div>
                <p>{this.props.description}</p>
            </div>
        </div>;
    }
});

module.exports = PreviewCard;