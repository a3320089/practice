function jsonp(json) {

    var setting = {
        url: "",
        data: {},
        callback: '',
        fnName: ("Jquery" + new Date().getTime() + Math.random()).replace(".", ""),
        success: function() {},
        error: function() {}
    }

    for (var attr in json) {
        setting[attr] = json[attr];
    }

    setting.data[json.callback] = setting.fnName;
    window[setting.fnName] = function(data) {
        setting.success(data);
    }
    var arr = [];
    for (var attr in setting.data) {
        arr.push(attr + "=" + setting.data[attr]);
    }
    setting.data = arr.join("&");

    var os = document.createElement("script");
    os.src = setting.url + "?" + setting.data;
    document.getElementsByTagName("head")[0].appendChild(os);
    os.remove();




}