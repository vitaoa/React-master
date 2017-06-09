
const Header = React.createClass({
    render: function() {
        return <header className="app-hd-top">
            <a href="javascript:history.go(-1)" className="app-hd-back"><i></i>返回</a>
            <span className="app-hd-title">热门活动</span>
        </header>;
}
});

const LiItem = React.createClass({
    render: function() {
        var desctxtarray = this.props.desctxt;
        var desctxtlist = desctxtarray.map(function(e){
            return <p key={e} className={!desctxtarray[1] ? 'p2': ''}>{e}</p>;
        });
        return <li className={this.props.hasseal?'clearfix hasseal':'clearfix'}>
            <a href="app-activiesDetails.html">
                <aside className="hd-im-tt fl">
                    {this.props.asideLeft}
                    <div className="hd-im-cont" dangerouslySetInnerHTML={{__html: this.props.aprice}} ></div>
                    {this.props.atxt}
                </aside>
                <article className="hd-r-conbox">
                    <i className="more-link-ic"></i>
                    <h2>{this.props.title}</h2>
                    <div className="hd-r-tinfo">
                        <p className="hd-r-label">领取条件：</p>
                        {desctxtlist}
                    </div>
                </article>
                <s className="jiao-top"><img src="images/hd-ic-t.png" width="100%" alt=""/></s>
                <s className="jiao-bottom"><img src="images/hd-ic-b.png" width="100%" alt=""/></s>
            </a>
        </li>;
    }
});

const UlItem = React.createClass({
    getInitialState:function(){
        var lists = [
            {
                id:1,
                title:'新用户专享,开户激活送200美金',
                desctxt:['有效期：30天','新用户开户并入金'],
                aprice:'$200',
                atxt:<p className="hd-im-text hd-im-text2">赠金</p>
            },
            {
                id:2,
                title:'5月特惠,用户充值送赠金',
                desctxt:['有效期：即日起至2017年5月31日 ','用户入金并满足交易条件送赠金'],
                asideLeft:<i>最高<s></s></i>,
                aprice:'$5000',
                atxt:<p className="hd-im-text hd-im-text2">赠金</p>
            },
            {
                id:3,
                title:'10元手机话费',
                desctxt:[' 1.模拟账户，平仓10笔 ','2.模拟资金10000元'],
                aprice:'<b>￥</b>10',
                atxt:<p className="hd-im-text">手机话费</p>
            },
            {
                id:4,
                title:'100M手机国内流量',
                desctxt:[' 1.模拟账户，平仓30笔 ','2.模拟资金40000元'],
                aprice:'100M',
                atxt:<p className="hd-im-text">手机流量</p>
            },
            {
                id:5,
                title:'30M手机国内流量',
                desctxt:[' 注册模拟账户'],
                aprice:'30M',
                atxt:<p className="hd-im-text">手机流量</p>,
                hasseal:true
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
                asideLeft={q.asideLeft}
                title={q.title}
                aprice={q.aprice}
                atxt={q.atxt}
                hasseal={q.hasseal}
            />
        })

        return (
            <ul>
                {listComps}
            </ul>
        )
    }
});

const AppPopupLogin = React.createClass({
    render:function () {
        return <div className="app-popuptb app-popup dn" id="appPopupLogin">
            <div className="app-popupcell">
                <div className="app-popupcon al-c">
                    <span className="app-popup-closebtn"></span>
                    <p className="app-popup-txt">您还未登录，请登录或开户后，<br/> 再来吧！</p>
                    <div className="app-popup-btngroup">
                        <a href="" className="btn btn-red">确定</a>
                    </div>
                </div>
            </div>
        </div>
    }
});
const AppPopupLiquidine = React.createClass({
    render:function () {
        return <div className="app-popuptb app-popup dn" id="appPopupLiquidine">
            <div className="app-popupcell">
                <div className="app-popupcon al-c">
                    <span className="app-popup-closebtn"></span>
                    <p className="app-popup-txt">您还需平仓10笔才能兑换噢 <br/> 快去交易吧</p>
                    <div className="app-popup-btngroup">
                        <a href="" className="btn btn-red">确定</a>
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
            <section className="app-hd-cen"><UlItem /></section>
            <AppPopupLogin />
            <AppPopupLiquidine />
        </div>;
    }
});


ReactDOM.render(
    <BodyHtml />,
    document.getElementById('appActivies')
);

