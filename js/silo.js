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
/* floor 1 is rows <61, floor 2 rows 63+, the stairwell tower is x>=88 (13x13 inside, like Дом 11).
   Each floor has an old-style lift (Y walls, P panel, Z door, '~' cabin) that is broken: inside it tells you to take the stairs.
   'e' = doorway between areas: floor 1 <-> stairwell bottom, stairwell top <-> floor 2. 'r' = stair flights. 'v' = dark holes */
const SILO_UP={x:11.5,y:90},SILO_F2=61,SILO_SW=88;
const SILO_GO={f1:{x:102,y:32.5,a:0},swB:{x:76,y:10.5,a:Math.PI/2},swT:{x:76,y:67.5,a:Math.PI/2},f2:{x:102,y:25,a:-Math.PI/2}};
let SILO_DOORS=[];
function siloInit(){SILO_DOORS=[];for(let i=0;i<N;i++)if(TILE[i]===12)SILO_DOORS.push({i,x:i%MW+.5,y:((i/MW)|0)-1.5,t:0});}
function siloBroken(){sfx.clunk();G.shake=.2;G.msgT=0;msg('ЛИФТ СЛОМАН · ИДИ ПО ЛЕСТНИЦЕ');}
function siloStairs(){const k=P.x>=SILO_SW?(P.y<30?'swT':'swB'):P.y<SILO_F2?'f1':'f2',T=SILO_GO[k];keys.clear();mouseFire=false;sfx.door();
  transition(()=>{P.x=T.x;P.y=T.y;P.a=T.a;P.bobAmt=0;lure=null;msg(k==='swT'?'ЭЛЕВАТОР · 2 ЭТАЖ':k==='swB'?'ЭЛЕВАТОР · 1 ЭТАЖ':'ЛЕСТНИЦА');computeFlow();},.6);}
function updateSilo(dt){
  const c=FLCH[(P.y|0)*MW+(P.x|0)];
  if(c===101&&!G.trans){siloStairs();return;}
  if(c===126){if(!G.siloCage){G.siloCage=true;siloBroken();}else if(!(G.msgT>0))msg('ЛИФТ СЛОМАН · ИДИ ПО ЛЕСТНИЦЕ');}else G.siloCage=false;
  for(const d of SILO_DOORS){if(doorTarget[d.i]<.5){d.t=0;continue;}doorTimer[d.i]=-999;
    if(Math.hypot(P.x-d.x,P.y-d.y)<3.2){d.t=0;continue;}d.t+=dt;if(d.t>3&&!occupied(d.i)){doorTarget[d.i]=0;d.t=0;sfx.door();}}
  if(Math.hypot(P.x-SILO_UP.x,P.y-SILO_UP.y)<2.2){if(!(G.msgT>0))msg('ЛЕСТНИЦА НАВЕРХ · СКОРО');}
  if(P.y>58.2&&P.y<SILO_F2&&P.x<SILO_SW&&G.gReturn){const r=G.gReturn;G.gReturn=null;keys.clear();transition(()=>{enterLevel(11);P.x=r.x;P.y=r.y+1;P.a=Math.PI/2;msg('ГАРАЖИ');},.6);}}
