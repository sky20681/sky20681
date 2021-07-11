// 鼠标跟随特效
(function(){function t(){i(),a()}function i(){document.addEventListener("mousemove",o),document.addEventListener("touchmove",e),document.addEventListener("touchstart",e),window.addEventListener("resize",n)}function n(t){d=window.innerWidth,window.innerHeight}function e(t){if(t.touches.length>0)for(var i=0;i<t.touches.length;i++)s(t.touches[i].clientX,t.touches[i].clientY,r[Math.floor(Math.random()*r.length)])}function o(t){u.x=t.clientX,u.y=t.clientY,s(u.x,u.y,r[Math.floor(Math.random()*r.length)])}function s(t,i,n){var e=new l;e.init(t,i,n),f.push(e)}function h(){for(var t=0;t<f.length;t++)f[t].update();for(t=f.length-1;t>=0;t--)f[t].lifeSpan<0&&(f[t].die(),f.splice(t,1))}function a(){requestAnimationFrame(a),h()}function l(){this.character="*",this.lifeSpan=120,this.initialStyles={position:"fixed",top:"0",display:"block",pointerEvents:"none","z-index":"10000000",fontSize:"20px","will-change":"transform"},this.init=function(t,i,n){this.velocity={x:(Math.random()<.5?-1:1)*(Math.random()/2),y:1},this.position={x:t-10,y:i-20},this.initialStyles.color=n,console.log(n),this.element=document.createElement("span"),this.element.innerHTML=this.character,c(this.element,this.initialStyles),this.update(),document.body.appendChild(this.element)},this.update=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.lifeSpan--,this.element.style.transform="translate3d("+this.position.x+"px,"+this.position.y+"px,0) scale("+this.lifeSpan/240+")"},this.die=function(){this.element.parentNode.removeChild(this.element)}}function c(t,i){for(var n in i)t.style[n]=i[n]}var r=["#D61C59","#E7D84B","#1B8798"],d=window.innerWidth,u=(window.innerHeight,{x:d/2,y:d/2}),f=[];t()})();

/* 文字闪烁 */
<script>
function magicColor(mode,t){
    t=t||10;
    let elem=document.getElementsByClassName("magic-color");
    if(!elem){
        setTimeout(function(){
            magicColor(mode,t-1);
        },400);
        return;
    }
    if(window.mcHandler==undefined){
        window.mcHandler={elements:[]};
        window.mcHandler.colorIndex=0;
        window.mcHandler.run=function(mode){
            let color=mode=="random"?("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+",1)"):["#CC0000","#9999CC","#CC3366","#669999","#FFCC00","#00CCCC","#CC00CC"][(window.mcHandler.colorIndex++)%7];
            for(var i=0,L=window.mcHandler.elements.length;i<L;i++)window.mcHandler.elements[i].style.color=color;
        }
    }
    window.mcHandler.elements=elem;
    if(window.mcHandler.timer==undefined){
        window.mcHandler.timer=setInterval(()=>{window.mcHandler.run(mode)},500);
    }
}
magicColor(random);//random为随机颜色，否则为固定颜色随机；上方“闪烁（变色）”字样为固定颜色随机
</script>