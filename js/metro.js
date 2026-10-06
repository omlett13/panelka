'use strict';
/* ---------- МЕТРО: the train, the ghost station, the controller ---------- */
const MT={doorsA:[],doorsG:[],ghostW:-1,bossW:-1,rumT:0,clackT:0};
function metroInit(){MT.doorsA=[];MT.doorsG=[];MT.doorsX=[];G.outside=false;G.siteDone=false;for(const i of DOORS){if(TILE[i]!==42)continue;const y=(i/MW)|0,x=i%MW;if(y===37){MT.doorsA.push(i);doorOpen[i]=1;doorTarget[i]=1;}else if(x<100)MT.doorsG.push(i);else MT.doorsX.push(i);}
  MT.ghostW=39*MW+76;MT.bossW=39*MW+112;G.trainMove=false;G.departed=false;G.departT=0;G.ghostOn=false;G.ghostDone=false;G.ghostEnd=false;G.ghostT=0;G.lockDoor=-1;G.wave=null;}
function inTrain(){return FLCH[(P.y|0)*MW+(P.x|0)]===114;}
function announce(s){G.bark='ДИКТОР: «'+s+'»';G.barkT=3.4;if(AU.c){tone('sine',784,784,.35,.22);tone('sine',622,622,.5,.22,.38);}}
function spawnEnemy(k,x,y){const K=KINDS[k],D=DIFF[SET.diff],rr=K.rad||.32*K.scale;if(solidR(x,y,rr)){let best=null,bd=1e9;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const cx=(x|0)+dx+.5,cy=(y|0)+dy+.5;if(solidR(cx,cy,rr))continue;const d=Math.hypot(cx-x,cy-y);if(d<bd){bd=d;best=[cx,cy];}}if(best){x=best[0];y=best[1];}}const e={kind:'enemy',k,x,y,hp:K.hp*D.hp,max:K.hp*D.hp,state:'chase',t:0,cool:.4,alert:true,pain:0,walk:0,id:eid++,rad:K.rad||.32*K.scale,stT:2,stun:0,rage:false,rageT:0,losT:0,see:false,sdir:1,box:K.box||0};ents.push(e);G.killTotal++;return e;}
function updateMetro(dt){
  const c=(P.y|0)*MW+(P.x|0);
  if(FLCH[c]===101)moveBody(P,0,1.4,dt,.24);
  metroSite();            // escalator carries you down
  // departure
  if(!G.departed){if(inTrain()&&!(G.departT>0)){G.departT=2.6;announce('Осторожно, двери закрываются! Следующая станция — «Стройка».');}
    if(G.departT>0){G.departT-=dt;if(G.departT<=0){if(inTrain()){for(const i of MT.doorsA)doorTarget[i]=0;G.departed=true;sfx.doorsShut&&sfx.doorsShut();setTimeout(()=>{G.trainMove=true;G.shake=.4;},900);}else G.departT=0;}}}
  // the ghost station
  if(G.departed&&!G.ghostOn&&!G.ghostDone&&P.x>65.3&&P.x<75&&P.y>38&&P.y<41){G.ghostOn=true;G.trainMove=false;G.shake=.8;G.ghostT=0;G.lockDoor=MT.ghostW;doorTarget[MT.ghostW]=0;sfx.brake();announce('Поезд дальше не пойдёт… Просьба освободить вагоны.');}
  if(G.ghostOn){G.ghostT+=dt;
    if(G.ghostT>1.6&&!G.wave){for(const i of MT.doorsG)doorTarget[i]=1;sfx.door();G.wave=[['sq',63,46.5],['sq',69,47],['sp',76,44],['br',70,43],['rk',77,47],['sq',64,43],['vr',73,47.5]].map(a=>spawnEnemy(a[0],a[1],a[2]));G.bark='ГОПНИК: «Наш вагон! Выходи!»';G.barkT=2.4;sfx.bark(140);}
    if(G.wave&&G.wave.every(e=>e.dead)&&!G.ghostEnd){G.ghostEnd=true;announce('Посадка заканчивается. Займите места в вагоне.');}
    if(G.ghostEnd&&inTrain()&&P.x>65&&P.x<75.5){G.ghostOn=false;G.ghostDone=true;G.ghostEnd=false;G.lockDoor=-1;announce('Осторожно, двери закрываются.');for(const i of MT.doorsG)doorTarget[i]=0;setTimeout(()=>{G.trainMove=true;G.shake=.4;},1200);if(G.cp)G.cp.metroMid=true;}}
  // the controller's car locks behind you
  const kt=ents.find(e=>e.kind==='enemy'&&e.k==='kt');
  if(kt&&!kt.dead&&P.x>113.3&&P.y>37.5&&P.y<41){G.lockDoor=MT.bossW;doorTarget[MT.bossW]=0;}
  // ride feel
  if(G.trainMove&&inTrain()){P.camZ+=Math.sin(G.time*8.5)*.006;MT.clackT-=dt;if(MT.clackT<=0){MT.clackT=.55;if(Math.random()<.5)G.shake=Math.max(G.shake,.06);if(AU.c){nz(.06,'lowpass',180,1,.35,.05);nz(.06,'lowpass',180,1,.3,.05,.12);}}}
  if(AU.c){if(!AU.rumble){const cx=AU.c,s=cx.createBufferSource();s.buffer=AU.noise;s.loop=true;const f=cx.createBiquadFilter();f.type='lowpass';f.frequency.value=160;const gn=cx.createGain();gn.gain.value=0;s.connect(f);f.connect(gn);gn.connect(AU.m);s.start();AU.rumble=gn;}
    AU.rumble.gain.setTargetAtTime(G.state==='play'&&G.trainMove&&inTrain()?.5:0,AU.c.currentTime,.4);}}
function metroSite(){if(G.siteDone)return;if(!G.outside&&P.x>114){G.outside=true;msg('СТРОЙКА');}if(G.outside&&P.y>65.2){G.siteDone=true;keys.clear();transition(()=>{enterLevel(10);msg('СТРОЙКА');},.8);}}
function metroSkipMid(){G.departed=true;G.ghostDone=true;G.trainMove=true;for(const i of MT.doorsA){doorTarget[i]=0;doorOpen[i]=0;}P.x=78.5;P.y=39.5;P.a=0;msg('МЕТРО · ПОСЛЕ ПЕРЕГОНА');}
/* КОНТРОЛЁР: punches, ticket-fine volleys, a charge down the aisle; at half health calls the fare-dodgers */
function updateCtrl(e,dt){const K=KINDS.kt,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.12;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.intro){if(d<10&&e.see){e.intro=true;e.alert=true;e.state='chase';e.throwT=2.4;e.chargeCd=4.5;G.bark='КОНТРОЛЁР: «Граждане, предъявляем билетики!»';G.barkT=3;sfx.bark(K.pitch);msg('КОНТРОЛЁР');}return;}
  if(!e.phase2&&e.hp<e.max*.5){e.phase2=true;G.bark='КОНТРОЛЁР: «Зайцы! Ко мне!»';G.barkT=2.4;sfx.bark(K.pitch*.9);const far=P.x<118?122.5:114.5;spawnEnemy('vr',far,38.5);spawnEnemy('sq',far,40.4);}
  const sp2=e.phase2?1.25:1;
  if(e.state==='chargeWind'){e.t-=dt;if(e.t<=0){e.state='charge';e.t=.8;e.hitC=false;const l=Math.hypot(e.cx-e.x,e.cy-e.y)||1;e.cdx=(e.cx-e.x)/l;e.cdy=(e.cy-e.y)/l;}return;}
  if(e.state==='charge'){e.t-=dt;const ox=e.x,oy=e.y;moveBody(e,e.cdx*9.5,e.cdy*9.5,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*2;
    if(!e.hitC&&Math.hypot(P.x-e.x,P.y-e.y)<.9){e.hitC=true;hurtPlayer(20+Math.random()*7);G.shake=.6;sfx.punch();moveBody(P,e.cdx*6,e.cdy*6,.12,.24);}
    if(e.t<=0||Math.hypot(e.x-ox,e.y-oy)<.02){e.state='chase';e.cool=.7;G.shake=Math.max(G.shake,.3);}return;}
  if(e.state==='attack'){e.t-=dt;if(e.t<=0){if(d<K.reach+.35){hurtPlayer(K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0]));sfx.punch();G.shake=.25;}e.state='chase';e.cool=K.rate/sp2;}return;}
  if(e.state==='aimWind'){e.t-=dt;if(e.t<=0){const a=Math.atan2(dy,dx),n=e.phase2?5:3;for(let i=0;i<n;i++){const o=(i/(n-1)-.5)*(e.phase2?.7:.45);ents.push({kind:'proj',spr:'ticket',x:e.x+Math.cos(a+o)*.4,y:e.y+Math.sin(a+o)*.4,vx:Math.cos(a+o)*8,vy:Math.sin(a+o)*8,life:2.5,dmg:7+Math.random()*4});}nz(.15,'bandpass',2200,1,.3,.1);e.state='chase';}return;}
  e.throwT-=dt;e.chargeCd-=dt;
  if(e.chargeCd<=0&&e.see&&d>2.4&&d<13){e.state='chargeWind';e.t=.6;e.cx=P.x;e.cy=P.y;e.chargeCd=e.phase2?4.2:6;G.bark='КОНТРОЛЁР: «'+pick(['Стоять! Штраф!','Куда без билета?!','Сейчас оформим!'])+'»';G.barkT=1.4;sfx.bark(K.pitch*1.1);return;}
  if(e.throwT<=0&&e.see&&d>2){e.throwT=e.phase2?1.5:2.4;e.state='aimWind';e.t=.35;return;}
  if(d<K.reach&&e.cool<=0){e.state='attack';e.t=K.wind;return;}
  let vx=dx/d,vy=dy/d;if(!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}
  if(d>K.reach*.8){const ox=e.x,oy=e.y,s=K.speed*D.spd*sp2;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}}

/* СТОРОЖ: fat drunk watchman by the gate. Talks until you ask for the key, then fights alone. */
const SW_HI=['А? Кто тут?.. Кооператив закрыт. Иди домой, сынок.','*ик* …Чего надо? Гаражи закрыты.','Не стой над душой. Видишь — сторожу.'];
const SW_TALK=['Я тут с семьдесят восьмого года сторожу. Ни одной машины не угнали. Почти.','Гаражи не открывай. Там у Михалыча «Жигуль» с характером — сам заводится.','Друзей у меня нет. Механики меня не любят, собаки тоже. Только она меня понимает. *гладит бутылку*','Пацаны с крыш опять петушками кидаются. Родители на работе, а я виноват.','Ворота закрыты. Ключ? Ключ при мне. Всегда при мне.'];
function wakeStorozh(e,line){if(!e.seated)return;e.seated=false;e.alert=true;e.intro=true;e.state='chase';e.rise=.7;e.cd=1.4;e.carT=3.5;G.bark='СТОРОЖ: «'+line+'»';G.barkT=2.8;sfx.bark(80);G.shake=Math.max(G.shake,.4);msg('СТОРОЖ');}
function facingStorozh(){for(const e of ents){if(e.kind!=='enemy'||e.k!=='sw'||e.dead||!e.seated)continue;const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d>2.6)continue;let a=Math.atan2(dy,dx)-P.a;a=Math.atan2(Math.sin(a),Math.cos(a));if(Math.abs(a)<.75)return e;}return null;}
function talkStorozh(e){openChoice('СТОРОЖ',pick(SW_HI),[
  {l:'ПОГОВОРИТЬ',f:()=>{talkSay(pick(SW_TALK));sfx.bark(85);}},
  {l:'ДАЙ КЛЮЧ ОТ ВОРОТ',f:()=>{talkSay('Ключ?.. Ключ?! От МОИХ ворот?! Ну держись, сынок…');sfx.bark(70);G.shake=.3;const go=()=>{if(G.state==='talk')talkClose();wakeStorozh(e,'Сейчас я тебе дам ключ!');};G.talk.opts=[{l:'…',f:go}];G.talk.sel=0;setTimeout(()=>{if(e.seated)go();},1900);}},
  {l:'ПОКА',f:talkClose}]);}
function laneSpan(px,py,ax,ay){let a=0,b=0;while(a<40&&!solidR(px-ax*(a+1),py-ay*(a+1),.5))a++;while(b<40&&!solidR(px+ax*(b+1),py+ay*(b+1),.5))b++;return [a,b];}
function sendLaneCar(both){const fx=Math.cos(P.a),fy=Math.sin(P.a);
  const opts=[];for(const [ax,ay] of [[1,0],[0,1]]){const sp=laneSpan(P.x,P.y,ax,ay);for(const s of [-1,1]){const dist=s<0?sp[0]:sp[1];if(dist<5)continue;opts.push({ax,ay,s,dist,front:(ax*fx+ay*fy)*s});}}
  if(!opts.length){G.bark='СТОРОЖ: «Тьфу, не проедет…»';G.barkT=1.6;return;}
  opts.sort((a,b)=>b.front-a.front);const o=opts[0];
  const n=both?2:1;for(let k=0;k<n;k++){const go=()=>{if(G.level!==11)return;ents.push({kind:'car',x:P.x+o.ax*o.s*o.dist,y:P.y+o.ay*o.s*o.dist,dx:-o.ax*o.s,dy:-o.ay*o.s,st:'go',v:7,c:(Math.random()*5)|0,hit:false,lane:1});};if(k)setTimeout(go,900);else go();}
  tone('square',420,420,.18,.12);tone('square',420,420,.18,.12,.28);tone('sawtooth',60,200,1.4,.08);msg('МАШИНА! УЙДИ С ДОРОГИ');}
function updateStorozh(e,dt){const K=KINDS.sw,dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  if(e.seated){e.alert=false;e.state='idle';if(e.pain>0||e.hp<e.max)wakeStorozh(e,'Ах ты ж!..');return;}
  if(e.rise>0){e.rise-=dt;e.z=Math.sin(Math.max(0,1-e.rise/.7)*Math.PI)*.9;if(e.rise<=0){e.z=0;G.shake=Math.max(G.shake,.6);sfx.thud();}return;}
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  const P2=e.hp<e.max*.5;if(P2&&!e.phase2){e.phase2=true;G.bark='СТОРОЖ: «Всё! Ты меня разозлил!»';G.barkT=2.4;sfx.bark(65);}
  e.cd-=dt;e.carT-=dt;
  if(e.state==='cWind'){e.t-=dt;if(e.t<=0){e.state='charge';e.t=1.1;e.cx=dx/d;e.cy=dy/d;sfx.bark(70);}return;}
  if(e.state==='charge'){e.t-=dt;const sp=8.5,ox=e.x,oy=e.y;moveBody(e,e.cx*sp,e.cy*sp,dt,e.rad);e.walk+=dt*14;
    if(!e.hitP&&d<1.3){e.hitP=true;hurtPlayer(SET.diff===2?28:22);G.knock={t:1.2,T:1.2,vx:e.cx*8,vy:e.cy*8,roll:(Math.random()<.5?-1:1)*.4};sfx.punch();G.shake=1;}
    if(Math.hypot(e.x-ox,e.y-oy)<sp*dt*.3){e.state='dizzy';e.t=1.8;sfx.clunk();G.shake=Math.max(G.shake,.6);G.bark='СТОРОЖ: «Ой… стенка…»';G.barkT=1.6;return;}
    if(e.t<=0){e.state='chase';e.cd=1.2;}return;}
  if(e.state==='dizzy'){e.t-=dt;if(e.t<=0){e.state='chase';e.cd=.8;}return;}
  if(e.state==='throwWind'){e.t-=dt;if(e.t<=0){for(let i=-1;i<=1;i++){const a=Math.atan2(dy,dx)+i*.24,T=Math.max(.55,d/8),r=d*(1+i*i*.08);ents.push({kind:'proj',spr:'bottleP',air:1,arc:1,x:e.x,y:e.y,vx:Math.cos(a)*r/T,vy:Math.sin(a)*r/T,life:T,T,dmg:8+Math.random()*4,z:.7});}sfx.clunk();e.state='chase';e.cd=P2?1.1:1.6;}return;}
  if(e.state==='stompUp'){e.t-=dt;const k=1-e.t/.7;e.z=Math.sin(Math.min(1,k)*Math.PI)*1.4;if(e.t<=0){e.z=0;e.state='chase';e.cd=1.4;G.shake=Math.max(G.shake,1.1);sfx.thud();sfx.smash();for(let i=0;i<8;i++)spawnFx('puff',e.x+Math.cos(i*.8)*1.4,e.y+Math.sin(i*.8)*1.4,.5);if(d<2.4)hurtPlayer(SET.diff===2?24:18);}return;}
  if(e.state==='whistle'){e.t-=dt;if(e.t<=0){sendLaneCar(P2);e.state='chase';e.cd=1;}return;}
  if(e.state==='swig'){e.t-=dt;if(e.t<=0){e.hp=Math.min(e.max,e.hp+e.max*.06);e.state='chase';e.cd=.6;G.bark='СТОРОЖ: «Ух-х… Хорошо пошла!»';G.barkT=1.8;}return;}
  if(e.state==='attack'){e.t-=dt;if(e.t<=0){if(d<K.reach+.4){hurtPlayer(K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0]));sfx.punch();G.shake=Math.max(G.shake,.35);}e.state='chase';e.cd=.9;}return;}
  if(!e.swigged&&e.hp<e.max*.35&&d>4){e.swigged=true;e.state='swig';e.t=1.6;G.bark='СТОРОЖ: «За здоровье!»';G.barkT=2;return;}
  if(e.carT<=0&&d>3){e.carT=P2?7:9.5;e.state='whistle';e.t=.8;G.bark='СТОРОЖ: «'+pick(['Васька, заводи!','Гаражный, на выезд!','А ну, машинка, дави его!'])+'»';G.barkT=2.2;tone('square',2100,2300,.3,.22);tone('square',2100,2300,.3,.22,.4);return;}
  if(e.cd<=0){
    if(d<2.2&&Math.random()<.5){e.state='stompUp';e.t=.7;G.bark='СТОРОЖ: «Ух!»';G.barkT=1;return;}
    if(d<K.reach){e.state='attack';e.t=K.wind;return;}
    if(e.see&&d>3&&d<10&&Math.random()<.55){e.state='cWind';e.t=.55;e.hitP=false;G.bark='СТОРОЖ: «'+pick(['Ща как дам!','Пузом задавлю!','Иди к дяде!'])+'»';G.barkT=1.6;return;}
    if(e.see&&d>2.5&&d<12){e.state='throwWind';e.t=.45;return;}
    e.cd=.4;}
  let vx=dx/d,vy=dy/d;if(!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}
  const wob=Math.sin(G.time*2.3+e.id)*.6,wx=vx-vy*wob,wy=vy+vx*wob;
  if(d>1.4){const ox=e.x,oy=e.y,s=K.speed*(P2?1.25:1)*DIFF[SET.diff].spd;moveBody(e,wx*s,wy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}}
/* two more seed-spitters: Очередник (rapid stream) and Семянка (lobs a sunflower head) */
function updateOchered(e,dt){const K=KINDS.oc,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.alert){if(d<K.sight&&e.see){e.alert=true;e.cool=.5;bark(e);}return;}
  e.cool-=dt;e.pain-=dt;
  if(e.state==='stream'){e.t-=dt;e.fireT-=dt;if(e.fireT<=0&&e.burst>0){e.fireT=.08;e.burst--;const a=e.sa+(Math.random()-.5)*.05;ents.push({kind:'proj',spr:'semki',seed:1,x:e.x+Math.cos(a)*.4,y:e.y+Math.sin(a)*.4,vx:Math.cos(a)*13,vy:Math.sin(a)*13,life:1,dmg:3+Math.random()*2});sfx.spit();}if(e.burst<=0){e.state='chase';e.cool=K.rate;}return;}
  if(e.see&&d<11&&e.cool<=0){e.state='stream';e.t=1;e.burst=6+(D.spd>1.05?3:0);e.fireT=0;e.sa=Math.atan2(dy,dx);G.bark='ОЧЕРЕДНИК: «'+pick(K.bark)+'»';G.barkT=1.2;return;}
  let vx,vy;if(e.see&&d<4){vx=-dx/d;vy=-dy/d;}else if(e.see&&d<8){vx=-dy/d*e.sdir*.8;vy=dx/d*e.sdir*.8;if(Math.random()<dt*.6)e.sdir*=-1;}
  else{const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}else{vx=0;vy=0;}}
  const ox=e.x,oy=e.y,s=K.speed*D.spd;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}
function updateSemyanka(e,dt){const K=KINDS.sy,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.alert){if(d<K.sight&&e.see){e.alert=true;e.cool=1;bark(e);}return;}
  e.cool-=dt;e.pain-=dt;
  if(e.state==='lobWind'){e.t-=dt;if(e.t<=0){const T=Math.max(1,d/6),a=Math.atan2(dy,dx),r=d;ents.push({kind:'proj',spr:'sunhead',seed:1,air:1,arc:1,big:1,x:e.x+Math.cos(a)*.5,y:e.y+Math.sin(a)*.5,vx:Math.cos(a)*r/T,vy:Math.sin(a)*r/T,life:T,T,dmg:16+Math.random()*6,z:.6});sfx.throwIt();e.state='chase';e.cool=K.rate;}return;}
  if(e.see&&d>2.5&&d<13&&e.cool<=0){e.state='lobWind';e.t=.6;G.bark='СЕМЯНКА: «'+pick(K.bark)+'»';G.barkT=1.6;return;}
  let vx,vy;if(e.see&&d<3){vx=-dx/d;vy=-dy/d;}else if(d>5||!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}else{vx=dx/d;vy=dy/d;}}else{vx=0;vy=0;}
  const ox=e.x,oy=e.y,s=K.speed*D.spd;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}

