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
let SILO_DOORS=[],SILO_BELT=[],SILO_CRUSH=[],SEM_DOOR=-1;
function siloArea(x,y){return x>=SILO_SW?(y>=SILO_F3?3:4):y<SILO_F2?1:2;}
function siloInit(){SILO_DOORS=[];SILO_BELT=[];for(let i=0;i<N;i++){if(TILE[i]===12)SILO_DOORS.push({i,x:i%MW+.5,y:((i/MW)|0)-1.5,t:0});if(FLCH[i]===109||FLCH[i]===59)SILO_BELT.push(i);if(FLCH[i]===91)SILO_CRUSH.push(i);if(TILE[i]===7&&siloArea(i%MW,(i/MW)|0)===3)SEM_DOOR=i;}}
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
  if(G.semCard>0)G.semCard-=dt;if(G.semLock&&SEM_DOOR>=0&&!occupied(SEM_DOOR))doorTarget[SEM_DOOR]=0;
  if(G.semWinT>0){G.semWinT-=dt;if(G.semWinT<=0)endGame('win');}
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
/* СЕМЁН, boss of floor 3. Sits on a sack at the far end until you step into the arena, then unfolds and fights.
   He sways side to side across your line of fire (his real position moves, so shots are tested where he's drawn);
   the sway stops while he commits to the minigun, the husk storm and the cough after the minigun — the windows to hit him.
   Phase 2 (half HP): jacket off, wider/faster sway, longer sweeping minigun, 4th storm wave, Лузга-малые. All damage is seed damage */
const SEMSTILL={mgWind:1,mg:1,cough:1,storm:1,summon:1,scream:1};
function semShot(e,a,sp,life,dmg,spr){ents.push({kind:'proj',spr:spr||'semki',seed:1,x:e.x+Math.cos(a)*.4,y:e.y+Math.sin(a)*.4,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life,dmg});}
function semIntro(e){if(G.semOn)return;G.semOn=true;G.semLock=true;G.semCard=3.2;e.alert=true;e.state='fight';e.st='rise';e.t=1.6;e.bx=e.x;e.by=e.y;e.swP=0;e.swA=0;e.cd=2.2;e.sumT=0;
  ents.push({kind:'prop',t:'sack',x:e.x,y:e.y-.35,sc:1,block:.45});sfx.bark(KINDS.se.pitch);G.shake=Math.max(G.shake,.2);}
function updateSemyon(e,dt){const K=KINDS.se,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001,p2=!!e.phase2;
  if(!G.semOn){e.state='sit';e.spitT=(e.spitT||0)-dt;if(e.spitT<=0){e.spitT=1.1+Math.random()*.8;ents.push({kind:'proj',spr:'husk',air:1,x:e.x+.2,y:e.y+.1,vx:.6,vy:.9,life:.35,dmg:0});if(d<14)sfx.spit();}
    if(e.alert||(siloArea(P.x,P.y)===3&&P.y<73.5&&P.y>41&&P.x>93.5&&P.x<122.5))semIntro(e);return;}
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  e.t-=dt;e.cd-=dt;e.sumT-=dt;
  if(!p2&&e.hp<=e.max*.5&&e.st!=='rise'){e.phase2=true;e.st='scream';e.t=1.4;sfx.roar();G.shake=.6;G.bark='СЕМЁН: «А-А-А-ТЬФУ!!»';G.barkT=2.4;msg('СЕМЁН В ЯРОСТИ');e.sumT=1.5;}
  const base={x:e.bx,y:e.by};let mvx=0,mvy=0,ms=0;
  switch(e.st){
    case 'rise':if(e.t<=0){e.st='fight';G.bark='СЕМЁН: «Тьфу.»';G.barkT=1.6;}break;
    case 'scream':if(e.t<=0){e.st='fight';e.cd=.6;}break;
    case 'fight':{
      if(d>9){mvx=dx/d;mvy=dy/d;ms=1;}else if(d<5.5){mvx=-dx/d;mvy=-dy/d;ms=.7;}
      if(e.cd<=0){const lz=ents.filter(o=>o.k==='lz'&&!o.dead).length;
        if(d<4&&e.see){e.st='step';e.t=.7;}
        else if(p2&&lz<6&&e.sumT<=0){e.st='summon';e.t=.9;e.spat=false;}
        else if(e.see&&Math.random()<.55){e.st='mgWind';e.t=.6;tone('square',140,520,.6,.05);}
        else{e.st='storm';e.wv=0;e.wT=0;e.rot=Math.random()*6.3;}}
      break;}
    case 'mgWind':if(e.t<=0){e.st='mg';e.t=p2?3.5:2.5;e.mT=0;e.fT=0;e.ma=Math.atan2(dy,dx);e.ma0=e.ma;}break;
    case 'mg':{e.mT+=dt;const want=Math.atan2(dy,dx);
      if(p2)e.ma=e.ma0+Math.sin(e.mT*1.3)*1.25;else{let da=Math.atan2(Math.sin(want-e.ma),Math.cos(want-e.ma));const tr=.9*dt;e.ma+=Math.max(-tr,Math.min(tr,da));}
      e.fT-=dt;while(e.fT<=0){e.fT+=1/12;semShot(e,e.ma+(Math.random()-.5)*.06,11,2.2,4+Math.random()*3);}if(((e.mT*12)|0)%2===0)sfx.spit();
      if(e.t<=0){e.st='cough';e.t=1;sfx.bark(K.pitch*1.7);G.bark='СЕМЁН: «Кхе-кхе…»';G.barkT=1;}break;}
    case 'cough':if(e.t<=0){e.st='fight';e.cd=p2?.8:1.4;}break;
    case 'storm':e.wT-=dt;if(e.wT<=0){if(e.wv>=(p2?4:3)){e.st='fight';e.cd=p2?1:1.8;break;}
        for(let k=0;k<16;k++)semShot(e,e.rot+e.wv*.098*2+k*Math.PI/8,4.2,4.5,2+Math.random()*1.5,'husk');e.wv++;e.wT=.6;sfx.spit();sfx.whoosh();}break;
    case 'step':mvx=-dx/d;mvy=-dy/d;ms=2.3/(K.speed*D.spd);if(e.t<=0){const a=Math.atan2(dy,dx);for(let k=-2;k<=2;k++)semShot(e,a+k*.2,8,.55,4+Math.random()*3);sfx.spit();e.st='fight';e.cd=p2?.9:1.5;}break;
    case 'summon':if(!e.spat&&e.t<.5){e.spat=true;const a=Math.atan2(dy,dx);let sx=e.x+Math.cos(a)*2.5,sy=e.y+Math.sin(a)*2.5;if(solidR(sx,sy,.3)){sx=e.x;sy=e.y;}e.sx=sx;e.sy=sy;
        for(let k=0;k<6;k++)ents.push({kind:'proj',spr:'husk',air:1,x:e.x,y:e.y,vx:(sx-e.x)/.45+(Math.random()-.5),vy:(sy-e.y)/.45+(Math.random()-.5),life:.45,dmg:0});sfx.spit();}
      if(e.t<=0){for(let k=0;k<3;k++){const a=k*2.1+Math.random(),x=e.sx+Math.cos(a)*.7,y=e.sy+Math.sin(a)*.7;if(ents.filter(o=>o.k==='lz'&&!o.dead).length>=6)break;
          const lx=solidR(x,y,.2)?e.sx:x,ly=solidR(x,y,.2)?e.sy:y,DD=DIFF[SET.diff];ents.push({kind:'enemy',k:'lz',x:lx,y:ly,hp:22*DD.hp,max:22*DD.hp,state:'chase',t:0,cool:.6+Math.random()*.6,alert:true,pain:0,walk:0,id:eid++,rad:.2,stT:0,stun:0,rage:false,rageT:0,losT:0,see:false,sdir:Math.random()<.5?1:-1,box:0,spitter:Math.random()<.4});spawnFx('puff',lx,ly,.35);}
        e.sumT=12;e.st='fight';e.cd=.8;}break;}
  if(ms){const ox=base.x,oy=base.y;moveBody(base,mvx*K.speed*D.spd*ms,mvy*K.speed*D.spd*ms,dt,.3);e.walk=(e.walk||0)+Math.hypot(base.x-ox,base.y-oy)*2.4;}
  const be=beltDir(base.x,base.y);if(be)moveBody(base,be*2.4,0,dt,.3);
  e.bx=base.x;e.by=base.y;
  // the sway: slides across the player's line of fire
  e.swA+=((SEMSTILL[e.st]||e.st==='rise'?0:(p2?1.05:.7))-e.swA)*Math.min(1,dt*4);e.swP+=dt*(p2?3.4:2.3);
  const bd=Math.hypot(P.x-e.bx,P.y-e.by)||1,px=-(P.y-e.by)/bd,py=(P.x-e.bx)/bd,off=Math.sin(e.swP)*e.swA,nx=e.bx+px*off,ny=e.by+py*off;
  if(!solidR(nx,ny,.2)){e.x=nx;e.y=ny;}else{e.x=e.bx;e.y=e.by;}}
function updateLuzga(e,dt){const K=KINDS.lz,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}e.atkT=(e.atkT||0)-dt;
  if(e.spitter&&e.see&&d<7&&d>2&&e.cool<=0){semShot(e,Math.atan2(dy,dx),9,1,4+Math.random()*2);sfx.spit();e.cool=1.6;e.atkT=.25;return;}
  if(d<K.reach&&e.cool<=0){seedHurt(4+Math.random()*2);sfx.punch();e.cool=.8;e.atkT=.25;return;}
  let vx=dx/d,vy=dy/d;if(!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}
  if(d<.6)return;const ox=e.x,oy=e.y,s=K.speed*D.spd;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*4;}
function semDie(e){e.diedAt=G.time;G.semLock=false;G.secrets=1;G.secretTotal=1;G.bark='СЕМЁН: «…тьфу.»';G.barkT=2.4;msg('ВАТНИК СЕМЁНА — ЗАБЕРИ');
  for(const o of ents)if(o.kind==='enemy'&&o.k==='lz'&&!o.dead){o.dead=true;o.hidden=true;spawnFx('puff',o.x,o.y,.4);ents.push({kind:'prop',t:'seedpile',x:o.x,y:o.y,sc:.45,block:0});}
  const a=Math.atan2(P.y-e.y,P.x-e.x);ents.push({kind:'item',t:'vatnikS',x:e.x+Math.cos(a)*.6,y:e.y+Math.sin(a)*.6,drop:1});}
function semFrame(e){const S=SPR.se,k=e.phase2?'2':'',sc=KINDS.se.scale;let p;
  if(e.dead){const t=G.time-(e.diedAt||0);return {d:t<.5?S['swayL'+k]:t<1.1?S['fold'+k]:S.pile,sc};}
  if(!G.semOn)return {d:S.sit,sc};
  switch(e.st){case 'rise':return {d:e.t>.8?S.rise:S['stand'+k],sc};
    case 'mgWind':p='puff';break;case 'mg':case 'scream':p='attack';break;case 'cough':p='cough';break;
    case 'storm':p=((G.t*10)|0)%2?'spin1':'spin2';break;case 'summon':p=e.t<.5?'attack':'puff';break;
    case 'step':p=((G.t*8)|0)%2?'walk1':'walk2';break;
    default:p=Math.sin(e.swP||0)>.35?'swayR':Math.sin(e.swP||0)<-.35?'swayL':(((G.t*3)|0)%2?'chew':'stand');}
  return {d:S[p+k],sc,tint:e.pain>0||e.st==='mgWind'};}
function luzgaFrame(e){const S=SPR.lz;if(e.dead)return e.hidden?null:{d:S.dead,sc:.55};const p=e.atkT>0?(e.spitter?'spit':'attack'):(((e.walk|0)%2)?'walk1':'walk2');return {d:S[p],sc:.55,tint:e.pain>0};}
/* after Семён: back to the seed garage, and the garages stay at sunset for the rest of the run */
function siloHome(){const r=G.gReturn;G.gReturn=null;G.sunset=true;enterLevel(11);
  if(r){P.x=r.x;P.y=r.y+1;}else{for(let i=0;i<N;i++)if(TILE[i]===65){P.x=i%MW+.5;P.y=((i/MW)|0)+1.5;break;}}P.a=Math.PI/2;msg('ГАРАЖИ · ЗАКАТ');}
