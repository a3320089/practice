window.onload = function () {
	var ly = document.getElementById("ly"),//留言板
	btn = document.getElementById("btn"),//按钮
	mesUL = document.getElementById("mesUL"),//留言信息
	whiceHead = 0;//控制显示图片
	
	//提交按钮点击事件
	bing(btn,'click',function () {
		whiceHead++;
		//获取内容
		var value = ly.value;
		//创建元素
		var li = document.createElement('li');
		var span = document.createElement('span');
		var div = document.createElement('div');
		//添加内容
		div.innerHTML = value;
		span.innerHTML = "<img src='"+ whiceHead%2 +".png' />";
		//添加到信息框
		li.appendChild(span);
		li.appendChild(div);
		mesUL.insertBefore(li,mesUL.children[0]);
		ly.value = '';
	})
	
	//封装事件函数，练习
	function bing(obj,evname,fn) {
		if (obj.addEventListener) {
			obj.addEventListener(evname,fn,false);
		}else{
			obj.attachEvent("on"+evname,function () {
				fn.call(obj);
			});
		}
	}
}