'use strict';

var ProfileBar = React.createClass({
    render: function () {
        return <li style="height:100%;" className="valign-wrapper">
            <a href="#">
                <img src="{this.props.imageSrc}" className="z-depth-1 responsive-img circle valign" />
            </a>
        </li>;
    }
});

module.exports = ProfileBar;