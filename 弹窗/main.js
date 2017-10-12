window.onload = function () {
	
	var btn = document.getElementById("btn");
	
	btn.onclick = function () {
		var mark = document.createElement('div');
		mark.id = 'mark';
		document.body.appendChild(mark);
		var sureBox = document.createElement('div');
		sureBox.id = 'sureBtn';
		sureBox.innerHTML = '<div class="close"><span>x</span></div><div class="text"><img src="icon.png"/><p>恭喜你提交成功</p><p class="i">已扣除10微币</p></div><div class="btn"><input type="button" value="确认" /></div>';
		document.body.appendChild(sureBox);
		sureBox.style.top = (document.documentElement.clientHeight-sureBox.offsetHeight)/2+'px';
		sureBox.style.left = (document.documentElement.clientWidth-sureBox.offsetWidth)/2+'px';
		var close = sureBox.getElementsByTagName('span')[0];
		var sureBtn = sureBox.getElementsByTagName('input')[0];
		close.onclick = sureBtn.onclick = function () {
			document.body.removeChild(mark);
			document.body.removeChild(sureBox);
		}
	}
	
	window.onresize = function () {
		var sureBox = document.getElementById("sureBtn");
		if (sureBox) {
			sureBox.style.top = (document.documentElement.clientHeight-sureBox.offsetHeight)/2+'px';
			sureBox.style.left = (document.documentElement.clientWidth-sureBox.offsetWidth)/2+'px';
		}
		
	}
	
}