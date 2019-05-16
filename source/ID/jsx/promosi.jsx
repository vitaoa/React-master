

function Part1() {
    return (
        <div className="part1">
            <TitleBarGW data={title1} />
            <div className="container">
                <div className="part-pic-list">
                    <a href="/lp/lp20_ayvz_201904hd.html" target="_blank" className="pic-item"><img src="/images/promosi/pic1.jpg" alt=""/><i className="i-hot-badge">HOT</i></a>
                    <a href="/lp/lp12_hwvz_201902hd.html" target="_blank" className="pic-item"><img src="/images/promosi/pic2.jpg" alt=""/></a>
                </div>
            </div>
        </div>
    )
}
function Part2() {
    return (
        <div className="part2 part2-bg">
            <TitleBarGW data={title2} />
            <div className="container al-c">
                <StepBlock data={stepList} />
                <BtnGroup data={btnList} />
            </div>
        </div>
    )
}
function Part3() {
    return (
        <div className="part3 part3-bg">
            <TitleBarGW data={title3} />
            <div className="container">
                <Advantages data={advantage} />
            </div>
        </div>
    )
}
function BtnGroup(props) {
    return (
        <div className="btn-group">
            {props.data.map((item,index)=>{
                return <a href="javascript:;" target="_blank" key={index} className={item.class}>{item.value}</a>
            })}
        </div>
    )
}
class StepBlock extends React.Component{
    render(){
        return (
            <div className="step-block">
                {this.props.data.map((item,index)=>{
                    let arrowEle = index===0?'':<i className="i-step-arrow"></i>;
                    return <div className="step-item block-step-bg" key={index}>
                        <div className="block-tit-bg">Step {++index}</div>
                        <i className={"i-promosi0" + index}></i>
                        <div dangerouslySetInnerHTML={{__html: item.txt}} className="item-txt"></div>
                        {arrowEle}
                    </div>
                })}
            </div>
        )
    }
}
class Advantages extends React.Component{
    render(){
        return (
            <div className={this.props.data.class}>
                <ul className={this.props.data.listClass}>
                    <li><i className="i-promosi11"></i><span>Eksekusi cepat di deposit <br/>dan penarikan dana</span> </li>
                    <li><i className="i-promosi12"></i><span>Komisi <br/>terendah </span> </li>
                    <li><i className="i-promosi13"></i><span>User interface <br/>yang mudah</span> </li>
                    <li><i className="i-promosi14"></i><span>Trading kapanpun <br/>dan dimanapun</span> </li>
                    <li><i className="i-promosi15"></i><span>Diregulasi oleh <br/>pemerintah</span> </li>
                    <li><i className="i-promosi16"></i><span>24/5 Customer <br/>Service</span> </li>
                </ul>
            </div>
        )
    }
}
class TitleBarGW extends React.Component {
    render(){
        const title = this.props.data.title ? true:false;
        const subtitle = this.props.data.subTitle ? true:false;
        let titleEle,subTitleEle;

        if(title){
            titleEle=<h2 className="title">{this.props.data.title}</h2>;
        }
        if(subtitle){
            subTitleEle=<p className="sub-title">{this.props.data.subTitle}</p>;
        }
        return (
            <div className={this.props.data.class ? this.props.data.class:'titlebar'}>
                {titleEle}
                <div className={this.props.data.hasLine ? "titlebar-line":''}>
                    {subTitleEle}
                    {this.props.data.hasLine && <i className="title-line-b"></i>}
                </div>
            </div>
        )
    }
}

const title1 = {
    "title":"PROMOSI",
    "subTitle":"Semua penawaran eksklusif and bonus dari Hanson",
    "hasLine":true,
    "class":"page-titlebar al-c"
};
const title2 = {
    "title":"Siap memulai",
    "subTitle":"Mulai trading dalam 3 langkah mudah",
    "hasLine":true,
    "class":"page-titlebar al-c"
};
const title3 = {
    "title":"Kenapa trading bersama Hanson",
    "subTitle":"Fitur kami membantu Anda untuk trading lebih baik",
    "hasLine":true,
    "class":"page-titlebar al-c"
};
const advantage={
    "class":"advantage-comp promosi-advantage",
    "listClass":"promosi-icons-bg",
};
const btnList=[
    {"value":"Buka akun riil","class":"btn btn-yellow"},
    {"value":"Buka akun demo","class":"btn btn-yellow-default"}
];
const stepList = [
    {"txt":"<p>Lengkapi formulir <br/>pendaftaran</p>"},
    {"txt":"<p>Aktifkan akun Anda dengan <br/>menekan link aktivasi yang <br/>kami kirimkan melalui <br/>email</p>"},
    {"txt":"<p>Anda akan mendapatkan nama <br/>pengguna dan kata sandi <br/>untuk masuk kedalam <br/>halaman akun</p>"},
];
function BodyHtml() {
    return (
        <div className="wrapper promosi-page">
            <Part1 /><Part2 /><Part3 />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);