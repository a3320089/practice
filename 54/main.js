window.onload = function() {
	//封装获取?之后的内容的函数
	function searchToJson() {
		var json = {};
		var search = window.location.search;
		search = search.slice(1);
		searchArr = search.split('&');
		for(var i = 0; i < searchArr.length; i++) {
			var arr = searchArr[i].split("=");
			json[arr[0]] = arr[1];
		}
		return json;
	}

	//设置默认的页面
	defalutInfo = 'sociology';
	//获取search后的json
	var searchText = searchToJson();

	//改变默认页面
	if (searchText.type) {
		defalutInfo = searchText.type;
	}
	
	//生成list
	var listBox = document.getElementById("list");
	var list = data.list;
	for (var i=0;i<list.length;i++) {
		if (list[i].type == defalutInfo) {
			var html = '<a href="?type='+ list[i].type +'" class="cur" ><span>'+ list[i].name +'</span><br />'+list[i].type +'</a>';
			
		} else{
			var html = '<a href="?type='+ list[i].type +'" ><span>'+ list[i].name +'</span><br />'+list[i].type +'</a>';
		}
		listBox.innerHTML += html;
	}
	
	//生成右边内容
	var content = document.getElementById("content");
	var contentText = data[defalutInfo];
	//默认当前页码
	var page = 1;
	//一页显示多少个
	var pageIndex = 5;
	//i是从第0条数据开始显示
	var i=0;
	//如果有page
	if (searchText.page) {
		//改变page为search到的page
		page = Number(searchText.page);
		//i从上一页结束位置开始显示
		i = (page-1)*pageIndex;
		//pageIndex为上一页的数量+5
		pageIndex = page*pageIndex;
	}
	for (i;i<pageIndex;i++) {
		if (contentText[i]) {
			//添0操作
			if(contentText[i].id <10) contentText[i].id = '0'+contentText[i].id;
			//页面添加内容
			var html = '<a href="content.html?type='+ defalutInfo +'&num='+ i +'&page='+ page +'"><div class="id">'+contentText[i].id +'</div><div class="textBox"><p>'+ contentText[i].title +'</p><p>岗位要求：'+ contentText[i].content.requirement[0] +'</p></div><div class="time"><p>'+contentText[i].time +'</p><p>查看详情>></p></div></a>';
			content.innerHTML +=html;
		}
		
	}
	
	//生成页码
	//总内容除以5可以分多少页
	var pageNum = Math.ceil(contentText.length/5);
	
	var pageBox = document.getElementById("page");
	//判断是否还有上一页
	if (page-1 !=0) {
		pageBox.innerHTML = '<a href="?type='+ defalutInfo +'&page='+(page-1)+'">&lt;</a>';
	}else{
		pageBox.innerHTML = '<a href="javascript:;" onclick = "'+ "alert('已经第一页了')" +'">&lt;</a>';
	}
	//生成数字页码
	for (var i=0;i<pageNum;i++) {
		if (page == i+1) {
			var html = '<a href="?type='+ defalutInfo +'&page='+(i+1)+'" class="cur">'+ (i+1)+'</a>';
		}else{
			var html = '<a href="?type='+ defalutInfo +'&page='+(i+1)+'" >'+  (i+1) +'</a>';
		}
		pageBox.innerHTML += html;
	}
	//判断是否还有下一页
	if (page != pageNum) {
		pageBox.innerHTML += '<a href="?type='+ defalutInfo +'&page='+(page+1)+'">&gt;</a>';
	}else{
		pageBox.innerHTML += '<a href="javascript:;" onclick = "'+ "alert('已经是最后一页了')" +'">&gt;</a>';
	}
	
}