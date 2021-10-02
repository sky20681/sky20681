var bodystyle = document.body.style;
bodystyle.mozUserSelect = 'none';
bodystyle.webkitUserSelect = 'none';
var img = new Image();
var canvas = document.querySelector('canvas');
canvas.style.backgroundColor = 'transparent';
canvas.style.position = 'absolute';
var imgs = ['https://p.qlogo.cn/zc_icon/0/208ce8d24b0a38597e351198092c2b8516328991818414/0.jpeg', 'https://p.qlogo.cn/zc_icon/0/208ce8d24b0a38597e351198092c2b8516328991818414/0.jpeg'];
var num = Math.floor(Math.random() * 2);
img.src = imgs[num];
img.addEventListener('load', function(e) {
	var ctx;
	var w = img.width,
		h = img.height;
	var offsetX = canvas.offsetLeft,
		offsetY = canvas.offsetTop;
	var mouseDown = false;

	function layer(ctx) {
		ctx.fillStyle = 'gray';
		ctx.fillRect(0, 0, w, h)
	};

	function eventDown(e) {
		e.preventDefault();
		mouseDown = true;
	}

	function eventUp(e) {
		e.preventDefault();
		mouseDown = false;
	}

	function eventMove(e) {
		e.preventDefault();
		if (mouseDown) {
			// changedTouches 最近一次触发该事件的手指信息
			if (e.changedTouches) {
				e = e.changedTouches[e.changedTouches.length - 1];
			}
			var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
			var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
			with(ctx) {
				beginPath();
				arc(x, y, 10, 0, Math.PI * 2);
				fill();
			}
		}
	}
	canvas.width = w;
	canvas.height = h;
	canvas.style.backgroundImage = 'url(' + img.src + ')';
	ctx = canvas.getContext('2d');
	ctx.fillStyle = 'transparent';
	ctx.fillRect(0, 0, w, h);
	layer(ctx);
	ctx.globalCompositeOperation = "destination-out";
	canvas.addEventListener('touchstart', eventDown);
	canvas.addEventListener('touchend', eventUp);
	canvas.addEventListener('touchmove', eventMove);
	canvas.addEventListener('mousedown', eventDown);
	canvas.addEventListener('mouseup', eventUp);
	canvas.addEventListener('mousemove', eventMove);
}, false)