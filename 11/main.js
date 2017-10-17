window.onload = function() {
	function $(name) {
		return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
	}
	var icon = $(".icon"),
		hideIcon = $(".hide_icon"),
		stopTime = 620;//停顿时间

	//点击爱心
	for(var i = 0; i < icon.length; i++) {
		icon[i].clickNum = 0;
		(function(index) {
			icon[index].onclick = function() {
				if(!timeStop(stopTime))return;
				icon[index].clickNum ++;
				icon[index].innerHTML = '+'+icon[index].clickNum; 
				hideIcon[index].style.opacity = "1";
				hideIcon[index].style.top = "-35px";
				iconMove(index);
				Mtween(hideIcon[index],-50,600,'top','linear');
			}
		})(i);
	}

	//透明度函数
	function iconMove(index) {
		clearInterval(hideIcon[index].opTimer)
		var speel = 100;
		hideIcon[index].opTimer = setInterval(function() {
			speel -= 5;
			if(speel <= 0) {
				speel = 0;
				clearInterval(hideIcon[index].opTimer);
			}
			hideIcon[index].style.opacity = speel / 100;
		}, 30)
	}
	
	var nowTime = new Date().getTime(),//延迟执行函数的变量，用来存放点击的时候
	oldTime = 0;//延迟执行函数的变量，用来存放上一次点击的时候
	//	停顿时间
	function timeStop(time) {
		nowTime = new Date().getTime();
		if(nowTime - oldTime < time) {
			return false;
		}
		oldTime = nowTime;
		return true;
	}

}