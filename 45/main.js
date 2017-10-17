window.onload = function() {
	var box = document.getElementById("box");

	var data = menuData;
	creatDom(data, box);

	function creatDom(data, container) {
		var ul = document.createElement('ul');
		for(var i = 0; i < data.length; i++) {
			var li = document.createElement('li');
			var h2 = document.createElement('h2');
			li.appendChild(h2)
			ul.appendChild(li);
			if(data[i].children && data[i].children.length>0) {
				var span = document.createElement('span');
				span.innerHTML = '+';
				h2.appendChild(span);
				creatDom(data[i].children, li)
			}
			h2.innerHTML += data[i].name;
		}
		container.appendChild(ul);
	}

	var menuList = box.children[0];
	tabMenuList(menuList);

	function tabMenuList(list) {
		var menuList = list.children;
		for(var i = 0; i < menuList.length; i++) {
			var h2Btn = menuList[i].children[0];
			h2Btn.onclick = function() {
				var sibling = this.nextElementSibling;
				var span = this.firstElementChild;
				var allchildren = this.parentNode.parentNode.querySelectorAll('ul');
				if(sibling) {
					if(sibling.className != 'active') {
						for(var i = 0; i < allchildren.length; i++) {
							allchildren[i].className = '';
							allchildren[i].previousElementSibling.firstElementChild.innerHTML = '+';
						}
						tabMenuList(sibling);
						sibling.className = 'active';
						span.innerHTML = '-';
					} else {
						sibling.className = '';
						span.innerHTML = '+';
					}
				}
			}
		}
	}

}