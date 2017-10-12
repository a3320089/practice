window.onload = function() {
	//获取元素
	var box = document.getElementById("box"),
		leftBox = document.getElementById("leftBox"),
		rightBox = document.getElementById("rightBox"),
		onLeftBtn = document.getElementById("onleft"),
		onRightBtn = document.getElementById("onright");
	//初始化li标签事件
	resetClick();
	//左移
	onLeftBtn.onclick = function() {
		//获取右边的li标签
		var lies = rightBox.getElementsByTagName('li');
		
		//循环遍历有选中的左移
		for(var i = lies.length - 1; i >= 0; i--) {
			if(lies[i].isClick) {
				lies[i].className = '';
				//克隆
				leftBox.insertBefore(lies[i].cloneNode(true), leftBox.children[0]);
				rightBox.removeChild(lies[i]);

			}
		}
		//重置点击事件
		resetClick()
	}
	//右移
	onRightBtn.onclick = function() {
		//获取左边的li标签
		var lies = leftBox.getElementsByTagName('li');
		//循环遍历有选中的右移
		for(var i = lies.length - 1; i >= 0; i--) {
			if(lies[i].isClick) {
				lies[i].className = '';
				//克隆
				rightBox.insertBefore(lies[i].cloneNode(true), rightBox.children[0]);
				leftBox.removeChild(lies[i]);
			}
		}
		//重置点击事件
		resetClick()
	}
	
	//重置li标签点击事件
	function resetClick() {
		var lies = box.getElementsByTagName('li');
		for(var i = 0; i < lies.length; i++) {
			lies[i].isClick = false;
			lies[i].className = '';
			lies[i].onclick = function() {
				if(this.isClick) {
					this.className = '';
					this.isClick = false;
				} else {
					this.className = 'cur';
					this.isClick = true;
				}
			}
		}
	}
}