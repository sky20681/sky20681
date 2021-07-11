// 夜间模式
//点击按钮后切换模式
function switchNightMode() {
    $('<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>').appendTo($("body")), setTimeout(
        function () {
            var DarkMode = document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") ||
                '0';
            (DarkMode == '0') ? ($("body").addClass("night"), document.cookie = "DarkMode=1;path=/", $('#nightMode').removeClass("fa-moon-o").addClass("fa-lightbulb-o")) : ($("body").removeClass(
                    "night"), document.cookie = "DarkMode=0;path=/", $('#nightMode').removeClass("fa-lightbulb-o").addClass("fa-moon-o")), setTimeout(function () {
                $(".Cuteen_DarkSky").fadeOut(1e3, function () {
                    $(this).remove()
                })
            }, 2e3)
        }), 50
}

//检查当前主题模式和图标是否对应
function checkNightMode() {
    if ($("body").hasClass("night")) {
        $('#nightMode').removeClass("fa-moon-o").addClass("fa-lightbulb-o");
        return;
    }else{
        $('#nightMode').removeClass("fa-lightbulb-o").addClass("fa-moon-o");
        return;
    }
    
    //如果没有切换过，从 cookie 中获取标志位判断
    if (document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        if (new Date().getHours() >= 20 || new Date().getHours() < 6) {
            $("body").addClass("night");
            document.cookie = "DarkMode=1;path=/";
            console.log('夜间模式开启');
            $('#nightMode').removeClass("fa-moon-o").addClass("fa-lightbulb-o");
        } else {
            $("body").removeClass("night");
            document.cookie = "DarkMode=0;path=/";
            console.log('夜间模式关闭');
            $('#nightMode').removeClass("fa-lightbulb-o").addClass("fa-moon-o");
        }
    } else {
        var DarkMode = document.cookie.replace(/(?:(?:^|.*;\s*)DarkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (DarkMode == '0') {
            $("body").removeClass("night");
             $('#nightMode').removeClass("fa-lightbulb-o").addClass("fa-moon-o");
        } else if (DarkMode == '1') {
            $("body").addClass("night");
            $('#nightMode').removeClass("fa-moon-o").addClass("fa-lightbulb-o");
        }
    }
}
checkNightMode();
