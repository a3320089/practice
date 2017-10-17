window.onload = function() {
	//获取元素
	var box = document.getElementsByClassName("box"); //存放日期的元素，有3个。用来做动画切换效果。主要显示的是中间那个，所以动画完成后回瞬间切换回中间的box
	var titleSpan = document.getElementsByClassName('title_span')[0]; //标题，显示几年几月的
	var now_time = document.getElementsByClassName('now_time')[0]; //用来显示当前的时间
	var dateBox = document.getElementsByClassName("dateBox")[0]; //3个box的父级元素
	var btn = document.getElementsByClassName('btn'); //向左向右切换按钮

	//获取当前时间
	var date = new Date();
	var num = date.getMonth();

	//获取当前年月日，用来选中日历中的今天，
	var nowmonth = date.getMonth();
	var nowyear = date.getFullYear();
	var nowdate = date.getDate();

	//初始化
	setMonth(num, 1);
	getTime();

	//日历函数，封装要显示的内容
	function setMonth(num, n) { //num是要设置的月份，n是控制第几个box
		box[n].innerHTML = ''; //先清空

		//设置空格符，让星期几和日期对齐
		var date = new Date();
		date.setMonth(num);
		date.setDate(1);
		var day = date.getDay();

		day == 0 ? day = 7 : day;
		for(var i = 1; i < day; i++) {
			box[n].innerHTML += '<div class = "none"></div>'
		}

		//生成日期
		date = new Date();
		date.setMonth(num + 1);
		date.setDate(0);
		var dayNum = date.getDate();
		for(var i = 0; i < dayNum; i++) {
			box[n].innerHTML += '<div class = "d">' + Number(i + 1) + '</div>'
		}
		//改变年份和月份
		titleSpan.innerHTML = date.getFullYear() + "年" + (date.getMonth() + 1) + '月';

		//获取设置后的月份和年份
		var smonth = date.getMonth(),
			syear = date.getFullYear();
		var monthWeek = box[n].getElementsByTagName('div'); //获取box下面的所有div,既所有日期
		for(var i = 0; i < monthWeek.length; i++) {
			if(i == nowdate && smonth == nowmonth && syear == nowyear) { //判断设置后的时间与当前时间相符合的话，就改变当前日期的样式
				monthWeek[i + day - 2].className += ' red';
				monthWeek[i + day - 2].style.border = '1px solid red';
				monthWeek[i + day - 2].style.borderRadius = '50%';
			}
			if(i % 7 == 5 || i % 7 == 6) { //设置周六周日的时候变红色
				monthWeek[i].className += ' red';
			}
		}
	}
	//向左切换
	btn[0].onclick = function() {
		if(!timeStop(500)) return; //停顿处理
		num--;
		setMonth(num, 0); //让第一个box变成切换后的日期
		Mtween(dateBox, 384, 400, 'margin-left', 'easeIn', function() { //动画效果，回调函数让中间的box变成切换后的日期，并显示回来
			setMonth(num, 1);
			dateBox.style.marginLeft = '-384px';
		})
	}

	//向右切换
	btn[1].onclick = function() {
		if(!timeStop(500)) return; //停顿处理
		num++;
		setMonth(num, 2); //让第三个box变成切换后的日期
		Mtween(dateBox, -384, 400, 'margin-left', 'easeIn', function() { //动画效果，回调函数让中间的box变成切换后的日期，并显示回来
			setMonth(num, 1);
			dateBox.style.marginLeft = '-384px';
		})
	}

	//日历顶部的时钟效果
	setInterval(getTime, 1000)

	function getTime() {
		var date = new Date();
		var h = totwo(date.getHours());
		var m = totwo(date.getMinutes());
		var s = totwo(date.getSeconds());
		now_time.innerHTML = h + ':' + m + ':' + s;
	}

	//转换双位数
	function totwo(n) {
		return n < 10 ? "0" + n : n;
	}

	//停顿处理
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