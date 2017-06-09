
const Header = React.createClass({
    render: function() {
        return <header className="app-hd-top">
            <a href="javascript:history.go(-1)" className="app-hd-back"><i></i>返回</a>
            <span className="app-hd-title">10元手机话费</span>
        </header>;
    }
});

const CardItem = React.createClass({
    render:function () {
        return <div className="carditem">
            <div className="carditem-badget">
                <span>移动联通电信</span>话费充值卡
            </div>
            <div className="carditem-txt">10<span>元</span></div>
            <div className="carditem-badgeb"><b>手机话费</b></div>
        </div>
    }
});
const CardItem2 = React.createClass({
    render:function () {
        return <div className="carditem dn">
            <div className="carditem-badget">
                <span>移动联通电信</span>流量充值卡
            </div>
            <div className="carditem-txt">100<span>M</span></div>
            <div className="carditem-badgeb"><b>手机流量</b></div>
        </div>
    }
});

const RulesBox = React.createClass({
    render:function () {
        return <div className="rulesbox">
            <div className="rulesbox-title"><span><i className="tit-l"></i>兑换细则<i className="tit-r"></i></span></div>
            <ul className="rulesboxlist">
                <li><span>1</span>系统自动将话费直接充入客户手机账户</li>
                <li><span>2</span>话费直充产品一经兑出或转增，将不予退换。</li>
                <li><span>3</span>客户成功兑换后，24小时内到账。</li>
                <li><span>4</span>若24小时候未收到话费，请联系在线客服</li>
            </ul>
        </div>
    }
});

const BtnGroup = React.createClass({
    render:function () {
        return <div className="btn-group">
            <a href="javascript:;" className="btn btn-yellow btn-block exchangePopup"><b>立即兑换</b></a>
        </div>
    }
});

const AppPopupPayment = React.createClass({
    render:function () {
        return <div className="app-popuptb app-popup dn" id="appPopupPayment">
            <div className="app-popupcell">
                <div className="app-popupcon al-c">
                    <span className="app-popup-closebtn"></span>
                    <p className="app-popup-txt block-inline">兑换手机：<span>130 8888 8888</span> <br/>兑换商品：<span>10</span>元手机话费</p>
                    <div className="app-popup-btngroup">
                        <a href="" className="btn btn-red">确认支付10000模拟资金</a>
                    </div>
                </div>
            </div>
        </div>
    }
});

const BodyHtml = React.createClass({
    render: function() {
        return <div className="app-hd-box">
            <Header />
            <section className="app-hd-cen app-activies-details">
                <CardItem />
                <CardItem2 />
                <p className="al-c p1">兑换手机：<span>130 8888 8888</span></p>
                <RulesBox />
                <BtnGroup />
                <p className="al-c p2">支付模拟资金：10000    <span>当前模拟资金：12000</span></p>
            </section>
            <AppPopupPayment />
        </div>;
    }
});


ReactDOM.render(
    <BodyHtml />,
    document.getElementById('appActiviesDetails')
);

