window.onload = function() {
	function $(name) {
		return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
	}
	var box = $(".box"),
		bannerLi = $(".box li"),
		bannerP = $(".box li p"),
		timer = null,
		animateTimerLi = null,
		animateTimerP = null,
		index = 0;
	//初始化
	box.style.width = bannerLi.length * 960 + 'px';
	bannerP[0].style.bottom = '5px';
	//每3秒切换的定时器
	timer = setInterval(moveImg, 3000);

	function moveImg() {
		clearInterval(animateTimerLi);
		clearInterval(animateTimerP);
		index++;
		if(index > bannerLi.length - 1) {
			box.style['margin-left'] = '0px';
			bannerP[0].style.bottom = "6px";
			index = 0;
			moveImg();
			return;
		}
		//左移动画定时器
		animateTimerLi = setInterval(function() {
			if(parseFloat(box.style['margin-left']) > (-index * 960)) {
				box.style['margin-left'] = parseFloat(box.style['margin-left']) - 5 + 'px';
			}
		}, 1)

		//延时执行P标签弹出效果
		setTimeout(function() {
						for(var i = 0; i < bannerP.length; i++) {
							bannerP[i].style.bottom = "-35px";
						}
			//P标签动画效果
			animateTimerP = setInterval(function() {
				if(parseFloat(getCss(bannerP[index], 'bottom')) < 5) {
					bannerP[index].style['bottom'] = parseFloat(getCss(bannerP[index], 'bottom')) + 1 + 'px';
				}
			}, 1)
		}, 1000)
	}

	function getCss(obj, attr) {
		return getComputedStyle(obj)[attr];
	}

}