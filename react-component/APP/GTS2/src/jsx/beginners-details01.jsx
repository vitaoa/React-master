
const Header = React.createClass({
    render: function() {
        return <header className="app-top-head fixed-top">
            <a href="javascript:history.go(-1);" className="head-link-l head-icon-l"><i className="i-back"></i>返回</a>
        </header>;
    }
});

const MBanner = React.createClass({
    render: function() {
        return <div className="m-banner">
            <img src="images/m-banner01.jpg" alt="" width="100%"/>
            <p className="m-banner-txt i-help">什么是<b>外汇</b></p>
        </div>;
    }
});

const BlockItem = React.createClass({
    render: function() {
        return <div className="block-item plrc">
            <div className="block-item-title"><span className="vline-tit">{this.props.title}</span></div>
            <div className="block-txtimg" dangerouslySetInnerHTML={{__html: this.props.txtandimg}}></div>
            <div className="block-txtlist" dangerouslySetInnerHTML={{__html: this.props.blocklist}}></div>
        </div>;
    }
});

const BlockList = React.createClass({
    getInitialState:function(){
        var lists = [
            {
                id:1,
                title:'当我买卖外汇时，我究竟在做什么？',
                txtandimg:'<p>什么是外汇？Forex/ FX是“外汇”的常用简称，它一般用来形容投资者及投机者在外汇市场进行的交易。</p>' +
                '<img src="images/m-detailpic01.jpg" alt="" width="100%" class="block-img" />',
                blocklist:'<div class="eg-block">' +
                '<span class="eg-badge">举例说</span>' +
                '<div class="eg-list"><p>假设预期美元相对于欧元的价值将会走弱。在这个情况下，外汇交易者将会卖出美元及买入欧元。若欧元走强，买入美元的购买力现在增加。跟一开始相比，交易者现在可以买回更多美元，因而获利。</p><p>这跟股票交易相若。假如股票交易者认为某只股票的价格将会在未来上升，他将会买入股票，而假如他认为某只股票的价格将会在未来下跌，他将会卖出股票。同样地，假如外汇交易者预期某货币对的汇率将会在未来上升，他将会买入该个货币对，而假如他预期某货币对的汇率将会在未来下跌，他将会卖出该个货币对。</p></div>' +
                '</div>'
            },
            {
                id:2,
                title:'什么是汇率？',
                txtandimg:'<p>外汇市场是一个厘定不同货币的相对价值的环球分散市场。有别于其他市场，外汇并没有中央集中处理存管或兑换。相反，这些交易是由几个地方几个市场参与者进行的。任何两种货币的价值与另一者相同的情况十分罕见，而任何两种货币维持相同相对价值超过一段短时间的情况亦十分罕见。就外汇来说，两种货币之间的汇率经常都在转变。</p>' +
                '<img src="images/m-detailpic02.jpg" alt="" width="100%" class="block-img" />',
                blocklist:'<div class="eg-block">' +
                '<span class="eg-badge">举例说</span>' +
                '<div class="eg-list"><p>于2011年1月3日，1欧元约值1.33美元。于2011年5月3日，1欧元约值1.48美元。在这段时间，欧元相对于美元的价值上升了约10%。</p></div>' +
                '</div>'
            },
            {
                id:3,
                title:'汇率为何会转变？',
                txtandimg:'<img src="images/m-detailpic03.jpg" alt="" width="100%" class="block-img" />',
                blocklist:'<p>外汇是在公开市场买卖的，就像股票、债券、电脑、汽车及许多其他货品及服务一样。货币的价值会跟随其供应及需求的波动而波动，就像其他东西一样。</p>' +
                '<ul><li><span>1</span>某货币的供应增加或需求下跌可能会导致该货币的价值下跌。</li><li><span>2</span>某货币的供应下跌或需求增加可能会导致该货币的价值上升。</li></ul>' +
                '<p>外汇交易的一大好处是您可以视乎可得流通量而定而买入或卖出任何货币对。因此，假如您认为欧元区将会瓦解，您可以卖出欧元并买入美元(卖出欧元/美元)。假如您认为金价将会上升，根据历史关联系数型态，您可以买入澳元及卖出美元(买入澳元/美元)。</p>' +
                '<p>这亦表示，在传统观点上外汇并无所谓的“熊市”。当市场走高或走低时，您可能会赚取(或亏蚀)资金。</p>'
            }
        ];
        return {
            lists : lists
        }
    },
    render: function() {
        var lists = this.state.lists;
        var listComps = lists.map(function (q) {
            return <BlockItem
                key={q.id}
                title={q.title}
                txtandimg = {q.txtandimg}
                blocklist = {q.blocklist}
            />
        });

        return (
            <div className="block-list">
                {listComps}
            </div>
        )
    }
});


const BodyHtml = React.createClass({
    render: function() {
        return <div className="app-page-box">
            <Header />
            <section className="cen-conbox top-blank page-topfont"><MBanner /><BlockList /></section>
        </div>;
    }
});



ReactDOM.render(
    <BodyHtml />,
    document.getElementById('appBeginners')
);

