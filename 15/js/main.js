//获取元素
function $(id) {
	return typeof id == "string" ? document.getElementById(id) : id;
}
var box = $("box"), //聊天框
	headImg = $("head-img"), //头像
	content = $("content"), //输入框
	send = $("send"), //发送按钮
	inChange = 1; //判断是哪个头像
//切换头像
headImg.onclick = function() { //点击头像切换
	if(inChange == 1) { //如果头像为第一个
		headImg.src = "img/2.png"; //切换第二个
		inChange = 2;
	} else {
		headImg.src = "img/1.png"; //否则切换第一个
		inChange = 1;
	}
};
//发送信息
send.onclick = function() { //点击发送按钮
	var val = content.value; //获取输入框内容
	var avaImg = "img/1.png";
	var className = 'left clearfix';
	if(content.value == "") { //判断如果为空则返回以下内容
		alert("亲！请写点东西吧");
		return;
	} else if(inChange == 2) { //判断为第二个头像的时候
		avaImg = "img/2.png";
		className = 'right clearfix';
	};
	var li = '<li class="' + className + '"><span class="head_img"><img src="' + avaImg + '"/></span><span class="mas_content"><span class="icon"></span>' + val + '</span></li>';
	box.innerHTML = li + box.innerHTML; //修改屏幕内容
	content.value = ""; //使输入框为空
};