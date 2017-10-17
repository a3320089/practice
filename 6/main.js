window.onload = function() {
	
	/*
	 * span是展开，查找，替换3个按钮。span[0]是展开按钮，[1]是查找，[2]是替换
	 * bottomBox,是底下隐藏的搜索div
	 * selectBox是用来放搜索和替换框的div
	 * bottomLi是切换查找替换按钮，[1]是查找，[2]是替换
	 * Oinput是输入框，[0]是查找的输入框个，[1]是替换里面的查找框，[2]是替换里面的替换框
	 * obotton是查找和替换按钮。[0]是查找框里的查找按钮，[1]是替换框里的替换按钮
	 * textBox是存放内容的元素
	 * 
	 * */
	
	
	var span = document.getElementsByClassName('slideInDown')[0].getElementsByTagName('span'),
		bottomBox = document.getElementsByClassName('bottomBox')[0],
		selectBox = document.getElementsByClassName('selectBox'),
		bottomLi = document.querySelectorAll('.bottomBox li'),
		oInput = document.querySelectorAll('.bottomBox input[type = text]'),
		obotton = document.querySelectorAll('.bottomBox input[type = button]'),
		textBox = document.getElementsByClassName('textBox')[0];

	var content = textBox.innerHTML;
	//查找功能
	obotton[0].onclick = function() {
		var text = oInput[0].value;
		if(text == '') {
			alert('请输入内容');
			return;
		}
		if (content.indexOf(text)== -1) {
			alert('找不到相关内容');
			return;
		}
		textBox.innerHTML = content.split(text).join('<span style="color:#fff;background:red;">' + text + '</span>');
	}

	//键盘弹起功能
	oInput[0].onkeyup = oInput[1].onkeyup = function  () {
		var text = this.value;
		textBox.innerHTML = content.split(text).join('<span style="color:#fff;background:red;">' + text + '</span>');
	}

	//替换功能
	obotton[1].onclick = function() {
		var text = oInput[1].value;
		var Ttext = oInput[2].value;
		if(text == '') {
			alert('请输入要查找的内容');
			return;
		}
		if (content.indexOf(text)== -1) {
			alert('找不到相关内容');
			return;
		}
		if(Ttext == '') {
			if (confirm('确定要删除吗')) {
				textBox.innerHTML = content.split(text).join('<span style="color:#fff;background:red;">' + Ttext + '</span>');
				content = content.split(text).join(Ttext);
			}else{
				return;
			}
		}else{
			textBox.innerHTML = content.split(text).join('<span style="color:#fff;background:red;">' + Ttext + '</span>');
			content = content.split(text).join(Ttext);
		}
	}
	
	//展开收起动画	
	span[0].isClick = false;//判断是都点击展开
	span[0].checkClick = false;//判断动画是否结束
	span[0].onclick = function() {
		if(this.checkClick) return;
		this.checkClick = true;
		changeOpcity(bottomBox);
		if(this.isClick) {
			this.innerHTML = '展开';
			Mtween(span[2], -60, 200, 'top', 'linear', function() {
				Mtween(span[2], -60, 200, 'top', 'linear');
				Mtween(span[1], -60, 200, 'top', 'linear', function() {
					span[0].checkClick = false;
				});
			});
			this.isClick = false;
		} else {
			this.innerHTML = '收起';
			Mtween(span[1], 60, 200, 'top', 'linear');
			Mtween(span[2], 60, 200, 'top', 'linear', function() {
				Mtween(span[2], 60, 200, 'top', 'linear', function() {
					span[0].checkClick = false;
				});
			});
			this.isClick = true;
		}
	}

	//切换点击按钮功能
	for(var i = 0; i < bottomLi.length; i++) {
		(function(index) {
			bottomLi[index].onclick = function() {
				tab(index);
			}
			span[index + 1].onclick = function() {
				tab(index);
			}
		})(i)
	}

	//切换功能
	var curIndex = 0;//判断当前是查找还是替换

	function tab(index) {
		if(curIndex != index) {
			for(var i = 0; i < oInput.length; i++) {
				oInput[i].value = '';
			}
			textBox.innerHTML = content;
		}
		curIndex = index;
		for(var i = 0; i < selectBox.length; i++) {
			selectBox[i].style.display = 'none';
		}
		selectBox[index].style.display = 'block';
	}

	//透明度动画
	bottomBox.isShow = false;//判断底下查找搜索框是否隐藏

	function changeOpcity(obj) {
		clearInterval(obj.timer);
		bottomBox.isShow = true;
		if(span[0].isClick) {
			var op = 100;
			obj.timer = setInterval(function() {
				if(op <= 0) {
					clearInterval(obj.timer);
				};
				op -= 5;
				obj.style.opacity = op / 100;
			}, 20)
		} else {
			var op = 0;
			obj.timer = setInterval(function() {
				if(op >= 100) {
					clearInterval(obj.timer);
				};
				op += 5;
				obj.style.opacity = op / 100;
			}, 20)
		}

	}
}