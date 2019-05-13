
function AppBanner(props) {
    const listItems = props.banners.map((banner) =>
        <li>{banner.panelhead}</li>
    );
    return (
        <section className="m-banner slider-container sliderLeftRight">
            <ul className="slider-wrapper">
                {listItems}
            </ul>
            <div className="slider-pagination">
                <span></span>
                <span></span>
            </div>
        </section>
    )
}

const dataBanner = [
    {id: 1, panelhead: 'Telesales', panelbody: {
        other:'<p>We are looking for enthusiastic persons to join our Sales team! ',
        description:'<p class="p1">Job Description</p>',
        requirement:'<p class="p1">Job Requirement</p>',
        btn:'<a href="javascript://" onclick="openLiveChat();" class="panel-btn btn-yellow online_service">Countact Us</a>'
    }},
];
function BodyHtml() {
    return (
        <div className="wrapper">
            <AppBanner banners={dataBanner} />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
