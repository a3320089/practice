window.onload = function () {
	var box1 = new sendMes();
	box1.init('box1')
	
	var box2 = new sendMes();
	box2.init('box2')
}
//构造函数
function sendMes() {
	this.box = null;
	this.textBox = null;
	this.btn = null;
	this.mesBox = null;
}
//初始化配置
sendMes.prototype.init = function (id) {
	this.box = document.getElementById(id);
	this.textBox = this.box.getElementsByTagName('textarea')[0];
	this.btn = this.box.getElementsByTagName('input')[0];
	this.mesBox = this.box.getElementsByTagName('ul')[0];
	var This = this;
	this.btn.onclick = function  () {
		This.createMes();	
	}
	this.mesBox.onclick = function () {
		This.delMes();
	}
}
//创建信息
sendMes.prototype.createMes = function () {
	var val = this.textBox.value;
	if (val == '') {
		alert('请输入内容');
		return;
	}
	var html = '<li><span>'+val+'</span><a href="javascript:;" data-type="del">删除</a></li>';
	this.mesBox.innerHTML += html;
	this.textBox.value = '';
}
//删除信息
sendMes.prototype.delMes =function (e) {
	var e=e||window.event;
	if (e.target.dataset.type =='del' ) {
		e.target.parentNode.remove();
	}
}