window.onload = function() {

	//存放内容的数组
	var arr = ['<div style="background: #dc7cbd;">One<span>1-粉色</span></div>', '<div style="background: #e28c8c;">Two<span>2-粉黄</span></div>', '<div style="background: #d8dd67;">Three<span>3-黄绿</span></div>', '<div style="background: #73c788;">Four<span>4-嫩绿</span></div>', '<div style="background: #4885ca;">Five<span>5-潮蓝</span></div>', '<div style="background: #6a64fa;">Six<span>6-蓝紫</span></div>', '<div style="background: #b36cfb;">Seven<span>7-粉紫</span></div>', '<div style="background: #f386c9;">Eight<span>8-紫红</span></div>']
	var arr2 = [];

	for(var i = 0; i < arr.length; i++) {
		arr2.push(i)
	}
	//获取元素
	var sortBtn = document.getElementById("sort"),
		disorBtn = document.getElementById("disorganize"),
		content = document.getElementById("content");

	sortBtn.changeSort = false; //判断从小到大还是从大到校
	//顺序排序
	sortBtn.onclick = function() {
		content.innerHTML = '';
		if(this.changeSort) {
			this.innerHTML = '从大到小';
			this.changeSort = false;
			arr2.sort(function(a, b) {
				return a - b;
			});
		} else {
			this.innerHTML = '从小到大';
			this.changeSort = true;
			arr2.sort(function(a, b) {
				return b - a;
			});
		}
		for(var i = 0; i < arr.length; i++) {
			content.innerHTML += arr[arr2[i]];
		}
	}
	
	//打乱排序
	disorBtn.onclick = function() {
		content.innerHTML = '';
		arr2.sort(function(a, b) {
			return Math.random() < 0.5 ? 1 : -1;
		})
		for(var i = 0; i < arr.length; i++) {
			content.innerHTML += arr[arr2[i]];
		}
	}
}