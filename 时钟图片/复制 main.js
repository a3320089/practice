window.onload = function() {
	function $(name) {
		return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
	}
	var num_box = $(".num_box");
	var timer = 0;

	var date = new Date();
	var m = date.getMinutes();
	var m2 = date.getMinutes();
	var s = date.getSeconds();
	var h = date.getHours();
	var h2 = date.getHours();
	if(s < 10) {
		s = '0' + s;
	}
	if(m < 10) {
		m = '0' + m;
	}
	if(h < 10) {
		h = '0' + h;
	}
	//秒钟
	var sNum2 = String(Number(s.toString().charAt(1)) + 1) == 10 ? '0' : String(Number(s.toString().charAt(1)) + 1);
	num_box[7].getElementsByTagName("img")[0].src = 'img/' + s.toString().charAt(1) + '.jpg';
	num_box[7].getElementsByTagName("img")[1].src = 'img/' + sNum2 + '.jpg';
	var sNum1 = String(Number(s.toString().charAt(0)) + 1) == 6 ? '0' : String(Number(s.toString().charAt(0)) + 1);
	num_box[6].getElementsByTagName("img")[0].src = 'img/' + s.toString().charAt(0) + '.jpg';
	num_box[6].getElementsByTagName("img")[1].src = 'img/' + sNum1 + '.jpg';
	//分钟
	var mNum2 = String(Number(m.toString().charAt(1)) + 1) == 10 ? '0' : String(Number(m.toString().charAt(1)) + 1);
	num_box[4].getElementsByTagName("img")[0].src = 'img/' + m.toString().charAt(1) + '.jpg';
	num_box[4].getElementsByTagName("img")[1].src = 'img/' + mNum2 + '.jpg';
	var mNum1 = String(Number(m.toString().charAt(0)) + 1) == 6 ? '0' : String(Number(m.toString().charAt(0)) + 1);
	num_box[3].getElementsByTagName("img")[0].src = 'img/' + m.toString().charAt(0) + '.jpg';
	num_box[3].getElementsByTagName("img")[1].src = 'img/' + mNum1 + '.jpg';
	//小时
	var hNum2 = String(Number(h.toString().charAt(1)) + 1) == 10 ? '0' : String(Number(h.toString().charAt(1)) + 1);
	num_box[1].getElementsByTagName("img")[0].src = 'img/' + h.toString().charAt(1) + '.jpg';
	num_box[1].getElementsByTagName("img")[1].src = 'img/' + hNum2 + '.jpg';
	var hNum1 = String(Number(h.toString().charAt(0)) + 1) == 2 ? '0' : String(Number(h.toString().charAt(0)) + 1);
	num_box[0].getElementsByTagName("img")[0].src = 'img/' + h.toString().charAt(0) + '.jpg';
	num_box[0].getElementsByTagName("img")[1].src = 'img/' + hNum1 + '.jpg';

	timer = setInterval(function() {
		var date = new Date();
		var m = date.getMinutes();
		var s = date.getSeconds();
		var h = date.getHours();

		if(s < 10) {
			s = '0' + s;
		}
		if(m < 10) {
			m = '0' + m;
		}
		if(h < 10) {
			h = '0' + h;
		}
		//秒钟
		var sNum2 = String(Number(s.toString().charAt(1)) + 1) == 10 ? '0' : String(Number(s.toString().charAt(1)) + 1);

		Mtween(num_box[7], -70, 500, 'margin-top', 'linear', function() {
			num_box[7].getElementsByTagName("img")[0].src = 'img/' + s.toString().charAt(1) + '.jpg';
			num_box[7].style.marginTop = '0px';
			num_box[7].getElementsByTagName("img")[1].src = 'img/' + sNum2 + '.jpg';
		})
		var sNum1 = String(Number(s.toString().charAt(0)) + 1) == 6 ? '0' : String(Number(s.toString().charAt(0)) + 1);
		if(Number(s) % 10 == 0) {
			Mtween(num_box[6], -70, 500, 'margin-top', 'linear', function() {
				num_box[6].getElementsByTagName("img")[0].src = 'img/' + s.toString().charAt(0) + '.jpg';
				num_box[6].style.marginTop = '0px';
				num_box[6].getElementsByTagName("img")[1].src = 'img/' + sNum1 + '.jpg';
			})

		}

		if(m2 != m) {
			//分钟
			var mNum2 = String(Number(m.toString().charAt(1)) + 1) == 10 ? '0' : String(Number(m.toString().charAt(1)) + 1);

			Mtween(num_box[4], -70, 500, 'margin-top', 'linear', function() {
				num_box[4].getElementsByTagName("img")[0].src = 'img/' + m.toString().charAt(1) + '.jpg';
				num_box[4].style.marginTop = '0px';
				num_box[4].getElementsByTagName("img")[1].src = 'img/' + mNum2 + '.jpg';
			})

			if(Number(m) % 10 == 0) {
				var mNum1 = String(Number(m.toString().charAt(0)) + 1) == 6 ? '0' : String(Number(m.toString().charAt(0)) + 1);
				Mtween(num_box[3], -70, 500, 'margin-top', 'linear', function() {
					num_box[3].getElementsByTagName("img")[0].src = 'img/' + m.toString().charAt(0) + '.jpg';
					num_box[3].style.marginTop = '0px';
					num_box[3].getElementsByTagName("img")[1].src = 'img/' + mNum1 + '.jpg';
				})
			}
			m2 = m;
		}

		if(h2 != h) {
			//小时
			var hNum2 = String(Number(h.toString().charAt(1)) + 1) == 10 ? '0' : String(Number(h.toString().charAt(1)) + 1);

			Mtween(num_box[1], -70, 500, 'margin-top', 'linear', function() {
				num_box[1].getElementsByTagName("img")[0].src = 'img/' + h.toString().charAt(1) + '.jpg';
				num_box[1].style.marginTop = '0px';
				num_box[1].getElementsByTagName("img")[1].src = 'img/' + hNum2 + '.jpg';
			})

			var hNum1 = String(Number(h.toString().charAt(0)) + 1) == 2 ? '0' : String(Number(h.toString().charAt(0)) + 1);
			if(Number(h) % 10 == 0) {
				Mtween(num_box[0], -70, 500, 'margin-top', 'linear', function() {
					num_box[0].getElementsByTagName("img")[0].src = 'img/' + h.toString().charAt(0) + '.jpg';
					num_box[0].style.marginTop = '0px';
					num_box[0].getElementsByTagName("img")[1].src = 'img/' + hNum1 + '.jpg';
				})
			}
			h2 = h;
		}
		
		
		
	}, 1000)

}