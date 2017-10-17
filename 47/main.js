window.onload = function  () {
	
	//获取元素
	var starGameBtn = document.getElementById("alert").getElementsByTagName('input')[0];
	var qqBox = document.getElementById("qq");
	var box = document.getElementById("box");
	var score = document.getElementById("fraction").getElementsByTagName('p');
	var speel = 10000;//速度
	var loseNum = 0;//失分
	var winNum = 0;//得分

	//开始按钮
	starGameBtn.onclick = function  () {
		dorpQQ ();
		this.disabled = true;
		this.value = '游戏进行中···';
	}
	
	//图片的路径
	var arr = ['1','2','3','4','5','6','7','8','9','10','11','qq'];
	
	//掉落函数
	function dorpQQ () {
		//生成图片
		var num = Math.round(Math.random()*11);
		var randomNum = Math.round(Math.random()*700 +50);
		qqBox.innerHTML = '<img src="img/'+arr[num]+'.png" style="position:absolute;left:'+ randomNum +'px;top:0px"/>';
		var qqFace = qqBox.getElementsByTagName('img')[0];
		
		//向下落的动画
		Mtween(qqFace,400,speel,'top','linear',function  () {
			loseNum++;
			score[1].innerHTML = '失分：'+loseNum +' 分';
			//失败后重置所有数据并停止调用dorpQQ ()函数
			if (loseNum >= 10) {
				alert('游戏结束');
				starGameBtn.disabled = false;
				starGameBtn.value = '开始游戏';
				qqBox.innerHTML = '';
				loseNum = 0;
				winNum = 0;
				speel = 10000;
				score[1].innerHTML = '失分：'+loseNum +' 分';
				score[0].innerHTML = '得分：'+winNum +' 分';
				return;
			}
			shake(box,'top');
			dorpQQ ();
		});
		
		//防止表情多次点击
		qqFace.isClick = true;
		//表情点击事件
		qqFace.onclick = function  () {
			if(!this.isClick)return;
			clearInterval(this.timer);
			this.isClick = false;
			shake(qqFace,'left',function () {
				winNum++;
				score[0].innerHTML = '得分：'+winNum +' 分';
				//每次让速度加快
				speel -= 2000;
				if (speel <= 1500) {
					speel = 1500
				}
				qqFace.isClick = true;
				dorpQQ ();
			})
		}
	}
}