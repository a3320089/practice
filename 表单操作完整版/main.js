window.onload = function() {
	//初始化数据
	var aData = [{
		'id': 1,
		'name': 'leo',
		'age': 32,
		'sex': '男',
	}, {
		'id': 2,
		'name': 'lucy',
		'age': 25,
		'sex': '女',
	}, {
		'id': 3,
		'name': '莫涛',
		'age': 26,
		'sex': '男',
	}, {
		'id': 4,
		'name': '雷军',
		'age': 40,
		'sex': '男',
	}];

	//模拟选项
	var sexBox = document.getElementById("sex"),
		sexoptionBox = document.getElementById("sexoption"),
		sexOption = sexoptionBox.getElementsByTagName('span');

	//判断是否显示
	sexoptionBox.isShow = false;
	//判断是否点击，处理重复点击
	sexBox.isClick = false;
	//点击后显示
	sexBox.onclick = function() {
		if(sex.isClick) return;
		sex.isClick = true;
		if(sexoptionBox.isShow) {
			Mtween(sexoptionBox, -28, 200, 'height', 'linear', function() {
				sexBox.isClick = false;
			});
			sexoptionBox.isShow = false;
		} else {
			Mtween(sexoptionBox, 28, 200, 'height', 'linear', function() {
				sexBox.isClick = false;
			});
			sexoptionBox.isShow = true;
		}
	}
	//选择性别处理
	for(var i = 0; i < sexOption.length; i++) {
		sexOption[i].onclick = function() {
			sex.isClick = true;
			sexBox.children[0].innerHTML = this.innerHTML;
			Mtween(sexoptionBox, -28, 200, 'height', 'linear', function() {
				sexBox.isClick = false;
			});
			sexoptionBox.isShow = false;
		}
	}

	//根据数据生成表格
	var tableBox = document.getElementById("tableBox"),
		tBody = tableBox.tBodies[0],
		num = 0,
		id = 0;

	for(var i = 0; i < aData.length; i++) {
		id++;
		//添加选中框
		var tr = document.createElement('tr');
		tr.appendChild(creatCheck());

		//添加数据
		for(var attr in aData[i]) {
			tr.appendChild(creatMes(aData[i][attr]));
		}
		//添加操作图片
		tr.appendChild(creatImg());

		//添加进tBody
		tBody.appendChild(tr);
	}

	//添加内容
	var add = document.getElementById("add");
	add.onclick = function() {
		var name = document.getElementById("name"),
			age = document.getElementById("age"),
			sex = document.getElementById("sex");
		//验证名字，正则练习
		var nameReg = /(^[\u4e00-\u9fa5]{2,4}$)|(^[a-zA-Z]+$)/;
		if(!nameReg.test(name.value)) {
			alert('请输入正确的中文名字或者英文名字');
			return;
		}
		if(age.value == "") {
			alert('请输入年龄');
			return;
		}
		//验证年龄，正则练习
		var re = /^[0-9]{1,2}$/;
		if (!re.test(age.value)) {
			alert('请输入0-99纯数字的年龄');
			return;
		}
		if(sex.children[0].innerHTML == '请选择性别') {
			alert('请选择性别');
			return;
		}
		
		//id加一位
		id++;
		//添加选中框
		var tr = document.createElement('tr');
		tr.appendChild(creatCheck());
		
		//添加内容
		var arr = [id,name.value,age.value,sex.children[0].innerHTML]
		for (var i = 0;i<arr.length;i++) {
			tr.appendChild(creatMes(arr[i]));
		}
		
		//添加操作图片
		tr.appendChild(creatImg());
		
		//添加进tBody
		tBody.appendChild(tr);
		//重置输入框内容
		sex.children[0].innerHTML = '请选择性别';
		name.value = '';
		age.value = '';
		//添加后是否全选
		checkAll()
	}

	//添加内容
	function creatMes(str) {
		var td = document.createElement('td');
		td.innerHTML = str;
		return td;
	}

	//创建选中框函数
	function creatCheck() {
		var td = document.createElement('td'),
			span = document.createElement('span');
		span.className = 'check';
		td.appendChild(span);
		span.ischeck = false;
		span.onclick = function() {
			if(this.ischeck) {
				this.className = 'check';
				this.ischeck = false;
				num--;
			} else {
				this.className += ' cur';
				this.ischeck = true;
				num++;
			}
			//检查是否全选
			checkAll()
		}
		return td;
	}

	//添加图片函数
	function creatImg() {
		var td = document.createElement('td');
		var up = document.createElement('img');
		up.src = 'img/up.png';
		var down = document.createElement('img');
		down.src = 'img/down.png';
		var del = document.createElement('img');
		del.src = 'img/del.png';
		td.appendChild(up);
		td.appendChild(down);
		td.appendChild(del);
		//上移操作
		up.onclick = function() {
			var parent = this.parentNode.parentNode;
			if(parent.previousElementSibling) {
				tBody.insertBefore(parent, parent.previousElementSibling)
			} else {
				alert('已经是第一个元素了');
			}
		}
		//下移操作
		down.onclick = function() {
			var parent = this.parentNode.parentNode;
			if(parent.nextElementSibling) {
				tBody.insertBefore(parent, parent.nextElementSibling.nextElementSibling)
			} else {
				alert('已经是最后一个元素了');
			}
		}
		//删除操作
		del.onclick = function() {
			var parent = this.parentNode.parentNode;
			if (parent.cells[0].children[0].ischeck) {
				num--;
			}
			tBody.removeChild(parent);
			//检查删除后是否全选
			checkAll();
		}
		return td;
	}

	//全选
	var allCheck = document.getElementById("allCheck");
	
	allCheck.onclick = function () {
		var checkBox = tBody.getElementsByTagName('span');
		//判断是否已经全选
		if (num>=checkBox.length) {
			for(var i=0;i<checkBox.length;i++){
				checkBox[i].className = 'check';
				checkBox[i].ischeck = false;
				num = 0;
			}
			this.className = '';
		}else{
			for(var i=0;i<checkBox.length;i++){
				checkBox[i].className = 'check cur';
				checkBox[i].ischeck = true;
				num = checkBox.length;
			}
			this.className = 'cur';
		}
	}

	//检查全选
	function checkAll() {
		var checkBox = tBody.getElementsByTagName('span');
		if(num >= checkBox.length) {
			allCheck.className = 'cur';
		} else {
			allCheck.className = '';
		}
		if (num <=0) {
			allCheck.className = '';
		}
	}
	
	//批量删除
	var alldel = document.getElementById("alldel");
	alldel.onclick = function () {
		var checkBox = tBody.getElementsByTagName('span');
		for(var i = 0;i<checkBox.length;i++){
			//如果选中框为选中则删除
			if (checkBox[i].ischeck) {
				tBody.removeChild(checkBox[i].parentNode.parentNode);
				num--;
				i--;
			}
		}
		//检查删除后是否全选
		checkAll()
	}
}