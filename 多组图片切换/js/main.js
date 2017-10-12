window.onload = function() {
	function $(id) {
		return typeof id == "string" ? document.getElementById(id) : id;
	}
	//获取元素
	var leftImg = $("leftImg"), //获取左边图片
		leftText = $("leftText"), //获取左边图片描述
		leftIndex = $("left_index"), //左边图片第几张
		leftMax = $("left_max"), //获取左边左偏总数
		rightImg = $("rightImg"), //同上
		rightText = $("rightText"), //同上
		rightIndex = $("right_index"), //同上
		rightMax = $("right_max"), //同上
		prve = $("prve"), //上一组按钮
		next = $("next"), //下一组按钮
		
		
		lImgArr = ["img/0.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg"], //左边图片数组
		lTextArr = ["第一组第一张", "第一组第二张", "第一组第三张", "第一组第四张"], //左边图片描述
		rImgArr = ["img/4.jpg", "img/5.jpg", "img/6.jpg"], //同上
		rTextArr = ["第二组第一张", "第二组第二张", "第二组第三张"], //同上
		lNum = 0, //左边图片索引
		rNum = 0; //右边图片索引

	//初始化
	leftMax.innerHTML = lImgArr.length; //统计左边图片数量
	rightMax.innerHTML = rImgArr.length; //统计右边图片数量
	leftImg.onclick = LNextchange; //给左边图片绑定LNextchange函数
	rightImg.onclick = RNextchange; //给右边图片绑定RNextchange函数
	next.onclick = function() { //下一组按钮点击事件
		LNextchange(); //调用LNextchange函数
		RNextchange(); //调用RNextchange函数
	};
	prve.onclick = function() { //上一组按钮点击事件
		LPrvechange();
		RPrvechange();
	};

	//函数

	function LNextchange() { //左边点击图片切换以及点击按钮切换
		lNum++;
		if(lNum > lImgArr.length - 1) {
			lNum = 0;
		}
		LChange(); //调用LChange函数，修改左边图片信息
	}

	function RNextchange() { //右边点击图片切换以及点击按钮切换
		rNum++;
		if(rNum > rImgArr.length - 1) {
			rNum = 0;
		}
		RChange(); //调用RChange函数，修改右边图片信息
	}

	function LPrvechange() { //点击上一组按钮改变左边事件
		lNum--;
		if(lNum < 0) {
			lNum = lImgArr.length - 1;
		}
		LChange();
	}

	function RPrvechange() { //点击上一组按钮改变右边事件
		rNum--;
		if(rNum < 0) {
			rNum = rImgArr.length - 1;
		}
		RChange();
	}

	function LChange() { //修改左边图片信息
		leftImg.src = lImgArr[lNum];
		leftText.innerHTML = lTextArr[lNum];
		leftIndex.innerHTML = lNum + 1;
	}

	function RChange() { //修改右边图片信息
		rightImg.src = rImgArr[rNum];
		rightText.innerHTML = rTextArr[rNum];
		rightIndex.innerHTML = rNum + 1;
	}

}