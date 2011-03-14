$(document).ready(function() {


	$('body').videoBG({
		position:"fixed",
		zIndex:-1,
		mp4:'christmas_snow.m4v',
		ogv:'christmas_snow.ogv',
		webm:'christmas_snow.webm',
		poster:'christmas_snow.jpg',
		opacity:1
	});
	
	
	$('#div_demo').videoBG({
		mp4:'tunnel_animation.m4v',
		ogv:'tunnel_animation.ogv',
		webm:'tunnel_animation.webm',
		poster:'tunnel_animation.jpg',
		scale:true,
		zIndex:0
	});
	
	
	$('#text_replacement_demo').videoBG({
		mp4:'text_replacement.mp4',
		ogv:'text_replacement.ogv',
		webm:'text_replacement.webm',
		poster:'text_replacement.png',
		textReplacement:true,
		width:760,
		height:24
	});
	
	
	
	
})