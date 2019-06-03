
class TitleBarGW extends React.Component {
    render(){
        const title = this.props.data.title ? true:false;
        const subtitle = this.props.data.subTitle ? true:false;
        const subtxt = this.props.data.subTxt ? true:false;
        let titleEle,subTitleEle,subTxtEle;

        if(title){
            if(this.props.data.title.constructor === Array){
                titleEle=[];
                this.props.data.title.map((item,i)=>{
                    titleEle[i]=<h2 className={i===0?"title active":"title"} key={i} dangerouslySetInnerHTML={{__html: item}}></h2>;
                });
            }else{
                titleEle=<h2 className="title" dangerouslySetInnerHTML={{__html: this.props.data.title}}></h2>;
            }
        }
        if(subtitle){
            subTitleEle=<p className="sub-title" dangerouslySetInnerHTML={{__html: this.props.data.subTitle}}></p>;
        }
        if(subtxt){
            subTxtEle=<p className="sub-txt" dangerouslySetInnerHTML={{__html: this.props.data.subTxt}}></p>;
        }
        return (
            <div className={this.props.data.class ? this.props.data.class:'titlebar'}>
                {titleEle}
                <div className={this.props.data.hasLine ? "titlebar-line":''}>
                    {subTxtEle}
                    {this.props.data.hasLine && <i className="title-line-b"></i>}
                    {subTitleEle}
                </div>
            </div>
        )
    }
}
class BtnGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            opts: props.data.opts,
            items:props.data.items
        }
    }
    render(){
        return (
            <div className={this.state.opts.class?"btn-group "+this.state.opts.class:"btn-group"}>
                {this.state.items.map((item,index)=>{
                    let event = item.linkA?true:false;
                    if(event){
                        return <span key={index} dangerouslySetInnerHTML={{__html: item.linkA}}></span>
                    }else{
                        return <a href={item.url} target="_blank" key={index} className={item.class}>{item.value}</a>
                    }
                })}
            </div>
        )
    }
}
class Advantages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            iconClass: props.data.iconClass,
            items:props.data.items
        }
    }
    render(){
        let iconClass = this.state.iconClass;
        return (
            <div className={this.props.data.class}>
                <ul className={this.props.data.listClass} id={iconClass}>
                    {this.state.items.map(function (item,i) {
                        return <li key={i}>
                            <i className={iconClass + ++i}></i><span dangerouslySetInnerHTML={{__html: item}}></span>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
class Illustr extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            opts: props.data.opts,
            items:props.data.items
        }
    }
    render(){
        return (
            <div className={this.state.opts.class?"illustr-group "+this.state.opts.class:"illustr-group"}>
                {this.state.items.map((item,i)=>{
                    return <div className={item.class} key={i}>

                    </div>
                })}
            </div>
        )
    }
}
class ListGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            opts: props.data.opts,
            items:props.data.items
        }
    }
    render(){
        return (
            <div className={this.state.opts.class?"list-group "+this.state.opts.class:"list-group"}>
                <ul>
                    {this.state.items.map((item,i)=>{
                        let linkItem = item.linkA?<BtnGroup data={item.linkA} />:'';
                        return <li key={i}>
                            <div className={this.state.opts.itemClass?"list-item "+this.state.opts.itemClass:"list-item"}>
                                <i className={"item-icon " + this.state.opts.iconClass + ++i}></i>
                                <div className="item-txt">
                                    <div className="txt-top" dangerouslySetInnerHTML={{__html: item.txtTop}}></div>
                                    <div className="txt" dangerouslySetInnerHTML={{__html: item.txt}}></div>
                                </div>
                                {linkItem}
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
class ListTB extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            opts: props.data.opts,
            items:props.data.items
        }
    }
    render(){
        return(
            <div className={this.state.opts.class?"list-tb "+this.state.opts.class:"list-tb"}>
                <ul>
                    {this.state.items.map((item,i)=>{
                        let hasIcon = item.iconClass;
                        let iconEle=[];
                        return <li className={"tb-cell tb-cell"+i} key={i}>
                            <div className="tb-th" dangerouslySetInnerHTML={{__html: item.head}}></div>
                            {item.body.map((td,index)=>{
                                if(hasIcon && hasIcon.length>0){
                                    if(hasIcon.length==1){
                                        iconEle[index]=hasIcon[0];
                                    }else{
                                        iconEle[index]=hasIcon[index];
                                    }
                                }
                                if(item.span){
                                    return <div className="tb-td" key={index}><i className={iconEle[index]}></i><span dangerouslySetInnerHTML={{__html: td}}></span></div>
                                }else{
                                    return <div className="tb-td" key={index} dangerouslySetInnerHTML={{__html: td}}></div>
                                }
                            })}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
class BadgeGroup extends React.Component{
    render() {
        return(
            <div className={(this.props.props && this.props.props.class)?"badge-group "+this.props.props.class:"badge-group"}>
                {this.props.data.map((item,i)=>{
                    return <span key={i} className={(this.props.props && this.props.props.itemClass)?"badge-item "+this.props.props.itemClass:"badge-item"}>{item}</span>
                })}
            </div>
        )
    }
}
class UserInfo extends React.Component{
    render(){
        return (
            <div className={(this.props.props && this.props.props.class)?"user-info "+this.props.props.class:"user-info"}>
                <span className="s-avatar"><img src={"/images/avatars/"+this.props.data.avatar} alt=""/></span>
                <div className="user-data">
                    <span className="u-name">{this.props.data.avatarName}</span>
                    <span className="u-rating">
                        {this.props.data.statLevel.map((item,i)=>{
                            return <i className={item} key={i}></i>
                        })}
                    </span>
                </div>
            </div>
        )
    }
}
class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            opts: props.data.opts,
            items:props.data.items
        }
    }
    render(){
        let arrowPrevEle = (this.state.opts.arrowClass && this.state.items.length)?<span className={this.state.opts.arrowClass+" btn-prev"}><i className={this.state.opts.prevClass}></i></span>:"";
        let arrowNextEle = (this.state.opts.arrowClass && this.state.items.length)?<span className={this.state.opts.arrowClass+" btn-next"}><i className={this.state.opts.nextClass}></i></span>:"";

        return(
            <div className={this.state.opts.class?"slider "+this.state.opts.class:"slider"}>
                {arrowPrevEle}{arrowNextEle}
                <div className="slider-items">
                    <ul>
                        {this.state.items.map((item,index)=>{
                            let picEle = item.picname?<img src={"/images/"+item.picname} alt=""/>:'';
                            let titleEle = item.title?<span dangerouslySetInnerHTML={{__html:item.title}}></span>:'';
                            let descEle = item.desc?<span dangerouslySetInnerHTML={{__html:item.desc}} className="s-desc"></span>:'';
                            let badgeEle;
                            let iconEle = item.iconClass?<i className={"s-icon "+item.iconClass}></i>:'';
                            if(item.badge && item.badge.length){
                                badgeEle= <BadgeGroup data={item.badge} props={{class:'slider-badge'}} />;
                            }
                            return <li key={index}>
                                <div className={this.state.opts.itemClass?"slider-item "+this.state.opts.itemClass:"slider-item"}>
                                    {picEle}
                                    <div className="s-title">{badgeEle}{titleEle}{descEle}</div>
                                    {item.avatar?<UserInfo data={item} />:''}
                                    {iconEle}
                                    {item.linkA?<div dangerouslySetInnerHTML={{__html: item.linkA}} className="slider-link"></div>:''}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

/*Banner*/
function Banner() {
    return (
        <div className="index-banner computer">
            <IndexBanner data={indexSlides} />
        </div>
    )
}
function BannerM() {
    return (
        <div className="index-banner mobile">
            <IndexBannerM data={indexSlides} />
        </div>
    )
}
function IndexBanner(props) {
    return(
        <div className="slider-banner">
            {props.data.map((slide) =>{
                let linktype = slide.url?true:false;
                let event = slide.title=='gofx'?true:false;
                if(linktype){
                    if(event){
                        return <div className="slide" key={slide.id} dangerouslySetInnerHTML={{__html: slide.linkA}}></div>
                    }else{
                        return <div className="slide" key={slide.id}><a href={slide.url} target="_blank" style={{backgroundImage: 'url('+slide.cover+')'}}></a></div>
                    }
                }else{
                    return <div className="slide" key={slide.id}><a href="javascript:;" style={{backgroundImage: 'url('+slide.cover+')'}}></a></div>
                }
            })}
        </div>
    )
}
function IndexBannerM(props) {
    return(
        <div className="slider-banner mobile">
            {props.data.map((slide) =>{
                let linktype = slide.url?true:false;
                let event = slide.title=='gofx'?true:false;
                if(linktype){
                    if(event){
                        return <div className="slide" key={slide.id} dangerouslySetInnerHTML={{__html: slide.linkA}}></div>
                    }else{
                        return <div className="slide" key={slide.id}><a href={slide.url} target="_blank" style={{backgroundImage: 'url('+slide.coverm+')'}}></a></div>
                    }
                }else{
                    return <div className="slide" key={slide.id}><a href="javascript:;" style={{backgroundImage: 'url('+slide.coverm+')'}}></a></div>
                }
            })}
        </div>
    )
}
let indexSlides = [
    {id:4,url:'https://www.hsb.co.id/edukasi/seminar-pendidikan.html?#utm_source=pcgwbanner_onetoone',title:'Edukasi Secara Privat',cover:'/images/banner4.jpg',coverm:'/images/banner4-m.jpg'},
    {id:2,url:'https://www.hsb.co.id/lp/lp20_ayvz_201904hd.html?#utm_source=pcgwbanner20',title:'banner20',cover:'/images/banner2.jpg',coverm:'/images/banner2.jpg'},
    {id:3,url:'https://www.hsb.co.id/lp/lp12_hwvz_201902hd.html?#utm_source=pcgwbanner3',title:'Join Lucky Draw and Become Lucky Trader',cover:'/images/banner3.gif',coverm:'/images/banner3.gif'},
    // {id:1,url:'http://www.gofx.co.id',title:'gofx',linkA:"<a href='http://www.gofx.co.id' target=\"_blank\" style='background-image: url(/images/banner1.jpg)' onclick=\"dataLayer.push({'event':'pcgwbanner4','gtm.elementTarget': 'pcgwindex','gtm.element': 'content_first'});\"></a>"},
];
function BannerBtnGroup(props) {
    return (
        <div className={props.data.opts && props.data.opts.class?"link-group "+props.data.opts.class:"link-group"}>
            {props.data.items.map((btn) =>{
                return <div className={btn.class} key={btn.id} dangerouslySetInnerHTML={{__html: btn.linkA}}></div>
            })}
        </div>
    )
}
let bannerBtns = {
    opts:{class:"w-part group-two opgroup-btns-bg"},
    items:[
        {id:1,class:"btn btn-yellow",linkA:'<a href="https://ui.hsb.co.id/?utm_source=pcgw_banner_AkunAlive#/login/RVf" target="_blank" rel="nofollow"><i class="i-btn-01 fl"></i><span class="fl">Buka Akun Alive</span>Komisi trading serendah $1<i class="i-arrow-r"></i></a>'},
        {id:2,class:"btn btn-blue",linkA:'<a href="https://ui.hsb.co.id/?utm_source=pcgw_banner_AkunDemo#/register/RVf" target="_blank" rel="nofollow"><i class="i-btn-03 fl"></i><span class="fl">Buka Akun Demo</span>Akun Demo Virtual $100000 <i class="i-arrow-r2"></i></a>'}
    ]
};

/*part1*/
function Part1() {
    return (
        <div className="part1 part-bg-i1">
            <TitleBarGW data={title1} />
            <BtnGroup data={btnList1} />
            <div className="w-part">
                <Advantages data={advantages} />
            </div>
        </div>
    )
}
const title1 = {
    "title":"Dijamin tidak ada <br/> kecurangan sistem",
    "subTitle":'Salah satu broker pertama di indonesia yang menyediakan fasilitas "CITRA" dimana <br/> nasabah dapat melihat setiap transaksi mereka secara langsung',
    "hasLine":true,
    "class":"titlebar-gw al-c"
};
const btnList1 = {
    opts:{class:"al-c"},
    items:[
        {linkA:"<a href=\"/ICDX-details.html\" target=\"_blank\" class=\"btn-gw btn-yellow-default\">Detail</a>"},
    ]
};
const advantages={
    "class":"advantages-comp citra-advantage",
    "listClass":"citra-icons-bg",
    "iconClass":"i-citra",
    "items":["transparan","regulasi","keadilan","keselamatan"]
};

/*part2*/
function Part2() {
    return (
        <div className="part2 part-bg-i2">
            <div className="w-part">
                <div className="table">
                    <div className="table-cell">
                        <TitleBarGW data={title2} />
                        <BtnGroup data={btnList2} />
                    </div>
                </div>
            </div>
        </div>
    )
}
const title2 = {
    "title":"Komisi Terendah Mulai Dari USD 1",
    "subTxt":'Hanson Trader dikembangkan oleh Hanson sendiri dengan menyesuaikan kebutuhan dan pola trading nasabah.Trading di Platform，tanpa perantara IB (Introducing Broker), sehingga nasabah bisa menikmati penawaran harga terendah dengan service yang terbaik.',
    "hasLine":false,
    "class":"titlebar-gw al-c"
};
const btnList2 = {
    opts:{class:"al-c"},
    items:[
        {linkA:"<a href=\"https://www.hsb.co.id/lp/lp20_ayvz_201904hd.html?#utm_source=pcgwpart\" target=\"_blank\" class=\"btn-gw btn-yellow-default\">Detail</a>"},
    ]
};

/*part3*/
function Part3() {
    return (
        <div className="part3 bg-f7f7f7">
            <TitleBarGW data={title3} />
            <div className="w-part">
                <ListGroup data={list3} />
            </div>
        </div>
    )
}
const title3 = {
    "title":"Why Hanson",
    "hasLine":true,
    "class":"titlebar-gw al-c"
};
const list3 = {
    opts:{class:"choice-list list-col-2",iconClass:"i-choice",itemClass:""},
    items:[
        {txtTop:"Credibility",txt:"Mendapatkan sertifikasi BAPPEBTI, <br/> member ICDX dan ICH, trading lebih <br/> terpercaya."},
        {txtTop:"Fund Security",txt:"Keamanan dana nasabah dijamin oleh<br/> sistem akun terpisah, dana nasabah <br/> dan perusahaan dipisahkan, trading <br/> lebih aman."},
        {txtTop:"Trading Platform",txt:"Semua dalam satu trading platform / <br/> pembukaan akun cepat / gratis akun<br/> demo"},
        {txtTop:"Low Spread",txt:"Menyediakan spread rendah, kesempatan<br/> untung lebih banyak, trading jadi lebih<br/> menyenangkan."},
    ]
};

/*part4*/
function Part4() {
    return (
        <div className="part4">
            <TitleBarGW data={title4} />
            <div className="w-part">
                <ListGroup data={list4} />
            </div>
        </div>
    )
}
const title4 = {
    "title":"Our Products",
    "hasLine":true,
    "class":"titlebar-gw al-c"
};
const list4 = {
    opts:{class:"products-list list-col-3 al-c",iconClass:"i-products",itemClass:""},
    items:[
        {txtTop:"Forex",txt:"18 pasang kurs, termasuk<br/> EUR/USD, GBP/USD",linkA:{
            opts:{class:"al-c"},
            items:[
                {linkA:"<a href=\"/trading-produk/forex.html\" target=\"_blank\" class=\"btn-gw btn-yellow-default\">Detail</a>"},
            ]
        }},
        {txtTop:"Index",txt:"Index Nikkei, Index Hang Seng,<br/> Index Saham Amerika Futures",linkA:{
            opts:{class:"al-c"},
            items:[
                {linkA:"<a href=\"/saham/rincian-kontrak.html\" target=\"_blank\" class=\"btn-gw btn-yellow-default\">Detail</a>"},
            ]
        }},
        {txtTop:"Commodities",txt:"Emas, Perak, Komoditas, dll.",linkA:{
            opts:{class:"al-c"},
            items:[
                {linkA:"<a href=\"/trading-produk/komoditas.html\" target=\"_blank\" class=\"btn-gw btn-yellow-default\">Detail</a>"},
            ]
        }},
    ]
};

/*part5*/
function Part5() {
    return (
        <div className="part5 part-bg-i5">
            <TitleBarGW data={title5} />
            <div className="w-part">
                <ListGroup data={list5} />
                <BtnGroup data={btnList5} />
                <Illustr data={illustrList5} />
            </div>
        </div>
    )
}
const title5 = {
    "title":"Hason Trading Platform",
    "hasLine":true,
    "subTxt":"Mensupport PC dan Perangkat Mobile",
    "class":"titlebar-gw al-c",
};
const list5 = {
    opts:{class:"platform-list list-col-3 al-c",iconClass:"i-platform",itemClass:""},
    items:[
        {txtTop:"Pelayanan cepat",txt:"Buka akun, deposit dll. dalam one stop."},
        {txtTop:"Proses order cepat",txt:"Dengan sistem proses market real-time<br/> Hanson Trader, order Anda dapat<br/> diproses secepat 0.02 detik."},
        {txtTop:"Informasi berbagai index",txt:"Hanson Trader menyediakan informasi<br/> 17 macam index untuk nasabah."},
    ]
};
const btnList5 = {
    opts:{class:"al-c"},
    items:[
        {linkA:"<a href=\"javascript:;\" target=\"_blank\" onclick='downloadAppgw(this)' rel=\"nofollow\" class=\"btn-gw btn-yellow-default\">Click to Download</a>"},
    ]
};
const illustrList5 = {
    opts:{class:"illustr-mac al-c"},
    items:[
        {class:"illustr-phone"},
    ]
};

/*part6*/
function Part6() {
    return (
        <div className="part6">
            <TitleBarGW data={title6} />
            <div className="w-part">
                <ListTB data={listTB6} />
                <div className="opgroup-btns">
                    <BannerBtnGroup data={bannerBtns6} />
                </div>
            </div>
        </div>
    )
}
const title6 = {
    "title":"Perbandingan <br/>Platform Investasi",
    "hasLine":true,
    "subTxt":"Kekuatan platform investasi bukan cuma jaminan keamanan dana, tapi juga kunci vitalitas nasabah ",
    "class":"titlebar-gw al-c",
};
const listTB6 ={
    opts:{class:"platform-tb al-c"},
    items:[
        {
            head:"<span>Platform<br/> Investasi Lain</span>",
            span:true,
            body:["USD 500 - 1000","USD 30 - 35","100","Tidak ada lisensi lokal, transaksi tidak dapat dijamin, dan hak dari nasabah sulit dipertahankan","/","/","/","/","/","/"],
            iconClass:["i-x1"]
        },
        {
            head:"<i class='i-vs'></i>",
            span:true,
            body:["Minimal<br/> deposit","Komisi","Leverage","Lisensi","CITRA","Buka akun<br/> dan deposit","Penarikan dari<br/> aplikasi","Kedalaman<br/> pasar","Server cloud","Aplikasi"]
        },
        {
            head:"Hanson",
            span:true,
            body:["USD 100","USD 1","200","BAPPEBTI、ICDX、ICH","Menyadiakan akun pengecekan <br/> transaksi untuk nasabah","Buka akun dalam 5 menit,<br/> deposit dalam 15 menit","kedatangan segera, kedatangan pada hari yang sama (bank berbeda)","Kedalaman harga 5 tingkat","Ekspansi cepat, transaksi stabil","Dilengkapi dengan artikel, <br/>berita dan event"],
            iconClass:["i-r1"]
        }
    ]
};
let bannerBtns6 = {
    opts:{class:"group-two"},
    items:[
        {id:1,class:"btn btn-yellow",linkA:'<a href="https://ui.hsb.co.id/?utm_source=pcgw_part_AkunAlive#/login/RVf" target="_blank" rel="nofollow"><span class="fl">Buka Akun Alive</span>Komisi trading serendah $1<i class="i-arrow-r"></i></a>'},
        {id:2,class:"btn btn-blue",linkA:'<a href="https://ui.hsb.co.id/?utm_source=pcgw_part_AkunDemo#/register/RVf" target="_blank" rel="nofollow"><span class="fl">Buka Akun Demo</span>Akun Demo Virtual $100000 <i class="i-arrow-r2"></i></a>'}
    ]
};

/*part7*/
function Part7() {
    return (
        <div className="part7 bg-f7f7f7 tab-group">
            <div className="w-part">
                <TitleBarGW data={title7} />
                <div className="tab-panel active">
                    <Slider data={slider71} />
                </div>
                <div className="tab-panel">
                    <Slider data={slider72} />
                </div>
            </div>
        </div>
    )
}
const title7 = {
    "title":["Daily<br/> Analysis","Economic<br/> News"],
    "hasLine":true,
    "class":"titlebar-gw tab-nav",
};
const slider71={
    opts:{class:"sliderLeftRight article-block",arrowClass:"arrow-btn",prevClass:"i-btn-l1",nextClass:"i-btn-r1"},
    items:[
        {picname:"pic-news1.jpg",title:"Informasi berbagai index",badge:["EUR/USD"],iconClass:"i-new-s1",linkA:'<a href="" target="_blank">Selengkapnya <i class="i-arrow-r1"></i></a>'},
        {picname:"pic-news2.jpg",title:"Informasi berbagai index berbagai index",badge:["EUR/USD","Event"],iconClass:"i-new-s1",linkA:'<a href="" target="_blank">Selengkapnya <i class="i-arrow-r1"></i></a>'},
        {picname:"pic-news3.jpg",title:"Informasi berbagai index",badge:["EUR/USD"],linkA:'<a href="" target="_blank">Selengkapnya <i class="i-arrow-r1"></i></a>'},
        {picname:"pic-news4.jpg",title:"Informasi berbagai index",badge:["EUR/USD","Event"],linkA:'<a href="" target="_blank">Selengkapnya <i class="i-arrow-r1"></i></a>'},
    ]
}
const slider72={
    opts:{class:"sliderLeftRight article-block",arrowClass:"arrow-btn",prevClass:"i-btn-l1",nextClass:"i-btn-r1"},
    items:[
        {picname:"pic-news1.jpg",title:"Informasi berbagai index",badge:["EUR/USD"],iconClass:"i-new-s1",linkA:'<a href="" target="_blank">Selengkapnya <i class="i-arrow-r1"></i></a>'},
        // {picname:"pic-news4.jpg",title:"Informasi berbagai index",badge:["EUR/USD","Event"],linkA:'<a href="" target="_blank">Selengkapnya <i class="i-arrow-r1"></i></a>'},
    ]
}

/*part8*/
function Part8() {
    return (
        <div className="part8">
            <TitleBarGW data={title8} />
            <Slider data={slider8} />
        </div>
    )
}
const title8 = {
    "title":"Customer Feedback",
    "hasLine":true,
    "class":"titlebar-gw al-c",
};
const slider8={
    opts:{class:"sliderLeftRight feedback-block",itemClass:"user-box",arrowClass:"arrow-btn",prevClass:"i-btn-l2",nextClass:"i-btn-r2"},
    items:[
        {avatar:"avatar1.png",avatarName:"Carolos",statLevel:["i-star1","i-star1","i-star1","i-star1","i-star1"],title:"Mudah dan Menyenangkan",desc:"Aplikasi ini sangat bagus. saya suka trading menggunakan aplikasi ini. kamu dapat membuka akun dan mengaturnya di aplikasi ini."},
        {avatar:"avatar2.png",avatarName:"Gabriel",statLevel:["i-star1","i-star1","i-star1","i-star1","i-star1"],title:"Trading broker terbaik",desc:"Mantap Hanson, kamu dapat mengecek setiap transaksi melalui CITRA dan tim cs 24 jam selalu siap membantu Anda."},
        {avatar:"avatar3.png",avatarName:"Miguel",statLevel:["i-star1","i-star1","i-star1","i-star1","i-star1"],title:"Pengalaman yang baik",desc:"Jempol untuk deposit dan penarikan dana yang sangat cepat and servis lainnya juga bagus."},
        {avatar:"avatar4.png",avatarName:"Fabiana",statLevel:["i-star1","i-star1","i-star1","i-star1","i-star1"],title:"All in one app",desc:"Hanya membutuhkan waktu yang singkat dan bisa mendapatkan profit di all in one app ini."},
        {avatar:"avatar5.png",avatarName:"Carna",statLevel:["i-star1","i-star1","i-star1","i-star1","i-star1"],title:"Reputasi bagus",desc:"Saya belajar bagaimana untuk trading dan bagaimana menjadi trader yang baik dari artikel yang disediakan  dalam aplikasi."},
    ]
}

function BodyHtml() {
    return (
        <div className="wrapper index-page">
            <Banner /><BannerM />
            <div className="opgroup-btns">
                <BannerBtnGroup data={bannerBtns} />
            </div>
            <Part1 />
            <Part2 />
            <Part3 />
            <Part4 />
            <Part5 />
            <Part6 />
            <Part7 />
            <Part8 />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
