//左边导航条
var modLeftBox = document.querySelector(".mod-left-box");

for(var i = 0; i < data.length; i++) {
	var title = '<div class="title">' + data[i].name + ' </div>';
	title += '<div class="mod-left-body">';
	for(var j = 0; j < data[i].children.length; j++) {
		title += '<a href="javascript:;" data-id="' + data[i].children[j].id + '"  class="mod-lately"><i class="' + data[i].children[j].icon + ' bg"></i><span>' + data[i].children[j].name + '</span></a>';
	}
	title += '</div>';
	modLeftBox.innerHTML += title;
}

var modBody = document.querySelectorAll("#main_right .mod-body");
var breadcrumb = document.querySelector(".mod-breadcrumb");
var contextMenu = document.getElementById("contextMenu");
var noFile = document.getElementById("noFile");

var nowId;
//点击生成右边函数
function creatFile(id) {
	nowId = Number(id);
	modBody[0].innerHTML = '';
	modBody[1].children[0].innerHTML = '';
	checkHeadChose();
	checkIsAllChose();
	var obj = getChildByid(data, id);
	if(obj.children && obj.children.length >= 1) {
		for(var i = 0; i < obj.children.length; i++) {
			var item = '<div class="mod-item" data-id = "'+obj.children[i].id+'">'+
					'<div class="mod-check">'+
						'<span class="checkBtn"></span>'+
					'</div>'+
					'<div class="item-box">'+
						'<i class="icon-file bg"></i>'+
						'<span>'+obj.children[i].name+'</span>'+
						'<span class="time" >'+obj.children[i].time+'</span>'+
						'<input type="text" spellcheck="false" value="'+obj.children[i].name+'" />'+
					'</div>'+
					'<div class="operate">'+
						'<a href="javascript:;" class="bg icon-share"></a>'+
						'<a href="javascript:;" class="bg icon-down"></a>'+
						'<a href="javascript:;" class="bg icon-trash"></a>'+
						'<a href="javascript:;" class="bg icon-move"></a>'+
						'<a href="javascript:;" class="bg icon-rename"></a>'+
						'<a href="javascript:;" class="bg icon-add-safebox"></a>'+
					'</div>'+
				'</div>';
			modBody[0].innerHTML += item;
			var item2 = '<li class="mod-item" data-id = "'+obj.children[i].id+'">'+
						'<a href="javascript:;">'+
						'<div class="mod-div" >'+
							'<i class="icon-file bg"></i>'+
							'<span>'+obj.children[i].name+'</span>'+
							'<input type="text" spellcheck="false" value="'+obj.children[i].name+'" />'+
						'</div>'+
						'<i class="checkBtn"></i>'+
						'</a>'+
					'</li>';
			modBody[1].children[0].innerHTML += item2;
		}
		noFile.style.display = 'none';
	} else {
		noFile.style.display = 'block';
	}

	//删除
	var modItem1 = modBody[0].querySelectorAll('.mod-item');
	for(var i = 0; i < modItem1.length; i++) {
		var opA = modItem1[i].querySelectorAll('.operate a');
		opA[2].onclick = function(e) {
			var e = e || window.event;
			var id = this.parentNode.parentNode.dataset.id;
			var obj = getChildByid(data, id);
			popData = data;
			popObj = obj;
			showDelTip();
			e.cancelBubble = true;
			e.stopPropagation()
		}
		//重命名
		opA[4].onclick = function(e) {
			var e = e || window.event;
			var id = this.parentNode.parentNode.dataset.id;
			var obj = getChildByid(data, id);
			var ipt = this.parentNode.parentNode.querySelector('input');
			ipt.style.display = 'block';
			ipt.focus();
			ipt.select();
			document.onmousedown = function() {
				rename(ipt, obj)
			}
			document.onkeydown = function(e) {
				var e = e || window.event;
				if(e.keyCode == 13) {
					rename(ipt, obj)
				}
			}
			e.cancelBubble = true;
			e.stopPropagation();
		}
		opA[4].onmousedown = function(e) {
			var e = e || window.event;
			e.cancelBubble = true;
			e.stopPropagation();
		}
		
		//移动到
		opA[3].onclick = function (e) {
			var e = e || window.event;
			var parent = this.parentNode.parentNode;
			var checkBtn = parent.querySelector('.checkBtn');
			parent.className +=' cur';
			checkBtn.ischeck =true;
			moveFileTo();
			e.cancelBubble = true;
			e.stopPropagation();
		}
	}

	//单选
	for(var i = 0; i < modBody.length; i++) {
		FileOnClick(modBody[i]);
		var checkBtn = modBody[i].querySelectorAll(".checkBtn");
		for(var j = 0; j < checkBtn.length; j++) {
			checkBtn[j].ischeck = false;
			checkBtn[j].onmousedown = function(e) {
				contextMenu.style.display = 'none';
				var parent = this.parentNode.parentNode;
				if(!this.ischeck) {
					parent.className += ' cur';
					this.ischeck = true;
				} else {
					parent.className = 'mod-item';
					this.ischeck = false;
				}
				checkIsAllChose()
				checkHeadChose()
				e.stopPropagation();
			}
			checkBtn[j].onclick = function(e) {
				e.stopPropagation();
			}
		}
	}

	var modCheckBox = document.querySelectorAll(".mod-check");

	for(var i = 0; i < modCheckBox.length; i++) {
		modCheckBox[i].onclick = function(e) {
			e.stopPropagation();
		}
	}

	//生成面包屑数组
	var pidArr = [];
	if(obj.pid) {
		pidArr.push(obj)
		findPid(obj.pid)
	}

	//通过ID找到父级
	function findPid(pid) {
		var obj = getChildByid(data, pid);
		pidArr.push(obj);
		if(obj.pid) {
			findPid(obj.pid)
		}
	}

	//面包屑处理
	breadcrumb.innerHTML = '';
	breadcrumb.innerHTML += '<ul>';
	for(var i = pidArr.length - 2; i >= 0; i--) {
		if(i == pidArr.length - 2) {
			breadcrumb.innerHTML += '<li><a href="javascript:;" data-id ="' + pidArr[i].id + '">微云</a></li>'
		} else if(i == 0) {
			breadcrumb.innerHTML += '<li class="cur"><i class="icon-bread-next bg"></i><a href="javascript:;" data-id ="' + pidArr[i].id + '">' + pidArr[i].name + '</a></li>'
		} else {
			breadcrumb.innerHTML += '<li><i class="icon-bread-next bg"></i><a href="javascript:;" data-id ="' + pidArr[i].id + '">' + pidArr[i].name + '</a></li>'
		}
	}
	breadcrumb.innerHTML += '</ul>';

	//面包屑点击事件
	var breadA = breadcrumb.querySelectorAll('a');
	for(var i = 0; i < breadA.length; i++) {
		breadA[i].onclick = function() {
			creatFile(this.dataset.id);
		}
	}

	var mainRight = document.getElementById("main_right");
	var allInput = mainRight.getElementsByTagName('input');
	for(var i = 0; i < allInput.length; i++) {
		allInput[i].onmousedown = function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.cancelBubble = true;
		}
		allInput[i].onclick = function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.cancelBubble = true;;
		}
	}
}


