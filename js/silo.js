'use strict';
/* ---------- ЭЛЕВАТОР: seed spitters, sunset grain hall, the way up ---------- */
function seedHurt(d){if(P.seedproof){spawnFx('puff',P.x+Math.cos(P.a)*.4,P.y+Math.sin(P.a)*.4,.2);return;}hurtPlayer(d);}
function updateHarkun(e,dt){const K=KINDS.hk,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.alert){if(d<K.sight&&e.see){e.alert=true;e.cool=.6;bark(e);}return;}
  e.cool-=dt;e.pain-=dt;
  if(e.state==='spitWind'){e.t-=dt;if(e.t<=0){const a=Math.atan2(dy,dx);for(let i=-3;i<=3;i++){const o=i*.12+(Math.random()-.5)*.05;ents.push({kind:'proj',spr:'semki',seed:1,x:e.x+Math.cos(a)*.4,y:e.y+Math.sin(a)*.4,vx:Math.cos(a+o)*9,vy:Math.sin(a+o)*9,life:.9,dmg:4+Math.random()*3});}sfx.spit();G.shake=Math.max(G.shake,.1);e.state='chase';e.cool=K.rate;}return;}
  if(e.see&&d<5&&e.cool<=0){e.state='spitWind';e.t=K.wind;G.bark='ХАРКУН: «'+pick(K.bark)+'»';G.barkT=1.4;return;}
  let vx=dx/d,vy=dy/d;if(!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}
  if(d>3.4||!e.see){const ox=e.x,oy=e.y,wob=Math.sin(G.time*3+e.id)*.4,s=K.speed*D.spd;moveBody(e,(vx-vy*wob)*s,(vy+vx*wob)*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}}
/* floor 1 is rows <61, floor 2 rows 63+, the stairwell tower is x>=88 (13x13 inside, like Дом 11), floor 3 (boss arena + the climb to it) is x>=88, y>=38.
   Each floor has an old-style lift (Y walls, P panel, Z door, '~' cabin) that is broken: inside it tells you to take the stairs.
   'e' = doorway between areas: floor 1 <-> stairwell bottom, stairwell top <-> floor 2, floor 2 south-west nook <-> foot of the climb to floor 3.
   'r' = stair flights. 'v' = dark holes. Floor 3: 'm' / ';' = conveyor belts that carry you (and enemies) east / west,
   '[' = the crusher each belt runs into (instant death).
   Enemies only act while the player is in their area, so ones left on another floor stay quiet */
const SILO_F2=61,SILO_SW=88,SILO_F3=38;
const SILO_GO={f1:{x:102,y:32.5,a:0},swB:{x:76,y:10.5,a:Math.PI/2},swT:{x:76,y:67.5,a:Math.PI/2},f2:{x:102,y:25,a:-Math.PI/2},f2up:{x:107.5,y:91.5,a:-Math.PI/2},f3:{x:11.5,y:87.5,a:-Math.PI/2}};
const SILO_MSG={swT:'ЭЛЕВАТОР · 2 ЭТАЖ',swB:'ЭЛЕВАТОР · 1 ЭТАЖ',f2up:'ЭЛЕВАТОР · 3 ЭТАЖ',f3:'ЭЛЕВАТОР · 2 ЭТАЖ'};
let SILO_DOORS=[],SILO_BELT=[],SILO_CRUSH=[];
function siloArea(x,y){return x>=SILO_SW?(y>=SILO_F3?3:4):y<SILO_F2?1:2;}
function siloInit(){SILO_DOORS=[];SILO_BELT=[];for(let i=0;i<N;i++){if(TILE[i]===12)SILO_DOORS.push({i,x:i%MW+.5,y:((i/MW)|0)-1.5,t:0});if(FLCH[i]===109||FLCH[i]===59)SILO_BELT.push(i);if(FLCH[i]===91)SILO_CRUSH.push(i);}}
function beltDir(x,y){const c=FLCH[(y|0)*MW+(x|0)];return c===109?1:c===59?-1:0;}
function siloBroken(){sfx.clunk();G.shake=.2;G.msgT=0;msg('ЛИФТ СЛОМАН · ИДИ ПО ЛЕСТНИЦЕ');}
function siloStairs(){const k=P.x>=SILO_SW?(P.y>=SILO_F3?'f3':P.y<30?'swT':'swB'):P.y<SILO_F2?'f1':P.x<40?'f2up':'f2',T=SILO_GO[k];keys.clear();mouseFire=false;sfx.door();
  transition(()=>{P.x=T.x;P.y=T.y;P.a=T.a;P.bobAmt=0;lure=null;msg(SILO_MSG[k]||'ЛЕСТНИЦА');computeFlow();},.6);}
function updateSilo(dt){
  const c=FLCH[(P.y|0)*MW+(P.x|0)];
  if(c===101&&!G.trans){siloStairs();return;}
  if(c===126){if(!G.siloCage){G.siloCage=true;siloBroken();}else if(!(G.msgT>0))msg('ЛИФТ СЛОМАН · ИДИ ПО ЛЕСТНИЦЕ');}else G.siloCage=false;
  for(const d of SILO_DOORS){if(doorTarget[d.i]<.5){d.t=0;continue;}doorTimer[d.i]=-999;
    if(Math.hypot(P.x-d.x,P.y-d.y)<3.2){d.t=0;continue;}d.t+=dt;if(d.t>3&&!occupied(d.i)){doorTarget[d.i]=0;d.t=0;sfx.door();}}
  if(SILO_BELT.length&&siloArea(P.x,P.y)===3)siloFloor3(dt);
  if(P.y>58.2&&P.y<SILO_F2&&P.x<SILO_SW&&G.gReturn){const r=G.gReturn;G.gReturn=null;keys.clear();transition(()=>{enterLevel(11);P.x=r.x;P.y=r.y+1;P.a=Math.PI/2;msg('ГАРАЖИ');},.6);}}
/* ШАПКА: hides under a giant seed-filled ушанка (bullets thud off), pops up (tell), dumps a 50° fan of семки, then stands
   refilling it — the window to hit him. Every ~8 s at 4–12 tiles he throws the hat like a boomerang instead: bald, he can't
   hide, takes double damage and panics until it comes back. All his damage is seed damage (the ватник blocks it) */
function updateShapka(e,dt){const K=KINDS.sh,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.alert){if(d<K.sight&&e.see){e.alert=true;e.state='hide';e.t=1.2;bark(e);}return;}
  if(e.throwT==null)e.throwT=3+Math.random()*3;e.t-=dt;e.throwT-=dt;e.pain-=dt;if(e.hat)shapkaHat(e,dt);
  let sp=0;
  if(e.state==='hide'){sp=.45;if(e.t<=0){e.state='pop';e.t=.4;sfx.latch();sfx.bark(K.pitch*1.3);}}
  else if(e.state==='pop'){if(e.t<=0){if(e.see&&d>4&&d<12&&e.throwT<=0)shapkaThrow(e,dx,dy,d);else if(e.see&&d<7.5)shapkaSpray(e,dx,dy);else{e.state='hide';e.t=1+Math.random();}}}
  else if(e.state==='spray'){if(e.t<=0){e.state='open';e.t=1.2;}}
  else if(e.state==='open'||e.state==='catch'){sp=e.state==='open'?.25:0;if(e.t<=0){e.state='hide';e.t=2+Math.random();}}
  else if(e.state==='bald')sp=1.7;
  else{e.state='hide';e.t=2+Math.random();}
  if(!sp)return;let vx,vy;
  if(e.state==='bald'){const w=Math.sin(G.time*5+e.id)*.9;if(e.see&&d<7){vx=-dx/d-dy/d*w;vy=-dy/d+dx/d*w;}else{vx=Math.cos(G.time*1.7+e.id);vy=Math.sin(G.time*1.3+e.id*2);}const l=Math.hypot(vx,vy)||1;vx/=l;vy/=l;}
  else if(e.see){if(d<1.4)return;vx=dx/d;vy=dy/d;}
  else{const n=flowNext(e.x|0,e.y|0);if(!n)return;const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}
  const ox=e.x,oy=e.y,s=K.speed*D.spd*sp;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}
function shapkaSpray(e,dx,dy){const a=Math.atan2(dy,dx);for(let i=-3;i<=3;i++){const o=i*.1454+(Math.random()-.5)*.04;
    ents.push({kind:'proj',spr:'semki',seed:1,x:e.x+Math.cos(a)*.4,y:e.y+Math.sin(a)*.4,vx:Math.cos(a+o)*6.5,vy:Math.sin(a+o)*6.5,life:1.08,dmg:4+Math.random()*3});}
  sfx.spit();G.shake=Math.max(G.shake,.08);e.state='spray';e.t=.25;G.bark='ШАПКА: «'+pick(KINDS.sh.bark)+'»';G.barkT=1.4;}
function shapkaThrow(e,dx,dy,d){const a=Math.atan2(dy,dx);
  e.hat={kind:'proj',hat:1,x:e.x+Math.cos(a)*.5,y:e.y+Math.sin(a)*.5,a,L:Math.min(10,d+1.5),trav:0,back:false,bt:0,side:Math.random()<.5?1:-1,hit:false,trailT:0};
  ents.push(e.hat);e.bald=true;e.state='bald';sfx.throwIt();G.bark='ШАПКА: «Шапку лови!»';G.barkT=1.4;}
function shapkaHat(e,dt){const h=e.hat;if(h.dead){e.hat=null;return;}let vx,vy;
  if(!h.back){vx=Math.cos(h.a)*11;vy=Math.sin(h.a)*11;h.trav+=11*dt;
    if(h.trav>=h.L||sightBlock((h.x+vx*dt)|0,(h.y+vy*dt)|0)){h.back=true;h.hit=false;vx=0;vy=0;}}
  else{const tx=e.x-h.x,ty=e.y-h.y,l=Math.hypot(tx,ty)||1;h.bt+=dt;if(l<.6||h.bt>3){h.dead=true;e.hat=null;e.bald=false;e.state='catch';e.t=.5;e.throwT=8;sfx.latch();return;}const sw=h.side*7*Math.max(0,1-h.bt/.7);vx=tx/l*12-ty/l*sw;vy=ty/l*12+tx/l*sw;}
  h.x+=vx*dt;h.y+=vy*dt;
  if(!h.hit&&G.state==='play'&&Math.hypot(h.x-P.x,h.y-P.y)<.55){h.hit=true;const l=Math.hypot(vx,vy)||1;seedHurt(10+Math.random()*5);moveBody(P,vx/l*4.5,vy/l*4.5,.1,.24);G.shake=Math.max(G.shake,.2);sfx.punch();}
  h.trailT-=dt;if(h.trailT<=0){h.trailT=.09;ents.push({kind:'proj',spr:'semki',seed:1,x:h.x,y:h.y,vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6,life:.5,dmg:3});}}
function shapkaDie(e){const h=e.hat;if(h&&!h.dead){h.dead=true;ents.push({kind:'prop',t:'shHatG',x:h.x,y:h.y,sc:.7,block:0},{kind:'prop',t:'seedpile',x:h.x+.3,y:h.y+.25,sc:.9,block:0});}
  else ents.push({kind:'prop',t:'seedpile',x:e.x-.4,y:e.y+.3,sc:.8,block:0});e.hat=null;}
function shapkaFrame(e){const S=SPR.sh,w=((e.walk|0)%2)?'walk1':'walk2';let p;
  if(e.dead)p=e.bald?'deadB':'dead';else if(!e.alert)p='stand';else if(e.state==='hide'||e.state==='pop'||e.state==='spray'||e.state==='open')p=e.state;else if(e.state==='catch')p='open';else if(e.bald)p='b'+w;else p=w;
  return {d:S[p],sc:KINDS.sh.scale,tint:e.pain>0&&!e.dead};}
/* floor 3 machinery: belts carry everything toward the crushers */
function siloFloor3(dt){const f=(G.time*12|0)&3,fc=(G.time*16|0)&1;for(const i of SILO_BELT)FLOORTEX[i]=FLCH[i]===109?TX.siloBelt[f]:TX.siloBeltW[f];for(const i of SILO_CRUSH)FLOORTEX[i]=TX.siloCrush[fc];
  const b=beltDir(P.x,P.y);if(b)moveBody(P,b*2.4,0,dt,.24);
  if(FLCH[(P.y|0)*MW+(P.x|0)]===91&&G.state==='play'&&!G.god){msg('ДРОБИЛКА!');sfx.smash();G.shake=.6;spawnFx('blood',P.x,P.y,.6);hurtPlayer(999);}
  for(const e of ents){if(e.kind!=='enemy'||e.dead)continue;const be=beltDir(e.x,e.y);if(be)moveBody(e,be*2.4,0,dt,e.rad);
    if(FLCH[(e.y|0)*MW+(e.x|0)]===91&&!KINDS[e.k].boss){spawnFx('blood',e.x,e.y,.6);sfx.smash();killEnemy(e);}}}
