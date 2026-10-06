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
const SILO_UP={x:79.5,y:10};
function siloInit(){G.seedproof=G.seedproof||false;}
function updateSilo(dt){
  if(Math.hypot(P.x-SILO_UP.x,P.y-SILO_UP.y)<2.2){if(!(G.msgT>0))msg('ЛИФТ НАВЕРХ — 2 ЭТАЖ · СКОРО');}
  if(P.y>58.2&&G.gReturn){const r=G.gReturn;G.gReturn=null;keys.clear();transition(()=>{enterLevel(11);P.x=r.x;P.y=r.y+1;P.a=Math.PI/2;msg('ГАРАЖИ');},.6);}}
