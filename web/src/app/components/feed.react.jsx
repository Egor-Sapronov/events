'use strict';
var PreviewCard = require('./previewCard.react.jsx');

var Feed = React.createClass({
    render: function () {
        var _this = this;
        return <div>
        {this.props.items.map(function (item, index) {
            return <PreviewCard
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                userImage={item.userImage}
                place={item.place}
                date={item.date}
                followUrl={item.followUrl}
                onFollowClick={_this.props.onFollowClick} />
        })}
        </div>;
    }
});

module.exports = Feed;