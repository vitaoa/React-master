
function NoPage() {
    return (
        <div className="null-page al-c">
            <div className="null-icon">

            </div>
            <p className="p1"><b>Page not found</b></p>
            <p className="p2">You can return to homepage or contact CS for latest information</p>
            <div className="btn-group">
                <a href="/" className="btn btn-yellow-default">Homepage</a>
            </div>
        </div>
    )
}
function BodyHtml() {
    return (
        <div className="wrapper">
            <NoPage />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
