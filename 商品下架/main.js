window.onload = function() {
	var SetBtn = document.querySelectorAll('.Settime .setBtn'), //获取确认按钮
		commod = document.querySelectorAll('.commod'), //获取商品框
		DownCom = document.querySelectorAll('.DownCom'); //获取下面的商品框

	//每次刷新页面都设置输入框的默认值。设置分数默认+1
	autoSettime()

	function autoSettime() {
		var span = document.querySelectorAll('.Settime .time');
		var timeinput;
		var date = new Date();
		var arr = [];
		//倒计时
		var y = toTwo(date.getFullYear());
		var m = toTwo(date.getMonth() + 1);
		var d = toTwo(date.getDate());
		var h = toTwo(date.getHours());
		var min = toTwo(date.getMinutes() + 1);
		var s = toTwo(date.getSeconds());
		arr.push(y, m, d, h, min, s);
		for(var i = 0; i < span.length; i++) {
			timeinput = span[i].getElementsByTagName('input');
			for(var j = 0; j < timeinput.length; j++) {
				timeinput[j].value = arr[j]
			}
		}
	}

	//初始化
	for(var i = 0; i < commod.length; i++) {
		commod[i].style.left = i * 273 + 'px';
	}
	//给时间确认按钮添加事件
	for(var i = 0; i < SetBtn.length; i++) {
		//自定义属性
		SetBtn[i].index = i;
		commod[i].index = i;
		//刷新就启动倒计时
		sureBtn(i);
		SetBtn[i].onclick =function () {
			sureBtn(this.index)
		}
	}
	
	//确认按钮启动倒计时的函数
	function sureBtn(index) {
		var par = commod[index];
		//点击先清除之前的定时器
		clearInterval(par.timer);
		//因为布局原因，获取确认按钮同级元素下的时间设置，即设置时间的input
		var sibling = SetBtn[index].previousElementSibling;
		var setSpan = sibling.getElementsByTagName('input');

		//根据获取的时间设置Date();changeStr()可以将字符串函数转为数字
		var setTime = new Date(changeStr(setSpan[0].value), changeStr(setSpan[1].value) - 1, changeStr(setSpan[2].value), changeStr(setSpan[3].value), changeStr(setSpan[4].value), changeStr(setSpan[5].value))
		var date1 = new Date();
		var time = setTime.getTime() - date1.getTime();
		var d = parseInt(time / (24 * 60 * 60 * 1000));
		//判断输入是否正确
		if(time < 0) {
			alert('时间已经过了，请重新设置');
			return;
		}
		if(changeStr(setSpan[1].value) > 12) {
			alert('月份不能超过12月份');
			return;
		}
		if(changeStr(setSpan[2].value) > 31) {
			alert('日不能超过31日');
			return;
		}
		if(changeStr(setSpan[3].value) > 24) {
			alert('小时不能超过24小时');
			return;
		}
		if(changeStr(setSpan[4].value) > 59) {
			alert('分钟不能超过59分钟');
			return;
		}
		if(changeStr(setSpan[5].value) > 59) {
			alert('秒钟不能超过59秒');
			return;
		}
		//判断输入的是不是数字
		for(var i = 0; i < setSpan.length; i++) {
			var r = Number(setSpan[i].value);
			if(isNaN(r)) {
				alert('请输入数字正确的时间');
				return;
			}
		}
		if(d >= 100) {
			alert("设置天数不能超过100天");
			return;
		}

		//调用倒计时函数，因为点击确认按钮要立刻显示时间，所以要先调用一次
		ConutTime(par, setTime)
		par.timer = setInterval(function() {
			ConutTime(par, setTime)
		}, 1000)
	}

	//倒计时函数
	function ConutTime(obj, setTime) {
		//获取相对应得显示时间的span
		var countSpan = obj.querySelectorAll('.countTime span');
		var date1 = new Date();
		var time = setTime.getTime() - date1.getTime();
		//时间到要执行的东西
		if(time <= 1000) {
			shake(obj, "left"); //抖动
			var font = obj.querySelector('.mark');
			font.style.display = 'block'; //显示遮罩层
			fontSize(font, 50); //遮罩层字体变小
			//下面商品显示
			DownCom[obj.index].style.display = 'block';
			opacity(DownCom[obj.index]);
			//清除定时器
			clearInterval(obj.timer);
		}
		//倒计时
		var d = parseInt(time / (24 * 60 * 60 * 1000));
		var h = parseInt(time % 86400000 / (60 * 60 * 1000));
		var m = parseInt(time % 3600000 / (60 * 1000));
		var s = parseInt(time % 60000 / 1000);
		//将获取的时间拼接成字符串。totwo函数可以将8转成08,并转换成字符串
		var str = toTwo(d) + toTwo(h) + toTwo(m) + toTwo(s);
		for(var i = 0; i < str.length; i++) {
			countSpan[i].innerHTML = str[i];
		}
	}

	//转换时间为两位数
	function toTwo(n) {
		return n < 10 ? '0' + n : n + '';
	}

	//将输入的时间转为数字
	function changeStr(str) {
		if(str[0] == "0") {
			str = str[1];
		}
		str = parseInt(str);
		return str;
	}

	//字放大动画
	function fontSize(obj, num) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			num--;
			if(num <= 25) {
				num = 25;
				clearInterval(obj.timer);
			}
			obj.style.fontSize = num + 'px';
		}, 30)
	}
	//透明度动画
	function opacity(obj) {
		clearInterval(obj.timer)
		var o = 0;
		obj.timer = setInterval(function() {
			o += 5;
			if(o > 100) {
				o = 100;
				clearInterval(obj.timer);
			}
			obj.style.opacity = o / 100;
		}, 30)
	}
}