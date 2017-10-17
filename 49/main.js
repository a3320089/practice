window.onload = function  () {
	function $ (name) {
		return typeof name =="string"?document.querySelectorAll(name).length>1? document.querySelectorAll(name): document.querySelector(name) :name;
	}

	var changeBtn = $(".li_text img"),
	change_box = $(".change_box"),
	showText = $(".showText"),
	input_box = $(".change_box .input_box"),
	sure = $(".sure"),
	close = $(".close");
	
	for (var i =0;i<changeBtn.length;i++) {
		changeBtn[i].index = i;
		sure[i].index = i;
		close[i].index = i;
		changeBtn[i].onclick = function  () {
			change_box[this.index].style.display = "block";
			input_box[this.index].value = showText[this.index].innerHTML;
		};
		sure[i].onclick = function  () {
			if (input_box[this.index].value !='') {
				showText[this.index].innerHTML = input_box[this.index].value;
				change_box[this.index].style.display = "none";
			}else{
				alert('请输入内容');
			}
		};
		close[i].onclick = function  () {
			change_box[this.index].style.display = "none";
		};
	}
}