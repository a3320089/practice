window.onload = function  () {
	function $ (name) {
		return typeof name =="string"?document.querySelectorAll(name):name;
	}
	var leftBtn = $(".leftBtn")[0],
	rightBtn = $(".rightBtn")[0],
	imgNum = $(".imgNum")[0],
	imgBox = $(".img_box")[0],
	imgLi= $(".img_box li"),
	index = 0;
	
	imgBox.style.width = $(".img_box li").length * 510+ 'px';
	imgNum.innerHTML = index+1 +'/'+ imgLi.length;
	
	rightBtn.onclick = function  () {
		index++;
		if (index > imgLi.length-1) {
			index = 0;
		}
		imgNum.innerHTML = index+1 +'/'+ imgLi.length;
		imgBox.style.marginLeft = '-'+(index*510)+'px';
	};
	leftBtn.onclick = function  () {
		index--;
		if (index < 0 ) {
			index = imgLi.length-1;
		}
		imgNum.innerHTML = index+1 +'/'+ imgLi.length;
		imgBox.style.marginLeft = '-'+(index*510)+'px';
	};
}