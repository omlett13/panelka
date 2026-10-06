'use strict';
/* ---------- КРЫША: гитарист, танцоры, вертолёт, бугаи ---------- */
const GTRCH=[[82.41,123.47,164.81,196,246.94,329.63],[130.81,164.81,196,261.63,329.63],[98,123.47,146.83,196,246.94,392],[146.83,220,293.66,369.99]];
const GTRPAT=[1,0,1,-1,0,-1,1,-1];
function gPluck(f,t,v,sq){const c=AU.c;const o=c.createOscillator();o.type=sq?'square':'sawtooth';o.frequency.setValueAtTime(f,t);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(sq?3800:2400,t);lp.frequency.exponentialRampToValueAtTime(420,t+.45);const g=c.createGain();o.connect(lp);lp.connect(g);g.connect(AU.gtrIn);env(g,t,.004,v,sq?.9:.5);o.start(t);o.stop(t+1.1);}
function gStrum(t,ch,dir,v,sq){const n=ch.length;for(let i=0;i<n;i++){const j=dir>0?i:n-1-i;gPluck(ch[j],t+i*.011,v,sq);}}
function gtrInit(){if(AU.gtr||!AU.c)return;const c=AU.c;AU.gtrIn=c.createGain();const out=c.createGain();out.gain.value=0;if(c.createStereoPanner){const pn=c.createStereoPanner();AU.gtrIn.connect(pn);pn.connect(out);AU.gtrPan=pn;}else AU.gtrIn.connect(out);out.connect(AU.m);AU.gtr=out;AU.gtrNext=0;AU.gtrStep=0;}
function gStrumNow(){if(!AU.c||!AU.gtrIn)return;const t=AU.c.currentTime;gStrum(t,GTRCH[0].map(f=>f*.5),1,.3,true);gStrum(t+.02,GTRCH[0],1,.25,true);}
function updateRoofAudio(){if(!AU.c)return;const t=AU.c.currentTime;gtrInit();if(!AU.gtr)return;
  const e=G.level===7&&G.state==='play'?ents.find(o=>o.kind==='enemy'&&o.k==='gt'&&!o.dead):null;
  let v=0;if(e&&!(e.stumble>0)){const d=Math.hypot(e.x-P.x,e.y-P.y);v=Math.pow(Math.max(0,1-d/30),1.2)*(e.started?.6:.4);if(AU.gtrPan){const ra=Math.atan2(e.y-P.y,e.x-P.x)-P.a;AU.gtrPan.pan.setTargetAtTime(Math.max(-1,Math.min(1,Math.sin(ra))),t,.05);}}
  AU.gtr.gain.setTargetAtTime(v,t,v>0?.08:.02);
  if(v>.004){const st=e.started?.19:.26;if(AU.gtrNext<t)AU.gtrNext=t+.02;while(AU.gtrNext<t+.15){const s=AU.gtrStep++,bar=(s>>3)%4,d=GTRPAT[s&7];if(d)gStrum(AU.gtrNext,GTRCH[bar],d,d>0?.12:.08);AU.gtrNext+=st;}}
  const h=RF.heli;if(h&&G.state==='play'&&t>(RF.rotT||0)){RF.rotT=t+.085;const d=Math.hypot(h.x-P.x,h.y-P.y,h.z);const vol=Math.min(1.1,1.4*Math.max(0,1-d/70));if(vol>.01){nz(.09,'lowpass',240,1,vol,.07);nz(.05,'bandpass',1100,1.5,vol*.25,.04);}}}
function gtEnt(){return ents.find(o=>o.kind==='enemy'&&o.k==='gt');}
function gtStart(e){if(e.started)return;e.started=true;e.alert=true;e.chorusT=.8;e.throwT=3.2;e.chordT=6;e.stag=0;e.stumble=0;G.gtT=0;
  G.bark='ГИТАРИСТ: «О, слушатель! Пацаны — танцуем!»';G.barkT=3;sfx.bark(KINDS.gt.pitch);msg('ГИТАРИСТ');}
function gtChorus(e){G.bark='ГИТАРИСТ: «'+['Припев!','Все танцуют!','Пацаны, рубашки долой!','Ещё раз!'][(Math.random()*4)|0]+'»';G.barkT=2.2;sfx.bark(KINDS.gt.pitch);
  for(const o of ents)if(o.kind==='enemy'&&o.k==='dz'&&!o.dead){if(o.ds==='hang'){o.ds='strip';o.t=.35+Math.random()*.6;}else if(o.ds==='dazed')o.ds='dance';}}
function updateGuitar(e,dt){
  const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  e.poseT=(e.poseT||0)-dt;e.swingT=(e.swingT||0)-dt;
  if(!e.started){e.z=.42;if((d<8.5&&e.see)||e.alert)gtStart(e);return;}
  G.gtT+=dt;
  if(e.stumble>0){e.stumble-=dt;if(e.stumble<=0)e.chorusT=.4;return;}
  if(!e.phase2&&e.hp<e.max*.5){e.phase2=true;e.z=0;e.chorusT=.5;G.bark='ГИТАРИСТ: «Второй куплет!»';G.barkT=2.4;sfx.bark(KINDS.gt.pitch);spawnFx('puff',e.x,e.y,.5);}
  if(!e.phase2)e.z=.42;
  e.chorusT-=dt;if(e.chorusT<=0){e.chorusT=e.phase2?7:9;gtChorus(e);}
  if(e.state==='chordWind'){e.wt-=dt;if(e.wt<=0){e.state='play';gStrumNow();G.shake=Math.max(G.shake,.5);spawnFx('puff',e.x,e.y,.4);
      if(d<5.2&&e.see){const k=1-d/5.2;hurtPlayer(9+k*9);RF.kb={x:dx/d*(5+6*k),y:dy/d*(5+6*k),t:.35};}}return;}
  e.throwT-=dt;e.chordT-=dt;
  if(e.chordT<=0&&d<5){e.chordT=e.phase2?4.2:6;e.state='chordWind';e.wt=.75;e.moving=false;G.bark='ГИТАРИСТ: «И-и… АККОРД!»';G.barkT=1.3;sfx.bark(KINDS.gt.pitch*1.2);return;}
  if(e.throwT<=0&&e.see&&d>2.2){e.throwT=e.phase2?1.6:2.4;e.poseT=.35;const a=Math.atan2(dy,dx);for(const off of e.phase2?[-.15,.15]:[0])ents.push({kind:'proj',spr:'bottleG',x:e.x+Math.cos(a+off)*.4,y:e.y+Math.sin(a+off)*.4,vx:Math.cos(a+off)*7.5,vy:Math.sin(a+off)*7.5,life:3,dmg:8+Math.random()*5});nz(.2,'bandpass',900,1,.3,.15);}
  if(e.phase2){
    if(d>1.35){let vx=dx/d,vy=dy/d;if(!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}const ox=e.x,oy=e.y;moveBody(e,vx*1.4,vy*1.4,dt,e.rad);e.walk=(e.walk||0)+Math.hypot(e.x-ox,e.y-oy)*3.2;e.moving=true;}
    else{e.moving=false;if(e.cool<=0){e.cool=1.2;e.swingT=.3;hurtPlayer(13+Math.random()*6);sfx.punch();G.shake=Math.max(G.shake,.3);}}}}
function updateDancer(e,dt){const gt=gtEnt();e.t=(e.t||0)-dt;
  if(e.kbT>0){e.kbT-=dt;moveBody(e,e.kbx,e.kby,dt,e.rad);return;}
  if(e.ds==='flee'){const a=Math.atan2(e.y-P.y,e.x-P.x);const ox=e.x,oy=e.y;moveBody(e,Math.cos(a)*3.4,Math.sin(a)*3.4,dt,e.rad);e.walk=(e.walk||0)+Math.hypot(e.x-ox,e.y-oy)*3.2+dt*2;if(e.t<=0){e.dead=true;e.hidden=true;}return;}
  if(!gt||gt.dead||e.ds==='hang')return;
  if(e.ds==='strip'){if(e.t<=0){e.bare=true;e.ds='dance';spawnFx('puff',e.x,e.y,.4);sfx.slap();if(e.ang==null)e.ang=Math.atan2(e.y-gt.y,e.x-gt.x);}return;}
  if(gt.stumble>0&&e.ds==='dance')e.ds='dazed';
  if(e.ds!=='dance')return;
  const I=Math.min(1,(G.gtT||0)/45)+(gt.phase2?.3:0);e.ang+=dt*(1+I*1.2);const r=Math.max(1.35,2.5-.8*I);
  const tx=gt.x+Math.cos(e.ang)*r,ty=gt.y+Math.sin(e.ang)*r,vx=tx-e.x,vy=ty-e.y,l=Math.hypot(vx,vy);
  if(l>.05){const sp=Math.min(5.5,l*6);moveBody(e,vx/l*sp,vy/l*sp,dt,e.rad);}}
function rfHit(e,dmg){const gt=gtEnt();
  if(e.k==='gg'){sfx.tink();spawnFx('puff',e.x,e.y,.2);if(G.barkT<.8&&Math.random()<.35){G.bark='БУГАЙ: «'+KINDS.gg.bark[(Math.random()*3)|0]+'»';G.barkT=1.6;sfx.bark(70);}return;}
  if(e.k==='dz'){if(gt&&!gt.started)gtStart(gt);e.hp-=dmg*.4;e.pain=.12;const a=Math.atan2(e.y-P.y,e.x-P.x);e.kbx=Math.cos(a)*7;e.kby=Math.sin(a)*7;e.kbT=.18;if(e.hp<=0)killEnemy(e);return;}
  if(e.k==='gt'){if(!e.started)gtStart(e);e.hp-=dmg;e.pain=.07;e.stag=(e.stag||0)+dmg;
    if(e.stag>=100&&!(e.stumble>0)){e.stag=0;e.stumble=2.6;e.state='play';G.bark='ГИТАРИСТ: «Ай! Струна!»';G.barkT=2;sfx.twang();for(const o of ents)if(o.kind==='enemy'&&o.k==='dz'&&!o.dead&&o.ds==='dance')o.ds='dazed';}
    if(e.hp<=0)killEnemy(e);}}
function rfFrame(e){const K=KINDS[e.k];
  if(e.k==='gt'){if(e.hidden)return null;let p;if(e.dead)p='dead';else if(e.stumble>0)p='squat';else if(e.state==='chordWind')p='chord';else if(e.swingT>0)p='swing';else if(e.moving)p=((e.walk|0)%2)?'walk1':'walk2';else if(e.poseT>0)p='stand';else p=((G.t*5.3|0)%2)?'play1':'play2';
    return {d:SPR.gt[p]||SPR.gt.stand,sc:K.scale,lift:e.dead?0:(e.z||0),tint:(e.pain>0||e.state==='chordWind')&&!e.dead};}
  if(e.k==='dz'){if(e.hidden)return null;let d;if(e.dead)d=e.bare?SPR.dzB.dead:SPR.dz.dead;else if(!e.bare)d=e.ds==='strip'?SPR.dz.spit:SPR.dz.squat;
    else if(e.ds==='dance')d=SPR.dzB[((G.t*4+e.id*.5)|0)%2?'dance1':'dance2'];else if(e.ds==='flee')d=SPR.dzB[((e.walk|0)%2)?'walk1':'walk2'];else d=SPR.dzB.stand;return {d,sc:K.scale,tint:e.pain>0&&!e.dead};}
  if(e.k==='gg'){if(e.hidden)return null;const p=e.landT>0?'land':e.grab?'grab':e.moving?(((e.walk|0)%2)?'walk1':'walk2'):'stand';return {d:SPR.gg[p],sc:K.scale,lift:e.z||0};}
  return null;}
function sprCv(k){if(RF.cvs[k])return RF.cvs[k];const a=k==='vodkaFly'?SPR.vodkaFly[0]:SPR[k];const [c,g]=cv(64,64);const id=g.createImageData(64,64);const u=new Uint32Array(id.data.buffer);for(let i=0;i<4096;i++){const v=a[i];u[i]=v?(v|0xff000000)>>>0:0;}g.putImageData(id,0,0);RF.cvs[k]=c;return c;}
const STREETB=[[4,45,20,47],[24,45,40,47],[44,45,60,47],[0,35,7,42],[56,35,63,42]];
function streetTex(on){for(let i=31*MW;i<N;i++){if(ZONE[i]!==Z_OUT)continue;const y=(i/MW)|0;FLOORTEX[i]=!on?TX.far:(y<=35||y>=43)?TX.walk:y===39?TX.roadL:TX.road;}
  for(const [x0,y0,x1,y1] of STREETB)for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const i=y*MW+x;TILE[i]=on?1:0;TALLOK[i]=on?1:0;FLOORTEX[i]=on?TX.tar:TX.far;}}
function roofInit(){RF.heli=null;RF.spot=false;RF.rain=[];RF.kb=null;G.rc=null;G.roll=0;P.pitch=0;G.dawn=.2;G.gtT=0;skyMixK=-1;setDawn(G.dawn);
  for(const e of ents)if(e.kind==='enemy'&&e.k==='dz'){e.ds='hang';e.t=0;}}
function lookAt(tx,ty,tz,dt,rate){const dx=tx-P.x,dy=ty-P.y,dd=Math.hypot(dx,dy)||.001;let da=Math.atan2(dy,dx)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));const q=Math.min(1,dt*(rate||4));P.a+=da*q;
  const th=Math.max(-1.2,Math.min(.9,Math.atan2(tz-P.camZ,dd)));P.pitch+=(Math.tan(th)*RPROJ/RH-P.pitch)*q;}
function pickHover(){let best=null,bs=-1e9;for(let i=0;i<16;i++){const a=i/16*Math.PI*2,x=P.x+Math.cos(a)*5.5,y=P.y+Math.sin(a)*5.5;if(!inB(x|0,y|0)||solidR(x,y,.7))continue;const s=-x;if(s>bs){bs=s;best={x,y};}}return best||{x:P.x-1.5,y:P.y};}
function roofWin(gt){if(G.rc)return;G.cleared=true;G.rc={ph:'quiet',t:0,lock:true,H:pickHover(),fade:0};keys.clear();mouseFire=false;
  for(const p of ents)if(p.kind==='proj')p.dead=true;
  for(const o of ents)if(o.kind==='enemy'&&o.k==='dz'&&!o.dead){o.ds='flee';o.t=2.6;}
  G.bark='ГИТАРИСТ: «…струна…»';G.barkT=1.5;}
function spawnGiant(x,y,z){const K=KINDS.gg;ents.push({kind:'enemy',k:'gg',x,y,z,vz:0,hp:K.hp,max:K.hp,state:'idle',t:0,cool:0,alert:true,pain:0,walk:0,id:eid++,rad:.5,stT:0,stun:0,losT:0,see:false,sdir:1,box:0});nz(.4,'bandpass',500,.8,.4,.35);}
function updateGiantPhys(g2,dt){if(g2.z>0){g2.vz+=20*dt;g2.z-=g2.vz*dt;if(g2.z<=0){g2.z=0;g2.landT=.7;G.shake=1.1;sfx.thud();for(let i=0;i<5;i++)spawnFx('puff',g2.x+(Math.random()-.5)*1.4,g2.y+(Math.random()-.5)*1.4,.5);}}
  if(g2.landT>0)g2.landT-=dt;}
function startCatch(g2){const rc=G.rc;rc.ph='catch';rc.t=0;rc.lock=true;rc.g=g2;g2.grab=true;keys.clear();mouseFire=false;sfx.punch();G.shake=.6;G.bark='БУГАЙ: «Попался.»';G.barkT=1.4;sfx.bark(64);for(const o of ents)if(o.kind==='enemy'&&o.k==='gg')o.moving=false;}
function throwDir(){let best=0,bd=1e9;for(let i=0;i<24;i++){const a=i/24*Math.PI*2;for(let s=.5;s<12;s+=.25){const x=P.x+Math.cos(a)*s,y=P.y+Math.sin(a)*s;if(!inB(x|0,y|0))break;const i2=(y|0)*MW+(x|0);if(TILE[i2]!==0)break;if(ZONE[i2]===Z_VOID){if(s<bd){bd=s;best=a;}break;}}}G.rc.tdist=bd<1e9?bd+1.2:2;return best;}
function shakeOut(){const list=[];const add=(k,n)=>{for(let i=0;i<n;i++)list.push(k);};
  add('rub',Math.min(10,1+(G.rub/40|0)));if(P.ammo9>0)add('ammo9',Math.min(4,1+(P.ammo9/12|0)));if(P.shells>0)add('shells',2);if(P.vodka>0)add('vodkaFly',Math.min(3,P.vodka));if(P.has[2])add('obrez',1);if(P.has[3])add('tapok',1);add('pmGround',1);add('pelmeni',1);add('kvass',1);
  list.sort(()=>Math.random()-.5);
  list.forEach((k,i)=>RF.rain.push({k,x:140+Math.random()*120,y:200+Math.random()*30,vx:(Math.random()-.5)*90,vy:-(60+Math.random()*90),rot:Math.random()*6,vr:(Math.random()-.5)*8,s:1.4,t:-i*.13}));
  G.rub=0;P.ammo9=0;P.shells=0;P.vodka=0;P.kefir=0;P.has=[1,0,0,0];P.w=0;for(const k in UP)UP[k]=0;P.armor=0;}
function startFall(){const rc=G.rc;rc.ph='fall';rc.t=0;RF.heli=null;RF.spot=false;for(const o of ents)if(o.kind==='enemy'&&o.k==='gg')o.hidden=true;P.x=32;P.y=31.5;P.a=Math.PI/2;P.camZ=15;G.roll=.4;G.dawn=1;streetTex(true);}
function landHay(){const rc=G.rc;rc.ph='land';rc.t=0;P.camZ=.95;P.y=42.25;G.shake=1.2;sfx.thud();nz(.5,'lowpass',1400,.7,.9,.45);
  for(let i=0;i<34;i++){const a=Math.random()*Math.PI*2,s=.6+Math.random()*2;ents.push({kind:'hay',x:32+(Math.random()-.5)*1.6,y:43+(Math.random()-.5)*.8,z:.6+Math.random()*.5,vx:Math.cos(a)*s,vy:Math.sin(a)*s*.6,vz:1+Math.random()*2.2,life:3+Math.random()*2});}}
function startDrop(){G.drop={t:0};keys.clear();mouseFire=false;G.bark='ТЫ: «А-А-А!»';G.barkT=2;nz(1.1,'bandpass',600,.8,.5,1);}
function updateDrop(dt){const d=G.drop;d.t+=dt;P.pitch+=(-1.3-P.pitch)*Math.min(1,dt*3);G.roll+=dt*(2+d.t*4);P.camZ=Math.max(.05,.5-d.t*.4);
  if(d.t>1.3&&G.state==='play'){G.dropDead=true;G.drop=null;G.roll=0;P.pitch=0;P.hp=0;endGame('dead');}}
function roofSkipToChase(){for(const e of ents)if(e.kind==='enemy'&&(e.k==='gt'||e.k==='dz')){e.dead=true;e.hidden=true;}G.cleared=true;G.dawn=1;skyMixK=-1;setDawn(1);
  P.x=12;P.y=8.5;P.a=0;RF.heli={x:7,y:8.5,z:4.3};RF.spot=true;spawnGiant(6.5,7.2,0);spawnGiant(6.5,9.8,0);G.rc={ph:'chase',t:0,lock:false,H:{x:7,y:8.5},fade:0};msg('БЕГИ!');}
function updateRoof(dt){
  if(G.drop){updateDrop(dt);return;}
  {const c=(P.y|0)*MW+(P.x|0);if(!(G.rc&&G.rc.lock)&&FLCH[c]===111&&ZONE[c]===Z_VOID){startDrop();return;}}
  const rc=G.rc;
  const target=rc?1:Math.min(.55,.2+(G.gtT||0)/150);G.dawn+=(target-G.dawn)*Math.min(1,dt*(rc?.3:.5));setDawn(G.dawn);
  if(RF.kb){RF.kb.t-=dt;moveBody(P,RF.kb.x,RF.kb.y,dt,.24);RF.kb.x*=.9;RF.kb.y*=.9;if(RF.kb.t<=0)RF.kb=null;}
  for(const f of ents)if(f.kind==='hay'){f.life-=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.z+=f.vz*dt;f.vz-=3.5*dt;f.vx*=.98;f.vy*=.98;if(f.z<.02){f.z=.02;f.vz=0;f.vx=0;f.vy=0;}}
  for(const r of RF.rain){const was=r.t<0;r.t+=dt;if(r.t<0)continue;if(was)(Math.random()<.5?sfx.cash:sfx.tink)();r.x+=r.vx*dt;r.y+=r.vy*dt;r.vy-=320*dt;r.rot+=r.vr*dt;r.s*=Math.pow(.55,dt);}
  RF.rain=RF.rain.filter(r=>r.y>-50&&r.t<3.5);
  if(!rc)return;rc.t+=dt;const t=rc.t,H2=rc.H,h=RF.heli;
  const giants=ents.filter(o=>o.kind==='enemy'&&o.k==='gg');
  for(const g2 of giants)updateGiantPhys(g2,dt);
  switch(rc.ph){
   case 'quiet':if(t>1.7){RF.heli={x:H2.x+56,y:H2.y-14,z:9,sx:H2.x+56,sy:H2.y-14};rc.ph='heli';rc.t=0;}break;
   case 'heli':{const k=Math.min(1,t/5.2),e2=1-Math.pow(1-k,2.2);h.x=h.sx+(H2.x-h.sx)*e2;h.y=h.sy+(H2.y-h.sy)*e2;h.z=9+(3.8-9)*e2;lookAt(h.x,h.y,h.z+2.6,dt,3.2);
     if(t>1.2&&!rc.b1){rc.b1=1;G.bark='ТЫ: «…Это что?»';G.barkT=2.2;}
     if(k>=1){rc.ph='jump';rc.t=0;RF.spot=true;}break;}
   case 'jump':{h.z=3.8+Math.sin(t*2.2)*.12;
     if(t>.5&&!rc.j1){rc.j1=1;spawnGiant(H2.x-.7,H2.y,h.z-.4);}
     if(t>1.5&&!rc.j2){rc.j2=1;spawnGiant(H2.x+.7,H2.y+.35,h.z-.4);}
     const fall=giants.filter(o=>o.z>0),fg=fall.length?fall[fall.length-1]:giants[giants.length-1];
     if(fg)lookAt(fg.x,fg.y,(fg.z||0)+1.7,dt,5);else lookAt(h.x,h.y,h.z+2.4,dt,3);
     if(t>3.1){rc.ph='nope';rc.t=0;G.bark='БУГАЙ: «Ну привет.»';G.barkT=1.8;sfx.bark(65);}break;}
   case 'nope':{const g0=giants[0];if(g0&&t<1.1)lookAt(g0.x,g0.y,1.8,dt,5);
     if(t>1&&!rc.n1){rc.n1=1;G.bark='ТЫ: «ДА НУ НАФИГ»';G.barkT=2.4;G.shake=.25;}
     if(t>1.1&&giants.length){let cx=0,cy=0;for(const o of giants){cx+=o.x;cy+=o.y;}cx/=giants.length;cy/=giants.length;const aw=Math.atan2(P.y-cy,P.x-cx);let da=aw-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));P.a+=da*Math.min(1,dt*7);P.pitch*=Math.max(0,1-dt*6);}
     if(t>1.8){rc.ph='chase';rc.t=0;rc.lock=false;P.pitch=0;msg('БЕГИ!');keys.clear();if(G.cp)G.cp.chase=true;}break;}
   case 'chase':{P.pitch*=Math.max(0,1-dt*6);
     const tx=P.x-Math.cos(P.a)*1.5,ty=P.y-Math.sin(P.a)*1.5;h.x+=(tx-h.x)*Math.min(1,dt*.7);h.y+=(ty-h.y)*Math.min(1,dt*.7);h.z=4.3+Math.sin(G.t*2)*.15;
     const last=P.x<17&&P.y>16.5&&P.y<29,sp=last?6:3.3;if(last&&!rc.lastB){rc.lastB=1;G.bark='БУГАЙ: «Всё, тупик.»';G.barkT=2;sfx.bark(64);}
     for(let gi=0;gi<giants.length;gi++){const g2=giants[gi],dx=P.x-g2.x,dy=P.y-g2.y,d=Math.hypot(dx,dy)||.001;if(d<1.2){startCatch(g2);break;}const sp2=gi?sp*.9:sp;
       let vx=dx/d,vy=dy/d;if(d>2.2||!los(g2.x,g2.y,P.x,P.y)){const n=flowNext(g2.x|0,g2.y|0);if(n){const qx=n[0]+.5-g2.x,qy=n[1]+.5-g2.y,l=Math.hypot(qx,qy)||1;vx=qx/l;vy=qy/l;}}
       const ox=g2.x,oy=g2.y;{const nx=g2.x+vx*sp2*dt;if(!solidR(nx,g2.y,.28))g2.x=nx;const ny=g2.y+vy*sp2*dt;if(!solidR(g2.x,ny,.28))g2.y=ny;}g2.walk+=Math.hypot(g2.x-ox,g2.y-oy)*1.6;g2.moving=true;
       g2.stepT=(g2.stepT||0)-dt;if(g2.stepT<=0){g2.stepT=.42;sfx.thudS();}}
     if(G.barkT<=0&&Math.random()<dt*.35){G.bark='БУГАЙ: «'+['Стоять!','Не беги, хуже будет.','Далеко собрался?'][(Math.random()*3)|0]+'»';G.barkT=1.8;sfx.bark(66);}
     break;}
   case 'catch':{const g0=rc.g;if(h){h.z=4.3+Math.sin(G.t*2)*.15;}
     if(t<3.5)lookAt(g0.x,g0.y,1.9,dt,6);
     if(t<.7){const k=t/.7;G.roll=Math.PI*(1-Math.cos(k*Math.PI))/2;P.camZ=.5+.75*k;}
     else if(t<3.5){if(!rc.shook){rc.shook=1;shakeOut();G.bark='БУГАЙ: «Карманы!»';G.barkT=1.6;sfx.bark(64);}
       G.roll=Math.PI+Math.sin(t*23)*.13;P.camZ=1.25+Math.sin(t*31)*.07;G.shake=Math.max(G.shake,.12);
       if(t>2.2&&!rc.c2){rc.c2=1;G.bark='БУГАЙ: «Всё? Всё. Лети.»';G.barkT=1.8;sfx.bark(64);}}
     else{if(!rc.th){rc.th=1;rc.tdir=throwDir();rc.tx0=P.x;rc.ty0=P.y;G.bark='ТЫ: «А-А-А-А!»';G.barkT=2.2;nz(.9,'bandpass',700,.8,.5,.8);}
       const k=Math.min(1,(t-3.5)/1.2);P.x=rc.tx0+Math.cos(rc.tdir)*k*rc.tdist;P.y=rc.ty0+Math.sin(rc.tdir)*k*rc.tdist;P.camZ=1.25+Math.sin(k*Math.PI)*.8;G.roll+=dt*9;P.pitch+=(-.3-P.pitch)*Math.min(1,dt*4);
       rc.fade=Math.max(0,(t-4.1)/.6);if(t>4.8)startFall();}
     break;}
   case 'fall':{rc.fade=Math.max(0,1-t/.35);const k=Math.min(1,t/2.25);P.camZ=Math.max(.95,15-.5*5.55*t*t);P.y=31.5+(42.25-31.5)*Math.pow(k,1.15);P.x=32;
     P.a=Math.PI/2+Math.sin(t*1.7)*.12;G.roll=.4*Math.cos(t*2.3)*(1-k);
     const th=Math.atan2(P.camZ-.6,Math.max(.4,42-P.y));P.pitch=-Math.tan(Math.min(.85,th))*RPROJ/RH;
     if(t>.8&&!rc.f1){rc.f1=1;G.bark='ТЫ: «…ПМ?!»';G.barkT=1.4;}
     if(P.camZ<=.95)landHay();break;}
   case 'land':{P.camZ+=(.72-P.camZ)*Math.min(1,dt*3);P.pitch+=(.85-P.pitch)*Math.min(1,dt*1.5);G.roll*=Math.max(0,1-dt*5);
     if(t>.7&&!rc.l1){rc.l1=1;G.bark='ВОДИТЕЛЬ: «…Ты откуда свалился?!»';G.barkT=2.4;sfx.bark(125);}
     if(t>2.3&&!rc.l2){rc.l2=1;G.bark='ТЫ: «С крыши.»';G.barkT=1.8;}
     if(t>3.6&&!rc.l3){rc.l3=1;transition(()=>{P.x=34.4;P.y=40.3;P.a=Math.atan2(42.6-40.3,35.2-34.4);P.camZ=.5;P.pitch=0;G.roll=0;rc.ph='street';rc.t=0;rc.lock=false;keys.clear();msg('ПОДБЕРИ ПМ');},.5);}
     break;}
   case 'street':if(rc.endT>0){rc.endT-=dt;if(rc.endT<=0&&!G.trans){transition(()=>{enterLevel(8);msg('ГОРОД');},.6);}}break;
  }}

function startCut(e){if(G.cut||G.dvOn)return;G.cut={t:0,e,fired:false,x0:P.x,y0:P.y};keys.clear();mouseFire=false;e.alert=true;e.state='chase';
  G.bark='ДВОРНИК: «Кто в сарай полез?!»';G.barkT=2.4;sfx.bark(100);}
function updateCut(dt){const c=G.cut,e=c.e;c.t+=dt;
  if(c.t<1){const ta=Math.atan2(e.y-P.y,e.x-P.x);let da=ta-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));P.a+=da*Math.min(1,dt*6);return;}
  if(!c.fired){c.fired=true;sfx.shotgun();sfx.shotgun();G.flash=1.8;G.shake=.9;G.hurt=1;hurtPlayer(12);G.bark='ДВОРНИК: «Солью заряжено!»';G.barkT=2.2;
    for(let i=0;i<8;i++)spawnFx('puff',P.x+(Math.random()-.5),P.y+(Math.random()-.5),.4);c.fx=P.x;c.fy=P.y;}
  const k=Math.min(1,(c.t-1)/.55),ease=1-Math.pow(1-k,2);
  const pts=c.fy<16.6?[[c.fx,c.fy],[11.5,16.5],[11.5,21.8]]:[[c.fx,c.fy],[c.fx,c.fy+.01],[c.fx,Math.min(c.fy+5,24)]];
  const seg=ease<.3?0:1,t2=seg?(ease-.3)/.7:ease/.3,A=pts[seg],B=pts[seg+1];P.x=A[0]+(B[0]-A[0])*t2;P.y=A[1]+(B[1]-A[1])*t2;P.a=-Math.PI/2;P.camZ=.5-Math.sin(k*Math.PI)*.18;
  if(c.t>=1.9){P.camZ=.5;G.cut=null;G.dvOn=true;e.x=11.5;e.y=15;e.state='chase';e.cool=.8;e.shotCd=2;msg('ДВОРНИК');}}
function fleeStep(e,dt,sp){const cx=e.x|0,cy=e.y|0;let best=null,bv=FLOW[cy*MW+cx];
  for(const [ox,oy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const nx=cx+ox,ny=cy+oy;if(!passFlow(nx,ny))continue;if(ox&&oy&&(!passFlow(cx+ox,cy)||!passFlow(cx,cy+oy)))continue;
    const ni=ny*MW+nx;if(ISD[TILE[ni]]&&doorOpen[ni]<.85){if(FLOW[ni]>bv&&FLOW[ni]<9000&&ni!==BDOOR){doorTarget[ni]=1;doorTimer[ni]=0;}continue;}const v=FLOW[ni]+(ox&&oy?-.3:0);if(v>bv&&FLOW[ni]<9000){bv=v;best=[nx,ny];}}
  if(!best)return false;const tx=best[0]+.5-e.x,ty=best[1]+.5-e.y,tm=Math.hypot(tx,ty)||1,ox=e.x,oy=e.y;moveBody(e,tx/tm*sp,ty/tm*sp,dt,.26);
  const m=Math.hypot(e.x-ox,e.y-oy);e.walk+=m*3.2;return m>sp*dt*.2;}
/* the boombox: nearby gopniki get faster, sleepers wake up; notes float off them */
function updateBoom(dt){G.boomT=(G.boomT||0)-dt;if(G.boomT>0)return;G.boomT=.25;
  for(const m of ents){if(m.kind!=='enemy'||m.dead||m.k!=='mg'||!(m.box>0))continue;
    if(Math.random()<.35)spawnFx('noteFx',m.x+(Math.random()-.5)*.6,m.y+(Math.random()-.5)*.6,.6);
    if(!m.alert)continue;
    for(const o of ents){if(o.kind!=='enemy'||o.dead||o===m||o.k==='mg'||KINDS[o.k].bro||KINDS[o.k].boss)continue;const dd=Math.hypot(o.x-m.x,o.y-m.y);
      if(dd<7){o.buffT=.45;if(Math.random()<.12)spawnFx('noteFx',o.x,o.y,.5);}if(!o.alert&&dd<8)wake(o,false);}}}
/* poplar fluff drifting around the yard in Дом 11 */
function updateFluff(dt){if(G.level!==4)return;let n=0;for(const f of ents)if(f.kind==='fluff'){n++;f.life-=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.z+=Math.sin(G.t*1.3+f.ph)*dt*.15-dt*.04;if(f.z<.05)f.life=0;}
  if(ZONE[(P.y|0)*MW+(P.x|0)]===Z_OUT&&n<45&&Math.random()<dt*14){const a=Math.random()*6.28,r=1.5+Math.random()*7,x=P.x+Math.cos(a)*r,y=P.y+Math.sin(a)*r;
    if(inB(x|0,y|0)&&ZONE[(y|0)*MW+(x|0)]===Z_OUT&&TILE[(y|0)*MW+(x|0)]===0)ents.push({kind:'fluff',x,y,z:.3+Math.random()*1.1,vx:.25+Math.random()*.2,vy:(Math.random()-.5)*.2,life:4+Math.random()*4,ph:Math.random()*6});}}
function dustRing(x,y,r){for(let i=0;i<14;i++){const a=i/14*Math.PI*2;ents.push({kind:'fx',t:'puff',x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,life:.5});}}
function batyaPound(e){sfx.shotgun();G.shake=.7;dustRing(e.x,e.y,1.2);dustRing(e.x,e.y,2.2);if(e.phase2)dustRing(e.x,e.y,3.2);
  const d=Math.hypot(P.x-e.x,P.y-e.y);if(d<(e.phase2?3.4:2.6)&&G.state==='play'){hurtPlayer(e.phase2?32:26);const a=Math.atan2(P.y-e.y,P.x-e.x);moveBody(P,Math.cos(a)*14,Math.sin(a)*14,.1,.24);}}
const REDUCED=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){return false;}})();
function callGang(e){const n=e.phase2?4:3,alive=ents.filter(x=>x.kind==='enemy'&&!x.dead&&x.summoned).length;if(alive>=5)return;let made=0;
  for(let tries=0;tries<80&&made<n;tries++){const a=Math.random()*Math.PI*2,r=3.5+Math.random()*3,x=e.x+Math.cos(a)*r,y=e.y+Math.sin(a)*r;
    if(!inB(x|0,y|0)||solidR(x,y,.3)||ZONE[(y|0)*MW+(x|0)]!==ZONE[(e.y|0)*MW+(e.x|0)]||Math.hypot(x-P.x,y-P.y)<3)continue;
    const K=KINDS.sq;ents.push({kind:'enemy',k:'sq',x,y,hp:K.hp*DIFF[SET.diff].hp,max:K.hp,state:'wake',t:.5,cool:.5,alert:true,pain:0,walk:0,id:eid++,rad:.32,stT:3,stun:0,rage:false,rageT:0,losT:0,see:false,sdir:1,summoned:1});
    spawnFx('puff',x,y,.5);made++;G.killTotal++;}}
function attachSpider(e){G.face={e,hits:0,t:0,drain:.3,hb:0,hitT:0};e.state='face';e.hidden=true;e.z=0;sfx.screech();G.hurt=1;G.shake=.7;P.faceHurt=1;mouseFire=false;}
function fireRing(x,y,r,n){for(let i=0;i<n;i++){const a=i/n*Math.PI*2,fx=x+Math.cos(a)*r,fy=y+Math.sin(a)*r;if(!solidR(fx,fy,.1))ents.push({kind:'fire',x:fx,y:fy,life:3.2});}}
function steamJets(){const c=Math.cos(P.a+Math.PI/2),s=Math.sin(P.a+Math.PI/2);for(const o of [0,-1.3,1.3]){const x=P.x+c*o,y=P.y+s*o;if(!solidR(x,y,.1))ents.push({kind:'vent',temp:1,x,y,warn:.8,life:2,ph:0});}}
function boilerRage(){for(const l of LIGHTS)if(l.c===FURN){l.w=l.w.map(v=>v*1.7);l.fl=3;}}
function bossCleared(){G.cleared=true;G.hasKey=true;G.bossOn=false;if(BDOOR>=0){doorTarget[BDOOR]=1;doorTimer[BDOOR]=-999;}G.clearT=5;sfx.ding();sfx.door();}
function bossStart(){G.bossOn=true;G.healT=8;if(BDOOR>=0)doorTarget[BDOOR]=0;sfx.doorsShut();
  for(const e of ents)if(e.kind==='enemy'&&!e.dead&&KINDS[e.k].bro){e.alert=true;e.state='chase';e.cool=.8;}
  G.bark='ТОЛЯН: «Э, ты чё на нашей хате забыл?»';G.barkT=3.2;sfx.bark(165);}
function meleeTarget(range,ang){let best=null,bd=range;for(const e of ents){if(e.kind!=='enemy'||e.dead)continue;const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d>bd)continue;let da=Math.atan2(dy,dx)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<ang&&los(P.x,P.y,e.x,e.y)){best=e;bd=d;}}return best;}
function hitscan(a,dmg){const dx=Math.cos(a),dy=Math.sin(a),wd=rayDist(P.x,P.y,dx,dy,24),wdL=G.level===11?rayDistLow(P.x,P.y,dx,dy,24):wd;let best=null,bd=wd;
  for(const e of ents){if(e.kind!=='enemy'||e.dead||e.hidden)continue;const ex=e.x-P.x,ey=e.y-P.y,al=ex*dx+ey*dy,lim=(e.z||0)>=.9?wdL:wd;if(al<=.05||al>=Math.min(best?bd:1e9,lim))continue;if(Math.abs(ex*dy-ey*dx)<e.rad){best=e;bd=al;}}
  let rb=null,rd=best?bd:wd;for(const r of ents){if(r.kind!=='roll'||r.dead)continue;const ex=r.x-P.x,ey=r.y-P.y,al=ex*dx+ey*dy;if(al<=.05||al>=rd)continue;if(Math.abs(ex*dy-ey*dx)<.3){rb=r;rd=al;}}
  if(rb){smashRoll(rb,0);return;}
  if(best){hitEnemy(best,dmg);spawnFx('blood',P.x+dx*(bd-.15),P.y+dy*(bd-.15),.3);}else{spawnFx('puff',P.x+dx*(wd-.08),P.y+dy*(wd-.08),.3);const hx=(P.x+dx*(wd+.03))|0,hy=(P.y+dy*(wd+.03))|0;if(inB(hx,hy)&&TILE[hy*MW+hx]===49)wallHit(hy*MW+hx,dmg);}}
function wname(i){return i===0?(UP.kastet?'КАСТЕТ':'КУЛАК'):i===1?(UP.tt?'ТТ':'ПМ'):i===3?(UP.gvozd?'ТАПОК+':UP.tapok2?'ТАПКИ':'ТАПОК'):(UP.dvust?'ДРОБОВИК':'ОБРЕЗ');}
function fire(){
  if(G.state!=='play'||G.cut||(G.rc&&G.rc.lock)||G.drop)return;
  G.shotId=(G.shotId||0)+1;
  if(G.face){const f=G.face;
    if(P.w===1&&P.ammo9>0){P.ammo9--;sfx.pistol();G.flash=1;P.cool=.34;}else if(P.w===2&&P.shells>0){P.shells--;sfx.shotgun();G.flash=1.4;P.cool=UP.dvust?.75:.95;}else{sfx.punch();P.cool=.42;P.punch=1;}
    P.anim=0;f.hits++;f.hitT=.25;sfx.squish();G.shake=.25;
    if(f.hits>=3){const e=f.e;e.hidden=false;e.x=P.x+Math.cos(P.a)*1.1;e.y=P.y+Math.sin(P.a)*1.1;if(solidR(e.x,e.y,.2)){e.x=P.x;e.y=P.y;}killEnemy(e);G.face=null;G.goo=1.2;msg('СОРВАЛ!');}
    return;}
  if(P.w===3){const out=ents.filter(s=>s.kind==='slipper'&&!s.dead).length,mx=UP.tapok2?2:1;if(out>=mx){P.cool=.1;return;}
    const n=mx-out;for(let k=0;k<n;k++){const a=P.a+(n>1?(k?.09:-.09):0),c=Math.cos(a),s=Math.sin(a);ents.push({kind:'slipper',x:P.x+c*.3,y:P.y+s*.3,vx:c*12,vy:s*12,t:0,back:false,spin:k*.5});}
    P.cool=.4;P.throwT=.28;sfx.throwIt();makeNoise(3);return;}
  if(P.w===0){P.cool=.42;P.anim=0;P.punch=1;const t=meleeTarget(1.35,.5);if(t){hitEnemy(t,UP.kastet?20+Math.random()*12:9+Math.random()*8);sfx.punch();spawnFx('blood',t.x,t.y,.3);}else{const f=frontTarget();if(f&&f.t==='boarded')boardHit(f.i,UP.kastet?2:1);else sfx.whoosh();}makeNoise(3);return;}
  if(P.w===1){if(P.ammo9<=0){sfx.click();msg('ПАТРОНЫ КОНЧИЛИСЬ');P.cool=.3;selectW(P.has[2]&&P.shells>0?2:0);return;}
    P.ammo9--;P.cool=.34;P.anim=0;P.punch=0;G.flash=1;sfx.pistol();hitscan(P.a+(Math.random()-.5)*.03,UP.tt?16+Math.random()*9:11+Math.random()*8);makeNoise(14);return;}
  if(P.shells<=0){sfx.click();msg('ДРОБЬ КОНЧИЛАСЬ');P.cool=.3;selectW(P.ammo9>0?1:0);return;}
  P.shells--;P.cool=UP.dvust?.75:.95;P.anim=0;P.punch=0;G.flash=1.4;sfx.shotgun();for(let i=0,n=UP.dvust?9:7;i<n;i++)hitscan(P.a+(Math.random()-.5)*.2,6+Math.random()*6);makeNoise(20);
  {const c=Math.cos(P.a),s=Math.sin(P.a),d=rayDist(P.x,P.y,c,s,3.5);if(d<3.5){const i=((P.y+s*(d+.05))|0)*MW+((P.x+c*(d+.05))|0);if(TILE[i]===25)boardHit(i,3);}}
}
/* vodka: thrown bottle arcs, smashes, gopniki run to it */
const LURE_BARKS=['О, водяра!','Халява!','Моё! Не трожь!','Пацаны, бухло!'];
function throwVodka(){
  if(G.state!=='play'){sfx.tick();return;}
  if(P.vodka<=0){sfx.click();msg('ВОДКИ НЕТ');return;}
  P.vodka--;P.throwT=.35;sfx.throwIt();
  const c=Math.cos(P.a),s=Math.sin(P.a);
  ents.push({kind:'bottle',x:P.x+c*.3,y:P.y+s*.3,vx:c*7.5,vy:s*7.5,z:.55,vz:2.2,spin:0});
}
/* boarded door: punch it or blast it */
function boardHit(i,n){G.boardHP[i]=(G.boardHP[i]==null?3:G.boardHP[i])-n;const x=(i%MW)+.5,y=((i/MW)|0)+.5;spawnFx('puff',x,y,.35);
  if(G.boardHP[i]>0){sfx.clunk();G.shake=.15;msg('ТРЕЩИТ…');return;}
  TILE[i]=6;ZONE[i]=Z_HALL;DOORS.push(i);doorOpen[i]=0;doorTarget[i]=1;doorTimer[i]=0;sfx.smash();G.shake=.35;msg('ДВЕРЬ ВЫЛОМАНА');makeNoise(12);computeFlow();}
/* slipper: flies out, slaps the first gopnik, comes back to your hand */
const SLAP_BARKS=['Ты чё, тапком?!','Ай! Как мамка!','Э, тапок убери!','За что?!'];
function slap(e){const K=KINDS[e.k];
  if(K.granny){sfx.slap();if(e.gs==='sit'||e.gs==='calm'){e.offT=9;e.sus=0;G.bark='БАБКА: «Ах ты! Хамло!»';G.barkT=2.2;sfx.bark(K.pitch);}else{e.gs='calm';e.t=0;e.offT=9;G.bark='БАБКА: «Ой… ой, сердце…»';G.barkT=2.2;sfx.bark(K.pitch);}return;}hitEnemy(e,(7+Math.random()*4)*(UP.gvozd?2.3:1));sfx.slap();if(UP.gvozd)spawnFx('blood',e.x,e.y,.3);if(e.dead)return;
  e.stun=(K.boss||K.bro)?.25:1.3;const a=Math.atan2(e.y-P.y,e.x-P.x);moveBody(e,Math.cos(a)*9,Math.sin(a)*9,.1,.26);
  if(!K.dog&&!K.rat&&!K.spider&&G.barkT<1.2&&Math.random()<.6){G.bark=(K.who||K.name||'ГОПНИК')+': «'+SLAP_BARKS[(Math.random()*SLAP_BARKS.length)|0]+'»';G.barkT=2.2;sfx.bark(K.pitch||150);}}
function updateSlippers(dt){for(const s of ents){if(s.kind!=='slipper'||s.dead)continue;s.t+=dt;s.spin+=dt*16;
  if(!s.back){const nx=s.x+s.vx*dt,ny=s.y+s.vy*dt;if(sightBlock(nx|0,ny|0)||s.t>.6){s.back=true;sfx.tick();}else{s.x=nx;s.y=ny;}
    for(const e of ents){if(e.kind!=='enemy'||e.dead||e.hidden)continue;if(Math.hypot(e.x-s.x,e.y-s.y)<e.rad+.25){slap(e);s.back=true;break;}}}
  else{const dx=P.x-s.x,dy=P.y-s.y,d=Math.hypot(dx,dy)||1;const sp=Math.min(14,4+s.t*9);s.x+=dx/d*sp*dt;s.y+=dy/d*sp*dt;if(d<.45||s.t>4){s.dead=true;sfx.swap();}}}}
function smash(x,y){
  sfx.smash();spawnFx('shards',x,y,.45);
  lure={x,y,life:7};ents.push({kind:'puddle',x,y,life:7});
  bfs(LUREF,x,y);let barked=false;
  const lc=(y|0)*MW+(x|0),bros=ents.filter(e=>e.kind==='enemy'&&!e.dead&&KINDS[e.k].bro);
  if(G.bossOn&&BROOM[lc]&&bros.length===2){
    if(!G.brawlUsed){G.brawlUsed=true;for(const b of bros){b.state='brawl';b.brawlT=4.5;b.hitT=.6;}G.bark='КОЛЯН: «Моё!»  ТОЛЯН: «Отдай!»';G.barkT=3;sfx.bark(90);}
    else{G.bark='КОЛЯН: «Опять?!»';G.barkT=2.4;sfx.bark(88);}}
  for(const e of ents){const K=KINDS[e.k];if(e.kind!=='enemy'||e.dead||K.boss||K.bro||K.dog||K.spider||K.granny)continue;
    if(LUREF[(e.y|0)*MW+(e.x|0)]<=(K.drunk?24:16)){e.alert=true;e.state='lure';e.lure=lure;e.atLure=false;
      if(!barked&&G.barkT<1.2){barked=true;G.bark='ГОПНИК: «'+LURE_BARKS[(Math.random()*LURE_BARKS.length)|0]+'»';G.barkT=2.6;sfx.bark(KINDS[e.k].pitch);}}}
}
function frontTarget(){for(let d=.35;d<=1.35;d+=.1){const cx=(P.x+Math.cos(P.a)*d)|0,cy=(P.y+Math.sin(P.a)*d)|0;if(!inB(cx,cy))return null;const i=cy*MW+cx,t=TILE[i];if(t===0)continue;if(t===25)return {i,t:'boarded'};if(t===30)return {i,t:G.flatKey?'door':'flatdoor'};if(t===38)return {i,t:'bdoor'};if(t===39)return {i,t:'metro'};if(t===42)return {i,t:'tdoor'};if(t===26&&!G.codeOK)return {i,t:'shed'};if(ISD[t])return {i,t:'door'};if(t===5)return {i,t:'lift'};if(t===8)return {i,t:'switch'};if(t===13)return {i,t:'panel'};if(t===24)return {i,t:'exit'};if(t===61)return {i,t:'gshut'};if(t===65)return {i,t:'seeds'};return null;}return null;}
