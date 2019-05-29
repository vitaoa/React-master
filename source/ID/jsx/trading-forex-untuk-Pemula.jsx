
class BreadCrumb extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            opts: props.data.opts,
            items:props.data.items
        }
    }
    render(){
        return (
            <div className={this.state.opts.class?"breadcrumb "+this.state.opts.class:"breadcrumb"}>
                <div className="container">
                    {this.state.items.map((item,index)=>{
                        let event = item.linkA?true:false;
                        if(event){
                            return <span key={index} dangerouslySetInnerHTML={{__html: item.linkA}}></span>
                        }else{
                            return <span key={index}>{item.name}</span>
                        }
                    })}
                </div>
            </div>
        )
    }
}
function BtnGroup(props) {
    return (
        <div className={props.data.opts && props.data.opts.class?"link-group "+props.data.opts.class:"link-group"}>
            {props.data.items.map((btn) =>{
                return <div className={btn.class} key={btn.id} dangerouslySetInnerHTML={{__html: btn.linkA}}></div>
            })}
        </div>
    )
}
let breadCrumb={
    opts:{class:"top-breadCrumb"},
    items:[
        {linkA:'<a href="https://www.hsb.co.id" target="_blank">Home<i>&lt;</i></a>'},
        {linkA:'<a href="https://www.hsb.co.id/trading-produk/forex.html" target="_blank">Forex<i>&lt;</i></a>'},
        {name:'Tubuh'}
    ]
}
let bannerBtns = {
    opts:{class:"group-two"},
    items:[
        {id:2,class:"btn btn-blue",linkA:'<a href="https://ui.hsb.co.id/?utm_source=pcgw_banner_AkunDemo#/register/RVf" target="_blank" rel="nofollow"><i class="i-btn-03 fl"></i><span class="fl">Buka Akun Demo</span><i class="i-arrow-r2"></i></a>'},
        {id:1,class:"btn btn-yellow",linkA:'<a href="https://ui.hsb.co.id/?utm_source=pcgw_banner_AkunAlive#/login/RVf" target="_blank" rel="nofollow"><i class="i-btn-01 fl"></i><span class="fl">Buka Akun Alive</span><i class="i-arrow-r"></i></a>'},
    ]
};

function BodyHtml() {
    return (
        <div className="side-main">
            <a href="https://www.hsb.co.id/lp/lp20_ayvz_201904hd.html?#utm_source=trading_forex_untuk_Pemula" target="_blank">
                <img src="/images/trade/banner.jpg" alt="" className="computer"/>
                <img src="/images/trade/bannerm.jpg" alt="" className="mobile"/>
            </a>
            <div className="plrc">
                <div className="p-tit1">
                    Trading Forex Untuk Pemula
                </div>
                <p className="p-txt1">Baru belajar Trading dan tidak tahu mau mulai darimana? Ini adalah panduan untuk pemula khusus buat Anda.</p>
                <div className="p-tit2">
                    Istilah dalam Forex
                </div>
                <p className="p-txt1">
                    1. Forex adalah nilai tukar antara dua mata uang. <br/>
                    Harga di pasar Forex mewakili harga pertukaran mata uang dengan mata uang lain. Misalnya, jika harga EUR / USD adalah 1,30, maka ini berarti bahwa 1 Euro dapat ditukar dengan 1,30 USD.
                </p>
                <p className="p-txt1">
                    2. Spread <br/>
                    Spread adalah selisih pip atau poin antara harga permintaan (ask) dan penawaran (bid) . Spread sebenarnya adalah biaya transaksi sehingga sangat penting bagi investor.</p>
                <p className="p-txt1">
                    3. Posisi <br/>
                    Posisi adalah ukuran transaksi yang sedang berlangsung. Dalam transaksi, ada posisi buy dan posisi sell. <br/>
                    Posisi buy: Investor membeli mata uang dan mengharapkan harga mata uang naik. Setelah harga naik, posisi buy ditutup. <br/>
                    Posisi sell: Investor menjual mata uang yang diperkirakan akan jatuh. Setelah harga turun, posisi sell ditutup.</p>
                <p className="p-txt1">
                    4. Grafik di Forex <br/>
                    Di perdagangan forex menggunakan grafik untuk menunjukkan tren di pasar.Ada tiga jenis grafik: grafik K-line, grafik batang, dan grafik garis.</p>
                <div className="illstr-txt-block">
                    <ul>
                        <li>
                            <div className="illstr-item">
                                <p className="item-tit">Grafik K-line</p>
                                <i className="illstr1"></i>
                                <p>Disebut juga candlestick, dari grafik Anda bisa melihat harga paling tinggi, harga paling rendah, harga buka pasar dan harga penutupan pasar.</p>
                            </div>
                        </li>
                        <li>
                            <div className="illstr-item">
                                <p className="item-tit">Grafik Batang</p>
                                <i className="illstr2"></i>
                                <p>Menunjukkan harga pembukaan, penutupan, tertinggi, dan terendah dari pasangan mata uang. Bagian atas bar adalah harga tertinggi untuk perdagangan dalam periode waktu tertentu, dan harga terendah ditampilkan di bagian bawah.</p>
                            </div>
                        </li>
                        <li>
                            <div className="illstr-item">
                                <p className="item-tit">Grafik Garis</p>
                                <i className="illstr3"></i>
                                <p>Paling mudah, cocok untuk pemula</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <p className="p-txt1">
                    Untuk membantu Anda memahami dasar pengetahuan perdagangan Forex, HANSON menyiapkan kursus profesional:
                    <br/>
                    1. Untuk pemula, pahami dasar-dasar trading Fore.<br/>
                    2. Kursus profesional untuk trader profesional.<br/>
                    3. Offline Seminar yang dibawa oleh Pelatih Profesional.
                </p>
                <div className="pic-list">
                    <img src="/images/trade/pic-1.jpg" alt=""/>
                    <img src="/images/trade/pic-2.jpg" alt=""/>
                    <img src="/images/trade/pic-3.jpg" alt=""/>
                </div>
                <div className="p-tit2">Mulai Trading Forex Anda Sekarang</div>
                <p className="p-txt1">Daftar Akun Demo dan Login. Kemudian pilih pasangan mata uang (mis. EUR / USD), masukkan volume, tekan tombol "Beli" dan Anda telah menjadi salah satu dari jutaan trader di pasar Forex di seluruh dunia.<br/>
                    Jika harga EUR / USD naik, Anda akan menghasilkan uang, dan sebaliknya jika harganya turun Anda akan mengalami kerugian.<br/>
                    Lihat keuntungan / kerugian Anda saat ini di tab Posisi. Jika Anda ingin menutup posisi, cukup tekan tombol X di tab posisi untuk menutup posisi.</p>
                <div className="p-tit2">Keuntungan HANSON</div>
                <p className="p-txt1">1. Di bawah regulasi dan pengawasan Bappebti, dana Anda tersimpan di akun terpisah dan bisa diwithdrawal kapan pun saja.</p>
                <p className="p-txt1">2. Platform perdagangan yang dikembangkan sendiri, dengan layanan All-in-One. Buka akun / deposit / transaksi / online CS, Anda bisa trading kapan saja dan dimana saja.</p>
                <p className="p-txt1">3. Deposit dan Dapatkan Komisi Terendah,Deposit Awal $100 Komisi $10/Lot,Deposit Awal $300 Komisi $5/Lot,Deposit Awal $1000 Komisi $1/Lot.</p>
                <div className="al-c">
                    <span className="p-txt-badge">Registrasi Sekarang dan dapatkan Dana Virtual $100000</span>
                </div>
                <div className="opgroup-btns">
                    <BtnGroup data={bannerBtns} />
                </div>
            </div>
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
ReactDOM.render(
    <BreadCrumb data={breadCrumb} />,
    document.getElementById('breadCrumb')
);
ReactDOM.render(
    <div>Buka Akun Demo<span>Registrasi Sekarang dan dapatkan Dana Virtual$100000</span></div>,
    document.querySelector('.form-title')
);
