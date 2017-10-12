window.onload = function() {
	var crumbData = [{
			"title": "品牌",
			"data": ["苹果", "小米", "锤子", "魅族", "华为", "三星", "OPPO", "vivo", "乐视"]
		},
		{
			"title": "尺寸",
			"data": ["4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
		},
		{
			"title": "系统",
			"data": ["android", "ios", "window phone", "无", "其他"]
		},
		{
			"title": "网络",
			"data": ["联通3G", "双卡单4G", "双卡双4G", "联通4G"]
		}
	];
	//生成数据
	var Cbox = document.getElementById("C-box");
	for(var i = 0; i < crumbData.length; i++) {
		//生成div，用来放筛选内容的
		var div = document.createElement('div');
		div.className = 'item';
		//添加自定义下表
		div.index = i;
		//添加上面数据中的名字
		div.innerHTML = crumbData[i].title + ':';
		//生成筛选内容
		for(var j = 0; j < crumbData[i].data.length; j++) {
			var span = document.createElement('span');
			span.innerHTML = crumbData[i].data[j];
			div.appendChild(span);
		}
		Cbox.appendChild(div);
	}
	//创建一个数据存放选中后的数据
	var choseObj = {};

	//点击事件
	var span = Cbox.getElementsByTagName('span');
	var yourChose = document.getElementById("yourChose");
	for(var i = 0; i < span.length; i++) {
		span[i].onclick = function() {
			//判断这个的父级是否有curObj这个属性。curObj用来存放上一次点击的元素，用来清空上一次点击的元素样式
			if(this.parentNode.curObj) {
				this.parentNode.curObj.className = '';
			}
			//choseObj使用当前元素的父级的index自定义属性作为key值，值为当前元素的innerHTML
			choseObj[this.parentNode.index] = this.innerHTML;
			this.className = 'cur';
			//curObj保存这次点击的元素
			this.parentNode.curObj = this;
			//显示筛选后的内容
			creatChose()
		}
	}
	//筛选内容显示
	function creatChose() {
		var item = Cbox.getElementsByTagName('div');
		yourChose.innerHTML = '';
		//遍历choseObj对象
		for(var attr in choseObj) {
			//生成内容
			var choseitem = document.createElement('span');
			choseitem.innerHTML = choseObj[attr];
			var img = document.createElement('img');
			img.src = 'img/close.png';
			//给img添加自定义行间属性data-index，值为对象key值对应的key名字
			img.setAttribute('data-index', attr);
			choseitem.appendChild(img);
			yourChose.appendChild(choseitem);
			//点击关闭图片
			img.onclick = function() {
				//删除choseObj对应的内容,delete是用来删除对象的内容。dataset用来获取img行间自定义属性的值
				delete choseObj[this.dataset.index];
				//对应的div存放的curObj的样式清空
				item[this.dataset.index].curObj.className = '';
				//再次显示筛选内容
				creatChose();
			}
		}
	}
}