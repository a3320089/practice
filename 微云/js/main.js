var modMes = document.querySelector(".mod-msg");
var modMesSpan = modMes.querySelector('span');

////搜索框
var searchBox = document.getElementById("searchBox");
var searchText = searchBox.getElementsByTagName('input')[0];
var closeIcon = searchBox.getElementsByTagName('a')[0];
searchBox.onclick = function(e) {
	var e = e || window.event;
	searchBox.className = 'header-search focus';
	e.stopPropagation();
}
document.onclick = function() {
	searchBox.className = 'header-search';
	contextMenu.style.display = 'none';
}
closeIcon.onclick = function() {
	//		console.log(1)
	searchText.value = '';
	searchText.focus();
	return false;
}
//
////添加按钮
var addHover = document.getElementsByClassName('add-hover')[0];
var addFileDrap = document.getElementsByClassName('addFile-drap')[0];
var Draptimer = 0;
addHover.onmouseover = function() {
	clearTimeout(Draptimer)
	addFileDrap.style.zIndex = '99';
	addFileDrap.className = 'addFile-drap cur';
}
addHover.onmouseout = function() {
	Draptimer = setTimeout(function() {
		addFileDrap.style.zIndex = '-1';
		addFileDrap.className = 'addFile-drap';
	}, 200)
}
addFileDrap.onmouseover = function() {
	clearTimeout(Draptimer);
}
addFileDrap.onmouseout = function() {
	Draptimer = setTimeout(function() {
		addFileDrap.style.zIndex = '-1';
		addFileDrap.className = 'addFile-drap';
	}, 200)
}
//
////切换展示模板
var modView = document.querySelectorAll(".hearder-mod-view .view-item")[0];
var itemView = modView.getElementsByTagName('a');
var modBody = document.querySelectorAll(".mod-body");
var whichView = 0;
for(var i = 0; i < itemView.length; i++) {
	itemView[i].index = i;
	itemView[i].onclick = function() {
		for(var i = 0; i < itemView.length; i++) {
			itemView[i].className = 'item-list';
			modBody[i].style.display = 'none';
		}
		whichView = this.index;
		this.className += ' cur';
		modBody[this.index].style.display = 'block';
	}
}

////切换数据
var leftMenu = document.querySelectorAll(".mod-left-box a");
console.log(leftMenu)
////初始化
creatFile(leftMenu[1].dataset.id);
leftMenu[1].className += ' cur'
for(var i = 0; i < leftMenu.length; i++) {
	leftMenu[i].onclick = function() {
		for(var i = 0; i < leftMenu.length; i++) {
			leftMenu[i].className = 'mod-lately';
		}
		this.className += ' cur'
		creatFile(this.dataset.id);
	}
}
//全选
var allCheck = document.getElementById("allCheck");
allCheck.isCheck = false;
allCheck.onmousedown = function(e) {
	if(this.isCheck) {
		clearChoseFn()
	} else {
		AllCheckFn()
	}
	checkHeadChose()
	e.stopPropagation();
	return false;
}

//拖拽选择
var mainRight = document.getElementById("main_right");
var dragChose = document.getElementById("dragChose");

//取消选择
var clearChose = document.getElementById("clearChose");
clearChose.onclick = function() {
	clearChoseFn();
	checkHeadChose();
	checkIsAllChose();
}

//拖拽选择
mainRight.onmousedown = function(e) {
	var e = e || window.event;
	var but = e.button;
	if(but == 2) {
		return;
	}
	var eX = e.clientX;
	var eY = e.clientY;
	dragChose.style.left = eX + 'px';
	dragChose.style.top = eY + 'px';
	clearChoseFn();
	checkHeadChose();
	checkIsAllChose();
	document.onmousemove = function(e) {
		var mX = e.clientX;
		var mY = e.clientY;
		var curX = mX - eX;
		var curY = mY - eY;
		dragChose.style.display = 'block';
		dragChose.style.width = Math.abs(curX) + 'px';
		dragChose.style.height = Math.abs(curY) + 'px';
		dragChose.style.left = Math.min(eX, mX) + 'px';
		dragChose.style.top = Math.min(eY, mY) + 'px';
		if(whichView == 0) {
			var Moditem = modBody[0].querySelectorAll(".mod-item");
		} else {
			var Moditem = modBody[1].querySelectorAll("li");
		}
		for(var i = 0; i < Moditem.length; i++) {
			var checkBtn = Moditem[i].querySelector('.checkBtn');
			if(collision(dragChose, Moditem[i])) {
				checkBtn.ischeck = true;
				Moditem[i].className = 'mod-item cur';
			} else {
				Moditem[i].className = 'mod-item';
				checkBtn.ischeck = false;
			}
		}
		checkIsAllChose();
		checkHeadChose();
		return false;
	}
	document.onmouseup = function() {
		document.onmousemove = document.onmouseup = null;
		dragChose.style.display = 'none';
		dragChose.style.width = '0px';
		dragChose.style.height = '0px';
		return false;
	}
	return false;
}
document.oncontextmenu = function() {
	return false;
}

var headDel = document.getElementById("headDel");
headDel.onclick = function() {
	showDelTip()
}

var addFile = document.getElementById("addFile");
addFile.onclick = function() {
	if(whichView == 0) {
		var div = document.createElement('div');
		div.className = 'mod-item';
		div.innerHTML = '<div class="mod-check">'+
						'<span class="checkBtn"></span>'+
					'</div>'+
					'<div class="item-box">'+
						'<i class="icon-file bg"></i>'+
						'<span class="name"></span>'+
						'<input type="text" value="" style="display:block;"/>'+
					'</div>'+
					'<div class="operate">'+
						'<a href="javascript:;" class="bg icon-share"></a>'+
						'<a href="javascript:;" class="bg icon-down"></a>'+
						'<a href="javascript:;" class="bg icon-trash"></a>'+
						'<a href="javascript:;" class="bg icon-move"></a>'+
						'<a href="javascript:;" class="bg icon-rename"></a>'+
						'<a href="javascript:;" class="bg icon-add-safebox"></a>'+
					'</div>';
		modBody[0].insertBefore(div, modBody[0].children[0]);
		var ipt = div.getElementsByTagName('input')[0];
		ipt.focus();
		ipt.onclick = function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.cancelBubble = true;
		}
		ipt.onfocus = function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.cancelBubble = true;
		}
		document.onmousedown = function() {
			addNewFile(ipt, div)
		}
		document.onkeydown = function(e) {
			var e = e || window.event;
			if(e.keyCode == 13) {
				addNewFile(ipt, div);
			}
		}
	} else {
		var li = document.createElement('li');
		li.className = "mod-item";
		li.innerHTML = '<a href="javascript:;">'+
						'<div class="mod-div" >'+
							'<i class="icon-file bg"></i>'+
							'<span></span>'+
							'<input type="text" value="" style="display:block;"/>'+
						'</div>'+
						'<i class="checkBtn"></i>'+
						'</a>';
		modBody[1].querySelector('ul').insertBefore(li, modBody[1].querySelector('ul').children[0]);
		var ipt = li.getElementsByTagName('input')[0];
		ipt.focus();
		document.onmousedown = function() {
			addNewFile(ipt, li)
		}
		document.onkeydown = function(e) {
			var e = e || window.event;
			if(e.keyCode == 13) {
				addNewFile(ipt, li);
			}
		}
	}
}

var Headrename = document.getElementById("rename");
Headrename.onclick = function() {
	if(whichView == 0) {
		var modItem = modBody[0].querySelectorAll(".mod-item");
	} else {
		var modItem = modBody[1].querySelectorAll(".mod-item");
	}
	var id = this.dataset.id;
	var obj = getChildByid(data, id);
	for(var i = 0; i < modItem.length; i++) {
		if(modItem[i].dataset.id == this.dataset.id) {
			var ipt = modItem[i].querySelector('input');
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
	}

}

//确认框拖拉
var fullPop = document.getElementById("full-pop");
var popTitle = fullPop.querySelector('.pop-title');
var closePop = fullPop.querySelector('#pop-close');
var mark = document.getElementById("mark");
var popSure = document.getElementById("pop-sure");
var popCancel = document.getElementById("pop-cancel");
//拖拉
drapObj(popTitle, fullPop)
//关闭提示框
popCancel.onclick = closePop.onclick = function() {
	hideDelTip()
}
//确认删除
var popData = null;
var popObj = null;
popSure.onclick = function() {
	hideDelTip()
	if(popData || popObj) {
		delMore(popData, popObj);
		popData = null;
		popObj = null;
	} else {
		delMore(popData, popObj);
	}

}

//移动文件的元素
var modMoveFile = document.getElementById("mod-moveFile");
var moveFileTitle = modMoveFile.querySelector('.moveFile-title');
var moveFileClose = modMoveFile.querySelector('#moveFile-close');
var moveFileSure = document.getElementById("moveFile-sure");
var moveFileCancel = document.getElementById("moveFile-cancel");
var selectBox = modMoveFile.querySelector('.select-box');
var fileBreadcrumb = document.getElementById("file-breadcrumb");
var dirboxFile = modMoveFile.querySelector('.dirbox-file span');
var errText = modMoveFile.querySelector('.err-text');
drapObj(moveFileTitle, modMoveFile);

var moveTo = document.getElementById("moveTo");

//右上角的移动到
moveTo.onclick = function () {
	moveFileTo();
}

//移动框的确认按钮事件
moveFileSure.onclick = function() {
	var ChoseObj = whichChose();
	var h2opt = selectBox.getElementsByTagName('h2');
	var moveToFileObj;
	for(var i = 0; i < h2opt.length; i++) {
		if(h2opt[i].ischose) {
			moveToFileObj = h2opt[i].dataset.id;
		}
	}
	if (!moveToFileObj) {
		errText.style.display = 'block';
		errText.innerHTML = '请选择文件夹';
		return;
	}else{
		errText.innerHTML = '不能移动到自身及其子集里';
	}
	errText.style.display = 'none';
	var FileObj = getChildByid(data, moveToFileObj);
	var FChoseObj = getChildByid(data, ChoseObj[0].pid);
	
	for(var i = 0; i < ChoseObj.length; i++) {
		if(FileObj.id == FChoseObj.id || FileObj.id == ChoseObj[i].id || !findFile (FileObj,ChoseObj[i].id)) {
			errText.style.display = 'block';
			return;
		}
	}
	//处理子集菜单无法移动
	function findFile (Obj,id) {
		var beel = true;
		findFileloop (Obj,id);
		function findFileloop (Obj,id) {
			if (Obj.pid) {
				if(Obj.pid == id){
					beel = false;
				}
				findFileloop (getChildByid(data,Obj.pid),id);
				
			}
		}
		return beel;
	}
	
	
	for(var i = 0; i < FChoseObj.children.length; i++) {
		for(var j = 0; j < ChoseObj.length; j++) {
			if(FChoseObj.children[i].id == ChoseObj[j].id) {
				FChoseObj.children.splice(i, 1);
			}
		}
	}
	if(FileObj.children) {
		for(var i = 0; i < ChoseObj.length; i++) {
			ChoseObj[i].pid = moveToFileObj;
		}
		FileObj.children = FileObj.children.concat(ChoseObj);
	} else {
		FileObj.children = [];
		for(var i = 0; i < ChoseObj.length; i++) {
			ChoseObj[i].pid = moveToFileObj;
		}
		FileObj.children = FileObj.children.concat(ChoseObj);
	}
	creatFile(FChoseObj.id);
	MesTip('移动成功');
	hideMoveTip();
}

moveFileCancel.onclick = moveFileClose.onclick = function () {
	hideMoveTip();
}