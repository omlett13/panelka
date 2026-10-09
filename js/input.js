'use strict';
/* ---------- INPUT ---------- */
const keys=new Set(), btn={A:0,B:0,X:0,Y:0,L:0,R:0}, pad={x:0,y:0};
let mouseDX=0, mouseFire=false;
const MENUKEYS={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',Enter:'ok',Space:'ok',KeyE:'ok',Escape:'back',Backspace:'back'};
function useSlot(i){const id=SLOTS[i];if(id<=2)selectW(id);else if(id===5)selectW(3);else if(id===3)throwVodka();else useAction();}
function toggleLoot(){if(G.state!=='play'&&G.state!=='lift')return;G.loot=!G.loot;G.lootHeld=-1;G.lootSlot=-1;G.lootCur=0;keys.clear();mouseFire=false;sfx.latch();if(G.loot)exitLock();}
const LOOTS=[0,1,2,5,3,4],LN=6;
function lootOwned(id){return id===2?!!P.has[2]:id===5?!!P.has[3]:true;}
function lootPick(kind,idx){
  if(kind==='item'){const id=LOOTS[idx];if(!lootOwned(id)){sfx.click();return;}
    if(G.lootSlot>=0){assignSlot(G.lootSlot,id);G.lootSlot=-1;G.lootHeld=-1;}else{G.lootHeld=G.lootHeld===id?-1:id;sfx.tick();}}
  else{if(G.lootHeld>=0){assignSlot(idx,G.lootHeld);G.lootHeld=-1;G.lootSlot=-1;}else{G.lootSlot=G.lootSlot===idx?-1:idx;sfx.tick();}}
}
function assignSlot(s,id){const prev=SLOTS.indexOf(id);if(prev>=0)SLOTS[prev]=SLOTS[s];SLOTS[s]=id;saveSlots();sfx.swap();}
function lootKey(k){
  if(k==='Tab'||k==='Escape'||k==='Backspace'){toggleLoot();return;}
  const c=G.lootCur;
  if(k==='ArrowLeft'||k==='KeyA')G.lootCur=c<LN?Math.max(0,c-1):Math.max(LN,c-1);
  else if(k==='ArrowRight'||k==='KeyD')G.lootCur=c<LN?Math.min(LN-1,c+1):Math.min(LN+3,c+1);
  else if(k==='ArrowDown'||k==='KeyS')G.lootCur=c<LN?LN+Math.min(3,c):c;
  else if(k==='ArrowUp'||k==='KeyW')G.lootCur=c>=LN?c-LN:c;
  else if(k==='Enter'||k==='Space'||k==='KeyE')lootPick(c<LN?'item':'slot',c<LN?c:c-LN);
}
function toggleDbg(){const d=document.getElementById('dbg');if(d)d.hidden=!d.hidden;}
if(!DEBUG)for(const id of ['dbg','dbgBtn'])document.getElementById(id).remove();
addEventListener('keydown',e=>{const k=e.code;if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Backspace','Tab'].includes(k))e.preventDefault();initAudio();
  if(k==='Backquote'&&!e.repeat){toggleDbg();return;}
  if(k==='KeyM'&&!e.repeat){SET.snd^=1;applySettings();saveSet();return;}
  if(G.trans)return;
  if(G.state==='breaker'||G.state==='keypad'){if(!e.repeat)puzzleKey(k);return;}
  if(G.state==='talk'){if(!e.repeat)talkKey(k);return;}
  if(G.state==='shop'){keys.add(k);if(e.repeat)return;if(k==='Escape'||k==='Backspace'||k==='Tab')shopBack();else if(k==='Enter'||k==='Space'||k==='KeyE')shopClick();return;}
  if(G.state==='play'||G.state==='lift'){if(e.repeat)return;
    if(G.loot){lootKey(k);return;}
    keys.add(k);
    if(k==='Enter'||k==='Escape'||k==='KeyP')pauseGame();else if(k==='KeyE')useAction();else if(k==='Tab')toggleLoot();
    else if(k==='Digit1')useSlot(0);else if(k==='Digit2')useSlot(1);else if(k==='Digit3')useSlot(2);else if(k==='Digit4')useSlot(3);else if(k==='Digit5')selectW(3);
    else if(k==='KeyQ')cycleW(1);else if(k==='KeyG')throwVodka();
    return;}
  if(G.state==='ride')return;
  if((G.state==='dead')&&G.deadT<.6)return;
  if(MENUKEYS[k])menuAct(MENUKEYS[k]);});
addEventListener('keyup',e=>keys.delete(e.code));
addEventListener('blur',()=>{keys.clear();mouseFire=false;pauseGame();});
const topC=document.getElementById('top'),botC=document.getElementById('bot');
function topPos(e){const r=topC.getBoundingClientRect();return {x:Math.max(0,Math.min(W-1,(e.clientX-r.left)/r.width*W)),y:Math.max(0,Math.min(H-1,(e.clientY-r.top)/r.height*H))};}
topC.addEventListener('pointerdown',e=>{initAudio();
  if(G.state==='shop'){e.preventDefault();G.hand=topPos(e);updateHover();shopClick();return;}
  if(G.state!=='play'&&G.state!=='lift')return;
  if(G.loot)return;
  if(e.pointerType==='mouse'&&document.pointerLockElement!==topC){try{const p=topC.requestPointerLock&&topC.requestPointerLock();if(p&&p.catch)p.catch(()=>{});}catch(err){}}
  if(e.pointerType==='mouse')mouseFire=true;});
topC.addEventListener('pointermove',e=>{if(G.state==='shop'&&document.pointerLockElement!==topC)G.hand=topPos(e);});
addEventListener('mouseup',()=>{mouseFire=false;});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement===topC)mouseDX+=e.movementX||0;});
document.addEventListener('pointerlockchange',()=>{if(document.pointerLockElement===topC)G.hadLock=true;else if(G.hadLock){G.hadLock=false;mouseFire=false;if(!G.trans&&!G.loot)pauseGame();}});
topC.addEventListener('touchstart',e=>{e.preventDefault();},{passive:false});
if(DEBUG)document.getElementById('dbgBtn').addEventListener('click',e=>{toggleDbg();e.currentTarget.blur();});
document.querySelectorAll('[data-dbg]').forEach(b=>b.addEventListener('click',()=>{b.blur();const a=b.dataset.dbg;
  if(a==='close'){toggleDbg();return;}
  if(a==='rub'){G.rub+=500;msg('DEBUG  +500 РУБ');return;}
  if(a==='max'){for(const k in UP)UP[k]=1;P.has=[1,1,1,1];P.ammo9=cap9();P.shells=capS();P.vodka=3;P.kefir=2;P.hp=maxHP();P.armor=maxAR();msg('DEBUG  ВСЁ КУПЛЕНО');return;}
  if(a==='perf'){PERF.on=!PERF.on;perfReset();b.textContent='frame times: '+(PERF.on?'ON':'off');return;}
  if(a==='god'){G.god=!G.god;b.textContent='god mode: '+(G.god?'ON':'off');return;}
  if(a==='kill'){if(G.state==='pause')resume();if(G.state!=='play')return;for(const e of ents)if(e.kind==='enemy'&&!e.dead&&e.k!=='bb'&&e.k!=='gg')killEnemy(e);msg('DEBUG  ВСЕ УБИТЫ');return;}
  if(a==='f4'){if(G.state==='pause')resume();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(4);G.loot=false;return;}
  if(a==='f11'){if(G.state==='pause')resume();if(G.state==='talk')talkClose();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(11);G.loot=false;msg('ГАРАЖИ');return;}
  if(a==='sem'){if(G.state==='pause')resume();if(G.state==='talk')talkClose();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(12);G.loot=false;P.x=107.5;P.y=74;P.a=-Math.PI/2;return;}
  if(a==='f12'){if(G.state==='pause')resume();if(G.state==='talk')talkClose();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(12);G.loot=false;msg('ЭЛЕВАТОР · 1 ЭТАЖ');return;}
  if(a==='f10'||a==='duel'){if(G.state==='pause')resume();if(G.state==='talk')talkClose();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(10);G.loot=false;msg('СТРОЙКА');if(a==='duel'){siteSkipToCrane();P.x=CRB.x+2;P.y=CRB.y;}return;}
  if(a==='f9'){if(G.state==='pause')resume();if(G.state==='talk')talkClose();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(9);G.loot=false;msg('МЕТРО');return;}
  if(a==='f8'){if(G.state==='pause')resume();if(G.state==='talk')talkClose();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(8);G.loot=false;msg('ГОРОД');return;}
  if(a==='f5'||a==='f6'||a==='f7'){if(G.state==='pause')resume();if(G.state!=='play'&&G.state!=='lift')newGame();enterLevel(+a[1]);G.loot=false;msg(a==='f5'?'ЛЕСТНИЦА':a==='f6'?'ЭТАЖ 2':'КРЫША');return;}
  if(a==='chase'){if(G.state==='pause')resume();if(G.state!=='play'&&G.state!=='lift')newGame();if(G.level!==7||G.rc)enterLevel(7);G.loot=false;roofSkipToChase();if(G.cp)G.cp.chase=true;return;}
  if(a==='d4'){if(G.level!==4)return;G.fuses=3;G.liftKey=true;msg('DEBUG  ПРЕДОХР. + КЛЮЧ');return;}
  if(a==='f3'){if(G.state==='pause')resume();if(G.state!=='play'&&G.state!=='lift')newGame();G.hasKey=true;enterLevel(3);G.loot=false;return;}
  if(a==='f2'||a==='boss'){if(G.state==='pause')resume();if(G.state!=='play'&&G.state!=='lift')newGame();if(G.level!==2||G.state==='lift'){enterLevel(2);}
    if(a==='boss'){P.x=39.5;P.y=20.5;P.a=Math.PI/2;}G.loot=false;return;}
  if(a==='lift'){if(G.level===2)G.cleared=true;if(G.state==='lift'||G.state==='shop'||G.state==='ride')return;if(G.state==='pause'&&G.prevState==='play')resume();if(G.state!=='play')newGame();G.power=true;G.loot=false;enterLift();}
}));
document.querySelectorAll('[data-btn]').forEach(b=>{const id=b.dataset.btn;
  const down=e=>{e.preventDefault();initAudio();b.classList.add('on');if(id in btn)btn[id]=1;
    if(G.trans||G.state==='ride'){/* buttons do nothing mid-transition or riding */}
    else if(G.state==='shop'){if(id==='A')shopClick();else if(id==='B'||id==='START')shopBack();}
    else if(G.state==='breaker'||G.state==='keypad')puzzleBtn(id);
    else if(G.state==='talk'){if(id==='A')talkChoose();else if(id==='B'||id==='START')talkClose();else if(id==='X')talkMove(-1);else if(id==='Y')talkMove(1);}
    else if((G.state==='play'||G.state==='lift')&&G.loot){if(id==='B'||id==='START')toggleLoot();else if(id==='A')lootKey('Enter');else if(id==='L')lootKey('ArrowLeft');else if(id==='R')lootKey('ArrowRight');else if(id==='X')lootKey('ArrowUp');else if(id==='Y')lootKey('ArrowDown');}
    else if(id==='START'){if(G.state==='play'||G.state==='lift')pauseGame();else if(G.state==='pause'&&G.page==='pause')resume();else menuAct('ok');}
    else if(id==='SELECT'){G.zoom^=1;}
    else if(G.state!=='play'&&G.state!=='lift'){if(id==='A')menuAct('ok');else if(id==='B')menuAct('back');else if(id==='L')menuAct('left');else if(id==='R')menuAct('right');else if(id==='X')menuAct('up');else if(id==='Y')menuAct('down');}
    else{if(id==='B')useAction();else if(id==='X')cycleW(1);else if(id==='Y')cycleW(-1);}
    try{b.setPointerCapture(e.pointerId);}catch(err){}};
  const up=()=>{b.classList.remove('on');if(id in btn)btn[id]=0;};
  b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('lostpointercapture',up);
  b.addEventListener('keydown',e=>{if(e.code==='Enter'||e.code==='Space')e.stopPropagation();});});
const padEl=document.getElementById('pad'),nub=document.getElementById('nub');
function padMove(e){const r=padEl.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,rad=r.width*.42;let dx=(e.clientX-cx)/rad,dy=(e.clientY-cy)/rad;const m=Math.hypot(dx,dy);if(m>1){dx/=m;dy/=m;}pad.x=Math.abs(dx)<.15?0:dx;pad.y=Math.abs(dy)<.15?0:dy;nub.style.transform='translate('+(dx*rad*.55)+'px,'+(dy*rad*.55)+'px)';}
function padEnd(){pad.x=0;pad.y=0;nub.style.transform='';}
padEl.addEventListener('pointerdown',e=>{e.preventDefault();initAudio();try{padEl.setPointerCapture(e.pointerId);}catch(err){}padMove(e);});
padEl.addEventListener('pointermove',e=>{if(padEl.hasPointerCapture&&padEl.hasPointerCapture(e.pointerId))padMove(e);});
padEl.addEventListener('pointerup',padEnd);padEl.addEventListener('pointercancel',padEnd);
const BTNS=[{x:6,y:180,w:74,h:54},{x:84,y:180,w:74,h:54},{x:162,y:180,w:74,h:54},{x:240,y:180,w:74,h:54}];
const LOOTBTN={x:8,y:146,w:68,h:26},LOOTCLOSE={x:230,y:0,w:90,h:16};
function lootTile(i){return {x:7+i*52,y:24,w:48,h:60};}
botC.addEventListener('pointerdown',e=>{e.preventDefault();initAudio();const r=botC.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*BW,y=(e.clientY-r.top)/r.height*BH,p={x,y};
  if(G.trans||G.state==='ride'||G.state==='shop')return;
  if(G.state==='breaker'||G.state==='keypad'){puzzleTouch(p);return;}
  if(G.state==='talk'){talkTouch(p);return;}
  if((G.state==='play'||G.state==='lift')&&G.loot){
    if(inR(p,LOOTCLOSE)){toggleLoot();return;}
    for(let i=0;i<LN;i++)if(inR(p,lootTile(i))){G.lootCur=i;lootPick('item',i);return;}
    for(let i=0;i<4;i++)if(inR(p,BTNS[i])){G.lootCur=LN+i;lootPick('slot',i);return;}
    return;}
  if(G.state!=='play'&&G.state!=='lift'){
    if(G.state==='dead'&&G.deadT<.6)return;
    for(const row of menuRows())if(x>=row.x&&x<row.x+row.w&&y>=row.y&&y<row.y+row.h){
      G.sel=row.i;
      if(G.page==='settings'&&row.i<SETS.length)changeSet(row.i,x<row.x+row.w*.4?-1:1);else menuAct('ok');
      return;}
    return;}
  if(inR(p,LOOTBTN)){toggleLoot();return;}
  for(let i=0;i<4;i++){const b=BTNS[i];if(inR(p,b)){useSlot(i);b.hit=.15;return;}}
  if(x>=84&&x<236&&y>=20&&y<176)G.zoom^=1;});

