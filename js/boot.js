'use strict';
/* ---------- LAYOUT ---------- */
function fit(){let u=Math.min((innerWidth-32)/480,(innerHeight-24)/604);u=Math.max(.5,Math.min(2.4,u));document.documentElement.style.setProperty('--u',u+'px');}

/* ---------- LOOP ERRORS ---------- */
/* each distinct error is logged once (then a repeat count every ~10 s) and shown on the top screen;
   the first update error pauses play so state doesn't keep drifting */
const ERR={seen:new Map(),last:null};
function loopErr(phase,err){const msg=String(err&&err.message||err),key=phase+'|'+msg+'|'+String(err&&err.stack||'').split('\n')[1];
  const n=(ERR.seen.get(key)||0)+1;ERR.seen.set(key,n);ERR.last={phase,msg,n,at:performance.now()};
  if(n===1){console.error('['+phase+']',err);if(phase==='update')try{pauseGame();}catch(e){}}
  else if(n%600===0)console.error('['+phase+'] same error repeated '+n+'x: '+msg);}
function drawErr(now){const e=ERR.last;if(now-e.at>8000){ERR.last=null;return;}
  try{const s='ОШИБКА ['+e.phase+'] '+e.msg+(e.n>1?' ×'+e.n:'');tg.save();tg.fillStyle='rgba(20,0,0,.85)';tg.fillRect(0,H-14,W,14);
    tg.font='9px "PT Mono", monospace';tg.textAlign='left';tg.textBaseline='middle';tg.fillStyle=DANGER;tg.fillText(s.length>70?s.slice(0,69)+'…':s,4,H-7);tg.restore();}catch(x){}}

/* ---------- BOOT ---------- */
function start(data){
  setRes();menuScene();G.state='menu';openPage('main');
  if(data&&data.P&&data.state==='play'){Object.assign(P,data.P);G.time=data.time||0;G.power=!!data.power;G.state='pause';openPage('pause');}
  fit();addEventListener('resize',fit);
  if(document.fonts&&document.fonts.load){document.fonts.load('8px "Press Start 2P"').catch(()=>{});document.fonts.load('44px "Russo One"').catch(()=>{});}
  let last=performance.now();
  function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;
    try{update(dt);}catch(err){loopErr('update',err);}
    try{renderTop();}catch(err){loopErr('renderTop',err);}
    try{renderBottom();}catch(err){loopErr('renderBottom',err);}
    if(ERR.last)drawErr(now);requestAnimationFrame(loop);}
  requestAnimationFrame(loop);
}
const HOT=window.claude&&window.claude.hot;
try{if(HOT&&HOT.snapshot)HOT.snapshot(()=>({P:{x:P.x,y:P.y,a:P.a,hp:P.hp,armor:P.armor,ammo9:P.ammo9,shells:P.shells,has:P.has.slice(),w:P.w},time:G.time,power:G.power,state:(G.state==='pause'?'play':G.state)}));}catch(e){}
(HOT&&HOT.ready)?HOT.ready(start):start((HOT&&HOT.data)||{});
