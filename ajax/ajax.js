function ajax(json) {
    var setting = {
        url: '',
        method: 'get',
        data: {},
        dataType: 'string',
        success: function() {},
        error: function() {}
    }

    if (json) {
        for (var attr in json) {
            setting[attr] = json[attr];
        }
        var arr = [];
        for (var attr in setting.data) {
            arr.push(attr + '=' + setting.data[attr]);
        }
        arr.join("&");
    }
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {
        xhr = new ActiveXObject("Mircosoft.XMLHTTP");
    }


    if (setting.method == 'get') {
        xhr.open(setting.method, setting.url + '?' + arr, true);
        xhr.send();
    } else {
        xhr.open(setting.method, setting.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(arr);
    }

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status <= 207 || xhr.status == 304) {
                console.log(xhr.responseText)
                if (setting.dataType == "json") {
                    setting.success(JSON.parse(xhr.responseText));
                } else if (setting.dataType == "xml") {
                    setting.success(xhr.responseXML);
                } else if (setting.dataType == "string") {
                    setting.success(xhr.responseText);
                } else {
                    alert("请检查配置参数")
                }
            } else {
                setting.error("error:" + xhr.status);
            }
        }


    };

}