window.onload = function() {
	var numBox = document.getElementsByClassName("num_box"),
		timer = 0,
		old = getTime(),
		clone = document.getElementsByClassName('clone');

	for(var i = 0; i < numBox.length; i++) {
		numBox[i].getElementsByTagName('img')[0].src = 'img/' + getTime()[i] + '.jpg';
	}

	function getTime() {
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();

		var time = totwo(h) + totwo(m) + totwo(s);
		return time;
	}

	function totwo(n) {
		return n < 10 ? '0' + n : n + '';
	}
	timer = setInterval(function() {
		for(var i = 0; i < clone.length; i++) {
			clone[i].getElementsByTagName('img')[0].src = 'img/b.jpg';
		}
		setTimeout(function() {
			for(var i = 0; i < clone.length; i++) {
				clone[i].getElementsByTagName('img')[0].src = 'img/c.jpg';
			}
		}, 500)
		var time = getTime();
		for(var i = 0; i < numBox.length; i++) {
			if(old[i] !== time[i]) {
				numBox[i].getElementsByTagName('img')[1].src = 'img/' + time[i] + '.jpg';
				slide(i, time);
			}
		}
		old = time;
	}, 1000);

	function slide(n, time) {
		Mtween(numBox[n], -70, 400, 'margin-top', 'linear', function() {
			numBox[n].getElementsByTagName('img')[0].src = 'img/' + time[n] + '.jpg';
			numBox[n].style.marginTop = '0px';
		})
	}

}