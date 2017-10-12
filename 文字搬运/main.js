window.onload = function() {
	var textBox = document.getElementById("text"),//获取左边输入框
		lengthBox = document.getElementsByClassName('num')[0],//获取显示文字长度的元素
		moveBtn = document.getElementsByClassName('moveBtn')[0],//获取点击右移按钮
		moveBox = document.getElementsByClassName('moveBox')[0],//获取右边输入框
		schedule = document.getElementsByClassName('schedule')[0],//进度条
		scheduleLi = document.querySelectorAll('.schedule li');//进度条
		timer = 0,//文字右移的定时器
		liTimer = 0,//进度条的定时器
		isClick = true;//处理是否点击

	moveBtn.onclick = function() {
		var text = textBox.value;//获取左边输入框内容
		var textLength = text.length;//获取左边输入框的文字长度
		var num = 0;
		var cur = 0;
		var str;
		if (text == '') {//如果左边内容为空
			alert('请输入内容');
			return;
		}
		if (!isClick) return;
		isClick = false;
		lengthBox.style.display = 'block';//显示字符长度
		schedule.style.display = 'block'//显示进度条
		textBox.disabled = true;//左边输入框无法输入
		moveBox.innerHTML = '';//清空右边输入框
		
		//右移定时器
		timer = setInterval(function() {
			if(num >= textLength) {//如果num大于字符长度，就停止定时器
				clearInterval(timer);//清除右移定时器
				clearInterval(liTimer);//清除进度条定时器
				textBox.disabled = false;//左边输入框可以输入
				schedule.style.display = 'none';//进入条隐藏
				isClick = true;
			}
			moveLength = moveBox.innerHTML.length;//获取右边文字长度
			lengthBox.innerHTML = num + '/' + textLength;//更新关于文字长度的信息
			str = text.charAt(num);//获取左边文字的第num个字符
			moveBox.innerHTML += str;//输出到右边输入框
			textBox.value = text.slice(num+1);//左边输入框文字减少
			num++;
		}, 5)
		
		//进度条定时器
		liTimer = setInterval(function() {
			cur++;
			if(cur >= scheduleLi.length) {
				cur = 0;
			}
			for(var i = 0; i < scheduleLi.length; i++) {
				scheduleLi[i].className = '';
			}
			scheduleLi[cur].className = 'cur';
		}, 100)

	}
}