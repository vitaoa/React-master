import React from 'react';
import ReactDOM from 'react-dom';

const Header = React.createClass({
    render: function() {
        return <div className="top-head-title fixed-top"><span className="tit">新手学堂123</span></div>;
    }
});
ReactDOM.render(
    <Header />,
    document.querySelector('.wrapper')
);
