'use strict';

var ProfileBar = React.createClass({
    componentDidMount: function () {
        $(".side-activator").sideNav({
            edge: 'right',
            closeOnClick: true
        });
    },
    render: function () {
        var liStyle = {
            height: '100%'
        };
        return (<div style={liStyle}>
            <ul style={liStyle} className="right">
                <li style={liStyle} className="valign-wrapper">
                    <a data-activates="slide-out" href="#" className="side-activator">
                        <img src={this.props.imageSrc} className="z-depth-1 responsive-img circle valign" />
                    </a>
                </li>
            </ul>
            <ul id="slide-out" className="right side-nav">
                <li>
                    <a href="#">Your profile</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>
                <li>
                    <a href="#">Sign out</a>
                </li>
            </ul>
        </div>);
    }
});

module.exports = ProfileBar;