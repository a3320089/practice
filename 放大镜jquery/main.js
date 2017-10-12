$(function () {
	
	$('#imgBox').hover(function  () {
		$("#scope").show();
		$('#bigImg').show();
	},function () {
		$("#scope").hide();
		$('#bigImg').hide();
	})
	$('#imgBox').mousemove(function (e) {
			$("#scope").css('left',e.pageX - $(this).offset().left - $("#scope").width()/2);
			$("#scope").css('top',e.pageY - $(this).offset().top - $("#scope").height()/2);
			if ($("#scope").position().left <0) {
				$("#scope").css('left','0px');
			}
			if ($("#scope").position().top <0) {
				$("#scope").css('top','0px');
			}
			if ($("#scope").position().top > $('#imgBox').height() - $("#scope").height()) {
				$("#scope").css('top',$('#imgBox').height() - $("#scope").height());
			}
			if ($("#scope").position().left > $('#imgBox').width() - $("#scope").width()) {
				$("#scope").css('left',$('#imgBox').width() - $("#scope").width());
			}
			$('#bigImg').css('background-position',-$("#scope").position().left*2 +'px '+ -$("#scope").position().top*2+'px');
		})
})
