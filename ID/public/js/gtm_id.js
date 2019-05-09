window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
$(function () {
// /* GTM */
    var head = document.head || document.getElementsByTagName('head')[0];
    var scriptTag1 = document.createElement('script');
    scriptTag1.type = 'text/javascript';
    scriptTag1.src = '/public/js/gtm.js';

    var comment1 = document.createComment('Google Tag Manager');
    var comment2 = document.createComment('End Google Tag Manager');
    head.appendChild(comment1);
    head.appendChild(scriptTag1);
    head.appendChild(comment2);

})