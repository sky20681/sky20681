
window.onload=()=>{
    let i=0;//定义获取词语下标
    let body=document.getElementsByTagName("body")[0];
    body.onclick=function(e){//点击body时触发事件
        const a=["富强","民主", "文明", "和谐","自由", "平等", "公正","法治", "爱国", "敬业","诚信", "友善"];//需要显示的词语
        let span=document.createElement("span");//创建span标签
        span.innerText=a[(i++)%a.length];//设置词语给span标签
        let x = e.pageX;//获取x指针坐标
        let y = e.pageY;//获取y指针坐标
        span.style.cssText="z-index:999999999999999999999999;top:"+(y - 20)+"px;left:"+x+"px;position:absolute;font-weight:bold;color:#e86e14;";//在鼠标的指针的位置给span标签添加css样式
        body.appendChild(span);//在body添加这个span标签
        animate(span, {"top" : y - 180,"opacity" : 0}, 15, 0.01, function(){
		    body.removeChild(span);//时间到了自动删除
		})
    }
    //animate函数执行 CSS 属性集的自定义动画。
    function animate(obj, json, interval, sp, fn) {
        clearInterval(obj.timer);
        function getStyle(obj, arr) {
            if(obj.currentStyle){
                return obj.currentStyle[arr];//针对ie
            } else {
                return document.defaultView.getComputedStyle(obj, null)[arr].replace(/px/g,"");
            }
        }
        obj.timer = setInterval(function(){
            var flag = true;
            for(var arr in json) {
                var icur = 0;
                if(arr == "opacity") {
                    icur = Math.round(parseFloat(getStyle(obj, arr))*100);
                } else {
                    icur = parseInt(getStyle(obj, arr));
                }
                var speed = (json[arr] - icur) * sp;
                speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
                if(icur != json[arr]){
                    flag = false;
                }
                if(arr == "opacity"){
                    obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                    obj.style.opacity = (icur + speed)/100;
                }else {
                    obj.style[arr] = icur + speed + "px";
                }
            }

            if(flag){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        },interval);
    }
}