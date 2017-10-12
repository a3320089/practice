window.onload = function() {
	var search = document.getElementById("search");
	var searchText = document.querySelector(".searchText");
	var lies = searchText.getElementsByTagName('li');
	
	search.onfocus = function() {
		checkSelect ()
	}
	
	search.onkeyup = function(e) {
		checkSelect ()
		e.cancelBubble = true;
	}
	
	//冒泡处理
	search.onclick = function(e) {
		e.cancelBubble = true;
	}
	
	for(var i = 0; i < lies.length; i++) {
		lies[i].onclick = function(e) {
			search.value = this.innerText;
			search.focus();
		}
	}

	document.onclick = function() {
		for(var i = 0; i < lies.length; i++) {
			lies[i].style.display = 'none';
			lies[i].className = '';
			
		}
	}
	//筛选条件
	function checkSelect () {
		var val = search.value;
		for(var i = 0; i < lies.length; i++) {
			lies[i].style.display = 'none';
			if(lies[i].innerHTML.indexOf(val) != -1) {
				lies[i].style.display = 'block';
			}
		}
	}

	
	
}