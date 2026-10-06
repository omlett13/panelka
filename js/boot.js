'use strict';
/* ---------- LAYOUT ---------- */
function fit(){let u=Math.min((innerWidth-32)/480,(innerHeight-24)/604);u=Math.max(.5,Math.min(2.4,u));document.documentElement.style.setProperty('--u',u+'px');}

/* ---------- BOOT ---------- */
function start(data){
  setRes();menuScene();G.state='menu';openPage('main');
  if(data&&data.P&&data.state==='play'){Object.assign(P,data.P);G.time=data.time||0;G.power=!!data.power;G.state='pause';openPage('pause');}
  fit();addEventListener('resize',fit);
  if(document.fonts&&document.fonts.load){document.fonts.load('8px "Press Start 2P"').catch(()=>{});document.fonts.load('44px "Russo One"').catch(()=>{});}
  let last=performance.now();
  function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;try{update(dt);renderTop();renderBottom();}catch(err){console.error(err);}requestAnimationFrame(loop);}
  requestAnimationFrame(loop);
}
const HOT=window.claude&&window.claude.hot;
try{if(HOT&&HOT.snapshot)HOT.snapshot(()=>({P:{x:P.x,y:P.y,a:P.a,hp:P.hp,armor:P.armor,ammo9:P.ammo9,shells:P.shells,has:P.has.slice(),w:P.w},time:G.time,power:G.power,state:(G.state==='pause'?'play':G.state)}));}catch(e){}
(HOT&&HOT.ready)?HOT.ready(start):start((HOT&&HOT.data)||{});
