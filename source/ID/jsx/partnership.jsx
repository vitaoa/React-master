

function Banner() {
    return (
        <div className="pnship-banner al-c">
            <div className="table">
                <div className="table-cell">
                    <h1 className="pnship-title">WORK WITH LEGAL AND TRUSTED BROKER</h1>
                    <p>Dapatkan skema komisi yang kompetitif dengan pembayaran real-time!</p>
                    <div className="pnship-contact">
                        <span><i className="i-ps-tel"></i> 0812 9389 7223</span>
                        <span><i className="i-ps-mail"></i> ib@hsb.co.id</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Advantage() {
    return (
        <div className="pnship-advantage">
            <div className="container">
                <h2 className="pnship-title al-c">Dapatkan Income Tambahan Tanpa Batas
                    <br/>Selama Masa Transaksi Nasabah</h2>
                <div className="page-titlebar al-c">
                    <div className="titlebar-line">
                        <p>Ini adalah cara terbaik untuk mengembangkan bisnis Anda sendiri dan mewujudkan impian Anda.</p>
                        <i className="title-line-b"></i>
                    </div>
                </div>
                <ul className="offer-list clearfix pnship-icons-bg">
                    <li><i className="i-icon-ib1"></i><span>Teregulasi oleh <br/>Bappebti</span> </li>
                    <li><i className="i-icon-ib2"></i><span>komisi yang <br/>bersaing </span> </li>
                    <li><i className="i-icon-ib3"></i><span>Pembayaran real-time <br/>& setiap hari</span> </li>
                    <li><i className="i-icon-ib4"></i><span>Dedicated support <br/>& Layanan 24/5</span> </li>
                    <li><i className="i-icon-ib5"></i><span>Platform trading <br/>ALL-IN-ONE</span> </li>
                    <li><i className="i-icon-ib6"></i><span>Proteksi keamanan <br/>dana nasabah</span> </li>
                </ul>
            </div>
        </div>
    )
}

function Program(){
    return (
    <div className="pnship-program">
        <div className="container">
            <div className="side-block clearfix">
                <div className="side-block-left">
                    <div className="block-item">
                        <div className="item-tit">Benefit anda </div>
                        <ul className="block-list">
                            <li><i className="i-ps-check"></i> Skema komisi yang menarik</li>
                            <li><i className="i-ps-check"></i> Penghasilan ekstra tanpa batas</li>
                            <li><i className="i-ps-check"></i> Transparan & dukungan penuh</li>
                            <li><i className="i-ps-check"></i> Jaminan keamanan dana nasabah</li>
                        </ul>
                    </div>
                    <div className="block-item">
                        <div className="item-tit">Benefit client anda </div>
                        <ul className="block-list">
                            <li><i className="i-ps-check"></i> Spread paling kompetitif</li>
                            <li><i className="i-ps-check"></i> Inovatif Trading Platform</li>
                            <li><i className="i-ps-check"></i> Tersedia Depth of Market (DOM)</li>
                            <li><i className="i-ps-check"></i> Deposit/ Penarikan Dana cepat</li>
                            <li><i className="i-ps-check"></i> Layanan 24/5</li>
                        </ul>
                    </div>
                </div>
                <div className="side-block-right">
                    <iframe src="https://goo.gl/forms/OmcX72f6sTSAyB4F2" frameBorder="0" width="100%" height="100%"></iframe>
                </div>
            </div>
        </div>
    </div>
    )
}


function BodyHtml() {
    return (
        <div className="main-content">
            <Banner /><Advantage /><Program />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
