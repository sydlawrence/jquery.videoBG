(function( $ ){

	$.fn.videoBG = function( selector, options ) {  
		var options = {};
		if (typeof selector == "object") {
			options = $.extend({}, $.fn.videoBG.defaults, selector);
			
			options.selector = this;
		}
		else if (!selector) {
			options = $.fn.videoBG.defaults;
			
			options.selector = this.selector;
		}
		else {
			return $(selector).videoBG(options);		
		}
		
				
		var settings = options;

		
		var content = $(this);
		
		
		
		var wrap = $.fn.videoBG.wrapper();
		wrap.height(content.height());
		wrap.width(content.width());
						
		if (options.textReplacement) {
			options.scale = true;
			content.width(content.width());
			content.height(content.height());
			content.css('position','relative');
			content.css('text-indent','-999px');
		}
		else {
			wrap.css('z-index',options.zIndex+1);
		}
		
		
		
		var video = $.fn.videoBG.video(options);
		
		wrap.html(content.html());
		
		if (options.scale) {
			wrap.height(content.height());
			wrap.width(content.width());
			video.height(content.height());
			video.width(content.width());
		}
		
		content.html(wrap);
		content.append(video);
		
		return this;
	
	}
	

	
	$.fn.videoBG.video = function(options) {
		var $div = $('<div/>');
		$div.attr('id','videoBG')
			.css('position',options.position)
			.css('z-index',options.zIndex)
			.css('top',0)
			.css('left',0)
			.css('height','100%')
			.css('width','100%')
			.css('opacity',options.opacity)
			.css('overflow','hidden');
		var $video = $('<video/>');
		$video.attr('autoplay',options.autoplay)
			.attr('loop',options.loop)
			.attr('poster',options.poster)
			
			.css('position','absolute')
			.css('z-index',options.zIndex)
			.css('top',0)
			.css('left',0)
			.css('min-width','100%')
			.css('min-height','100%');
			
		var v = $video[0];
	  	if (v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) {
	  		// play mp4
	  		$video.attr('src',options.mp4);
	  	}
	  	else {
	  		// play ogg
	  		$video.attr('src',options.ogg);
	  	}
		
			
			
		var $img = $('<img/>');
		$img.attr('src',options.poster)
			.css('position','absolute')
			.css('z-index',options.zIndex)
			.css('top',0)
			.css('left',0)
			.css('min-width','100%')
			.css('min-height','100%');
		$video.html($img);
		$div.html($video);
		
		if (options.scale) {
			$div.css('height','100%').css('width','100%');
			$video.css('height','100%').css('width','100%');
			$img.css('height','100%').css('width','100%');
		}
		
		
		
		return $div;
	}
	
	$.fn.videoBG.wrapper = function() {
		var $wrap = $('<div/>');
		$wrap.attr('id','videoBG_wrapper')
			.css('position','absolute')
			.css('top',0)
			.css('left',0);
		return $wrap;
	}
	
	$.fn.videoBG.defaults = {
			mp4:'',
			ogg:'',
			poster:'',
			autoplay:true,
			loop:true,
			sclae:false,
			position:"absolute",
			opacity:1,
			textReplacement:false,
			zIndex:0
		}

})( jQuery );

