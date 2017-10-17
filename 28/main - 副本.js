window.onload = function() {
	var music = document.querySelectorAll(".music"), //获取行音乐
		selectbox = document.querySelectorAll(".music .select"), //获取行选中框
		allSelect = document.getElementById("allCheck"), //获取全选框
		allSelectText = document.getElementById("allChecktext"), //获取全选文字，因为全选框和文字分开的，点击文字也有效果
		allSelectIsClick = 1; //判断是否全选

	for(var i = 0; i < music.length; i++) {
		if(i % 2 == 1) { //初始化，隔行变色
			music[i].className += " color";
		}
		music[i].index = i; //设置自定义属性
		music[i].isClick = 1; //判断每个音乐是否被选中
		music[i].onmouseover = function() { //鼠标移入时变色
			this.style.background = "#e4667d";
			this.style.color = "#fff";
		}
		music[i].onmouseout = function() { //鼠标移除的清除选中颜色
			if(this.isClick == 1) { //判断当前是否选中，不选中才去色
				this.style.background = "";
				this.style.color = "";
			}
		}
		music[i].onclick = function() {
			if(this.isClick == 1) { //如果当前没选中的话则变色
				selectbox[this.index].className += " check";
				this.style.background = "#e4667d";
				this.style.color = "#fff";
				this.isClick = 2; //改变自定义属性为选中
			} else { //否则去色
				selectbox[this.index].className = "select";
				this.style.background = "";
				this.style.color = "";
				this.isClick = 1; //改变自定义属性为不选中
			}
			var allIsClick = 0; //每次点击都var一个allIsclick为0
			for(var i = 0; i < selectbox.length; i++) { //遍历所有music是否被选中
				allIsClick += music[i].isClick; //把自定义数值都加入allIsClick
				if(allIsClick >= selectbox.length * 2) { //如果allIsClick大于等于12的话为全选，否则没全选
					allSelect.className = "isclick"; //改变全选框样式
					allSelectIsClick = 2; //全选判断为选中
				} else {
					allSelect.className = ""; //清空全选框样式
					allSelectIsClick = 1; //全选判断为不选中
				}

			}

		}
	}

	allSelectText.onclick = allSelect.onclick = function() {
		if(allSelectIsClick == 1) { //如果为不选中
			for(var i = 0; i < selectbox.length; i++) { //遍历所有音乐为选中
				music[i].isClick = 2; //改变自定义属性为选中
				music[i].style.background = "#e4667d";
				music[i].style.color = "#fff";
				selectbox[i].className += " check";//每个选择框都改为选中
				allSelect.className = "isclick";//改变全选样式为选中
			}
			allSelectIsClick = 2; //改变全选判断为选中
		} else {
			for(var i = 0; i < selectbox.length; i++) { //遍历所有音乐为不选中
				music[i].isClick = 1; //改变自定义属性为选中
				music[i].style.background = "";
				music[i].style.color = "";
				allSelect.className = "";
				selectbox[i].className = "select";//改变全选样式为不选中

			}
			allSelectIsClick = 1;
		}
	}

}