$(function(){
	
	$.ajax({
		method: 'GET',
		url:'api/videos',
		success:function(videos){
			$.each(videos, function(i, video){
				$("#videolist").append('<li>'+ video.title +'</li>')
			})
		},
		error:function(){
			alert("ERROR");

		}
	});
});