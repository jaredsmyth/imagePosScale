//global plugin loader
var methodLoader = function(methods, method, el, name){
	if ( methods[method] ) {
      return methods[method].apply( el, Array.prototype.slice.call( arguments, 1 )); 
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( el, Array.prototype.slice.call( arguments, 1 ));
    } else {
      $.error( 'Method ' +  method + ' does not exist on '+name );
    }  
}

$(window).load(function(){ 
	$('.box').each(function(){
		if($(this).hasClass('boxcenterlefttop')){
			$(this).imagePosScale({'method':{'style':'center','alignX':'center','alignY':'top'}});
		}else if ($(this).hasClass('boxcenterleft')){
			$(this).imagePosScale({'method':{'style':'center','alignX':'left','alignY':'center'}});
		}else if ($(this).hasClass('boxleft')) {
			$(this).imagePosScale({'method':{'style':'center','alignX':'left','alignY':'center'}});
		}else if ($(this).hasClass('boxbottomright')){
			$(this).imagePosScale({'method':{'style':'center','alignX':'right','alignY':'bottom'}});
		} else {
			$(this).imagePosScale();
		}
	});
});

$(document).ready(function(){
	$('.box').each(function(){
		$(this).bind('mouseover', function(){
			$(this).css('overflow','visible');
			$('img', this).animate({opacity:0.7},150);
		});
		$(this).bind('mouseleave', function(){
			$(this).css('overflow','hidden');
			$('img', this).animate({opacity:1},150);
		});
	});
	$('#notes_scroll').bind('click', function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop: $($(this).attr('href')).offset().top},300);
	})
});