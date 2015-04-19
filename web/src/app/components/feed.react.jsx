'use strict';
var PreviewCard = require('./previewCard.react.jsx');

var Feed = React.createClass({
    render: function () {
        return <div>
        {this.props.items.map(function (item, index) {
            return <PreviewCard
                key={index}
                image={item.image}
                title={item.title}
                userImage={item.userImage}
                place={item.place}
                date={item.date} />
        })}
        </div>;
    }
});

module.exports = Feed;