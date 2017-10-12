window.onload = function() {
	//获取元素
	var imgBoxLi = document.querySelectorAll(".imgBox li"), //获取幻灯片图片
		liBox = document.getElementById("liBox"), //获取包裹圆点的ul标签
		leftBtn = document.querySelector(".leftBtn"), //获取左边按钮
		rightbtn = document.querySelector(".rightBtn"), //获取右边按钮
		banner = document.querySelector(".banner"), //获取整个banner框架
		index = 0; //定义一个索引值

	//添加圆点
	for(var i = 0; i < imgBoxLi.length; i++) { //动态加入li标签，既下面的圆点
		var li = '<li><div class="smallImg"><img src="img/' + i + '.jpg" /><span class="icon"></span></div></li>'; //创建圆点
		liBox.innerHTML += li; //添加圆点
	}

	//获取圆点元素
	var hoverLi = document.querySelectorAll(".hoverLi li"), //获取圆点，需要上面for循环添加才能找到元素
		smallImg = document.querySelectorAll(".smallImg"); //获取下面缩略图，需要上面for循环添加才能找到元素

	//初始化
	hoverLi[0].className = 'cur';
	imgBoxLi[0].style.opacity = "1";

	//给圆点添加点击事件，鼠标移入移出事件
	for(var i = 0; i < hoverLi.length; i++) {
		hoverLi[i].index = i; //给圆点添加自定义属性index
		hoverLi[i].onclick = function() { //圆点点击事件

			index = this.index; //讲index的值改成点击后的自定义属性值
			changeImg();
		};
		hoverLi[i].onmouseover = function() { //添加圆点鼠标移入事件
			smallImg[this.index].style.display = "block"; //缩略图显示
		};
		hoverLi[i].onmouseout = function() { //添加圆点鼠标移出事件
			smallImg[this.index].style.display = "none"; //缩略图隐藏
		};
	}

	leftBtn.onclick = function() { //左边按钮点击事件
		index--; //改变index值，注：这个index和自定义属性的index不一样
		if(index < 0) { //边界处理
			index = imgBoxLi.length - 1;
		}
		changeImg()
	};
	rightbtn.onclick = rightM; //给右边按钮添加上面的rightM命名函数
	function rightM() {
		index++; //改变index值，注：这个index和自定义属性的index不一样
		if(index > imgBoxLi.length - 1) {
			index = 0;
		}
		changeImg();
	}

	function changeImg() {
		for(var i = 0; i < hoverLi.length; i++) { //清楚所有样式
			hoverLi[i].className = '';
			imgBoxLi[i].style.opacity = '0';
		}
		hoverLi[index].className = "cur"; //给相对应的圆点添加样式
		imgBoxLi[index].style.opacity = '1'; //显示相对应的图片
	}

	var time = setInterval(rightM, 3000); //设置定时器，3秒自动切换一次
	banner.onmouseover = function() { //鼠标移入banner清楚定时器
		clearInterval(time);
	};
	banner.onmouseout = function() { //鼠标移出加载定时器
		time = setInterval(rightM, 3000);
	};
}