import React from 'react';
import ReactDOM from 'react-dom';

const Banner = React.createClass({
    render: function() {
        return <div className="page-banner careers_banner al-c">
            <div className="table">
                <div className="table-cell">
                    <h1 className="banner-title">Bergabunglah bersama tim kami di Hanson
                        <br/>untuk memaksimalkan potensi anda
                    </h1>
                    <a href="javascript:;" className="banner-title-sub">Jelajahi Lowongan Pekerjaan &gt;&gt;</a>
                </div>
            </div>
        </div>;
    }
});
const Part1 = React.createClass({
    render:function () {
        return <div className="part1">
            <div className="container">
                <p className="al-c">Di Hanson, kami menganggap karyawan sebagai aset yang sangat berharga. Kami berupaya menyediakan lingkungan kerja yang profesional, aman, dan menyenangkan untuk mendukung antusiasme pekerjaan, hubungan positif, dan kerjasama tim yang efektif. Kami bekerja untuk memberikan komunikasi yang jelas tentang arah dan tujuan dan untuk memotivasi tim kami untuk mencapai target ini. Sebagai imbalannya, kami memberikan paket remunerasi dan tunjangan yang kompetitif dan peluang pelatihan yang sangat baik.</p>
            </div>
        </div>;
    }
});
const Part2 = React.createClass({
    render:function () {
        return <div className="part2">
            <div className="container">
                <div className="page-titlebar al-c">
                    <div className="titlebar-line"><h2>Keuntungan</h2><i className="title-line-b"></i></div>
                </div>
                <ListGroup1 />
            </div>
        </div>;
    }
});
const ListGroup1 = React.createClass({
    render:function () {
        return <div className="list-group al-c">
            <div className="list-item">
                <i className="i-careers01"></i>
                <p>Rencana kesehatan <br/>komprehensif</p>
            </div>
            <div className="list-item">
                <i className="i-careers02"></i>
                <p>Pengaturan cuti <br/>yang fleksibel</p>
            </div>
            <div className="list-item">
                <i className="i-careers03"></i>
                <p>Pelatihan & <br/>Pengembanganl</p>
            </div>
            <div className="list-item">
                <i className="i-careers04"></i>
                <p>Aktivitas <br/>rekreasi</p>
            </div>
        </div>;
    }
});

function ListGroup2(props) {
    console.log(props.props)
    return (
        <div className="list-group al-c">
            {props.props.map((post) =>
                <div className="list-item-panel" key={post.id}>
                    <div className="panel-head">
                        {post.panelhead}<span>Jakarta</span>
                        <i className="i-tri3-r"></i>
                        <i className="i-tri3-d"></i>
                    </div>
                    <div className="panel-body">
                        {post.panelbody.other ? <div dangerouslySetInnerHTML={{__html: post.panelbody.other}} className="p-other"></div>:''}
                        <div dangerouslySetInnerHTML={{__html: post.panelbody.description}} className="p-description"></div>
                        <div dangerouslySetInnerHTML={{__html: post.panelbody.requirement}} className="p-requirement"></div>
                        <div dangerouslySetInnerHTML={{__html: post.panelbody.btn}} className="btn-group"></div>
                        {post.panelbody.p2 ? <div dangerouslySetInnerHTML={{__html: post.panelbody.p2}} className="p2"></div>:''}
                    </div>
                </div>
            )}
        </div>
    )
}
const data2 = [
    {id: 1, panelhead: 'Telesales', panelbody: {
        other:'<p>We are looking for enthusiastic persons to join our Sales team! <br>'+
        'As a Telesales Officer, you will be responsible for generating calls to potential customers with the main goal to achieve your sales target.  </p>'+
        '<p>Candidates who pass the selection will get: </p>'+
        '<ul><li>Attractive remuneration</li>'+
        '<li>Attractive incentive and commission</li>'+
        '<li>Exciting career path</li>'+
        '</ul>',
        description:'<p class="p1">Job Description</p>'+
        '<ul>' +
        '<li>Identify, influence and convert new sales opportunities by phone, email or live chat etc by giving company service references.</li>' +
        '<li>Consistently achieve departmental set metrics</li>' +
        '<li>Support client operations and inquiries, including KYC, profile setup and account maintenance</li>' +
        '<li>Support regular reports and operational procedures update and other ad-hoc related assignments</li>' +
        '<li>Strengthen existing customer relationships by providing professional market analysis, delivering premium customer services and resolving client issues effectively</li>' +
        '</ul>',
        requirement:'<p class="p1">Job Requirement</p>'+
        '<ul>' +
        '<li>Degree holder in any disciplines</li>' +
        '<li>TeleSales experience, preferably gained in financial industry</li>' +
        '<li>Good understanding of securities business, FX and CFD is a plus</li>' +
        '<li>Strong communication and client servicing skills</li>' +
        '<li>Good communication skills both written and oral in English.</li>' +
        '<li>Good understanding of relevant regulatory policies and procedures</li>' +
        '</ul>',
        btn:'<a href="javascript://" onclick="openLiveChat();" class="panel-btn btn-yellow online_service">Countact Us</a>'
    }},
    {id: 2, panelhead: 'Customer Service', panelbody: {
        description:'<p class="p1">Job Description</p>'+
        '<ul>' +
        '<li>Prepare product or service reports by collecting and analyzing customer information</li>' +
        '<li>Contribute to team effort by accomplishing related results as needed</li>' +
        '<li>Manage large amounts of incoming calls</li>' +
        '<li>Generate sales leads</li>' +
        '<li>Meet personal/team sales targets and call handling quotas</li>' +
        '<li>Handle complaints, provide appropriate solutions and alternatives within the time limits and follow up to ensure resolution</li>' +
        '<li>Keep records of customer interactions, process customer accounts and file documents</li>' +
        '<li>Follow communication procedures, guidelines and policies</li>' +
        '<li>Use telephones to reach out to customers and verify account information</li>' +
        '<li>Assist with placement of orders, refunds, or exchanges</li>' +
        '<li>Attempt to persuade customer to reconsider cancellation</li>' +
        '<li>Inform customer of deals and promotions</li>' +
        '</ul>',
        requirement:'<p class="p1">Job Requirement</p>'+
        '<ul>' +
        '<li>Proven customer support experience</li>' +
        '<li>Track record of over-achieving quota</li>' +
        '<li>Strong phone contact handling skills and active listening</li>' +
        '<li>Customer orientation and ability to adapt/respond to different types of characters</li>' +
        '<li>Excellent communication and presentation skills</li>' +
        '<li>Ability to multi-task, prioritize and manage time effectively</li>' +
        '<li>College degree; or Bachelor Degree preferred</li>' +
        '<li>Willing to work on shift and Holidays</li>' +
        '<li>Good understanding of securities business. FX and CFD is a plus</li>' +
        '<li>Strong communication and client servicing skills</li>' +
        '<li>Native in Bahasa, good communication skills both written and oral in English</li>' +
        '<li>Good understanding of relevant regulatory policies and procedures</li>'+
        '</ul>',
        btn:'<a href="javascript://" onclick="openLiveChat();" class="panel-btn btn-yellow online_service">Countact Us</a>'
    }},
    {id: 3, panelhead: 'Business Development Assistant Manager', panelbody: {
        description:'<p class="p1">Job Description</p>'+
        '<ul>'+
        '<li>Oversees deposit and withdrawal proposal from customers.</li>' +
        '<li>Execute fund transfer to and from customers’ accounts</li>' +
        '<li>Daily Reconcile of fund flow.</li>' +
        '<li>Coordinate with other departments to achieve company’s target</li>' +
        '</ul>',
        requirement:'<p class="p1">Job Requirement</p>'+
        '<ul>' +
        '<li>Hardworking</li>' +
        '<li>Integrity and well behaved</li>' +
        '<li>Attention to details and Discipline</li>' +
        '<li>Willing to work on rosters and during national holiday</li>' +
        '<li>Able to work under pressure</li>' +
        '<li>Able to learn fast and highly adaptable in a fast paced working environment</li>' +
        '<li>Able to operate Microsoft Office</li>' +
        '<li>SMU degree or equivalent</li>' +
        '</ul>',
        btn:'<a href="javascript://" onclick="openLiveChat();" class="panel-btn btn-yellow online_service">Countact Us</a>'
    }},
    {id: 4, panelhead: 'Penerjemah Mandarin', panelbody: {
        description:'<p class="p1">Job Description</p>'+
        '<ul>' +
        '<li>Fast Learning and high adaptability</li>' +
        '<li>Hard working</li>' +
        '<li>Candidate must possess at least Bachelor Degree in any field</li>' +
        '<li>Able to listen, speak and write in Mandarin (Simplified / Traditional)</li>' +
        '<li>Overseas working experience is highly considered</li>' +
        '</ul>',
        requirement:'<p class="p1">Job Requirement</p>'+
        '<ul>' +
        '<li>Translate document from Mandarin - Indonesia / English and vice versa</li>' +
        '<li>Translate communication between local staff and overseas executives</li>' +
        '<li>Support upper management in day to day task</li>' +
        '</ul>',
        btn:'<a href="javascript://" onclick="openLiveChat();" class="panel-btn btn-yellow online_service">Countact Us</a>'
    }},
    {id: 5, panelhead: 'Public Relations', panelbody: {
        description:'<p class="p1">Qualification</p>'+
        '<ul>' +
        '<li>Female</li>' +
        '<li>Min D3, any Majors</li>' +
        '<li>Excellent interpersonal and Communication skill</li>' +
        '<li>Good appearance</li>' +
        '<li>Good command of English</li>' +
        '<li>Able to work under pressure</li>' +
        '<li>Target Oriented</li>' +
        '</ul>',
        requirement:'<p class="p1">Benefits</p>'+
        '<ul>' +
        '<li>Basic salary</li>' +
        '<li>Incentive and Bonus</li>' +
        '</ul>',
        p2:'<p>Interested candidates may send CV to buddyprakoso9@gmail.com</p>',
        btn:'<a href="javascript://" onclick="openLiveChat();" class="panel-btn btn-yellow online_service">Countact Us</a>'
    }}
];
function Part3() {
    return (
        <div className="part3 careers_part3bg">
            <div className="container">
                <div className="page-titlebar al-c">
                    <div className="titlebar-line"><h2>Join Our Team</h2><i className="title-line-b"></i></div>
                </div>
                <ListGroup2 props={data2} />
            </div>
        </div>
    )
}
function BodyHtml() {
    return (
        <div className="wrapper careers-page">
            <Banner /><Part1 /><Part2 /><Part3 />
        </div>
    )
}
ReactDOM.render(
    <BodyHtml />,
    document.getElementById('wrapperContent')
);
