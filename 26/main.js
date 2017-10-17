window.onload = function() {

	var imgs = document.querySelectorAll(".imgBox li"),
		imgBox = document.querySelector(".imgBox"),
		btn = document.querySelectorAll('.banner .btn'),
		index = 0,
		downX = 0,//记录点下时的X坐标
		downY = 0;//记录点下时的Y坐标
	//初始化
	imgs[index].style.zIndex = 999;
	document.onkeydown = function(e) {
		if(!timeStop(300)) return;
		var e = e || event;
		if(e.keyCode == 40) move(40);
		if(e.keyCode == 39) move(39);
		if(e.keyCode == 38) move(38);
		if(e.keyCode == 37) move(37);
		if (e.keyCode != 116) {
			e.preventDefault();
		}
		
	}
	imgBox.onmousedown = function(e) {
		var e = e || event;
		downX = e.clientX;
		downY = e.clientY;
		e.preventDefault();

	}
	imgBox.onmouseup = function(e) {
		if(!timeStop(300)) return;
		var e = e || event;
		var moveX = e.clientX - downX;
		var moveY = e.clientY - downY;
		if(moveX > 100 &&moveX > Math.abs(moveY)) {
			move(39);
			return;
		}
		if(moveX < -100 && moveX < -Math.abs(moveY)) {
			move(37);
			return;
		}
		if(moveY > 100 && moveY > Math.abs(moveX)) {
			move(40);
			return;
		}
		if(moveY < -100 && moveY < -Math.abs(moveX)) {
			move(38);
			return;
		}
	}
	//右按钮
	btn[1].onclick = function() {
		move(39)
	}
	//左按钮
	btn[0].onclick = function() {
		moveL()
	}

	function resetImg() {
		for(var i = 0; i < imgs.length; i++) {
			imgs[i].style.zIndex = 1;
			imgs[i].style.top = '0px';
			imgs[i].style.left = '0px';
		}
	}
	//上一张
	function moveL() {
		if(imgs[index - 1]) {
			imgs[index - 1].style.zIndex = 888;
		} else {
			imgs[imgs.length - 1].style.zIndex = 888;
		}

		Mtween(imgs[index], -960, 300, 'left', 'linear', function() {
			resetImg()
			imgs[index].style.zIndex = 999;
		});

		index--;
		if(index < 0) index = imgs.length - 1;

	}
	//移动函数。一直显示下一张，分上下左右4个方向
	function move(direction) {
		if(imgs[index + 1]) {
			imgs[index + 1].style.zIndex = 888;
		} else {
			imgs[0].style.zIndex = 888;
		}
		if(direction == 40) {
			Mtween(imgs[index], 406, 300, 'top', 'linear', function() {
				resetImg()
				imgs[index].style.zIndex = 999;
			});
		}
		if(direction == 39) {
			Mtween(imgs[index], 960, 300, 'left', 'linear', function() {
				resetImg()
				imgs[index].style.zIndex = 999;
			});
		}
		if(direction == 38) {
			Mtween(imgs[index], -406, 300, 'top', 'linear', function() {
				resetImg()
				imgs[index].style.zIndex = 999;
			});
		}
		if(direction == 37) {
			Mtween(imgs[index], -960, 300, 'left', 'linear', function() {
				resetImg()
				imgs[index].style.zIndex = 999;
			});
		}

		index++;
		if(index > imgs.length - 1) index = 0;
	}

	var nowTime = new Date().getTime(), //延迟执行函数的变量，用来存放点击的时候
		oldTime = 0; //延迟执行函数的变量，用来存放上一次点击的时候
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