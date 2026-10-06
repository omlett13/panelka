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

/* ---------- FRAME TIMES (debug: 'perf' button) ----------
   ms per phase over the last 120 frames: PERF.stats = {upd,top,bot,frame} each {avg,max}; frame = time between frames */
const PERF={on:false,n:0,i:0,buf:new Float32Array(120*4),last:0,stats:null};
function perfAdd(u,t,b,now){const o=PERF.i*4;PERF.buf[o]=u;PERF.buf[o+1]=t;PERF.buf[o+2]=b;PERF.buf[o+3]=PERF.last?now-PERF.last:0;PERF.last=now;
  PERF.i=(PERF.i+1)%120;PERF.n=Math.min(120,PERF.n+1);const st=['upd','top','bot','frame'].map(()=>({avg:0,max:0}));
  for(let k=0;k<PERF.n;k++)for(let j=0;j<4;j++){const v=PERF.buf[k*4+j];st[j].avg+=v/PERF.n;if(v>st[j].max)st[j].max=v;}
  PERF.stats={upd:st[0],top:st[1],bot:st[2],frame:st[3]};}
function perfReset(){PERF.n=PERF.i=PERF.last=0;PERF.stats=null;}
function drawPerf(){const s=PERF.stats;if(!s)return;const f=v=>v.toFixed(1).padStart(5);
  tg.save();tg.fillStyle='rgba(0,0,0,.7)';tg.fillRect(W-128,0,128,44);tg.font='9px "PT Mono", monospace';tg.textAlign='left';tg.textBaseline='top';tg.fillStyle=VFD;
  [['    avg   max',null],['upd ',s.upd],['top ',s.top],['bot ',s.bot]].forEach(([l,v],i)=>tg.fillText(v?l+f(v.avg)+' '+f(v.max)+' ms':l+'  '+(1000/(s.frame.avg||16.7)).toFixed(0)+' fps',W-124,2+i*10));tg.restore();}

/* ---------- BOOT ---------- */
function start(data){
  setRes();menuScene();G.state='menu';openPage('main');
  if(data&&data.P&&data.state==='play'){Object.assign(P,data.P);G.time=data.time||0;G.power=!!data.power;G.state='pause';openPage('pause');}
  fit();addEventListener('resize',fit);
  if(document.fonts&&document.fonts.load){document.fonts.load('8px "Press Start 2P"').catch(()=>{});document.fonts.load('44px "Russo One"').catch(()=>{});}
  let last=performance.now();
  function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;
    const t0=performance.now();try{update(dt);}catch(err){loopErr('update',err);}
    const t1=performance.now();try{renderTop();}catch(err){loopErr('renderTop',err);}
    const t2=performance.now();try{renderBottom();}catch(err){loopErr('renderBottom',err);}
    if(PERF.on){perfAdd(t1-t0,t2-t1,performance.now()-t2,now);drawPerf();}
    if(ERR.last)drawErr(now);requestAnimationFrame(loop);}
  requestAnimationFrame(loop);
}
const HOT=window.claude&&window.claude.hot;
try{if(HOT&&HOT.snapshot)HOT.snapshot(()=>({P:{x:P.x,y:P.y,a:P.a,hp:P.hp,armor:P.armor,ammo9:P.ammo9,shells:P.shells,has:P.has.slice(),w:P.w},time:G.time,power:G.power,state:(G.state==='pause'?'play':G.state)}));}catch(e){}
(HOT&&HOT.ready)?HOT.ready(start):start((HOT&&HOT.data)||{});
