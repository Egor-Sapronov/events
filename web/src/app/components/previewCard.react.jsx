'use strict';

var PreviewCard = React.createClass({
    render: function () {
        return <div className="section">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img src={this.props.image} className="darken activator" />
                    <span className="activator card-title">{this.props.title}</span>
                </div>
                <div className="card-content">
                    <div className="event-reveal-card-header">
                        <a href="#" className="btn-floating waves-effect waves-block waves-light">
                            <img src={this.props.userImage}className="circle responsive-img" />
                        </a>
                        <p>
                            <small className="secondary-text-color">{this.props.place} - {this.props.date}</small>
                        </p>
                    </div>
                </div>
                <div className="card-action event-reveal-card-header">
                    <div>
                        <a href="#" className="btn-floating btn default-primary-color waves-effect">
                            <i className="mdi-action-favorite-outline small"></i>
                        </a>
                        <a href="#" className="btn-floating btn default-primary-color waves-effect">
                            <i className="mdi-social-share small"></i>
                        </a>
                    </div>
                    <a href="#">more</a>
                </div>
                <div className="card-reveal event-reveal-card">
                    <span className="card-title grey-text text-darken-4">Event title
                        <i className="mdi-navigation-close right"></i>
                    </span>
                    <p>
                        <small className="secondary-text-color">{this.props.place} - {this.props.date}</small>
                    </p>
                    <p>{this.props.description}</p>
                    <div className="card-reveal-footer">
                        <a href="#" className="btn-floating btn-large accent-color waves-effect">
                            <i className="mdi-action-done"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>;
    }
});

module.exports = PreviewCard;