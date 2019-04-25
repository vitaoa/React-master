import React from 'react';
import ReactDOM from 'react-dom';

const Header = React.createClass({
    render: function() {
        return <div className="top-head-title fixed-top"><span className="tit">新手学堂</span></div>;
    }
});

const LiItem = React.createClass({
    render: function() {
        return <li>
            <div className="list-item-desced border-bt">
                <div className="list-thumb-left">
                    <img src={this.props.imgurl}/>
                </div>
                <div className="list-main">
                    <a href={this.props.pagelink} className="list-txt txt-ellipsis1">{this.props.title}</a>
                    <p className="txt-desc txt-ellipsis2">{this.props.desctxt}</p>
                </div>
            </div>
        </li>;
    }
});

const UlItem = React.createClass({
    getInitialState:function(){
        var lists = [
            {
                id:1,
                imgurl:'images/m-pic1.jpg',
                pagelink:'beginners-details01.html',
                title:'什么是外汇?',
                desctxt:'Forex/FX是“外汇”的常用简称，它一般用来形容投资者及投机者在外汇市场进行'
            },
            {
                id:2,
                imgurl:'images/m-pic2.jpg',
                pagelink:'beginners-details02.html',
                title:'如何买卖外汇',
                desctxt:'网上外汇交易在过去十年变得十分受欢迎，原因是它为交易者提供了多个好处'
            },
            {
                id:3,
                imgurl:'images/m-pic3.jpg',
                pagelink:'beginners-details03.html',
                title:'基本概念',
                desctxt:'学习在一个新市场进行交易就好像学习说一种新语言一样。当您具备良好的词汇及了解一些基本观点和概念时，就可以事半功'
            },
            {
                id:4,
                imgurl:'images/m-pic4.jpg',
                pagelink:'beginners-details04.html',
                title:'如何查看图表',
                desctxt:'外汇交易者研发出多个方法试图分析货币对的方向无论是哪种交易者，您都需要学习如何解读图表'
            }
        ];
        return {
            lists : lists
        }
    },
    render: function() {
        var lists = this.state.lists;
        var listComps = lists.map(function (q) {
            return <LiItem
                key={q.id}
                desctxt={q.desctxt}
                title={q.title}
                imgurl = {q.imgurl}
                pagelink = {q.pagelink}
            />
        });

        return (
            <ul className="list">
                {listComps}
            </ul>
        )
    }
});

const BodyHtml = React.createClass({
    render: function() {
        return <div className="app-page-box">
            <Header />
            <section className="cen-conbox top-blank page-topfont"><UlItem /></section>
        </div>;
    }
});

ReactDOM.render(
    <BodyHtml />,
    document.getElementById('appBeginners')
);

