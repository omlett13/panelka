'use strict';
/* ---------- ЩИТОК (breaker puzzle) and the shed keypad ----------
   Breaker: each switch flips its own lamp and both neighbours. All lamps green = power.
   Keypad: three digits, sprayed on brick around the yard as №1 №2 №3. */
function BN(){return G.brk?G.brk.n:5;}
function openBreaker(){const n=G.level===6?7:5,lamps=new Array(n).fill(1);let tries=0;
  do{lamps.fill(1);const picks=new Set();while(picks.size<(n===7?4:3))picks.add((Math.random()*n)|0);for(const i of picks)brkFlip(lamps,i);tries++;}while(lamps.every(v=>v)&&tries<20);
  G.brk={n,lamps,lev:new Array(n).fill(0),sel:0,done:false,doneT:0,navT:0};G.state='breaker';keys.clear();mouseFire=false;exitLock();sfx.latch();}
function brkFlip(l,i){for(const j of [i-1,i,i+1])if(j>=0&&j<l.length)l[j]^=1;}
function brkPress(i){const b=G.brk;if(!b||b.done)return;b.sel=i;brkFlip(b.lamps,i);b.lev[i]^=1;sfx.clunk();
  if(b.lamps.every(v=>v)){b.done=true;G.power=true;sfx.ding();msg('ЩИТОК: ТОК ЕСТЬ');}}
function openKeypad(i){G.kp={door:i,entry:'',err:0,ok:false,okT:0,sel:0,navT:0};G.state='keypad';keys.clear();mouseFire=false;exitLock();sfx.latch();}
const KP_KEYS=['1','2','3','4','5','6','7','8','9','<','0','X'];
function kpPress(ch){const p=G.kp;if(!p||p.ok)return;
  if(ch==='X'){closePuzzle();return;}
  if(ch==='<'){if(p.entry.length)p.entry=p.entry.slice(0,-1);sfx.tick();return;}
  if(p.entry.length>=3)return;p.entry+=ch;sfx.tick();
  if(p.entry.length===3){if(p.entry===G.code.join('')){p.ok=true;G.codeOK=true;doorTarget[p.door]=1;doorTimer[p.door]=-999;sfx.ding();sfx.door();msg('ЗАМОК ОТКРЫТ');}
    else{p.err=.6;sfx.click();G.shake=.2;}}}
function closePuzzle(){G.state='play';G.brk=null;G.kp=null;keys.clear();sfx.latch();}
function puzzleKey(k){
  if(G.state==='breaker'){const b=G.brk;
    if(k==='Escape'||k==='Backspace'||k==='Tab'){closePuzzle();return;}
    if(k==='ArrowLeft'||k==='KeyA')b.sel=(b.sel+BN()-1)%BN();else if(k==='ArrowRight'||k==='KeyD')b.sel=(b.sel+1)%BN();
    else if(k==='Enter'||k==='Space'||k==='KeyE')brkPress(b.sel);else if(/^Digit[1-7]$/.test(k)&&+k.slice(5)<=BN())brkPress(+k.slice(5)-1);return;}
  const p=G.kp;
  if(k==='Escape'||k==='Tab'){closePuzzle();return;}
  if(k==='Backspace'){if(p.entry.length)kpPress('<');else closePuzzle();return;}
  const m=/^(?:Digit|Numpad)(\d)$/.exec(k);if(m){kpPress(m[1]);return;}
  if(k==='ArrowLeft'||k==='KeyA')p.sel=(p.sel+11)%12;else if(k==='ArrowRight'||k==='KeyD')p.sel=(p.sel+1)%12;
  else if(k==='ArrowUp'||k==='KeyW')p.sel=(p.sel+9)%12;else if(k==='ArrowDown'||k==='KeyS')p.sel=(p.sel+3)%12;
  else if(k==='Enter'||k==='Space'||k==='KeyE')kpPress(KP_KEYS[p.sel]);}
function puzzleBtn(id){if(id==='B'||id==='START'){closePuzzle();return;}
  if(G.state==='breaker'){const b=G.brk;if(id==='A')brkPress(b.sel);else if(id==='L')b.sel=(b.sel+BN()-1)%BN();else if(id==='R')b.sel=(b.sel+1)%BN();return;}
  const p=G.kp;if(id==='A')kpPress(KP_KEYS[p.sel]);else if(id==='L')p.sel=(p.sel+11)%12;else if(id==='R')p.sel=(p.sel+1)%12;else if(id==='X')p.sel=(p.sel+9)%12;else if(id==='Y')p.sel=(p.sel+3)%12;}
function brkRect(i){const s=292/BN();return {x:14+i*s,y:52,w:s-8,h:112};}
const PZBACK={x:110,y:206,w:100,h:24};
function kpRect(i){return {x:70+(i%3)*62,y:22+((i/3)|0)*46,w:56,h:40};}
function puzzleTouch(p){if(inR(p,PZBACK)){closePuzzle();return;}
  if(G.state==='breaker'){for(let i=0;i<BN();i++)if(inR(p,brkRect(i))){brkPress(i);return;}return;}
  for(let i=0;i<12;i++)if(inR(p,kpRect(i))){G.kp.sel=i;kpPress(KP_KEYS[i]);return;}}
function updatePuzzle(dt){
  const o=G.brk||G.kp;if(!o)return;o.navT-=dt;
  if(o.navT<=0&&Math.abs(pad.x)>.6){o.navT=.25;puzzleKey(pad.x<0?'ArrowLeft':'ArrowRight');}
  else if(o.navT<=0&&G.kp&&Math.abs(pad.y)>.6){o.navT=.25;puzzleKey(pad.y<0?'ArrowUp':'ArrowDown');}
  if(G.brk&&G.brk.done){G.brk.doneT+=dt;if(G.brk.doneT>1.1)closePuzzle();}
  if(G.kp){if(G.kp.err>0){G.kp.err-=dt;if(G.kp.err<=0)G.kp.entry='';}if(G.kp.ok){G.kp.okT+=dt;if(G.kp.okT>.8){const w=G.level===6;closePuzzle();if(w){sfx.door();transition(()=>{enterLevel(7);msg('КРЫША');},.5);}}}}}
function drawBreakerTop(g){const b=G.brk;g.fillStyle='rgba(6,8,10,.72)';g.fillRect(0,0,W,H);
  R(g,'#1a1d1c',58,14,284,212);R(g,'#5a605c',60,16,280,208);R(g,'#6e7470',60,16,280,3);R(g,'#3a3e3c',60,221,280,3);
  for(const [x,y] of [[66,22],[328,22],[66,212],[328,212]])R(g,'#2a2e2c',x,y,5,5);
  R(g,'#c9a22a',184,28,32,14);g.fillStyle='#1a1a1a';g.font='bold 12px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('⚡',200,35);
  for(let i=0;i<BN();i++){const x=200+(i-(b.n-1)/2)*(b.n===5?52:40),on=b.lamps[i];
    R(g,'#222',x-12,54,24,24);R(g,on?'#4dff8a':'#5a1410',x-9,57,18,18);if(on){R(g,'#b8ffd0',x-6,59,6,5);}else R(g,'#8a2418',x-6,59,5,4);
    stxt(g,String(i+1),x,84,'#d8d4c8','center');
    const sel=b.sel===i;R(g,sel?WARN:'#2a2e2c',x-15,104,30,78);R(g,'#1a1d1c',x-12,107,24,72);
    const up=b.lev[i],ly=up?112:146;R(g,'#8a8f8c',x-3,ly,6,26);R(g,'#c9ccc8',x-8,up?110:166,16,8);}
  if(b.done)stxt(g,'ТОК ЕСТЬ',200,196,VFD,'center',16);}
function drawKeypadTop(g){const p=G.kp;g.fillStyle='rgba(6,8,10,.72)';g.fillRect(0,0,W,H);
  R(g,'#1a1a1a',128,20,144,200);R(g,'#2e2e30',131,23,138,194);R(g,'#3e3e40',131,23,138,2);
  stxt(g,G.level===6?'КРЫША':'ДВОРНИК',200,34,'#d8d4c8','center');
  R(g,'#0e1a12',146,52,108,32);const col=p.err>0?DANGER:p.ok?VFD:'#7df2a0';
  for(let i=0;i<3;i++)stxt(g,p.entry[i]||'_',172+i*28,60,col,'center',16);
  for(let i=0;i<12;i++){const x=150+(i%3)*34,y=96+((i/3)|0)*28,sel=p.sel===i;R(g,sel?WARN:'#4a4a4c',x,y,28,22);R(g,'#5a5a5c',x,y,28,2);txt(g,KP_KEYS[i]==='<'?'←':KP_KEYS[i]==='X'?'✕':KP_KEYS[i],x+14,y+7,'#e8e4d8','center');}}
function drawBreakerBottom(g){txt(g,'ЩИТОК',6,4,WARN);txt(g,'ВСЕ ЛАМПЫ — ЗЕЛЕНЫЕ',314,4,LABEL,'right');const b=G.brk;
  for(let i=0;i<BN();i++){const r=brkRect(i),sel=b.sel===i,on=b.lamps[i];R(g,sel?'#1e2e29':'#161d1b',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,sel?WARN:'#2c4a40');
    R(g,on?'#4dff8a':'#7a1a10',r.x+r.w/2-7,r.y-26,14,14);txt(g,String(i+1),r.x+r.w/2,r.y+r.h/2-4,sel?VFD:LABEL,'center',16);}
  R(g,'#161d1b',PZBACK.x,PZBACK.y,PZBACK.w,PZBACK.h);frame(g,PZBACK.x,PZBACK.y,PZBACK.w,PZBACK.h,'#2c4a40');txt(g,'НАЗАД',160,PZBACK.y+8,LABEL,'center');}
function drawKeypadBottom(g){txt(g,'ЗАМОК',6,4,WARN);txt(g,G.level===6?'КОД НА СТЕНАХ ЭТАЖА':'КОД НА СТЕНАХ ДВОРА',314,4,LABEL,'right');const p=G.kp;
  for(let i=0;i<12;i++){const r=kpRect(i),sel=p.sel===i,k=KP_KEYS[i];R(g,sel?'#1e2e29':'#161d1b',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,sel?WARN:'#2c4a40');
    txt(g,k==='<'?'←':k==='X'?'НАЗАД':k,r.x+r.w/2,r.y+(k==='X'?16:12),sel?VFD:LABEL,'center',k==='X'?8:16);}
  txt(g,p.entry.padEnd(3,'_').split('').join(' '),160,214,p.err>0?DANGER:p.ok?VFD:LABEL,'center',16);}

