window.onload = function() {

	//生成数据
	var emailListUl = document.querySelector(".emailListUl");

	for(var i = 0; i < list.length; i++) {
		var html = `<li data-id = ${list[i].id}>
							<input type="checkbox">
							<div>
								<span>${list[i].caption}</span>
								<span>${list[i].time}</span>
							</div>
							<p>${list[i].desc}</p>
					</li>`;
		emailListUl.innerHTML += html;
	}

	//全选
	var checkAll = document.querySelector(".emailHead input");
	var check = document.querySelectorAll(".emailListUl input");
	checkAll.onclick = function() {
		if(!this.checked) {
			for(var i = 0; i < check.length; i++) {
				check[i].checked = false;
				check[i].parentNode.style.background = '';
			}
		} else {
			for(var i = 0; i < check.length; i++) {
				check[i].checked = true;
				check[i].parentNode.style.background = '#f2f6f9';
			}
		}

	}
	//单选
	for(var i = 0; i < check.length; i++) {
		check[i].onclick = function() {
		
			checkAll.checked = true;
			for(var i = 0; i < check.length; i++) {
				if(!check[i].checked) {
					checkAll.checked = false;
					check[i].parentNode.style.background = '';
				} else {
					check[i].parentNode.style.background = '#f2f6f9';
				}
			}
		}
		check[i].onmousedown = function  (e) {
				var e= e||window.event;
				e.stopPropagation();
		}
	}

	//删除
	var delet = document.getElementById("delet");
	delet.onclick = function() {
		del()
	}

	function del() {
		var check = document.querySelectorAll(".emailListUl input");
		var arr = choseLen();
		for(var i = 0; i < arr.length; i++) {
			emailListUl.removeChild(arr[i]);
			for(var j = 0; j < list.length; j++) {
				if(list[j].id == arr[i].dataset.id) {
					list.splice(j, 1)
				}
			}
		}
	}

	function choseLen() {
		var arr = [];
		var check = document.querySelectorAll(".emailListUl input");
		for(var i = 0; i < check.length; i++) {
			if(check[i].checked) {
				arr.push(check[i].parentNode);
			}
		}
		return arr;
	}

	//拖拽删除
	var lies = emailListUl.getElementsByTagName('li');
	var hint3 = document.getElementById("hint3");
	var beenDel = document.querySelector(".beenDel");

	for(var i = 0; i < lies.length; i++) {
		lies[i].onmousedown = function(e) {
			var e = e || window.event;
			var choselen = choseLen();
			if(this.children[0].checked) {
				hint3.style.display = 'block';
				hint3.innerHTML = '选中'+choselen.length+'张邮件'
			}
			hint3.style.left = e.clientX + 'px';
			hint3.style.top = e.clientY + 'px';
			document.onmousemove = function(e) {
				var e = e || window.event;
				hint3.style.left = e.clientX + 'px';
				hint3.style.top = e.clientY + 'px';
				
			}
			document.onmouseup = function() {
				if (collision(beenDel,hint3)) {
					del();
				}
				hint3.style.display = 'none';
				document.onmousemove = document.onmouseup = null;
			}
			return false;
		}
	}
	
	//碰撞函数封装
	function collision(obj1,obj2) {
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
	
		if (obj1R>obj2L && obj1B>obj2T && obj1T < obj2B && obj1L < obj2R) {
			return true;
		}else{
			return false;
		}
	}

	function getBound(obj) {
		return obj.getBoundingClientRect();
	}
}