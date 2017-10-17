//获取元素
var minusBtn = document.querySelectorAll('.minus'), //获取所有减号
	addBtn = document.querySelectorAll('.add'), //获取所有加号
	comNum = document.querySelectorAll(".comNum"), //获取显示商品的数量框
	priceSum = document.querySelectorAll(".sum"), //获取显示单个商品价格总数的元素
	allSum = document.querySelector("#allSum"), //获取显示购买商品的总数的元素
	allMoneyBox = document.querySelector("#allMoney"), //获取显示所有商品的总价的元素
	maxExpensive = document.querySelector('#maxExpensive'), //获取显示最贵单价的元素
	allCommodityNum = 0, //用来计算购买商品的总数的元素
	allMoneySum = 0, //用来计算购买商品总价的元素
	priceArr = [12.5, 10.5, 8.5, 8, 14.5]; //存放每个商品的单价

//添加自定义属性
for(var i = 0; i < addBtn.length; i++) {
	addBtn[i].index = i; //自定义减号的索引值，即表明点击的是第几个减号
	minusBtn[i].index = i; //自定义加号的索引值，即表明点击的是第几个加号
	addBtn[i].method = 1; //自定义变量，加号的话为1，可以表明元素是加号还是减号
	minusBtn[i].method = 0; ////自定义变量，减号的话为0，可以表明元素是加号还是减号
	minusBtn[i].onclick = function  () { //给减号添加点击事件
		countNum(this.index,this.method);//调用函数并传参数
	}
	addBtn[i].onclick = function  () { //给加号添加点击事件
		countNum(this.index,this.method);//调用函数并传参数
	}
	
}
function countNum(index, method) { //创建命名函数，创两个参数，index获取是点击的哪个商品，即加减号的index。method用来判断点击的是减号还是加号
	var conNumVal = parseInt(comNum[index].value); //每次点击都获取当前商品的个数
	
	//减法运算
	if(method == 0 && conNumVal > 0) { //如果method==0，即点击减号的时候，且当前商品个数大于0
		conNumVal--; //当前商品个数减1
		comNum[index].value = conNumVal; //改变当前商品数量，即conNumVal变量
		//计算当前商品总价
		priceSum[index].innerHTML = conNumVal * priceArr[index]; //当前商品总价等于conNumVal(当前商品数量)乘以priceArr[index]（对应位置的单价）
		//总价
		allMoneySum -= priceArr[index]; //计算商品总价，商品总价减等于priceArr[index]（对应位置的单价）
		allMoneyBox.value = allMoneySum; //给改变商品总价元素的值，即allMoneySum变量
		//总商品数量
		allCommodityNum--; //用来计算购买商品的总数的元素，减1
		allSum.value = allCommodityNum; //商品总数量等于allCommodityNum变量（allCommodityNum用来存放商品总数）

	} else if(method == 0 && conNumVal == 0) { //判断当前商品数量为0时，再点击弹出提示框
		alert("都没了你还减！！");
	}
	
	//加法运算
	if(method == 1) {
		//计算当前商品的总数
		conNumVal++; //当前商品个数加1
		comNum[index].value = conNumVal; //改变当前商品数量，即conNumVal变量
		//计算当前商品总价
		priceSum[index].innerHTML = conNumVal * priceArr[index]; //当前商品总价等于conNumVal(当前商品数量)乘以priceArr[index]（对应位置的单价）
		//总价
		allMoneySum += priceArr[index]; //计算商品总价，商品总价加等于priceArr[index]（对应位置的单价）
		allMoneyBox.value = allMoneySum; //给改变商品总价元素的值，即allMoneySum变量
		//总商品数量
		allCommodityNum++; //用来计算购买商品的总数的元素，加1
		allSum.value = allCommodityNum; //商品总数量等于allCommodityNum变量（allCommodityNum用来存放商品总数）
	}
	
	//最贵单价
	var maxPrice = 0; //创建变量存放最贵单价
	for(var i = 0; i < addBtn.length; i++) {
		var conNumVal = parseInt(comNum[i].value); //每次点击都获取当前商品的个数
		conNumVal > 0 && priceArr[i] > maxPrice?maxPrice = priceArr[i]:'';
	}
	maxExpensive.value = maxPrice; //改变最大单价元素的值
	allCommodityNum == 0?maxExpensive.value = '0':'';
}