'use strict';

var ProfileBar = React.createClass({
    render: function () {
        var liStyle = {
            height: '100%'
        };
        return <li style={liStyle} className="valign-wrapper">
            <a href="#">
                <img src={this.props.imageSrc} className="z-depth-1 responsive-img circle valign" />
            </a>
        </li>;
    }
});

module.exports = ProfileBar;