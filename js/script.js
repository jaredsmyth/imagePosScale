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
			$(this).imagePosScale({'method':{'style':'center','alignX':'center','alignY':'bottom'}});
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
			$('img', this).css('opacity','0.7');
		});
		$(this).bind('mouseout', function(){
			$(this).css('overflow','hidden');
			$('img', this).css('opacity','1');
		});
	});
});