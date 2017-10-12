window.onload = function () {
	
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
	
	var searchJson = searchToJson();
	var num = Number(searchJson.num);
	//获取元素
	var Contentbox = document.getElementById("Contentbox");
	var dives = Contentbox.getElementsByTagName('div');
	
	//标题
	dives[0].innerHTML = data[searchJson.type][num].title;
	
	//信息
	var n = 0;
	var mesSpan = dives[1].getElementsByTagName('span');
	for (var attr in data[searchJson.type][num].content) {
		if (n>4) {
			break;
		}
		mesSpan[n].innerHTML = data[searchJson.type][num].content[attr];
		n++;
	}
	
	//时间
	mesSpan[5].innerHTML = data[searchJson.type][num].time;
	
	//岗位需求
	var requirement =  data[searchJson.type][num].content.requirement;

	for(var i=0,len=requirement.length;i<len;i++){
		var html = "<p>"+ requirement[i] +"</p>";
		dives[2].innerHTML += html;
	}
	
	//工作职责
	var duty =  data[searchJson.type][num].content.duty;
	for(var i=0,len=duty.length;i<len;i++){
		var html = "<p>"+ duty[i] +"</p>";
		dives[3].innerHTML += html;
	}
	
	//返回列表
	var back = document.getElementById("back");
	back.href = "index.html?type="+ searchJson.type +"&page="+ searchJson.page +"";
}