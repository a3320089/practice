window.onload = function() {
	//获取元素
	var span = document.querySelectorAll("span"),
		textLi = document.querySelectorAll(".textLi li"),
		index = 0, //点击后索引值
		isClick = false; //判断是否点击了
	for(var i = 0; i < span.length; i++) {
		span[i].index = i; //自定义属性，给星星添加索引值
		span[i].onmouseover = function() {
			clean(); //清除所有样式
			for(var i = 0; i <= this.index; i++) { //循环添加样式
				if(this.index < 2) { //判断鼠标移到第几个星星，2个以下是粉色，多于2个全部红色
					span[i].className = 'prink';
				} else {
					span[i].className = 'red';
				}
			}
			textLi[this.index].style.opacity = 1; //显示文字
		};
		span[i].onmouseout = function() {
			clean(); //清除所有样式
			if(isClick) { //判断是否点击了，如果没点击则执行if里面代码，点击了则跳过if
				for(var i = 0; i <= index; i++) { //循环添加样式
					if(index < 2) { //判断鼠标移到第几个星星，2个以下是粉色，多于2个全部红色
						span[i].className = 'prink';
					} else {
						span[i].className = 'red';
					}
				}
				textLi[index].style.opacity = 1; //显示文字
			}
		};
		span[i].onclick = function() {
			if(index == this.index && isClick) {
				clean();
				isClick = false;
			} else {
				index = this.index; //改变索引值
				isClick = true; //改变isclick的值为true,即点击了
				for(var i = 0; i <= this.index; i++) { //循环添加样式
					if(this.index < 2) { //判断鼠标移到第几个星星，2个以下是粉色，多于2个全部红色
						span[i].className = 'prink';
					} else {
						span[i].className = 'red';
					}
				}
				textLi[this.index].style.opacity = 1; //显示文字
			}
		};
	}

	function clean() { //清除所有样式
		for(var i = 0; i < span.length; i++) {
			span[i].className = '';
			textLi[i].style.opacity = 0;
		}
	}
}