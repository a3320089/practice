window.onload = function() {

	function $(name) {
		return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
	}

	//获取元素
	var listBox = $(".listBox"),//获取最大的框，用来鼠标移入移出事件
		titleLi = $(".title li"),//获取标题box
		textBox = $(".textBox"),//获取存放文章的box
		textBoxLi = $(".textBox li"),//获取文章的集合
		textBoxLiNum = textBox[0].getElementsByTagName("li").length,//获取单个box下面有多少个文章
		index = 0,//用来保存文章内容切换的下标
		titleIndex = 0,//用来保存标题切换的下标
		timer = 0;

		//设置定时器管理
		timer = setInterval(move, 2000);
	
		listBox.onmouseover = function() {
			clearInterval(timer);
		}
		listBox.onmouseout = function() {
			timer = setInterval(move, 2000);
		}

	//标题鼠标移入事件
	for(var i = 0; i < titleLi.length; i++) {
		titleLi[i].index = i;
		titleLi[i].onmouseover = function  () {
			titleIndex = this.index; 
			index = this.index * textBoxLiNum;
			changeTitle()
		};
	}

	//切换列表函数
	function changeTitle() {
		for(var i = 0; i < titleLi.length; i++) {
			titleLi[i].className = '';
			textBox[i].style.display = 'none';
		}
		for(var i = 0; i < textBoxLi.length; i++) {
			textBoxLi[i].className = '';
		}
		textBoxLi[index].className = 'cur';
		titleLi[titleIndex].className = 'cur';
		textBox[titleIndex].style.display = 'block';
	}

	//文章鼠标移入效果
	for(var i = 0; i < textBoxLi.length; i++) {
		textBoxLi[i].index = i;
		textBoxLi[i].onmouseover = function() {
			for(var i = 0; i < textBoxLi.length; i++) {
				textBoxLi[i].className = '';
			}
			this.className = 'cur';
			index = this.index;
		}
	}
	//自动移动切换函数
	function move() {
		index++;
		if(index >= textBoxLi.length) {
			index = 0;
		}
		for(var i = 0; i < textBoxLi.length; i++) {
			textBoxLi[i].className = '';
		}
		textBoxLi[index].className = 'cur';
		if (index % textBoxLiNum ==0) {
			titleIndex++;
			if (titleIndex > titleLi.length -1) {
				titleIndex=0;
			}
			changeTitle(titleIndex);
		}
	}
}