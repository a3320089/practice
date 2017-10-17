window.onload = function() {
	var liBox = document.getElementById("liBox"),
		lies = liBox.getElementsByTagName('li'),
		onoff = true;


	for(var i = 0; i < lies.length; i++) {
		//初始化top值
		lies[i].style.top = i * 65 + 'px';
		//获取每个li下的a标签并添加事件
		var a = lies[i].getElementsByTagName('a');
		//上移事件
		a[1].onclick = function() {
			if(!onoff)return;
			onoff = false;
			//存一下父级元素
			var parent = this.parentNode;
			//判断有没有上一个同级元素
			if(parent.previousElementSibling) {
				//当前元素向上移，即top值减-65
				Mtween(parent, -65, 300, 'top', 'linear', function() {
					//动画结束后调换两个元素的位置
					liBox.insertBefore(parent, parent.previousElementSibling)
					onoff = true;
				});
				//上一个同级元素向下移，即top值加65
				Mtween(parent.previousElementSibling, 65, 300, 'top', 'linear');
			}else{
				//当点击的元素位于第一位的时候
				//当前元素向下移65*li数量-1个高度
				Mtween(parent, 65 * (lies.length-1), 300, 'top', 'linear', function() {
					//将当前元素调到最后一位
					liBox.appendChild(parent);
					onoff = true;
				});
				//其他元素向上移65px
				for (var i = 0;i<lies.length;i++) {
					if (parent != lies[i]) {
						Mtween(lies[i],-65,300,'top','linear');
					}
					
				}
			}
		}
		//下移事件
		a[0].onclick =function () {
			if(!onoff)return;
			onoff = false;
			var parent = this.parentNode;
			//判断是否有下一个同级元素
			if (parent.nextElementSibling) {
				//当前元素向下移动65px
				Mtween(parent,65,300,'top','linear',function () {
					//动画完成后调换两个元素的位置
					liBox.insertBefore(parent, parent.nextElementSibling.nextElementSibling);
					onoff = true;
				});
				//下一个同级元素向上移动65px
				Mtween(parent.nextElementSibling,-65,300,'top','linear');
			}else{
				//当点击的元素位于最后一位的时候
				//存一下第一个元素
				var first = liBox.firstElementChild;
				//当前元素向上移65*li数量-1个高度
				Mtween(parent,-65 * (lies.length-1),300,'top','linear',function () {
					//当前元素调到第一位
					liBox.insertBefore(parent,liBox.children[0])
					onoff = true;
				});
				//其他元素向下移65px
				for (var i = 0;i<lies.length;i++) {
					if (parent != lies[i]) {
						Mtween(lies[i],65,300,'top','linear');
					}
					
				}
				
			}
		}
	}

}