/**
 * @preserve Copyright 2011 Syd Lawrence ( www.sydlawrence.com ).
 * Version: 0.1
 *
 * Licensed under MIT and GPLv2.
 *
 * Usage: $('body').videoBG(options);
 *
 */

(function( $ ){

	$.fn.videoBG = function( selector, options ) {  
		var options = {};
		if (typeof selector == "object") {
			options = $.extend({}, $.fn.videoBG.defaults, selector);
		}
		else if (!selector) {
			options = $.fn.videoBG.defaults;
		}
		else {
			return $(selector).videoBG(options);		
		}
		
		var container = $(this);
		
		// check if elements available otherwise it will cause issues
		if (!container.length)
			return;
		
		// container to be at least relative
		if (container.css('position') == 'static' || !content.css('position'))
			container.css('position','relative');
		
		// we need a width
		if (options.width == 0)
			options.width = container.width();
		
		// we need a height
		if (options.height == 0)
			options.height = container.height();	
		
		// get the wrapper
		var wrap = $.fn.videoBG.wrapper();
		wrap.height(options.height)
			.width(options.width);
		
		// if is a text replacement
		if (options.textReplacement) {
		
			// force sizes
			options.scale = true;
			
			// set sizes and forcing text out
			container.width(options.width)
				.height(options.height)
				.css('text-indent','-9999px');
		}
		else {
		
			// set the wrapper above the video
			wrap.css('z-index',options.zIndex+1);
		}
		
		// move the contents into the wrapper
		wrap.html(container.html());
		
		// get the video
		var video = $.fn.videoBG.video(options);
		
		// if we are forcing width / height
		if (options.scale) {
			
			// overlay wrapper
			wrap.height(options.height)
				.width(options.width);
			
			// video
			video.height(options.height)
				.width(options.width);
		}
		
		// add it all to the container
		container.html(wrap);
		container.append(video);
		
		return this;
	}

	// get the formatted video element
	$.fn.videoBG.video = function(options) {
		
		// video container
		var $div = $('<div/>');
		$div.attr('id','videoBG')
			.css('position',options.position)
			.css('z-index',options.zIndex)
			.css('top',0)
			.css('left',0)
			.css('height',options.height)
			.css('width',options.width)
			.css('opacity',options.opacity)
			.css('overflow','hidden');
		
		// video element
		var $video = $('<video/>');
		$video.attr('autoplay',options.autoplay)
			.css('position','absolute')
			.css('z-index',options.zIndex)
			.css('top',0)
			.css('left',0)
			.css('min-width','100%')
			.css('min-height','100%');
		
		// video standard element
		var v = $video[0];
		
		// if meant to loop
		if (options.loop) {
			
			// cant use the loop attribute as firefox doesnt support it
			$video.bind('ended', function(){
			
				// replay that bad boy
				v.play();
  			});
		}
	  
	  	// supports webm
	  	if (v.canPlayType('video/webm; codecs="vp8, vorbis"')){
	  		// play webm
	  		$video.attr('src',options.webm);

	  	}
	  	// supports mp4
	  	else if (v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) {
	  		// play mp4
	  		$video.attr('src',options.mp4);
	  	}
	  	// supports ogv
	  	else {
	  		// play ogv
	  		$video.attr('src',options.ogv);
	  	}
		
		// image for those that dont support the video	
		var $img = $('<img/>');
		$img.attr('src',options.poster)
			.css('position','absolute')
			.css('z-index',options.zIndex)
			.css('top',0)
			.css('left',0)
			.css('min-width','100%')
			.css('min-height','100%');
		
		// add the image to the video
		$video.html($img);
		
		// add the video to the wrapper
		$div.html($video);
		
		// am I really doing this again?
		if (options.scale) {
			$div.css('height','100%').css('width','100%');
			$video.css('height','100%').css('width','100%');
			$img.css('height','100%').css('width','100%');
		}
		
		// if text replacement
		if (options.textReplacement) {
	
			// force the heights and widths
			$div.css('min-height',1).css('min-width',1);
			$video.css('min-height',1).css('min-width',1);
			$img.css('min-height',1).css('min-width',1);
			
			$div.height(options.height).width(options.width);
			$video.height(options.height).width(options.width);
			$img.height(options.height).width(options.width);	
		}
	
		return $div;
	}
	
	// get the overlay wrapper
	$.fn.videoBG.wrapper = function() {
		var $wrap = $('<div/>');
		$wrap.attr('id','videoBG_wrapper')
			.css('position','absolute')
			.css('top',0)
			.css('left',0);
		return $wrap;
	}
	
	// these are the defaults
	$.fn.videoBG.defaults = {
			mp4:'',
			ogv:'',
			webm:'',
			poster:'',
			autoplay:true,
			loop:true,
			sclae:false,
			position:"absolute",
			opacity:1,
			textReplacement:false,
			zIndex:0,
			width:0,
			height:0
		}

})( jQuery );

