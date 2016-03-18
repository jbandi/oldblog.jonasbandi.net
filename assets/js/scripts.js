// A $( document ).ready() block.
$( document ).ready(function() {

	// DropCap.js
	var dropcaps = document.querySelectorAll(".dropcap");
	window.Dropcap.layout(dropcaps, 2);

	// Responsive-Nav
	var nav = responsiveNav(".nav-collapse");

	// Round Reading Time
    $(".time").text(function (index, value) {
      return Math.round(parseFloat(value));
    });

    //
    // !function (d, s, id) {
    //
    //     if ($('#right-sidebar').css('display') !== 'none') {
    //         console.log("TWITTER");
    //
    //         var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
    //         if (!d.getElementById(id)) {
    //             js = d.createElement(s);
    //             js.id = id;
    //             js.src = p + "://platform.twitter.com/widgets.js";
    //                fjs.parentNode.insertBefore(js, fjs);
    //         }
    //     }
    // }(document, "script", "twitter-wjs");

});


