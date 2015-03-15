'use strict';

var previewCard = require('./components/previewCard.react.jsx');
var titleDomNode = document.getElementById('title');
var descriptionDomNode = document.getElementById('description');
var imageDomNode = document.getElementById('image');
var dateDomNode = document.getElementById('eventDate');
var placeDomNode = document.getElementById('place');
var mountedPreview = React.render(React.createElement(previewCard, {
    image: 'http://materializecss.com/images/office.jpg',
    title: 'Event title',
    place: 'Russia, Novosibirsk',
    date: 'Jan 9, 2014',
    description: 'Footers are a great way to organize a lot of site navigation and information at the end of a page.  This is where the user will look once hes finished scrolling through the current page or is looking for additional.'
}), document.getElementById('preview-container'));

titleDomNode.oninput = function () {
    mountedPreview.setProps({
        title: titleDomNode.value
    });
};
descriptionDomNode.onchange = function () {
    mountedPreview.setProps({
        description: descriptionDomNode.value
    });
};
imageDomNode.oninput = function () {
    mountedPreview.setProps({
        image: imageDomNode.value
    });
};
dateDomNode.onchange = function () {
    mountedPreview.setProps({
        date: dateDomNode.value
    });
};
placeDomNode.oninput = function () {
    mountedPreview.setProps({
        place: placeDomNode.value
    });
};

$('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
});



