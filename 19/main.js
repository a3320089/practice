window.onload = function () {
	var numBox = document.getElementById("numBox"),
		boxItem = numBox.getElementsByTagName('div');
	
	//左边滚动
	for (var i=0;i<boxItem.length;i++ ) {
		boxItem[i].style.left = 7+i*40+'px';
		boxItem[i].style.top = -40+'px';
		boxItem[i].isScroll = false;
		MouseScroll(boxItem[i],function () {
			if(this.isScroll) return;
			this.isScroll = true;
			var span = this.getElementsByTagName('span');
			var num = Number(span[1].innerHTML.trim());
			if (num >=9) {
				num = -1;
			}
			span[0].innerHTML = num+1;
			Mtween(this,45,200,'top','linear',function () {
				span[1].innerHTML = ++num;
				this.style.top = -40+'px';
				this.isScroll = false;
			})
		},function () {
			if(this.isScroll) return;
			this.isScroll = true;
			var span = this.getElementsByTagName('span');
			var num = Number(span[1].innerHTML.trim());
			if (num <=0) {
				num =10;
			}
			span[2].innerHTML = num-1;
			Mtween(this,-45,200,'top','linear',function () {
				span[1].innerHTML = --num;
				this.style.top = -40+'px';
				this.isScroll = false;
			})
		})
	}
	
	
	var numText = document.getElementById("numText");
	var erText = document.getElementById("erText");
	numText.onkeyup = function () {
		if (isNaN(this.value)) {
			erText.style.display = 'block'
		}else{
			erText.style.display = 'none'
		}
	}
	MouseScroll(numText,function(){
		if (!isNaN(this.value)) {
			var num = Number(this.value);
			this.value = --num;
		}
	},function  () {
		if (!isNaN(this.value)) {
			var num = Number(this.value);
			this.value = ++num;
		}
	})
	
	//滚动函数
	function MouseScroll (obj,down,up) {
		obj.onmousewheel = function (e) {
			var e=e||window.event;
			if (e.wheelDelta<0) {
				down&&down.call(obj,e)
			}
			if (e.wheelDelta>0) {
				up&&up.call(obj,e)
			}
			return false;
		}
		
		obj.addEventListener('DOMMouseScroll',function (e) {
			var e=e||window.event;
			if (e.detail>0) {
				down&&down.call(obj,e)
			}
			if (e.detail<0) {
				up&&up.call(obj,e)
			}
			e.preventDefault();
		},false)
	}
}