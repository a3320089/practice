function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function shake(obj, attr, fn) {
	clearInterval(obj.shake);
	var cur = parseInt(getStyle(obj, attr));
	var arr = [];
	var num = 0;
	for(var i = 14; i > 0; i -= 2) {
		arr.push(i, -i);
	}
	arr.push(0);
	obj.shake = setInterval(function() {
		obj.style[attr] = cur + arr[num] + 'px';
		num++;
		if(num > arr.length) {
			clearInterval(obj.shake);
			fn && fn();
		}
	}, 50)
}