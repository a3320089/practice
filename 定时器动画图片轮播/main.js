window.onload = function() {
	function $(name) {
		return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
	}
	var box = $(".box"),
		bannerP = $(".box li p"),
		index = 0;
	//初始化
	box.style.width = bannerP.length * 960 + 'px';
	animP()
	//box动画
	function animUl() {
		var timer = null,
			curSize = getCss(box, "margin-left"), //获取需要移动的margin-left值
			speel = 5, //移动速度
			s = 0; //移动距离
		//ul动画定时器
		timer = setInterval(function() {
			s += speel;
			if(s >= 960) {
				clearInterval(timer);
				index++;
				animP();
			}
			box.style.marginLeft = curSize - s + 'px';
		}, 1)
	}
	
	//P标签动画
	function animP() {
		var timer = null,
			curSize = getCss(bannerP[index], "bottom"),
			speel = 2,
			s = 0;
			
		//边界处理
		if(index < bannerP.length - 1) {
			//向上移动动画
			timer = setInterval(function() {
				s += speel;
				if(s >= 55) {
					clearInterval(timer);
					//向下移动动画
					setTimeout(function() {
						timer = setInterval(function() {
							s -= speel;
							if(s <= 0) {
								clearInterval(timer);
								animUl();
							}
							bannerP[index].style.bottom = curSize + s + 'px';
						}, 40)
					}, 1500)
				}
				bannerP[index].style.bottom = curSize + s + 'px';
			}, 40)
		} else {
			
			//无缝循环
			
			//向上移动动画
			timer = setInterval(function() {
				s += speel;
				if(s >= 55) {
					clearInterval(timer);
					
					//向下移动动画
					setTimeout(function() {
						timer = setInterval(function() {
							s -= speel;
							if(s <= 0) {
								clearInterval(timer);
								//重置样式
								box.style.marginLeft = "0px";
								bannerP[bannerP.length-1].style.bottom = -50+ 'px';
								index = 0;
								animUl()
							}
							bannerP[index].style.bottom = curSize + s + 'px';
						}, 40)
					}, 1500)
				}

				bannerP[index].style.bottom = curSize + s + 'px';
			}, 40)
		}
	}
	//获取样式封装
	function getCss(obj, attr) {
		return parseFloat(getComputedStyle(obj)[attr]);

	}

}