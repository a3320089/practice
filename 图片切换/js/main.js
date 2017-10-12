window.onload = function() {
	function $(id) {
		return typeof id == "string" ? document.getElementById(id) : id;
	}
	//获取元素
	var loop = $("loop"), //循环按钮
		sx = $("sx"), //顺序按钮
		exp = $("exp"), //功能描述
		leftBtn = $("left"), //左切换按钮
		rightBtn = $("right"), //右切换按钮
		num = $("num"), //当前照片
		max = $("max"), //图片总数
		Img = $("Img"), //图片
		imgText = $("text"), //图片文字描述
		ts = $("ts"), //提示框
		closeBtn = $("close"), //关闭按钮
		tsm = $("tsm"), //提示框文字
		sure = $("sure"), //确认按钮
		
		
		arrText = ["文字描述一", "文字描述二", "文字描述三", "文字描述四", "文字描述五"], //文字描述数组
		arrImg = ["img/0.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"], //图片链接数组
		index = 0; //图片索引

	//初始化
	Img.src = arrImg[0];
	imgText.innerHTML = arrText[0];
	num.innerHTML = index + 1;
	max.innerHTML = arrImg.length;
	leftBtn.onclick = left;
	rightBtn.onclick = right;
	//循环切换
	loop.onclick = xhqh;
	//顺序切换
	sx.onclick = sxqh;
	//关闭按钮点击事件
	closeBtn.onclick = sure.onclick = closeTs;

	//改变图片信息
	function change() {
		Img.src = arrImg[index]; //修改图片的src为arrImg[index]
		imgText.innerHTML = arrText[index]; //修改图片描述为arrText[index]
		num.innerHTML = index + 1; //修改当前图片为第几张
	}

	//循环切换函数
	
	function left() { //循环切换时左按钮
		index--;
		if(index < 0) { //当切换到第一张图时，再切换跳到第五张
			index = arrImg.length - 1;
		};
		change(); //调用change函数
	}

	function right() { //循环切换时右按键
		index++;
		if(index > arrImg.length - 1) { //当切换到最后一张图时，再切换跳到第一张
			index = 0;
		};
		change(); //调用change函数
	}

	function xhqh() { //点击循环切换
		this.className = 'cur'; //给循环切换的元素添加class
		sx.className = ''; //清空顺序切换的样式
		exp.innerHTML = '可以从最后一张切换到第一张的循环切换'; //修改功能描述文字
		leftBtn.onclick = left; //循环模式时给左按钮赋值函数left
		rightBtn.onclick = right; //循环模式时给右按钮赋值函数right

	};

	//顺序切换函数
	
	function leftSx() { //顺序切换时左按钮
		index--;
		if(index < 0) { //切换到第一张时
			ts.style.display = 'block'; //弹出提示框
			tsm.innerHTML = "已经到第一张啦~"; //修改提示框文字
			index = 0; //将索引固定在0，不给往下减
			cleanClick(); //调用cleanClick函数，清除按钮事件
			return false; //跳出函数，不执行下面change函数调用
		};
		change(); //调用change函数，修改图片信息
	}

	function rightSx() { //顺序切换时右按钮
		index++;
		if(index > arrImg.length - 1) { //切换到最后一张时
			ts.style.display = 'block'; //弹出提示框
			tsm.innerHTML = "已经最后一张啦~"; //修改提示框文字
			index = arrImg.length - 1; //将索引固定在长度减一，不给往上加
			cleanClick(); //调用cleanClick函数，清除按钮事件
			return false; //跳出函数，不执行下面change函数调用
		};
		change(); //调用change函数，修改图片信息
	}

	function sxqh() { //顺序切换按钮
		this.className = 'cur'; //给顺序切换的元素添加class
		loop.className = ''; //清空循环切换的样式
		exp.innerHTML = '只能切换到最后一张或者第一张'; //修改功能描述文字
		leftBtn.onclick = leftSx; //顺序切换时给左按钮赋值函数leftSx
		rightBtn.onclick = rightSx; //顺序切换时给右按钮赋值函数rightSx
	};

	//关闭提示框
	function closeTs() {
		ts.style.display = "none"; //关闭提示框
		//以下为为按钮添加事件
		leftBtn.onclick = leftSx;
		rightBtn.onclick = rightSx;
		loop.onclick = xhqh;
		sx.onclick = sxqh;
	}

	//清除点击事件
	function cleanClick() {
		leftBtn.onclick = null;
		rightBtn.onclick = null;
		loop.onclick = null;
		sx.onclick = null;
	}

};