window.onload = function() {
	function $(name) {
		return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
	}
	var showBox = $("#showBox"),
		oldNum = $("#oldNum"),
		numBtn = $(".numBtn"),
		delBtn = $("#del"),
		allDel = $("#allDel"),
		addBtn = $("#addBtn"),
		minusBtn = $("#minusBtn"),
		rideBtn = $("#rideBtn"),
		divideBtn = $("#divideBtn"),
		equalBtn = $("#equal"),
		surplusBtn = $("#surplusBtn"),
		method = null,
		whichBtn = null;

	for(var i = 0; i < numBtn.length; i++) {
		//		var numValue = Number(numBtn[i].value);
		numBtn[i].Num = numBtn[i].value;
		numBtn[i].onclick = function() {
			addNum(this.Num);
		}
	}

	//删除功能
	delBtn.onclick = del;

	function del() {
		whichBtn = "delBtn";
		if(!equalBtn.isClick) {
			if(showBox.value.length == 1) {
				showBox.value = '0';
				return;
			}
			showBox.value != '0' ? showBox.value = showBox.value.substring(0, showBox.value.length - 1) : '';
		}

	}
	//清零
	allDel.onclick = function() {
		whichBtn = "allDel";
		showBox.value = '0';
		oldNum.value = '0';
		method = '';
	}

	//加法运算

	addBtn.onclick = add;

	function add() {

		if(oldNum.value == '0') {
			oldNum.value = showBox.value;
			method = '+';
			showBox.value = '0';
			return;
		}
		if(whichBtn == 'divideBtn' && showBox.value == '0') {
			method = '+';
			return;
		} else if(whichBtn == 'rideBtn' && showBox.value == '0') {
			method = '+';
			return;
		} else {
			operation();
		}

		showBox.value = '0';
		method = '+';
		whichBtn = "addBtn";
	}
	//减法运算

	minusBtn.onclick = minus;

	function minus() {

		if(oldNum.value == '0') {
			oldNum.value = showBox.value;
			method = '-';
			showBox.value = '0';

			return;
		}
		if(whichBtn == 'divideBtn' && showBox.value == '0') {
			method = '-';
			return;
		} else if(whichBtn == 'rideBtn' && showBox.value == '0') {
			method = '-';
			return;
		} else {
			operation();
		}

		showBox.value = '0';
		method = '-';
		whichBtn = "minusBtn";
	}
	//乘法运算

	rideBtn.onclick = ride;

	function ride() {
		if(oldNum.value == '0') {
			oldNum.value = showBox.value;
			method = '*';
			showBox.value = '0';
			return;
		}
		if(whichBtn == 'divideBtn' && showBox.value == '0') {
			method = '*';
			return;
		} else if(whichBtn != '0' && showBox.value == '0') {
			method = '*';
			return;
		} else {
			operation();
		}

		showBox.value = '0';
		method = '*';
		whichBtn = "rideBtn";
	}
	//除法运算

	divideBtn.onclick = divide;

	function divide() {
		whichBtn = "divideBtn";
		if(oldNum.value == '0') {
			oldNum.value = showBox.value;
			method = '/';
			showBox.value = '0';
			return;
		}
		if(whichBtn == 'rideBtn' && showBox.value == '0') {
			method = '/';
			return;
		} else if(whichBtn != '0' && showBox.value == '0') {
			method = '/';
			return;
		} else {
			operation();
		}
		showBox.value = '0';
		method = '/';
	}

	//取模运算
	surplusBtn.onclick = surplus;

	function surplus() {
		if(oldNum.value == '0') {
			oldNum.value = showBox.value;
			method = '%';
			showBox.value = '0';
			return;
		}
		if(whichBtn == 'divideBtn' && showBox.value == '0') {
			method = '%';
			return;
		} else if(whichBtn == 'rideBtn' && showBox.value == '0') {
			method = '%';
			return;
		} else if(whichBtn != '0' && showBox.value == '0') {
			method = '%';
			return;
		} else {
			operation();
		}
		showBox.value = '0';
		method = '%';
		whichBtn = "surplusBtn";
	}

	//等于号
	equalBtn.onclick = equal;

	function equal() {
		if(!equalBtn.isClick) {
			switch(method) {
				case '+':
					showBox.value = Number(showBox.value) + Number(oldNum.value);
					method = '';
					break;
				case '-':
					showBox.value = Number(oldNum.value) - Number(showBox.value);
					method = '';
					break;
				case '*':
					if(whichBtn != '0' && showBox.value == '0') {
						method = '/';
						return;
					}
					showBox.value = Number(oldNum.value) * Number(showBox.value);
					method = '';
					break;
				case '/':
					if(!Number(showBox.value)) {
						alert('不能除以0');
						return;
					}
					showBox.value = Number(oldNum.value) / Number(showBox.value);
					method = '';
					break;
				case '%':
					if(!Number(showBox.value)) {
						alert('不能取模0');
						return;
					}
					showBox.value = Number(oldNum.value) % Number(showBox.value);
					method = '';
					break;
				default:
					break;
			}
			equalBtn.isClick = 1;
			oldNum.value = '0';
		}
	}

	//运算函数
	function operation() {
		switch(method) {
			case '+':
				oldNum.value = Number(showBox.value) + Number(oldNum.value);
				break;
			case '-':
				oldNum.value = Number(oldNum.value) - Number(showBox.value);
				break;
			case '*':
				oldNum.value = Number(oldNum.value) * Number(showBox.value);
				break;
			case '/':
				if(!Number(showBox.value)) {
					alert('不能除以0');
					return;
				}
				oldNum.value = Number(oldNum.value) / Number(showBox.value);
				break;
			case '%':
				if(!Number(showBox.value)) {
					alert('不能取模0');
					return;
				}
				oldNum.value = Number(oldNum.value) % Number(showBox.value);
				break;
			default:
				break;
		}
	}

	//添加数字
	function addNum(num) {
		if(showBox.value.indexOf(".") >= 1 && num == '.') {
			return;
		}
		if(!equalBtn.isClick) {
			if(showBox.value == '0' && num != '.') {
				showBox.value = '';
			}
			showBox.value += num;
		} else {
			showBox.value = '0';
			if(showBox.value == '0' && num != '.') {
				showBox.value = '';
			}
			showBox.value += num;
		}
		whichBtn =num;
		equalBtn.isClick = 0;
	}

	//键盘事件
	window.onkeydown = function(e) {
		var keynum;
		keynum = window.event ? e.keyCode : e.which;
		if(keynum == 96) {
			addNum('0');
			return;
		}
		if(keynum == 97) {
			addNum('1');
			return;
		}
		if(keynum == 98) {
			addNum('2');
			return;
		}
		if(keynum == 99) {
			addNum('3');
			return;
		}
		if(keynum == 100) {
			addNum('4');
			return;
		}
		if(keynum == 101) {
			addNum('5');
			return;
		}
		if(keynum == 102) {
			addNum('6');
			return;
		}
		if(keynum == 103) {
			addNum('7');
			return;
		}
		if(keynum == 104) {
			addNum('8');
			return;
		}
		if(keynum == 105) {
			addNum('9');
			return;
		}
		if(keynum == 110) {
			addNum('.');
			return;
		}
		if(keynum == 106) {
			ride();
			return;
		}
		if(keynum == 109) {
			minus();
			return;
		}
		if(keynum == 111) {
			divide();
			return;
		}
		if(keynum == 107) {
			add();
			return;
		}
		if(keynum == 13) {
			equal();
			return;
		}
		if(keynum == 8) {
			del();
			return;
		}

	}

}