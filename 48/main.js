window.onload = function () {
	//获取元素
	var newFile = document.getElementById("newFile"),
		delFile = document.getElementById("delFile"),
		fileBox = document.getElementById("fileBox"),
		num=0;
		
	//新建文件夹
	newFile.onclick = function () {
		num++;
		var file = document.createElement('div');
		file.className = 'file';
		var span = document.createElement('span');
		var img = document.createElement('img');
		var p  = document.createElement('p');
		img.src = 'img/file.png';
		p.innerHTML = num;
		file.appendChild(span);
		file.appendChild(img);
		file.appendChild(p);
		fileBox.appendChild(file);
		span.isclick = false;
		span.onclick = function () {
			if(this.isclick){
				this.className = '';
				this.parentNode.className = 'file';
				this.isclick = false;
			}else{
				this.className = 'cur';
				this.parentNode.className = 'file cur';
				this.isclick = true;
			}
			
		}
	}
	//删除文件夹
	delFile.onclick = function () {
		var span = fileBox.getElementsByTagName('span');
		for (var i = 0;i<span.length;i++) {
			if (span[i].isclick) {
				fileBox.removeChild(span[i].parentNode);
				i--;
			}
		}
	}
	
}