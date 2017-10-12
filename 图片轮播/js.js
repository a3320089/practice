window.onload = function  () {
	function $ (id) {
		return typeof id =="string"?document.getElementById(id):id;
	}
	var prev = $("prev"),
	next = $("next"),
	imgBox = $("imgBox"),
	imgArr = imgBox.getElementsByTagName("img"),
	index = 0;
	
	imgArr[0].style.opacity = "1";
	imgArr[0].style.left = "0px";
	next.onclick = function  () {
		index++;
		if (index>imgArr.length-1) {
			index = 0;
		}
		for (var i =0;i<imgArr.length;i++) {
			if(i!=index){
			imgArr[i].style.opacity = "0";
			imgArr[i].style.left = "240px";
			imgArr[i].style.zIndex = "0";
			}
		}
		imgArr[index].style.opacity = "1";
		imgArr[index].style.left = "0px";
		imgArr[index].style.zIndex = "1";
	}
	prev.onclick = function  () {
		index--;
		if (index<0) {
			index = imgArr.length-1;
		}
		for (var i =0;i<imgArr.length;i++) {
			imgArr[i].style.opacity = "0";
			imgArr[i].style.left = "100px";
			imgArr[i].style.zIndex = "0";
		}
		imgArr[index].style.opacity = "1";
		imgArr[index].style.left = "0px";
		imgArr[index].style.zIndex = "1";
	}
	
}