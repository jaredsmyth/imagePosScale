$(window).load(function(){
	$('.box').each(function(){
		if($(this).hasClass('boxcenterlefttop')){
			$(this).imagePosScale({'method':{'style':'center','alignX':'center','alignY':'bottom'}});
		}else if ($(this).hasClass('boxcenterleft')){
			$(this).imagePosScale({'method':{'style':'center','alignX':'left','alignY':'center'}});
		}else if ($(this).hasClass('boxleft')) {
			$(this).imagePosScale({'padAmount':'1','method':{'style':'fill','alignX':'left','alignY':'center'}});
		}else if ($(this).hasClass('boxbottomright')){
			$(this).imagePosScale({'method':{'style':'center','alignX':'right','alignY':'bottom'}});
		} else {
			$(this).imagePosScale();
		}
	});
});