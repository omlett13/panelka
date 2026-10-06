'use strict';
/* ---------- UPDATE ---------- */
function k(c){return keys.has(c);}
let flowT=0;
function update(dt){
  G.t+=dt;updateLights(G.t);
  G.flash=Math.max(0,G.flash-dt*8);G.hurt=Math.max(0,G.hurt-dt*1.6);G.bonus=Math.max(0,G.bonus-dt*2.5);G.msgT-=dt;G.barkT-=dt;G.navT-=dt;
  for(const b of BTNS)if(b.hit)b.hit=Math.max(0,b.hit-dt);
  updateAmbience();
  if(G.state!=='play'&&G.page&&G.navT<=0){
    if(pad.y<-.6){menuAct('up');G.navT=.28;}else if(pad.y>.6){menuAct('down');G.navT=.28;}
    else if(G.page==='settings'&&pad.x<-.6){menuAct('left');G.navT=.3;}else if(G.page==='settings'&&pad.x>.6){menuAct('right');G.navT=.3;}}
  G.statsT-=dt;G.shopMsgT-=dt;G.shake=Math.max(0,G.shake-dt);G.pokeT=Math.max(0,G.pokeT-dt);
  if(G.trans){const T=G.trans;T.t+=dt;if(!T.fired&&T.t>=T.dur){T.fired=true;T.mid();}if(T.t>=T.dur*2)G.trans=null;return;}
  if(G.state==='menu'){const c=G.menuCam||{x:8.5,y:11.5};P.x=c.x;P.y=c.y;P.a+=dt*.12;P.camZ=.5+(G.level===9?Math.sin(G.t*8.5)*.006:0);return;}
  if(G.state==='pause'||G.state==='win'||G.state==='liftMenu'||G.state==='talk')return;
  if(G.loot)return;
  if(G.state==='lift'){
    if(G.hiT>0){G.hiT-=dt;if(G.hiT<=0)dealerSay(['Чё надо? Всё есть.','О, живой. Заходи, не стесняйся.','Тише. Тут свои.'][(Math.random()*3)|0]);}
    if(G.liftBreak>0){G.liftBreak-=dt;if(G.liftBreak<=0&&!G.trans){G.liftBreak=0;keys.clear();transition(()=>{enterLevel(5);msg('ЛЕСТНИЦА');},.5);}}
    updatePlayer(dt);return;}
  if(G.state==='shop'){updateShop(dt);return;}
  if(G.state==='breaker'||G.state==='keypad'){updatePuzzle(dt);updateDoors(dt);return;}
  if(G.state==='ride'){
    G.rideT+=dt;P.camZ=.5+Math.sin(G.rideT*38)*.006*Math.min(1,G.rideT);
    if(!G.rideDing&&G.rideT>2.2){G.rideDing=true;sfx.ding();}
    if(G.rideT>3&&!G.trans)transition(()=>{const T=G.rideTarget;if(T===2||T===3){enterLevel(T);msg(T===2?'ЭТАЖ 2':'ПОДВАЛ');}else endGame('win');},.5);
    return;}
  updateDoors(dt);
  if(G.state==='dead'){G.deadT+=dt;P.camZ=Math.max(.1,P.camZ-dt*.8);updateFx(dt);return;}
  G.time+=dt;
  if(!G.cut&&!(G.rc&&G.rc.lock)&&!G.drop&&!G.duel)updatePlayer(dt);
  flowT-=dt;if(flowT<=0){computeFlow();flowT=.2;}
  if(lure){lure.life-=dt;if(lure.life<=0)lure=null;}
  G.clearT-=dt;
  if(G.level===2&&!G.cleared){
    const pc=(P.y|0)*MW+(P.x|0);
    if(!G.bossOn&&BROOM[pc])bossStart();
    if(G.bossOn){if(BDOOR>=0)doorTarget[BDOOR]=0;
      G.healT-=dt;if(G.healT<=0){G.healT=13+Math.random()*4;
        const live=ents.filter(e=>e.kind==='item'&&e.heal&&!e.taken).length;
        if(live<2){const pts=LEVELDEF[2].heal.filter(p=>Math.hypot(p[0]-P.x,p[1]-P.y)>2.5);const p=pts[(Math.random()*pts.length)|0];
          if(p){{const r=Math.random();ents.push({kind:'item',t:r<.45?'kvass':r<.75?'pelmeni':'shells',x:p[0],y:p[1],drop:1,heal:1});}spawnFx('puff',p[0],p[1],.5);sfx.pickup();}}}}}
  if(G.level===4&&G.codeOK&&!G.dvOn&&!G.cut&&!G.dvDown&&P.x>=10&&P.x<14&&P.y>=11.5&&P.y<16.9){const dv=ents.find(o=>o.k==='dv'&&!o.dead);if(dv)startCut(dv);}
  if(G.cut){updateCut(dt);updateFx(dt);updateDoors(dt);return;}
  if(G.level===8)updateNPCs(dt);
  if(G.level===9)updateMetro(dt);
  if(G.level===11)updateGar(dt);
  if(G.level===12)updateSilo(dt);
  if(G.level===10){updateSite(dt);if(G.duel){updateDuel(dt);updateProj(dt);updateFx(dt);for(const f of ents)if(f.kind==='fire')f.life-=dt;return;}}
  if(G.level===7){updateRoof(dt);if(G.drop){updateFx(dt);return;}if(G.rc&&G.rc.lock){for(const e of ents)if(e.kind==='enemy'&&e.k==='dz')updateDancer(e,dt);updateFx(dt);return;}}
  for(const e of ents)if(e.kind==='enemy')updateEnemy(e,dt);
  updateProj(dt);updateFx(dt);updateBottles(dt);updateSlippers(dt);updateRolls(dt);updateBoom(dt);updateFluff(dt);
  G.fireT=(G.fireT||0)-dt;G.ventT=(G.ventT||0)-dt;G.goo=Math.max(0,(G.goo||0)-dt);
  if(G.grab&&(G.grab.e.dead||G.state!=='play'))G.grab=null;
  if(G.face){const f=G.face;f.t+=dt;f.drain-=dt;f.hb-=dt;f.hitT-=dt;if(f.e.dead){G.face=null;}else{if(f.drain<=0){f.drain=.5;hurtPlayer(3);}if(f.hb<=0){f.hb=.55;sfx.heart();}}}
  for(const f of ents){
    if(f.kind==='fire'){f.life-=dt;if(f.life>0&&Math.hypot(f.x-P.x,f.y-P.y)<.6&&G.fireT<=0){G.fireT=.35;hurtPlayer(3);}}
    else if(f.kind==='vent'){let on;if(f.temp){f.warn-=dt;f.life-=dt;on=f.warn<=0&&f.life>0;}else on=((G.t+f.ph)%3.6)<1.1;if(on&&!f.was&&Math.hypot(f.x-P.x,f.y-P.y)<7)sfx.hiss();f.was=on;f.on=on;
      if(on&&Math.hypot(f.x-P.x,f.y-P.y)<.85&&G.ventT<=0){G.ventT=.4;hurtPlayer(f.temp?14:9);msg('ПАР!');}}}
  for(const e of ents){if(e.kind!=='item'||e.taken)continue;if(Math.hypot(e.x-P.x,e.y-P.y)<.6&&take(e)){e.taken=true;if(!e.drop&&!ITEMS[e.t].money&&!ITEMS[e.t].lore)G.items++;G.bonus=1;ITEMS[e.t].money?sfx.cash():sfx.pickup();}}
  ents=ents.filter(e=>!(e.kind==='item'&&e.taken)&&!((e.kind==='fx'||e.kind==='puddle'||e.kind==='fire')&&e.life<=0)&&!(e.kind==='vent'&&e.temp&&e.life<=0)&&!((e.kind==='proj'||e.kind==='bottle'||e.kind==='slipper'||e.kind==='roll')&&e.dead)&&!(e.kind==='fluff'&&e.life<=0)&&!(e.kind==='hay'&&e.life<=0)&&!(e.kind==='drop'&&e.done)&&!(e.kind==='boomfx'&&e.life<=0)&&!(e.kind==='car'&&e.dead));
}
function updateBottles(dt){
  for(const b of ents){if(b.kind==='puddle'){b.life-=dt;continue;}if(b.kind!=='bottle'||b.dead)continue;
    b.vz-=9*dt;b.z+=b.vz*dt;b.spin+=dt*14;
    const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt;
    if(sightBlock(nx|0,ny|0)){b.dead=true;smash(b.x,b.y);continue;}
    b.x=nx;b.y=ny;if(b.z<=.05){b.dead=true;smash(b.x,b.y);}}
}
function updateHover(){
  G.hover=-1;if(G.dolly||G.shopT<1)return;
  for(let i=0;i<SH().length;i++)if(inR(G.hand,slotRect(i))){G.hover=i;break;}
}
function updateShop(dt){
  if(G.shopClosing){G.shopT-=dt*3;if(G.shopT<=0){G.shopT=0;G.state=G.level===8?'play':'lift';G.shopClosing=false;}return;}
  G.shopT=Math.min(1,G.shopT+dt*3);
  const hx=((k('ArrowRight')||k('KeyD'))?1:0)-((k('ArrowLeft')||k('KeyA'))?1:0)+pad.x,hy=((k('ArrowDown')||k('KeyS'))?1:0)-((k('ArrowUp')||k('KeyW'))?1:0)+pad.y;
  if(hx||hy){G.hand.x=Math.max(0,Math.min(W-1,G.hand.x+hx*240*dt));G.hand.y=Math.max(0,Math.min(H-1,G.hand.y+hy*240*dt));}
  if(document.pointerLockElement===topC){G.hand.x=Math.max(0,Math.min(W-1,G.hand.x+mouseDX*.6));}
  mouseDX=0;
  const d=G.dolly;if(d){d.t=d.out?Math.max(0,d.t-dt*3.5):Math.min(1,d.t+dt*3.5);if(d.out&&d.t<=0)G.dolly=null;}
  updateHover();
}
function updatePlayer(dt){
  if(G.level===11&&G.knock&&updateKnock(dt)){P.cool-=dt;return;}
  let fwd=((k('KeyW')||k('ArrowUp'))?1:0)-((k('KeyS')||k('ArrowDown'))?1:0)-pad.y;
  let str=(k('KeyD')?1:0)-(k('KeyA')?1:0)+btn.R-btn.L;
  const trn=(k('ArrowRight')?1:0)-(k('ArrowLeft')?1:0)+pad.x;
  P.a+=trn*2.6*dt+mouseDX*.0024*(SET.sens+1)/5;mouseDX=0;
  fwd=Math.max(-1,Math.min(1,fwd));str=Math.max(-1,Math.min(1,str));if(G.grab){fwd=0;str=0;}const m=Math.hypot(fwd,str);if(m>1){fwd/=m;str/=m;}
  const run=k('ShiftLeft')||k('ShiftRight'),inWater=ZONE[(P.y|0)*MW+(P.x|0)]===Z_WATER,sp=(run?4.4:2.9)*(UP.krossy?1.2:1)*(inWater?.7:1)*(G.face?.55:1),cs=Math.cos(P.a),sn=Math.sin(P.a);
  const vx=(cs*fwd-sn*str)*sp,vy=(sn*fwd+cs*str)*sp;
  const ox=P.x,oy=P.y;VOIDOK=G.level===7;moveBody(P,vx,vy,dt,.24);VOIDOK=false;P.vx=(P.x-ox)/dt;P.vy=(P.y-oy)/dt;
  const moved=Math.hypot(P.x-ox,P.y-oy)/dt;
  if(G.state==='play'&&run&&moved>1){G.noiseT-=dt;if(G.noiseT<=0){makeNoise(4);G.noiseT=.5;}}
  P.bobAmt+=((SET.bob?Math.min(1,moved/3):0)-P.bobAmt)*Math.min(1,dt*8);P.bob+=dt*moved*2.6;
  const ph=Math.floor(P.bob/Math.PI);if(ph!==P.stepPh){P.stepPh=ph;if(moved>.5){if(inWater)sfx.splash();else sfx.step(ZONE[(P.y|0)*MW+(P.x|0)]===Z_OUT);}}
  P.camZ=.5+Math.sin(P.bob*2)*.012*P.bobAmt;
  if(P.bleed>0&&G.state==='play'){P.bleed-=dt;P.bleedTick=(P.bleedTick||0)-dt;if(P.bleedTick<=0){P.bleedTick=.5;if(!G.god){P.hp-=1;G.hurt=Math.min(1,G.hurt+.1);if(P.hp<=0){P.hp=0;endGame('dead');return;}}}}
  P.cool-=dt;P.anim+=dt;P.throwT=Math.max(0,P.throwT-dt);P.switchT=Math.max(0,P.switchT-dt);P.faceHurt-=dt;P.faceGrin-=dt;P.faceLookT-=dt;
  if(P.faceLookT<=0){P.faceLook=[-1,0,0,1][(Math.random()*4)|0];P.faceLookT=1+Math.random()*1.5;}
  if((k('Space')||k('ControlLeft')||k('ControlRight')||mouseFire||btn.A)&&P.cool<=0&&P.switchT<=0)fire();
}
function updateDoors(dt){
  for(const i of DOORS){const o=doorOpen[i];if(TILE[i]===62&&doorTarget[i]===1){for(const j of [i-1,i+1])if(TILE[j]===62&&doorTarget[j]!==1){doorTarget[j]=1;}}
    if(i===BDOOR&&G.bossOn){doorTarget[i]=0;}
    if(doorTarget[i]===0&&o>0&&TILE[i]!==42&&occupied(i))doorTarget[i]=1;
    if(o!==doorTarget[i])doorOpen[i]=doorTarget[i]>o?Math.min(1,o+dt*1.8):Math.max(0,o-dt*1.8);
    if(TILE[i]!==10&&TILE[i]!==42&&TILE[i]!==50&&TILE[i]!==62&&doorTarget[i]===1&&doorOpen[i]>=1){doorTimer[i]+=dt;if(doorTimer[i]>5&&!occupied(i)){doorTarget[i]=0;doorTimer[i]=0;if(Math.hypot((i%MW)+.5-P.x,((i/MW)|0)+.5-P.y)<8)sfx.door();}}}
}
function updateEnemy(e,dt){
  if(e.dead)return;const K=KINDS[e.k],D=DIFF[SET.diff];e.pain-=dt;e.cool-=dt;if(e.buffT>0){e.buffT-=dt;e.cool-=dt*.6;}
  if(K.rf){if(e.k==='gt')updateGuitar(e,dt);else if(e.k==='dz')updateDancer(e,dt);return;}
  if(K.ctrl){updateCtrl(e,dt);return;}
  if(K.harkun){updateHarkun(e,dt);return;}
  if(K.ochered){updateOchered(e,dt);return;}
  if(K.semyanka){updateSemyanka(e,dt);return;}
  if(K.storozh){updateStorozh(e,dt);return;}
  if(K.mason){updateMason(e,dt);return;}if(K.pipe&&e.hidden){updatePipe(e,dt);return;}if(K.jumper&&(e.perch||e.jump)){updateJumper(e,dt);return;}if(K.brig){updateBrig(e,dt);return;}
  if(K.bro&&!G.bossOn)return;
  if(K.dvornik&&!G.dvOn)return;
  if(K.roller){updateRoller(e,dt);return;}
  if(K.granny){updateGranny(e,dt);return;}
  if(e.stun>0){e.stun-=dt;return;}
  const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.12;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.alert){if(d<K.sight&&e.see)wake(e,true);return;}
  if(K.spider){
    if(e.state==='face'){e.x=P.x;e.y=P.y;return;}
    if(e.state==='leap'){e.t+=dt;const k=Math.min(1,e.t/.42),nx=e.lx0+(e.ltx-e.lx0)*k,ny=e.ly0+(e.lty-e.ly0)*k;
      if(!solidR(nx,ny,.18)){e.x=nx;e.y=ny;}e.z=Math.sin(k*Math.PI)*.55;
      if(G.state==='play'&&!G.face&&Math.hypot(e.x-P.x,e.y-P.y)<.8&&k>.45){attachSpider(e);return;}
      if(k>=1){e.z=0;e.state='chase';e.cool=1.1;}return;}
    if(e.pain>0)return;
    if(e.see&&d<2.7&&d>.6&&e.cool<=0&&!G.face){e.state='leap';e.t=0;e.lx0=e.x;e.ly0=e.y;e.ltx=P.x+(P.vx||0)*.3;e.lty=P.y+(P.vy||0)*.3;sfx.skitter();return;}
  }
  /* Кочегар (floor 1, guards the breaker): shovel, coal toss, wide coal spray; catches fire at half health */
  if(K.coal){
    if(!e.phase2&&e.hp<e.max*.5){e.phase2=true;e.state='chase';e.stun=0;G.bark='КОЧЕГАР: «Ну всё… жара пошла!»';G.barkT=3;sfx.roar();G.flash=1.2;G.shake=.5;fireRing(e.x,e.y,1.4,8);}
    e.sprayCd=(e.sprayCd==null?3:e.sprayCd)-dt;
    if(e.state==='sprayWind'){e.t-=dt;if(e.t<=0){e.state='chase';e.cool=.5;const a0=Math.atan2(dy,dx),n=e.phase2?7:5;
      for(let i=0;i<n;i++){const a=a0+(i/(n-1)-.5)*1.1;ents.push({kind:'proj',spr:'coal',fire:true,x:e.x+Math.cos(a)*.4,y:e.y+Math.sin(a)*.4,vx:Math.cos(a)*6.5,vy:Math.sin(a)*6.5,life:2.5,dmg:9});}
      sfx.throwIt();G.shake=.2;}return;}
    if(e.see&&e.cool<=0&&e.state==='chase'&&d>1.6&&d<7&&e.sprayCd<=0){e.state='sprayWind';e.t=e.phase2?.45:.65;e.sprayCd=e.phase2?4:5.5;G.bark='КОЧЕГАР: «В топку!»';G.barkT=1.6;sfx.bark(78);return;}
  }
  /* Батя (bonus basement, the clan's boss): haymaker, ground pound, grab-and-throw, calls the gang; phase 2 at half */
  if(K.kingpin){
    if(!e.phase2&&e.hp<e.max*.5){e.phase2=true;e.state='chase';e.stun=0;G.bark='БАТЯ: «Ну всё, сынок…»';G.barkT=3;sfx.roar();G.flash=1.2;G.shake=.7;dustRing(e.x,e.y,2);boilerRage();}
    e.poundCd=(e.poundCd==null?2.5:e.poundCd)-dt;e.grabCd=(e.grabCd==null?3.5:e.grabCd)-dt;e.callCd=(e.callCd==null?5:e.callCd)-dt;
    if(e.state==='poundWind'){e.t-=dt;if(e.t<=0){e.state='chase';e.cool=.6;batyaPound(e);}return;}
    if(e.state==='grabLunge'){e.t-=dt;const ox=e.x,oy=e.y;moveBody(e,e.gvx*7,e.gvy*7,dt,.3);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;
      if(Math.hypot(e.x-P.x,e.y-P.y)<1.15&&!G.grab&&G.state==='play'){G.grab={e,t:1,tick:.1};e.state='grabHold';sfx.punch();G.shake=.4;G.bark='БАТЯ: «Иди сюда!»';G.barkT=1.4;return;}
      if(e.t<=0){e.state='chase';e.cool=.7;}return;}
    if(e.state==='grabHold'){const g=G.grab;if(!g||g.e!==e){e.state='chase';return;}
      const a=Math.atan2(P.y-e.y,P.x-e.x),tx=e.x+Math.cos(a)*.75,ty=e.y+Math.sin(a)*.75;if(!solidR(tx,ty,.24)){P.x=tx;P.y=ty;}
      g.t-=dt;g.tick-=dt;if(g.tick<=0){g.tick=.3;hurtPlayer(5);}
      if(g.t<=0){G.grab=null;moveBody(P,Math.cos(a)*22,Math.sin(a)*22,.12,.24);hurtPlayer(e.phase2?20:15);sfx.punch();G.shake=.6;e.state='chase';e.cool=.9;}return;}
    if(e.state==='callWind'){e.t-=dt;if(e.t<=0){e.state='chase';e.cool=.4;callGang(e);}return;}
    if(e.see&&e.cool<=0&&e.state==='chase'){
      if(e.callCd<=0){e.state='callWind';e.t=.6;e.callCd=e.phase2?10:14;G.bark='БАТЯ: «Пацаны, сюда!»';G.barkT=2;sfx.bark(80);return;}
      if(d<3&&d>1.2&&e.poundCd<=0){e.state='poundWind';e.t=e.phase2?.5:.7;e.poundCd=e.phase2?4:5.5;G.bark='БАТЯ: «Лежать!»';G.barkT=1.4;sfx.bark(80);return;}
      if(d<2.6&&d>.9&&e.grabCd<=0){e.state='grabLunge';e.t=.38;const a=Math.atan2(dy,dx);e.gvx=Math.cos(a);e.gvy=Math.sin(a);e.grabCd=e.phase2?4.5:6.5;return;}
    }
  }
  /* Дворник (Дом 11, the shed): rock-salt shotgun, broom sweep, whirlwind; burns the leaf piles at half */
  if(K.dvornik){
    if(!e.phase2&&e.hp<e.max*.5){e.phase2=true;e.state='chase';e.stun=0;e.shells=2;G.bark='ДВОРНИК: «Я этот двор тридцать лет мету!»';G.barkT=3;sfx.roar();G.flash=1;G.shake=.5;fireRing(e.x,e.y,2.2,10);
      for(const l of ents)if(l.kind==='prop'&&l.t==='leaves'){fireRing(l.x,l.y,.6,5);ents.push({kind:'fire',x:l.x,y:l.y,life:12});}}
    e.shotCd=(e.shotCd==null?1.2:e.shotCd)-dt;e.sweepCd=(e.sweepCd==null?.8:e.sweepCd)-dt;e.spinCd=(e.spinCd==null?6:e.spinCd)-dt;if(e.shells==null)e.shells=2;
    if(e.state==='aimWind'){e.t-=dt;if(e.t<=0){saltShot(e);e.shells--;e.burst--;
        if(e.burst>0&&e.shells>0){e.t=.3;return;}
        if(e.shells<=0){e.state='reload';e.t=e.phase2?1.1:1.6;G.bark='ДВОРНИК: «Где ж патроны…»';G.barkT=1.6;}else{e.state='chase';e.cool=.5;}}return;}
    if(e.state==='reload'){e.t-=dt;if(e.t<=0){e.shells=2;e.state='chase';sfx.latch();}return;}
    if(e.state==='sweepWind'){e.t-=dt;if(e.t<=0){broomSweep(e,d,dx,dy);e.state='chase';e.cool=.6;}return;}
    if(e.state==='spinWind'){e.t-=dt;if(e.t<=0){e.state='spin';e.t=e.phase2?4:3;e.tick=0;}return;}
    if(e.state==='spin'){e.t-=dt;e.tick-=dt;const sp=(e.phase2?4.3:3.5)*D.spd,ox=e.x,oy=e.y;moveBody(e,dx/d*sp,dy/d*sp,dt,.3);e.walk+=Math.hypot(e.x-ox,e.y-oy)*6;
      e.fxT=(e.fxT||0)-dt;if(e.fxT<=0){e.fxT=.05;const a=G.t*13;for(const k of [0,2.1,4.2])spawnFx(Math.random()<.3?'leafFx':'puff',e.x+Math.cos(a+k)*.8,e.y+Math.sin(a+k)*.8,.35);}
      e.swT=(e.swT||0)-dt;if(e.swT<=0){e.swT=.28;sfx.whoosh();}
      if(e.phase2){e.trailT=(e.trailT||0)-dt;if(e.trailT<=0){e.trailT=.28;ents.push({kind:'fire',x:e.x,y:e.y,life:2.6});}}
      if(d<1.25){if(e.tick<=0){e.tick=.3;hurtPlayer(7);G.shake=.2;moveBody(P,dx/d*7,dy/d*7,.08,.24);}}
      else if(d<4)moveBody(P,-dx/d*1.5,-dy/d*1.5,dt,.24);
      if(e.t<=0){e.state='dizzy';e.t=1.4;G.bark='ДВОРНИК: «Ох… голова кружится…»';G.barkT=1.5;}return;}
    if(e.state==='dizzy'){e.t-=dt;if(e.t<=0)e.state='chase';return;}
    if(e.see&&e.cool<=0&&e.state==='chase'){
      if(d<2.3&&e.sweepCd<=0){e.state='sweepWind';e.t=e.phase2?.3:.42;e.sweepCd=e.phase2?1.5:2.3;sfx.bark(100);return;}
      if(d>2&&d<11&&e.spinCd<=0){e.state='spinWind';e.t=.6;e.spinCd=e.phase2?8:11;G.bark='ДВОРНИК: «Сейчас подмету!»';G.barkT=1.8;sfx.bark(96);return;}
      if(d>1.8&&d<11&&e.shotCd<=0){e.state='aimWind';e.t=e.phase2?.4:.6;e.shotCd=e.phase2?2.2:3.2;e.burst=e.phase2?2:1;G.bark='ДВОРНИК: «'+['Солью получишь!','Стой, стрелять буду!','Пшёл вон со двора!'][(Math.random()*3)|0]+'»';G.barkT=1.4;return;}}
  }
  if(K.smotr){e.callCd=(e.callCd==null?9:e.callCd)-dt;
    if(!e.phase2&&e.hp<e.max*.5){e.phase2=true;e.state='chase';e.stun=0;G.bark='СМОТРЯЩИЙ: «Пацаны! Ко мне!!»';G.barkT=3;sfx.roar();G.flash=.8;G.shake=.4;callGang(e);e.callCd=12;}
    else if(e.phase2&&e.callCd<=0&&e.state==='chase'){e.callCd=13;G.bark='СМОТРЯЩИЙ: «Ещё пацаны!»';G.barkT=2;sfx.bark(90);callGang(e);}}
  /* brothers: grief window, then rage */
  if(e.griefT>0){e.griefT-=dt;if(e.griefT<=0){e.rage=true;e.raged=true;G.bark=K.name+': «Ну всё… ты труп!»';G.barkT=2.6;sfx.roar();}return;}
  if(e.state==='brawl'){
    const o=ents.find(x=>x!==e&&x.kind==='enemy'&&!x.dead&&KINDS[x.k].bro);
    e.brawlT-=dt;if(!o||e.brawlT<=0){e.state='chase';e.cool=.6;return;}
    const bx=o.x-e.x,by=o.y-e.y,bd=Math.hypot(bx,by)||1;
    if(bd>1.1){const ox=e.x,oy=e.y;moveBody(e,bx/bd*K.speed,by/bd*K.speed,dt,.26);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;}
    else{e.hitT-=dt;e.swing=(e.hitT<.2);if(e.hitT<=0){e.hitT=.55;o.hp-=7;o.pain=.1;spawnFx('blood',o.x,o.y,.3);sfx.punch();if(o.hp<=0)killEnemy(o);}}
    return;}
  if(e.state==='eat'){e.t-=dt;if(e.t<=0)e.state='chase';return;}
  if(e.state==='lure'){
    if(!lure||e.lure!==lure||(e.see&&d<2.2&&!K.drunk)){e.state='chase';e.lure=null;e.atLure=false;return;}
    const lx=lure.x-e.x,ly=lure.y-e.y,ld=Math.hypot(lx,ly);
    if(ld<.75){e.atLure=true;return;}
    e.atLure=false;let vx,vy;
    if(los(e.x,e.y,lure.x,lure.y)){vx=lx/ld;vy=ly/ld;}
    else{const nx=flowNext(e.x|0,e.y|0,LUREF);if(!nx){e.state='chase';return;}const ni=nx[1]*MW+nx[0];if(ISD[TILE[ni]]&&doorOpen[ni]<.85&&ni!==BDOOR){doorTarget[ni]=1;doorTimer[ni]=0;return;}const tx=nx[0]+.5-e.x,ty=nx[1]+.5-e.y,tm=Math.hypot(tx,ty)||1;vx=tx/tm;vy=ty/tm;}
    const ox=e.x,oy=e.y,spd=K.speed*D.spd*(K.drunk?1.4:1.15);moveBody(e,vx*spd,vy*spd,dt,.26);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;return;}
  if(e.state==='wake'){e.t-=dt;if(e.t<=0)e.state='chase';return;}
  const ranged=K.ranged||(K.thrower&&!e.rage&&d>2.6),rage=e.rage?1:0;
  if(e.state==='attack'&&K.bro&&!e.throwing&&d>.8){const ox=e.x,oy=e.y;moveBody(e,dx/d*K.speed*.7,dy/d*K.speed*.7,dt,.26);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;}
  if(e.state==='attack'){e.t-=dt;if(e.t<=0){
      if(e.throwing||(ranged&&!K.bro)){e.throwing=false;const lead=K.thrower?Math.min(1,d/10):0,tx2=P.x+(P.vx||0)*lead,ty2=P.y+(P.vy||0)*lead,a=Math.atan2(ty2-e.y,tx2-e.x)+(Math.random()-.5)*.06,sp=K.thrower?10:7,spr=K.coal?'coal':K.seedspit?'seed':K.thrower?['jar','stool','bottleG'][(Math.random()*3)|0]:null;
        for(const off of (K.coal&&e.phase2)?[-.22,0,.22]:[0])ents.push({kind:'proj',spr,fire:!!K.coal,x:e.x+Math.cos(a+off)*.35,y:e.y+Math.sin(a+off)*.35,vx:Math.cos(a+off)*sp,vy:Math.sin(a+off)*sp,life:3,seed:!!K.seedspit,dmg:K.coal?10:K.thrower?9+Math.random()*6:K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0])});(K.thrower||K.coal)?sfx.throwIt():sfx.spit();}
      else if(d<K.reach+(K.bro?.7:.35)&&e.see){hurtPlayer((K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0]))*(rage?1.4:1));sfx.punch();if(K.drunk&&G.state==='play'){P.bleed=3;msg('КРОВЬ!');}}
      e.state='chase';e.cool=K.rate*(.8+Math.random()*.4)*(rage?.7:1);if(K.combo&&Math.random()<.5)e.cool=.18;}return;}
  if(e.pain>0&&!K.bro&&!K.boss)return;
  /* boombox guy keeps his distance and strafes; after the box breaks he panics, then fights */
  if(K.boom){
    if(e.box>0){e.barkT=(e.barkT==null?2:e.barkT)-dt;if(e.barkT<=0){e.barkT=5+Math.random()*4;if(e.see)bark(e);}
      const sp=K.speed*D.spd;
      if(e.see&&d<4.2){if(fleeStep(e,dt,sp*1.15))return;}
      else if(e.see&&d<8.5){const ox=e.x,oy=e.y;moveBody(e,-dy/d*e.sdir*sp*.8,dx/d*e.sdir*sp*.8,dt,.26);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;if(Math.random()<dt*.5||Math.hypot(e.x-ox,e.y-oy)<sp*dt*.2)e.sdir*=-1;return;}}
    else if(e.panicT>0){e.panicT-=dt;if(fleeStep(e,dt,K.speed*D.spd*1.4))return;}}
  /* runner with the fuse: legs it, gets winded every few seconds */
  if(K.runner){if(e.tired>0){e.tired-=dt;return;}
    if(d<11){e.runT=(e.runT||0)+dt;if(e.runT>6){e.runT=0;e.tired=1.8;G.bark='ШУСТРЫЙ: «Фух… запыхался…»';G.barkT=2;sfx.bark(K.pitch);return;}
      if(e.see&&G.barkT<=0&&Math.random()<dt*.4)bark(e);if(fleeStep(e,dt,K.speed*D.spd))return;}
    else return;}
  /* drunk: stumbles every few seconds */
  if(K.drunk){if(e.stumble>0){e.stumble-=dt;return;}e.stT-=dt;if(e.stT<=0){e.stumble=.65;e.stT=3+Math.random()*2.5;return;}}
  /* dog: barks while chasing, stops to eat pelmeni on the floor */
  if(K.dog){e.woofT-=dt;if(e.woofT<=0){e.woofT=2.2+Math.random()*1.5;sfx.woof();makeNoise(6);}
    for(const it of ents)if(it.kind==='item'&&!it.taken&&it.t==='pelmeni'&&Math.abs(it.x-e.x)<1&&Math.abs(it.y-e.y)<1){it.taken=true;e.state='eat';e.t=3.5;return;}}
  if(e.k==='kl'||(K.kingpin&&e.phase2)){
    e.chargeCd=(e.chargeCd==null?3:e.chargeCd)-dt;
    if(e.state==='chargeWind'){e.t-=dt;if(e.t<=0){e.state='charge';e.t=.75;const a=Math.atan2(dy,dx);e.cvx=Math.cos(a);e.cvy=Math.sin(a);}return;}
    if(e.state==='charge'){e.t-=dt;const ox=e.x,oy=e.y,sp=7.5*(rage?1.2:1);moveBody(e,e.cvx*sp,e.cvy*sp,dt,.3);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;
      if(Math.hypot(e.x-P.x,e.y-P.y)<1.05){hurtPlayer(22*(rage?1.4:1));sfx.punch();moveBody(P,e.cvx*14,e.cvy*14,.09,.24);G.shake=.3;e.state='chase';e.cool=.8;return;}
      if(Math.hypot(e.x-ox,e.y-oy)<sp*dt*.3){e.state='chase';e.stun=1.1;sfx.clunk();G.bark=K.name+': «Ай, стена!»';G.barkT=1.6;return;}
      if(e.t<=0){e.state='chase';e.cool=.5;}return;}
    if(e.see&&d>2.2&&d<9&&e.chargeCd<=0){e.state='chargeWind';e.t=.45;e.chargeCd=3.5+Math.random()*1.5;G.bark=K.name+': «'+(K.kingpin?'Иди к бате!':'А ну иди сюда!')+'»';G.barkT=1.8;sfx.bark(88);return;}
  }
  if(K.thrower&&!rage&&e.hp<e.max*.5&&d>2.6&&e.state==='chase'&&e.see&&e.cool<=0&&Math.random()<dt*1.6){
    for(const off of [-.22,0,.22]){const a=Math.atan2(dy,dx)+off;ents.push({kind:'proj',spr:['jar','stool','bottleG'][(Math.random()*3)|0],x:e.x+Math.cos(a)*.35,y:e.y+Math.sin(a)*.35,vx:Math.cos(a)*8,vy:Math.sin(a)*8,life:3,dmg:9+Math.random()*6});}
    sfx.throwIt();e.cool=K.rate;return;}
  if(K.coal&&e.see&&d>2.6&&d<10&&e.cool<=0&&Math.random()<dt*(e.phase2?2.4:1.5)){e.state='attack';e.t=.5;e.throwing=true;return;}
  const reach=K.reach;
  if(e.see&&e.cool<=0){if(!ranged&&d<reach){e.state='attack';e.t=K.wind*(rage?.7:1)*(e.phase2?.7:1);return;}if(ranged&&d<10&&Math.random()<dt*(K.thrower?3.4:2.6)){e.state='attack';e.t=K.wind;e.throwing=!!K.thrower;return;}}
  let vx=0,vy=0;
  if(ranged&&e.see&&d<3.2&&!K.thrower){vx=-dx/d;vy=-dy/d;}
  else if(ranged&&e.see&&d<7){vx=-dy/d*e.sdir*.75;vy=dx/d*e.sdir*.75;if(Math.random()<dt*.6)e.sdir*=-1;}
  else if(e.see&&d<6){if(d<.75)return;vx=dx/d;vy=dy/d;
    if(K.drunk){const sw=Math.sin(G.t*5+e.id*1.7)*1.1;vx+=-dy/d*sw;vy+=dx/d*sw;}}
  else{const nx=flowNext(e.x|0,e.y|0);if(!nx)return;const ni=nx[1]*MW+nx[0];if(ISD[TILE[ni]]&&doorOpen[ni]<.85){if(ni===BDOOR)return;doorTarget[ni]=1;doorTimer[ni]=0;return;}const tx=nx[0]+.5-e.x,ty=nx[1]+.5-e.y,tm=Math.hypot(tx,ty)||1;vx=tx/tm;vy=ty/tm;
    if(K.drunk){const sw=Math.sin(G.t*5+e.id*1.7)*.8;vx+=-ty/tm*sw;vy+=tx/tm*sw;}}
  const ox=e.x,oy=e.y,spd=K.speed*D.spd*(rage?1.5:1)*(e.phase2?1.3:1)*(e.buffT>0?1.35:1);moveBody(e,vx*spd,vy*spd,dt,K.dog?.2:.26);
  for(const o of ents){if(o===e||o.kind!=='enemy'||o.dead)continue;const sx=e.x-o.x,sy=e.y-o.y;if(Math.abs(sx)>.6||Math.abs(sy)>.6)continue;const sd=Math.hypot(sx,sy);if(sd<.55&&sd>.001){const px=e.x+sx/sd*(.55-sd)*.5,py=e.y+sy/sd*(.55-sd)*.5;if(!solidR(px,py,.26)&&!roomBlock(e,px,py,.26)){e.x=px;e.y=py;}}}
  if(Math.hypot(e.x-P.x,e.y-P.y)<.55){e.x=ox;e.y=oy;}
  e.walk+=Math.hypot(e.x-ox,e.y-oy)*3.2;
}
function updateProj(dt){for(const p of ents){if(p.kind!=='proj'||p.dead)continue;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;
  if(p.arc){const kk=1-p.life/p.T;p.z=.5+Math.sin(Math.min(1,kk)*Math.PI)*1.6;}
  if(p.life<=0&&p.arc&&Math.hypot(p.x-P.x,p.y-P.y)<.95){p.dead=true;if(p.seed)seedHurt(p.dmg);else hurtPlayer(p.dmg);sfx.punch();continue;}
  if(p.life<=0||(!p.air&&sightBlock(p.x|0,p.y|0))){p.dead=true;if(p.fire){const bx=p.x-p.vx*.03,by=p.y-p.vy*.03;ents.push({kind:'fire',x:bx,y:by,life:3.5});}continue;}if(Math.hypot(p.x-P.x,p.y-P.y)<.35&&(!p.arc||p.life<p.T*.3)){p.dead=true;if(p.seed)seedHurt(p.dmg);else hurtPlayer(p.dmg);if(p.kb){moveBody(P,p.vx*.45,p.vy*.45,.1,.24);G.shake=Math.max(G.shake,.15);}if(p.fire)ents.push({kind:'fire',x:P.x,y:P.y,life:2.5});}}}
function updateFx(dt){for(const f of ents)if(f.kind==='fx')f.life-=dt;}
function updateAmbience(){if(!AU.c)return;const z=ZONE[(P.y|0)*MW+(P.x|0)];const t=AU.c.currentTime;const on=G.state==='play'||G.state==='menu'||G.state==='lift'||G.state==='shop'||G.state==='ride';
  {let best=null,bd=1e9;if(G.state==='play')for(const e of ents){if(e.kind!=='enemy'||e.dead||!KINDS[e.k].worker)continue;if(e.alert&&e.state!=='attack')continue;const dd=Math.hypot(e.x-P.x,e.y-P.y);if(dd<bd){bd=dd;best=e;}}
  let v=0;if(best){v=Math.pow(Math.max(0,1-bd/26),1.3)*.16;if(AU.drillPan){let ra=Math.atan2(best.y-P.y,best.x-P.x)-P.a;AU.drillPan.pan.setTargetAtTime(Math.max(-1,Math.min(1,Math.sin(ra))),t,.05);}}
  if(AU.drill)AU.drill.gain.setTargetAtTime(v,t,.1);}
  if(AU.boom){let best=null,bd=1e9;if(G.state==='play'||G.state==='breaker'||G.state==='keypad')for(const e of ents){if(e.kind!=='enemy'||e.dead||e.k!=='mg'||!(e.box>0))continue;const dd=Math.hypot(e.x-P.x,e.y-P.y);if(dd<bd){bd=dd;best=e;}}
    let v=0;if(best&&bd<24){v=Math.pow(1-bd/24,1.4)*.55;if(AU.boomPan){const ra=Math.atan2(best.y-P.y,best.x-P.x)-P.a;AU.boomPan.pan.setTargetAtTime(Math.max(-1,Math.min(1,Math.sin(ra))),t,.05);}
      AU.boomLP.frequency.setTargetAtTime(los(P.x,P.y,best.x,best.y)?5000:650,t,.15);}
    AU.boom.gain.setTargetAtTime(v,t,.12);
    if(v>.004){if(AU.boomNext<t)AU.boomNext=t+.02;while(AU.boomNext<t+.15){boomStep(AU.boomStep++,AU.boomNext);AU.boomNext+=.155;}}}
  AU.hum.gain.setTargetAtTime(on&&z!==Z_OUT&&z>=0?(z===Z_BASE?(G.power?.05:.02):.035):0,t,.3);AU.wind.gain.setTargetAtTime(on&&z===Z_OUT?(G.level===7?.1:.05):.004,t,.4);updateRoofAudio();cityBirds();bossMusic();updateCityAudio();}

