//找到对应ID的对象
function getChildByid(dataArr, id) {
	var obj;
	child(dataArr, id)

	function child(dataArr, id) {
		for(var i = 0; i < dataArr.length; i++) {
			if(dataArr[i].id == id) {
				obj = dataArr[i];
			} else if(dataArr[i].children) {
				child(dataArr[i].children, id)
			}
		}
	}
	return obj;
}

//生成右边点击事件
function FileOnClick(obj) {
	var modItem2 = obj.querySelectorAll('.mod-item');
	for(var i = 0; i < modItem2.length; i++) {

		modItem2[i].onclick = function() {
			creatFile(this.dataset.id);
			return false;
		}
		modItem2[i].onmousedown = function(e) {
			var e = e || window.event;
			var but = e.button;
			if(but == 2) {
				return;
			}
			var choseLi = whichChose();
			if(choseLi.length < 1) {
				return;
			}
			var drapDel = document.getElementById("drapDel");
			var menu = null;
			for(var i = 0; i < leftMenu.length; i++) {
				if(leftMenu[i].dataset.id == 112) {
					menu = leftMenu[i];
				}
			}
			drapDel.innerHTML = choseLi.length;
			document.onmousemove = function(e) {
				var e = e || window.event;
				drapDel.style.display = 'block';
				drapDel.style.left = e.clientX + 10 + 'px';
				drapDel.style.top = e.clientY + 10 + 'px';
				return false;
			}
			document.onmouseup = function() {
				if(collision(drapDel, menu)) {
					showDelTip()
				}
				drapDel.style.display = 'none';

				document.onmousemove = document.onmouseup = null;
			}
			e.stopPropagation();
			return false;
		}
		modItem2[i].oncontextmenu = function(e) {
			var e = e || window.event;
			var checkBtn = this.querySelector('.checkBtn');
			if(!checkBtn.ischeck) {
				clearChoseFn();
			}
			this.className += ' cur';
			checkBtn.ischeck = true;
			checkHeadChose();
			var choseNum = whichChose();
			if(choseNum.length > 1) {
				contextMenu.innerHTML = '<ul>'+
				'<li><a href="javascript:;">分享</a></li>'+
				'<li><a href="javascript:;">下载</a></li>'+
				'<li><a href="javascript:;" id="menuMove">移动到</a></li>'+
				'<li><a href="javascript:;" style="display:none;" id="menuRename">重命名</a></li>'+
				'<li><a href="javascript:;">移入保险箱</a></li>'+
				'<li><a href="javascript:;" id="menuDel">删除</a></li>'+
			'</ul>';
			} else {
				contextMenu.innerHTML = '<ul>'+
				'<li><a href="javascript:;">分享</a></li>'+
				'<li><a href="javascript:;">下载</a></li>'+
				'<li><a href="javascript:;" id="menuMove">移动到</a></li>'+
				'<li><a href="javascript:;" data-id = "${this.dataset.id}" id="menuRename">重命名</a></li>'+
				'<li><a href="javascript:;">移入保险箱</a></li>'+
				'<li><a href="javascript:;" id="menuDel">删除</a></li>'+
			'</ul>';
			}
			contextMenu.style.display = 'block';
			contextMenu.style.left = e.clientX + 'px';
			contextMenu.style.top = e.clientY + 'px';
			if(contextMenu.offsetHeight + contextMenu.offsetTop > mainRight.offsetHeight) {
				contextMenu.style.top = e.clientY - contextMenu.offsetHeight + 'px';
			}
			if(contextMenu.offsetLeft + contextMenu.offsetWidth > mainRight.offsetLeft + mainRight.offsetWidth) {
				contextMenu.style.left = mainRight.offsetLeft + mainRight.offsetWidth - contextMenu.offsetWidth + 'px';
			}

			var menuMove = document.getElementById("menuMove");
			menuMove.onclick =function () {
				moveFileTo();
			}
	
			//右键删除
			var menuDel = document.getElementById("menuDel");
			menuDel.onclick = function() {
				showDelTip();
			}
			var menuRename = document.getElementById("menuRename");
			var _this = this;
			menuRename.onclick = function() {
				var id = this.dataset.id;
				var obj = getChildByid(data, id);
				var ipt = _this.querySelector('input');
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
			}
			e.stopPropagation();
			return false;
		}

	}
}
//检查哪个被选中
function whichChose() {
	var arr = [];
	if(whichView == 0) {
		var checkBtn = modBody[0].querySelectorAll(".checkBtn");
	} else {
		var checkBtn = modBody[1].querySelectorAll(".checkBtn");
	}
	for(var i = 0; i < checkBtn.length; i++) {
		if(checkBtn[i].ischeck) {
			var obj = getChildByid(data, checkBtn[i].parentNode.parentNode.dataset.id)
			arr.push(obj);
		}
	}
	return arr;
}

//选中展开蓝色头部
function checkHeadChose() {
	var checkHeader = document.querySelector(".checkHeader");
	var isChoseHtml = document.getElementById('isChose');
	var rename = document.getElementById("rename");
	var isChose = whichChose();
	if(isChose.length >= 1) {
		checkHeader.style.display = 'block';
		isChoseHtml.innerHTML = '已选中' + isChose.length + '项'
	} else {
		checkHeader.style.display = 'none';
	}
	if(isChose.length > 1) {
		rename.style.display = 'none';
	} else {
		if(isChose[0]) {
			rename.dataset.id = isChose[0].id;
		}

		rename.style.display = 'inline';
	}
}

//取消选择
function clearChoseFn() {
	if(whichView == 0) {
		var checkBtn = modBody[0].querySelectorAll(".checkBtn");
	} else {
		var checkBtn = modBody[1].querySelectorAll(".checkBtn");
	}
	if(!checkBtn) return;
	for(var i = 0; i < checkBtn.length; i++) {
		if(checkBtn[i].ischeck) {
			checkBtn[i].ischeck = false;
			checkBtn[i].parentNode.parentNode.className = 'mod-item';
		}
	}
	allCheck.isCheck = false;
	allCheck.className = 'checkBtn';
}

//全选
function AllCheckFn() {
	if(whichView == 0) {
		var checkBtn = modBody[0].querySelectorAll(".checkBtn");
	} else {
		var checkBtn = modBody[1].querySelectorAll(".checkBtn");
	}
	if(checkBtn.length < 1) return;
	for(var i = 0; i < checkBtn.length; i++) {
		checkBtn[i].ischeck = true;
		checkBtn[i].parentNode.parentNode.className += ' cur';
	}
	allCheck.isCheck = true;
	allCheck.className += ' cur';
}

//检查是否全选
function checkIsAllChose() {
	var allCheck = document.getElementById("allCheck");

	if(whichView == 0) {
		var checkBtn = modBody[0].querySelectorAll(".checkBtn");
	} else {
		var checkBtn = modBody[1].querySelectorAll(".checkBtn");
	}
	if(checkBtn.length < 1) {
		allCheck.className = 'checkBtn';
		allCheck.isCheck = false;
		return;
	}
	allCheck.className += ' cur';
	allCheck.isCheck = true;
	for(var i = 0; i < checkBtn.length; i++) {
		if(!checkBtn[i].ischeck) {
			allCheck.className = 'checkBtn';
			allCheck.isCheck = false;
		}
	}

}

//碰撞函数封装
function collision(obj1, obj2) {
	var obj1Bound = getBound(obj1);
	var obj2Bound = getBound(obj2);

	var obj1L = obj1Bound.left;
	var obj1R = obj1Bound.right;
	var obj1T = obj1Bound.top;
	var obj1B = obj1Bound.bottom;

	var obj2L = obj2Bound.left;
	var obj2R = obj2Bound.right;
	var obj2T = obj2Bound.top;
	var obj2B = obj2Bound.bottom;

	if(obj1R > obj2L && obj1B > obj2T && obj1T < obj2B && obj1L < obj2R) {
		return true;
	} else {
		return false;
	}
}

function getBound(obj) {
	return obj.getBoundingClientRect();
}

//没有选中时单个删除
function delObj(dataArr, obj) {
	for(var i = 0; i < dataArr.length; i++) {
		if(dataArr[i] == obj) {
			dataArr.splice(i, 1);
		} else if(dataArr[i].children) {
			delObj(dataArr[i].children, obj)
		}
	}
	checkIsAllChose();
}

//选中时批量删除
function delMore(dataArr, obj) {
	dataArr ? dataArr : dataArr = data;
	if(obj) {
		var pid = obj.pid;
		delObj(dataArr, obj);
	} else {
		var objArr = whichChose();
		var pid = objArr[0].pid;
		for(var i = 0; i < objArr.length; i++) {
			delObj(dataArr, objArr[i]);
		}
	}
	creatFile(pid);
	MesTip('删除成功');
	checkIsAllChose();
}

//重命名
function rename(ipt, obj) {
	if(ipt.value == '') {
		ipt.style.display = 'none';
		document.onkeydown = null;
		document.onmousedown = null;
		return;
	}
	obj.name = ipt.value;
	creatFile(obj.pid);
	MesTip('重命名成功')
	document.onkeydown = null;
	document.onmousedown = null;
}

//新建文件夹
function addNewFile(ipt, div) {
	var ranId = Math.round(Math.random() * 1000000000000)
	if(ipt.value == '') {
		div.remove();
		document.onkeydown = null;
		document.onmousedown = null;
		return;
	}
	var obj = {};

	var Nowdate = new Date();

	var y = Nowdate.getFullYear();
	var m = Nowdate.getMonth() + 1;
	var d = Nowdate.getDate();
	var h = Nowdate.getHours();
	var min = Nowdate.getMinutes();
	obj.time = y + '-' + m + '-' + d + ' ' + h + ':' + min;
	obj.id = ranId;
	obj.name = ipt.value;
	obj.pid = nowId;
	var Pobj = getChildByid(data, nowId);
	if(!Pobj.children || Pobj.children.length < 1) {
		Pobj.children = [];
		Pobj.children.unshift(obj)
	} else {
		Pobj.children.unshift(obj)
	}
	creatFile(nowId);
	MesTip('新建文件夹成功');
	document.onkeydown = null;
	document.onmousedown = null;
}

//头部提示
function MesTip(val) {
	modMesSpan.innerHTML = val;
	modMes.style.display = 'block';
	clearInterval(modMes.timer);
	clearTimeout(modMes.timeout);
	if(!timeStop(2800)) {
		modMes.timeout = setTimeout(function() {
			modMes.style.display = 'none';
			modMes.style.top = '-45px';
		}, 2000)
	} else {
		Mtween(modMes, 45, 500, 'top', 'linear', function() {
			modMes.timeout = setTimeout(function() {
				modMes.style.display = 'none';
				modMes.style.top = '-45px';
			}, 2000)

		})
	}
}

var nowTime = new Date().getTime(), //延迟执行函数的变量，用来存放点击的时候
	oldTime = 0; //延迟执行函数的变量，用来存放上一次点击的时候
//	停顿时间
function timeStop(time) {
	nowTime = new Date().getTime();
	if(nowTime - oldTime < time) {
		return false;
	}
	oldTime = nowTime;
	return true;
}

//透明度动画封装
function opacityMt(obj, opaNum, fn) {
	clearInterval(obj.timer)
	var opa = Number(getcss(obj, 'opacity'));
	opaNum ? opaNum : opaNum = 0;
	if(opa > 0) {
		var speel = opa * 100;
		obj.timer = setInterval(function() {
			speel -= 2;
			obj.style.opacity = speel / 100;
			if(speel <= 0) {
				speel = 0;
				fn&&fn();
				
				clearInterval(obj.timer)
			}
		}, 10)
	} else {
		var speel = 0;
		obj.timer = setInterval(function() {
			speel += 2;
			obj.style.opacity = speel / 100;
			if(speel >= opaNum) {
				speel = opaNum;
				fn&&fn();
				clearInterval(obj.timer)
			}
		}, 10)
	}

}

function showDelTip() {
	fullPop.style.display = 'block';
	mark.style.display = 'block';
	opacityMt(fullPop, 100);
	opacityMt(mark, 70);
}

function showMoveTip() {
	modMoveFile.style.display = 'block';
	mark.style.display = 'block';
	opacityMt(modMoveFile, 100);
	opacityMt(mark, 70);
}

function hideMoveTip() {
	errText.style.display = 'none';
	opacityMt(modMoveFile, null, function() {
		modMoveFile.style.display = 'none';
	})
	opacityMt(mark, null, function() {
		mark.style.display = 'none';
	})
}

function hideDelTip() {
	opacityMt(fullPop, null, function() {
		fullPop.style.display = 'none';
	})
	opacityMt(mark, null, function() {
		mark.style.display = 'none';
	})
}

//获取元素
function getcss(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//拖拉函数
function drapObj(obj1, obj2) {
	obj1.onmousedown = function(e) {
		var e = e || window.event;
		var divX = e.clientX - obj2.offsetLeft;
		var divY = e.clientY - obj2.offsetTop;
		document.onmousemove = function(e) {
			var e = e || window.event;
			obj2.style.margin = '0px';
			obj2.style.left = e.clientX - divX + 'px';
			obj2.style.top = e.clientY - divY + 'px';
			return false;
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
		}
		return false;
	}

}

//找到所有的父级
function findPidArr(id) {
	var pidArr = [];
	var obj = getChildByid(data, id);
	if(obj.pid) {
		pidArr.push(obj)
		findPid(obj.pid)
	}

	function findPid(pid) {
		var obj = getChildByid(data, pid);
		pidArr.push(obj);
		if(obj.pid) {
			findPid(obj.pid)
		}
	}
	return pidArr;
}

//生成移动的函数
function moveFileHtml(pid) {
	var obj = getChildByid(data, pid);
	var html = moveFile(obj.children);
	fileBreadcrumb.innerHTML = '';
	function moveFile(dataArr) {
		var str = '<ul >';
		for(var i = 0; i < dataArr.length; i++) {
			str += '<li >';
			if(dataArr[i].children && dataArr[i].children.length > 0) {
				str += '<h2 class="close" data-id = ' + dataArr[i].id + '><i class="icon_file"></i><span>' + dataArr[i].name + '</span></h2>';
				str += moveFile(dataArr[i].children);
			} else {
				str += '<h2 data-id = ' + dataArr[i].id + '><i class="icon_file"></i><span>' + dataArr[i].name + '</span></h2>';
			}
			str += '</li>';
		}
		str += '</ul>';

		return str;
	}
	return html;
}
//给移动添加事件
function addMoveHtmlClick() {
	var h2opt = selectBox.getElementsByTagName('h2');
	for(var i = 0; i < h2opt.length; i++) {
		h2opt[i].isOpen = false;
		h2opt[i].ischose = false;
		h2opt[i].onclick = function() {
			for(var i = 0; i < h2opt.length; i++) {
				h2opt[i].style.color = '';
				h2opt[i].ischose = false;
			}
			this.style.color = '#00A4FF';
			this.ischose = true;
			if(this.nextElementSibling && !this.isOpen) {
				this.nextElementSibling.style.display = 'block';
				this.className = 'open';
				this.isOpen = true;
			} else if(this.nextElementSibling && this.isOpen) {
				this.nextElementSibling.style.display = 'none';
				this.className = 'close';
				this.isOpen = false;
			}
			var pidArr = findPidArr(this.dataset.id);
			fileBreadcrumb.innerHTML = '';
			for(var i = pidArr.length - 2; i >= 0; i--) {
				if(i == pidArr.length - 2) {
					fileBreadcrumb.innerHTML += pidArr[i].name;
				} else {
					fileBreadcrumb.innerHTML += '/' + pidArr[i].name;
				}
			}
		}
	}
}

//移动框需要移动的文件提示
function moveFileTo() {

	var ChoseObj = whichChose();
	var pidArr = findPidArr(ChoseObj[0].pid);
	if(ChoseObj.length > 1) {
		dirboxFile.innerHTML = ChoseObj[0].name + '等' + ChoseObj.length + '个文件'
	} else {
		dirboxFile.innerHTML = ChoseObj[0].name;
	}
	selectBox.innerHTML = moveFileHtml(pidArr[pidArr.length - 1].id);
	addMoveHtmlClick();
	showMoveTip();

}