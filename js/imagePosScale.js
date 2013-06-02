/*
	Version	: 0.1
	Plugin	: Jquery Image Positioning and Scaling
	Author	: Jared Smith | http://jaredsmyth.info
	Company : JVST | http://jvst.us
*/
;(function($) {

	//default settings
	var defaultSettings = {
		//padAmount sets the amount to extend the image past the edges of the 
		//wrapper div
		'padAmount' : 1,

		//maxEnlargement sets the maximum amount to scale the image UP from
		//its original size. set as float in percentage
		'maxEnlargement' : 1,

		//method[style] allows for values of 'fill' or 'center' - sets whether the
		//image should 'fill' the container in a cropping style, or 'center'
		//within the container to show the whole image
		//----------
		//method[alignX] allows for these directional values: 
		// - left
		// - right
		// - center
		//----------
		//method[alignY] allow for these directional values:
		// - top
		// - bottom
		// - center
		'method' : {
			'style' : 'fill', 
			'alignX' : 'center',
			'alignY' : 'center'
		},

		//we don't ever manually set these - they just get instanced here
		'styleOpts' : {
			'cleanLeft' : '',
			'cleanTop' : '',
			'finalWidth' : '',
			'finalHeight' : '',
			'maxHeight' : '',
			'maxWidth' : '',
			'cWidth' : '',
			'cHeight' : ''
		}

	};

	//our methods
	var methods = {
		init : function (options){
			var self = this;
			$(this).data('options_imagePosScale', $.extend(this, defaultSettings, options));
			var options = $(this).data('options_imagePosScale');

			//check for pad amount and reset to one if set to 0
			switch(options.padAmount){
				case '0':
					options.padAmount = 1;
					break;
			}

			//add 0.75 to whatever our padAmount is
			//this fixes sub-pixel renderings for browsers that don't render fractional pixels
			options.padAmount+=0.75; 

			//get to it
			$(self).imagePosScale('scale');
		},

		scale : function(){
			var self = this;
			var options = $(self).data('options_imagePosScale');

			var containerWidth = $(self).width();
			var containerHeight = $(self).height();
			var imageWidth = $('img', self).width()*options.padAmount;
			var imageHeight = $('img', self).height()*options.padAmount;

			//setup maxwidth and maxheight
			var maxHeight = parseInt(imageHeight*options.maxEnlargement)+'px';
			var maxWidth = parseInt(imageWidth*options.maxEnlargement)+'px';
			rto = 1;

			var ratioW = containerWidth / imageWidth;
			var ratioH = containerHeight / imageHeight;
			if(ratioW == ratioH) rto = ratioW;
			else rto = (ratioW > ratioH) ? ratioW: ratioH;
			
			//default settings to fill / center
			var newWidth = (imageWidth * rto);
			var newHeight = (imageHeight * rto);
			var cleanLeft = (containerWidth-newWidth)/2;
			var cleanTop = (containerHeight-newHeight)/2;
			var finalHeight = parseInt(newHeight);
			var finalWidth = parseInt(newWidth);

			
			if(finalWidth > finalHeight){
				if(options.method['style'] == 'center'){
					finalWidth = containerWidth;
					finalHeight = (imageHeight / imageWidth)*finalWidth;
				}
			}else if (finalWidth < finalHeight){
				if(options.method['style'] == 'center' ){
					finalHeight = containerHeight;
					finalWidth = (imageWidth / imageHeight)*finalHeight;
				}
			}else if(finalHeight == finalWidth){
				if(options.method['style'] == 'center'){
					finalWidth = containerHeight;
					finalHeight = containerHeight;
				}
			}

			options.styleOpts = {
				'cleanLeft' : cleanLeft,
				'cleanTop' : cleanTop,
				'finalWidth' : finalWidth,
				'finalHeight' : finalHeight,
				'maxHeight' : maxHeight,
				'maxWidth' : maxWidth,
				'cWidth' : containerWidth,
				'cHeight' : containerHeight
			}

			$(self).imagePosScale('align');
		},

		align : function(){
			var self = this;
			var options = $(self).data('options_imagePosScale');

			//check our alignX options
			switch(options.method['alignX']){
				case 'center':
					options.styleOpts['cleanLeft'] = (options.styleOpts['cWidth']-options.styleOpts['finalWidth'])/2;
					break;
				case 'left':
					options.styleOpts['cleanLeft'] = '0';
					break;
				case 'right':
					options.styleOpts['cleanLeft'] = (options.styleOpts['cWidth']-options.styleOpts['finalWidth']);
					break
			}

			//check our alignY options
			switch(options.method['alignY']){
				case 'center':
					options.styleOpts['cleanTop'] = (options.styleOpts['cHeight']-options.styleOpts['finalHeight'])/2;
					break;
				case 'top':
					options.styleOpts['cleanTop'] = '0';
					break;
				case 'bottom':
					options.styleOpts['cleanTop'] = (options.styleOpts['cHeight']-options.styleOpts['finalHeight']);
					break
			}

			$(self).imagePosScale('render');

		},

		render : function(){
			var self = this;
			var options = $(self).data('options_imagePosScale');
			$('img', self).css({
				'margin-left' : options.styleOpts['cleanLeft']+'px',
				'margin-top' : options.styleOpts['cleanTop']+'px',
				'width' : options.styleOpts['finalWidth']+'px', 
				'height' : options.styleOpts['finalHeight']+'px', 
				'max-width' : options.styleOpts['maxWidth'],
				'max-height' : options.styleOpts['maxHeight']
			});
		}

	};

	$.fn.imagePosScale = function( method ) {
		var el = this;
		methodLoader(methods, method, el, 'imagePosScale');   
  	};
})( jQuery );