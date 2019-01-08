function UnCryptMailto( s )
{
    var n = 0;
    var r = "";
    for( var i = 0; i < s.length; i++)
    {
        n = s.charCodeAt( i );
        if( n >= 8364 )
        {
            n = 128;
        }
        r += String.fromCharCode( n - 1 );
    }
    return r;
}

function linkTo_UnCryptMailto( s )
{
    location.href=UnCryptMailto( s );
}

$(document).ready(function() {
	$(window).load(function() {
		$('.legal, .legal-close').click(function(){showNhideLegal(this)});
		setTimeout(function() {
			$('body:before').animate({opacity: 0}, 150);
			$('#poly').animate({
				opacity: 1
			}, 250, function() {
				$('h1, h2').css({
					'-webkit-transform': 'translateY(0px)',
					'-moz-transform': 'translateY(0px)',
					'-ms-transform': 'translateY(0px)',
					'-o-transform': 'translateY(0px)',
					'transform': 'translateY(0px)'
				});
				$('h1, h2').animate({
					opacity: 1
				}, 250);
			});
		}, 250);
	});
});

function showNhideLegal(elem) {
	switch($(elem).attr('class')) {
		case 'legal':
			$('footer').fadeIn(600);
			break;
		case 'legal-close':
			$('footer').fadeOut(600);
			break;
	}
}