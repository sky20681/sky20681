$(function () {
    /**
     * 添加文章卡片hover效果.
     */
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();

    /*菜单切换*/
    $('.sidenav').sidenav();

    /* 修复文章卡片 div 的宽度. */
    let fixPostCardWidth = function (srcId, targetId) {
        let srcDiv = $('#' + srcId);
        if (srcDiv.length === 0) {
            return;
        }

        let w = srcDiv.width();
        if (w >= 450) {
            w = w + 21;
        } else if (w >= 350 && w < 450) {
            w = w + 18;
        } else if (w >= 300 && w < 350) {
            w = w + 16;
        } else {
            w = w + 14;
        }
        $('#' + targetId).width(w);
    };

    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function () {
        $('.content').css('min-height', window.innerHeight - 165);
    };

    /**
     * 修复样式.
     */
    let fixStyles = function () {
        fixPostCardWidth('navContainer');
        fixPostCardWidth('artDetail', 'prenext-posts');
        fixFooterPosition();
    };
    fixStyles();

    /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
    $(window).resize(function () {
        fixStyles();
    });

    /*初始化瀑布流布局*/
    $('#articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        $('#articleContent a').attr('target', '_blank');

        $('#articleContent img').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    captionText = title;
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('b');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
    articleInit();

    $('.modal').modal();

    /*回到顶部*/
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    // 当页面处于文章中部的时候刷新页面，因为此时无滚动，所以需要判断位置,给导航加上绿色。
    showOrHideNavBg($(window).scrollTop());
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        showOrHideNavBg(scroll);
    });

    function showOrHideNavBg(position) {
        let showPosition = 100;
        if (position < showPosition) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    }

    	
	$(".nav-menu>li").hover(function(){
		$(this).children('ul').stop(true,true).show();
		 $(this).addClass('nav-show').siblings('li').removeClass('nav-show');
		
	},function(){
		$(this).children('ul').stop(true,true).hide();
		$('.nav-item.nav-show').removeClass('nav-show');
	})
	
    $('.m-nav-item>a').on('click',function(){
            if ($(this).next('ul').css('display') == "none") {
                $('.m-nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(100);
                $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
            }else{
                $(this).next('ul').slideUp(100);
                $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
            }
    });

    // 初始化加载 tooltipped.
    $('.tooltipped').tooltip();
});

$(document).find('img[data-original]').each(function(){
    $(this).parent().attr("href", $(this).attr("data-original"));
});





//控制全屏
function enterfullscreen() { //进入全屏
    
    var docElm = document.documentElement;
    //W3C
    if(docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if(docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if(docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if(elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    $("#fullscreen").removeClass("fa-expand-arrows-alt").addClass("fa-desktop");
}

function exitfullscreen() { //退出全屏
   // $("#fullscreen").html("切换全屏");
    
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    $("#fullscreen").removeClass("fa-desktop").addClass("fa-expand-arrows-alt");
}

let b = false;
$('#fullscreen_li ').on('click', function() {
    b = !b;
    b ? enterfullscreen() : exitfullscreen();
})

//动态背景js

(function($){
	var canvas = $('#bg').children('canvas'),
		background = canvas[0],
		foreground1 = canvas[1],
		foreground2 = canvas[2],
		config = {
			circle: {
				amount: 18,
				layer: 3,
				color: [157, 97, 207],
				alpha: 0.3
			},
			line: {
				amount: 12,
				layer: 3,
				color: [255, 255, 255],
				alpha: 0.3
			},
			speed: 0.5,
			angle: 20
		};

	if (background.getContext){
		var bctx = background.getContext('2d'),
			fctx1 = foreground1.getContext('2d'),
			fctx2 = foreground2.getContext('2d'),
			M = window.Math, // Cached Math
			degree = config.angle/360*M.PI*2,
			circles = [],
			lines = [],
			wWidth, wHeight, timer;
		
		requestAnimationFrame = window.requestAnimationFrame || 
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback, element) { setTimeout(callback, 1000 / 60); };

		cancelAnimationFrame = window.cancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			clearTimeout;

		var setCanvasHeight = function(){
			wWidth = $(window).width();
			wHeight = $(window).height(),

			canvas.each(function(){
				this.width = wWidth;
				this.height = wHeight;
			});
		};

		var drawCircle = function(x, y, radius, color, alpha){
			var gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0);
			gradient.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')');
			gradient.addColorStop(1, 'rgba('+color[0]+','+color[1]+','+color[2]+','+(alpha-0.1)+')');

			fctx1.beginPath();
			fctx1.arc(x, y, radius, 0, M.PI*2, true);
			fctx1.fillStyle = gradient;
			fctx1.fill();
		};

		var drawLine = function(x, y, width, color, alpha){
			var endX = x+M.sin(degree)*width,
				endY = y-M.cos(degree)*width,
				gradient = fctx2.createLinearGradient(x, y, endX, endY);
			gradient.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')');
			gradient.addColorStop(1, 'rgba('+color[0]+','+color[1]+','+color[2]+','+(alpha-0.1)+')');

			fctx2.beginPath();
			fctx2.moveTo(x, y);
			fctx2.lineTo(endX, endY);
			fctx2.lineWidth = 3;
			fctx2.lineCap = 'round';
			fctx2.strokeStyle = gradient;
			fctx2.stroke();
		};

		var drawBack = function(){
			bctx.clearRect(0, 0, wWidth, wHeight);

			var gradient = [];
			
			gradient[0] = bctx.createRadialGradient(wWidth*0.3, wHeight*0.1, 0, wWidth*0.3, wHeight*0.1, wWidth*0.9);
			gradient[0].addColorStop(0, 'rgb(0, 26, 77)');
			gradient[0].addColorStop(1, 'transparent');

			bctx.translate(wWidth, 0);
			bctx.scale(-1,1);
			bctx.beginPath();
			bctx.fillStyle = gradient[0];
			bctx.fillRect(0, 0, wWidth, wHeight);

			gradient[1] = bctx.createRadialGradient(wWidth*0.1, wHeight*0.1, 0, wWidth*0.3, wHeight*0.1, wWidth);
			gradient[1].addColorStop(0, 'rgb(0, 150, 240)');
			gradient[1].addColorStop(0.8, 'transparent');

			bctx.translate(wWidth, 0);
			bctx.scale(-1,1);
			bctx.beginPath();
			bctx.fillStyle = gradient[1];
			bctx.fillRect(0, 0, wWidth, wHeight);

			gradient[2] = bctx.createRadialGradient(wWidth*0.1, wHeight*0.5, 0, wWidth*0.1, wHeight*0.5, wWidth*0.5);
			gradient[2].addColorStop(0, 'rgb(40, 20, 105)');
			gradient[2].addColorStop(1, 'transparent');

			bctx.beginPath();
			bctx.fillStyle = gradient[2];
			bctx.fillRect(0, 0, wWidth, wHeight);
		};

		var animate = function(){
			var sin = M.sin(degree),
				cos = M.cos(degree);

			if (config.circle.amount > 0 && config.circle.layer > 0){
				fctx1.clearRect(0, 0, wWidth, wHeight);
				for (var i=0, len = circles.length; i<len; i++){
					var item = circles[i],
						x = item.x,
						y = item.y,
						radius = item.radius,
						speed = item.speed;

					if (x > wWidth + radius){
						x = -radius;
					} else if (x < -radius){
						x = wWidth + radius
					} else {
						x += sin*speed;
					}

					if (y > wHeight + radius){
						y = -radius;
					} else if (y < -radius){
						y = wHeight + radius;
					} else {
						y -= cos*speed;
					}

					item.x = x;
					item.y = y;
					drawCircle(x, y, radius, item.color, item.alpha);
				}
			}

			if (config.line.amount > 0 && config.line.layer > 0){
				fctx2.clearRect(0, 0, wWidth, wHeight);
				for (var j=0, len = lines.length; j<len; j++){
					var item = lines[j],
						x = item.x,
						y = item.y,
						width = item.width,
						speed = item.speed;

					if (x > wWidth + width * sin){
						x = -width * sin;
					} else if (x < -width * sin){
						x = wWidth + width * sin;
					} else {
						x += sin*speed;
					}

					if (y > wHeight + width * cos){
						y = -width * cos;
					} else if (y < -width * cos){
						y = wHeight + width * cos;
					} else {
						y -= cos*speed;
					}
					
					item.x = x;
					item.y = y;
					drawLine(x, y, width, item.color, item.alpha);
				}
			}

			timer = requestAnimationFrame(animate);
		};

		var createItem = function(){
			circles = [];
			lines = [];

			if (config.circle.amount > 0 && config.circle.layer > 0){
				for (var i=0; i<config.circle.amount/config.circle.layer; i++){
					for (var j=0; j<config.circle.layer; j++){
						circles.push({
							x: M.random() * wWidth,
							y: M.random() * wHeight,
							radius: M.random()*(20+j*5)+(20+j*5),
							color: config.circle.color,
							alpha: M.random()*0.2+(config.circle.alpha-j*0.1),
							speed: config.speed*(1+j*0.5)
						});
					}
				}
			}

			if (config.line.amount > 0 && config.line.layer > 0){
				for (var m=0; m<config.line.amount/config.line.layer; m++){
					for (var n=0; n<config.line.layer; n++){
						lines.push({
							x: M.random() * wWidth,
							y: M.random() * wHeight,
							width: M.random()*(20+n*5)+(20+n*5),
							color: config.line.color,
							alpha: M.random()*0.2+(config.line.alpha-n*0.1),
							speed: config.speed*(1+n*0.5)
						});
					}
				}
			}

			cancelAnimationFrame(timer);
			timer = requestAnimationFrame(animate);
			drawBack();
		};

		$(document).ready(function(){
			setCanvasHeight();
			createItem();
		});
		$(window).resize(function(){
			setCanvasHeight();
			createItem();
		});
	}
})(jQuery);





//魔改
//检查当前主题模式和图标是否对应
function checkNightMode() {
    if (localStorage.getItem('isDark') === '1') {
        $("body").addClass("DarkMode");
        $('#changeMode-top').removeClass("fa-moon").addClass("fa-sun");
        $('#modeicon').attr("xlink:href", "#icon-sun");
    } else if (localStorage.getItem('isDark') === '0') {
        $('#modeicon').attr("xlink:href", "#icon-moon");
    } else if (new Date().getHours() >= 20 || new Date().getHours() < 7) {
        $("body").addClass("DarkMode");
        $('#changeMode-top').removeClass("fa-moon").addClass("fa-sun");
        $('#modeicon').attr("xlink:href", "#icon-sun");
    } else if (matchMedia('(prefers-color-scheme: dark)').matches) {
        $("body").addClass("DarkMode");
        $('#changeMode-top').removeClass("fa-moon").addClass("fa-sun");
        $('#modeicon').attr("xlink:href", "#icon-sun");
    } else {
        $('#modeicon').attr("xlink:href", "#icon-moon");
    }
}
checkNightMode();
$(function() {
    /*菜单切换*/
    $('.sidenav').sidenav();
    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });
    var _hmt = _hmt || [];
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?03ea8f3076b99ecf2b538efbb568c569";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    setTimeout(function() {
        var OriginTitile = document.title;
        var titleTime;
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                $('[rel="shortcut icon"]').attr('href', "https://cdn.vino.run/Vino.ico");
                document.title = '(●—●)喔哟，崩溃啦！';
                clearTimeout(titleTime);
            } else {
                $('[rel="shortcut icon"]').attr('href', "https://cdn.vino.run/Vino.ico");
                document.title = '(/≧▽≦/)咦！又好了！' + OriginTitile;
                titleTime = setTimeout(function() {
                    document.title = OriginTitile;
                }, 2000);
            }
        });
        var starTime = '2020-11-20';
        var endTime = (new Date()).Format("yyyy-MM-dd");

        function datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式
            var dateSpan,
                tempDate,
                iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        };
        var Days = datedifference(starTime, endTime);
        document.getElementById("runningTime").innerHTML = Days + " days";
    }, 100);

    setTimeout(function() {
        var starTime = '2020-11-20';
        var endTime = (new Date()).Format("yyyy-MM-dd");

        function datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式
            var dateSpan,
                tempDate,
                iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        };
        var Days = datedifference(starTime, endTime);
        document.getElementById("runningTime").innerHTML = Days + " days";
    }, 100);
    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function() {
        $('.content').css('min-height', window.innerHeight - 165);
    };
    $('#sliderV').click(function() {
        if ($('#commentArea1').is(':hidden')) {
            $('#commentArea1').fadeIn(400);
        } else {
            $('#commentArea1').fadeOut(400);
        }
        if ($('#commentArea2').is(':hidden')) {
            $('#commentArea2').slideDown(400);
        } else {
            $('#commentArea2').slideUp(400);
        }
    });
    $(".menu-V .toggle").on("click", (function() {
        $(".menu-V").toggleClass("expanded"),
            $(".menu-V a").toggleClass("hidden"),
            $(".menu-V .container-M , .toggle").toggleClass("close")
    }));
    /**
     * 修复样式.
     */
    let fixStyles = function() {
        fixFooterPosition();
    };
    fixStyles();
    /*文章内容详情的一些初始化特性*/
    $('.modal').modal();
    $('#backTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 600);
        return false;
    });
    $('#backTop-V').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 600);
        return false;
    });
    $('#toComment').click(function() {
        let valOfScroll = $('#comment').offset().top - 190;
        //让滚轴从当前位置的scroll在600毫秒内偏移到位置为valOfScroll。
        $("html,body").animate({ scrollTop: valOfScroll }, 600)
    });
    $('#toComment-m').click(function() {
        let valOfScroll = $('#comment').offset().top - 190;
        //让滚轴从当前位置的scroll在600毫秒内偏移到位置为valOfScroll。
        $("html,body").animate({ scrollTop: valOfScroll }, 600)
    });



    //监听滚动条位置
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    // 当页面处于文章中部的时候刷新页面，因为此时无滚动，所以需要判断位置,给导航加上绿色。
    showOrHideNavBg($(window).scrollTop());
    $(window).scroll(function() {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        showOrHideNavBg(scroll);
    });


    function showOrHideNavBg(position) {
        let showPosition = 100;
        if (position < showPosition) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    }
    $(".nav-menu>li").hover(function() {
        $(this).children('ul').stop(true, true).show();
        $(this).addClass('nav-show').siblings('li').removeClass('nav-show');

    }, function() {
        $(this).children('ul').stop(true, true).hide();
        $('.nav-item.nav-show').removeClass('nav-show');
    })

    $('.m-nav-item>a').on('click', function() {
        if ($(this).next('ul').css('display') == "none") {
            $('.m-nav-item').children('ul').slideUp(300);
            $(this).next('ul').slideDown(100);
            $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
        } else {
            $(this).next('ul').slideUp(100);
            $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
        }
    });

    // 初始化加载 tooltipped.
    $('.tooltipped').tooltip();


    Date.prototype.Format = function(fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    L2Dwidget.init({
        "model": {
            jsonPath: "https://cdn.jsdelivr.net/gh/xiazeyu/live2d-widget-models/packages/live2d-widget-model-tororo/assets/tororo.model.json",
            "scale": 1
        },
        "display": {
            "position": "left",
            "width": 150,
            "height": 300,
            "hOffset": 0,
            "vOffset": -20
        },
        "mobile": {
            "show": false,
            "scale": 0.5
        },
        "react": {
            "opacityDefault": 0.85,
            "opacityOnHover": 0.2
        }
    });
});

function switchNightMode() {
    $('<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>').appendTo($("body")), setTimeout(
        function() {
            (!$("body").hasClass("DarkMode")) ? ($("body").addClass("DarkMode"), localStorage.setItem('isDark', '1'), $('#changeMode-top').removeClass("fa-moon").addClass("fa-sun"), $('#modeicon').attr("xlink:href", "#icon-sun")) : ($("body").removeClass(
                "DarkMode"), localStorage.setItem('isDark', '0'), $('#changeMode-top').removeClass("fa-sun").addClass("fa-moon"), $('#modeicon').attr("xlink:href", "#icon-moon")), setTimeout(function() {
                $(".Cuteen_DarkSky").fadeOut(1e3, function() {
                    $(this).remove()
                })
            }, 2e3)
        }), 50
}

function switchNightModeTop() {
    if ($("body").hasClass("DarkMode")) {
        $("body").removeClass("DarkMode");
        localStorage.setItem('isDark', '0');
        $('#changeMode-top').removeClass("fa-sun").addClass("fa-moon");
        $('#modeicon').attr("xlink:href", "#icon-moon");
    } else {
        $("body").addClass("DarkMode");
        localStorage.setItem('isDark', '1');
        $('#changeMode-top').removeClass("fa-moon").addClass("fa-sun");
        $('#modeicon').attr("xlink:href", "#icon-sun");
    }
}


//粒子背景
