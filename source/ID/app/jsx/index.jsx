/*banner*/
function AppBanner() {
    const dataBanners = dataBanner;
    const listPagination = dataBanners.map((banner)=>
        <span key={banner.id}></span>
    );

    return (
        <section className="m-banner slider-container sliderLeftRight">
            <SliderList banners={dataBanners} />
            <div className="slider-pagination">
                {listPagination}
            </div>
        </section>
    )
}
function SliderList(props) {
    return (
        <ul className="slider-wrapper">
            {
                props.banners.map(function (banner,index) {
                    const link = banner.url ? true : false;
                    let linkEle;
                    if(link){
                        linkEle = <a href={banner.url} className="addLocationPath"><img src={banner.src} alt="" /></a>
                    }else{
                        linkEle = <img src={banner.src} width="100%" />
                    }
                    if(banner.title){
                        return <li className="slider-slide" key={banner.id}>
                            <LotteryBanner />
                        </li>
                    }else{
                        return <li className="slider-slide" key={banner.id}>
                            {linkEle}
                        </li>
                    }
                })
            }
        </ul>
    )
}
const dataBanner = [
    {id: 0, title:'bonus', src: '/app/images/appbanner11.jpg'},
    {id: 1, url: 'http://www.hsb.co.id/lp4_hwvz_201808hd.html?#utm_source=app1_1&utm_medium=banner', src: '/app/images/appbanner11.jpg'},
    {id: 2, src: '/app/images/appbanner11.jpg'}
];
function LotteryBanner() {
    return (
        <div className="lottery-banner">
            <a href="https://ui.hsb.co.id/static/mobile.html?utm_medium=banner&utm_source=app1_1#/bonus/RVf" className="addLocationPath">
                <div className="bonuspool">
                    <div className="lucky-txt"></div>
                    <div className="bonuspool-border">
                        <div className="bonuspool-anim">
                            <i className="anim-bonuspooll1"></i>
                            <i className="anim-bonuspooll2"></i>
                            <i className="anim-bonuspooll3"></i>
                            <i className="anim-bonuspoolr1"></i>
                            <i className="anim-bonuspoolr2"></i>
                            <i className="anim-bonuspoolr3"></i>
                        </div>
                        <div className="bonuspool-number" id="bonusPoolSlider"></div>
                        <div className="bonuspool-msg"><span className="btn">Dapatkan Sekarang</span></div>
                    </div>
                </div>
            </a>
        </div>
    )
}

/*trade-record*/
class TradeRecord extends React.Component {
    render(){
        return <section className="f-bgfff border-b" dangerouslySetInnerHTML={{__html: this.props.data}}>
        </section>
    }
}
const tradeRecord = '<a href="trade-record.html" onclick="dataLayer.push({\'event\':$home_Trade_Record,\'gtm.elementTarget\': $GA_NAME,\'gtm.element\': \'content_first\'})" ' +
    'class="addLocationPath link-bar theme-pink"><span class="link-icon-l icon-badge theme-yellow"><i class="icon-b2"></i></span>' +
    '<div class="link-con-c"><b class="txt-1">Pemenang Lucky Trader Periode Lalu</b><div class="eachOneScrollUp" id="awardPeriodLi"><ul id="awardPeriod1"></ul></div></div>' +
    '<div class="link-con-c ul-tb"><b class="txt-1">Real Time Ikut Undian</b><div class="eachOneScrollUp" id="eachOneScrollUp0"><ul></ul></div></div>' +
    '<i class="link-icon-r i-arrow-r"></i></a>';

function BodyHtml() {
    return (
        <div className="wrapper">
            <AppBanner /><TradeRecord data ={tradeRecord} />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
