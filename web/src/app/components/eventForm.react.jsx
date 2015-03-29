'use strict';

var EventForm = React.createClass({
    getInitialState: function () {
        return {
            title: null,
            description: null,
            date: null,
            place: null
        };
    },
    handleChange: function () {
        this.setState({
            title: this.refs.title.getDOMNode().value,
            description: this.refs.description.getDOMNode().value,
            date: this.refs.eventDate.getDOMNode().value,
            place: this.refs.place.getDOMNode().value
        });
    },
    handleSubmit: function (e) {
        e.preventDefault();

        this.props.onSubmit(this.state);
    },
    render: function () {
        return <form className="col l7 s12" onSubmit={this.handleSubmit}>
            <div className="row">
                <h1 className="header">New Event</h1>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <i className="mdi-maps-rate-review prefix"></i>
                    <input onChange={this.handleChange} ref="title" type="text" required/>
                    <label htmlFor="title">Title</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <i className="mdi-content-create prefix"></i>
                    <textarea onChange={this.handleChange} ref="description" className="materialize-textarea" required></textarea>
                    <label htmlFor="description">Description</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <i className="mdi-device-access-time prefix"></i>
                    <input onChange={this.handleChange} className='datepicker' ref="eventDate" type="date"  required/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <i className="mdi-maps-place prefix"></i>
                    <input onChange={this.handleChange} ref="place" type="text" required/>
                    <label htmlFor="place">Place</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <button className="btn right accent-color  waves-effect waves-light" type="submit">create
                        <i className="mdi-content-send right"></i>
                    </button>
                </div>
            </div>
        </form>;
    }
});

module.exports = EventForm;