/*
	Version	: 0.1
	Plugin	: Jquery Image Positioning and Scaling
	Author	: Jared Smith | http://jaredsmyth.info
	Company : JVST | http://jvst.us

	License: Creative Commons Attribution-ShareAlike 3.0
*/
;(function($) {

	//default settings
	var defaultSettings = {
		//padAmount sets the amount to extend the image past the edges of the 
		//wrapper div
		'padAmount' : '1',

		//maxEnlargement sets the maximum amount to scale the image UP from
		//its original size. set as float in percentage
		'maxEnlargement' : '1',

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
		}

	};

	//our methods
	var methods = {
		init : function (options){
			var self = this;
			$(this).data('options_imagePosScale', $.extend(this, defaultSettings, options));
			var options = $(this).data('options_imagePosScale');

			$(self).imagePosScale('scale');
			
		},

		scale : function(){
			var self = this;
			var options = $(self).data('options_imagePosScale');

			var containerWidth = $(this).width();
			var containerHeight = $(this).height();
			var imageWidth = $('img', this).width()*options.padAmount;
			var imageHeight = $('img', this).height()*options.padAmount;

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

			var styleOpts = {
				'cleanLeft' : cleanLeft,
				'cleanTop' : cleanTop,
				'finalWidth' : finalWidth,
				'finalHeight' : finalHeight,
				'maxHeight' : maxHeight,
				'maxWidth' :maxWidth,
				'cWidth' : containerWidth,
				'cHeight' : containerHeight
			}

			$(self).imagePosScale('align', styleOpts);
		},

		align : function(styleOpts){
			var self = this;
			var options = $(self).data('options_imagePosScale');

			//check our alignX options
			switch(options.method['alignX']){
				case 'center':
					styleOpts['cleanLeft'] = (styleOpts['cWidth']-styleOpts['finalWidth'])/2;
					break;
				case 'left':
					styleOpts['cleanLeft'] = '0';
					break;
				case 'right':
					styleOpts['cleanLeft'] = (styleOpts['cWidth']-styleOpts['finalWidth']);
					break
			}

			//check our alignY options
			switch(options.method['alignY']){
				case 'center':
					styleOpts['cleanTop'] = (styleOpts['cHeight']-styleOpts['finalHeight'])/2;
					break;
				case 'top':
					styleOpts['cleanTop'] = '0';
					break;
				case 'bottom':
					styleOpts['cleanTop'] = (styleOpts['cHeight']-styleOpts['finalHeight']);
					break
			}

			$(self).imagePosScale('render',styleOpts);

		},

		render : function(styleOpts){
			$('img', this).css({
				'margin-left':styleOpts['cleanLeft']+'px',
				'margin-top':styleOpts['cleanTop']+'px',
				'width':styleOpts['finalWidth']+'px', 
				'height':styleOpts['finalHeight']+'px', 
				'max-width':styleOpts['maxWidth'],
				'max-height':styleOpts['maxHeight']
			});
		}

	};

	$.fn.imagePosScale = function( method ) {
    	if ( methods[method] ) {
      	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
      	return methods.init.apply( this, arguments );
    	} else {
      	$.error( 'Method ' +  method + ' does not exist on jQuery.imagePosScale' );
    	}    
  	};
})( jQuery );