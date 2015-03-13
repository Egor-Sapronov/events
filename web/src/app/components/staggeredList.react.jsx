'use strict';

var StaggeredList = React.createClass({
    componentDidMount: function () {
        var time = 0;
        $('#list').find('li').velocity(
            {translateX: "-100px"},
            {duration: 0});

        $('#list').find('li').each(function () {
            $(this).velocity(
                {opacity: "1", translateX: "0"},
                {duration: 800, delay: time, easing: [60, 10]});
            time += 120;
        });
    },
    componentWillUnmount: function () {
        var time = 0;
        $('#list').find('li').each(function () {
            $(this).velocity(
                {opacity: "0", translateX: "100px"},
                {duration: 800, delay: time, easing: [60, 10]});
            time += 120;
        });
    },
    render: function () {
        return <ul id='list'>
            <li className="center-align">
                <a href="#" className="btn-floating btn-large accent-color">
                    <i className="mdi-social-person large"></i>
                </a>
            </li>
            <li className="center-align">
                <a href="#" className="btn-floating btn-large accent-color">
                    <i className="mdi-action-dashboard"></i>
                </a>
            </li>
            <li className="center-align">
                <a href="#" className="btn-floating btn-large accent-color">
                    <i className="mdi-navigation-close large"></i>
                </a>
            </li>
        </ul>;
    }
});

module.exports = StaggeredList;