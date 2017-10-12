window.onload = function() {
	
	var btnLi = document.querySelectorAll(".first .btnLi"); //获取btnLi元素，组名元素
	var second = document.getElementsByClassName("sec"); //获取sec,点击展开的内容
	var secondA = document.querySelectorAll(".sec a"); //获取sec下的a标签。展开内容下的名字

	for(var i = 0; i < btnLi.length; i++) { //用for循环给btnLi绑定事件
		btnLi[i].index = i; //给btnLi添加自定义属性
		btnLi[i].onclick = function() {
			for(var i = 0; i < secondA.length; i++) { //点击时清除a标签的样式
				secondA[i].className = '';//重置所有class为空
			}
			if(this.className == "open btnLi") { //判断className是否是展开的
				for(var i = 0; i < btnLi.length; i++) { //是展开的话，关闭所有展开内容
					second[i].className = "sec close";//重置所有的内容为关闭
				}
				this.className = "close btnLi"; //btnLi的class改为close btnLi
			} else {
				for(var i = 0; i < btnLi.length; i++) { //关闭所有内容，初始化
					btnLi[i].className = 'close btnLi';//重置所有内容为关闭
					second[i].className = "sec close";//重置所有内容为关闭
				}
				this.className = "open btnLi"; //给当前内容添加class
				second[this.index].className = "sec open"; //展开相对应的内容
			}
		}
	}

	for(var i = 0; i < secondA.length; i++) { //用for循环给a标签绑定事件
		secondA[i].onclick = function() { //点击好友时触发
			for(var i = 0; i < secondA.length; i++) { //清空所有选中样式
				secondA[i].className = '';
			}
			this.className = "cur"; //给当前选中的好友添加样式
		}
	}

}