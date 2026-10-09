'use strict';
/* ---------- СТРОЙКА: bricklayers' walls, pipe ambush, scaffold jumpers, the foreman and the crane duel ---------- */
const CRA={x:81,y:14},CRB={x:39,y:32};
function inArena(x,y){return y<35.6&&y>9.5&&x>35.5&&x<85;}
function siteArena(){if(G.arena)return;G.arena=true;for(const x of [59,60,61]){const i=36*MW+x;TILE[i]=58;doorOpen[i]=0;doorTarget[i]=0;}
  sfx.clunk();sfx.thud();G.shake=Math.max(G.shake,.4);for(const x of [59,60,61])spawnFx('puff',x+.5,35.3,.5);if(G.cp)G.cp.arena=true;}
const BREACH={x:85,y0:12,y1:15};
function openBreach(){if(G.breachHole)return;G.breachHole=true;for(let y=BREACH.y0;y<=BREACH.y1;y++){const i=y*MW+BREACH.x;TILE[i]=0;ZONE[i]=Z_OUT;}
  for(let i=0;i<5;i++)ents.push({kind:'boomfx',x:BREACH.x+.5+(Math.random()-.5)*2,y:13.5+(Math.random()-.5)*3,z:Math.random(),sc:.9+Math.random(),life:.8+Math.random()*.6,f:i%2});
  for(const [x,y] of [[84.3,11.6],[84.4,15.8],[86.6,12.2],[86.5,15.4]])ents.push({kind:'prop',t:'rubble',x,y,sc:.8,block:0});ents.push({kind:'prop',t:'bricks',x:84,y:16.6,sc:1,block:.45});ents.push({kind:'fire',x:85.4,y:11.7,life:30});ents.push({kind:'fire',x:85.6,y:15.9,life:30});computeFlow();}
function siteSkipToArena(){P.x=60.5;P.y=34.2;P.a=-Math.PI/2;siteArena();}
const WHP=new Float32Array(N);
function siteInit(){G.brig=null;G.duel=null;G.siteEnd=0;G.obrezEnt=null;G.arena=false;G.breach=false;G.breachHole=false;WHP.fill(0);if(!ents.some(o=>o.kind==='beacon'))ents.push({kind:'beacon',x:CRB.x+.9,y:CRB.y+.9});for(const i of DOORS)if(TILE[i]===50){doorOpen[i]=1;doorTarget[i]=1;}
  for(const e of ents){if(e.kind!=='enemy')continue;if(e.k==='tb'){e.hidden=true;e.px=e.x;e.py=e.y;}if(e.k==='sj'){e.perch=true;e.z=2.3;}}}
function buildWall(e){const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,cx=e.x+ux*1.5,cy=e.y+uy*1.5;let n=0;
  for(const o of [-1,0,1]){const x=(cx-uy*o)|0,y=(cy+ux*o)|0;if(!inB(x,y))continue;const i=y*MW+x;if(TILE[i]!==0||ZONE[i]!==Z_OUT)continue;
    if(Math.hypot(x+.5-P.x,y+.5-P.y)<1.1)continue;if(ents.some(o2=>o2.kind==='enemy'&&!o2.dead&&(o2.x|0)===x&&(o2.y|0)===y))continue;TILE[i]=49;WHP[i]=45;n++;}
  if(n){sfx.clunk();spawnFx('puff',cx,cy,.4);G.bark='КАМЕНЩИК: «'+pick(['Кладку не трогать!','Стенка — на века!','Раствор ещё не схватился!'])+'»';G.barkT=1.6;sfx.bark(KINDS.km.pitch);}}
function wallHit(i,dmg){WHP[i]-=dmg;spawnFx('puff',(i%MW)+.5,((i/MW)|0)+.5,.25);if(WHP[i]<=0){TILE[i]=0;sfx.smash();for(let k=0;k<3;k++)spawnFx('puff',(i%MW)+.2+Math.random()*.6,((i/MW)|0)+.2+Math.random()*.6,.5);}}
function updateMason(e,dt){const K=KINDS.km,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.alert){if(d<K.sight&&e.see){e.alert=true;e.throwT=1.2;e.wallT=1.5;bark(e);}return;}
  e.throwT-=dt;e.wallT-=dt;
  if(e.state==='aimWind'){e.t-=dt;if(e.t<=0){const T=Math.max(.5,d/9),vx=dx/T,vy=dy/T;ents.push({kind:'proj',spr:'brickP',air:1,arc:1,x:e.x,y:e.y,vx,vy,life:T,T,dmg:10+Math.random()*4,z:.5});e.state='chase';}return;}
  if(e.state==='attack'){e.t-=dt;if(e.t<=0){if(d<K.reach+.3){hurtPlayer(K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0]));sfx.punch();}e.state='chase';e.cool=K.rate;}return;}
  if(e.wallT<=0&&e.see&&d>3){e.wallT=6+Math.random()*2;buildWall(e);}
  if(e.throwT<=0&&d>2.2&&d<13){e.throwT=2+Math.random()*.8;e.state='aimWind';e.t=.4;return;}
  if(d<K.reach&&e.cool<=0){e.state='attack';e.t=K.wind;return;}
  let vx=0,vy=0;if(d<4){vx=-dx/d;vy=-dy/d;}else if(d>8||!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}
  if(vx||vy){const ox=e.x,oy=e.y,s=K.speed*D.spd;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}}
function updatePipe(e,dt){const d=Math.hypot(P.x-e.px,P.y-e.py);if(d<4.6){e.hidden=false;e.alert=true;e.state='chase';e.cool=.25;
  const ux=(P.x-e.px)/(d||1),uy=(P.y-e.py)/(d||1);const nx=e.px+ux*1.7,ny=e.py+uy*1.7;if(!solidR(nx,ny,e.rad)){e.x=nx;e.y=ny;}
  G.bark='ТРУБНЫЙ: «'+pick(['Сюрприз!','Это моя труба!','Ку-ку!'])+'»';G.barkT=1.6;sfx.bark(KINDS.tb.pitch);sfx.clunk();G.shake=Math.max(G.shake,.2);spawnFx('puff',e.x,e.y,.4);}}
function updateJumper(e,dt){if(e.jump){const j=e.jump;j.t+=dt;const k=Math.min(1,j.t/.55);e.x=j.x0+(j.tx-j.x0)*k;e.y=j.y0+(j.ty-j.y0)*k;e.z=(e.pz||2.3)*(1-k)+Math.sin(k*Math.PI)*.7;
    if(k>=1){e.jump=null;e.z=0;e.alert=true;e.state='chase';e.cool=.35;sfx.thudS();G.shake=Math.max(G.shake,.25);spawnFx('puff',e.x,e.y,.4);bark(e);}return;}
  if(e.kid){e.x+=e.rv*dt;e.walk+=dt*7;if(e.x<e.rx0){e.x=e.rx0;e.rv=Math.abs(e.rv);}if(e.x>e.rx1){e.x=e.rx1;e.rv=-Math.abs(e.rv);}if(Math.random()<dt*.15)e.rv=-e.rv;}
  const d=Math.hypot(P.x-e.x,P.y-e.y);if(d<(e.kid?4.6:5.5)){e.perch=false;let tx=P.x+Math.cos(P.a)*1.4,ty=P.y+Math.sin(P.a)*1.4;if(solidR(tx,ty,e.rad)){tx=(P.x+e.x)/2;ty=(P.y+e.y)/2;}
    if(solidR(tx,ty,e.rad)){let ok=false;for(let r=.8;r<2.6&&!ok;r+=.3)for(let a=0;a<6.3;a+=.4){const qx=P.x+Math.cos(a)*r,qy=P.y+Math.sin(a)*r;if(!solidR(qx,qy,e.rad)){tx=qx;ty=qy;ok=true;break;}}if(!ok){tx=P.x;ty=P.y;}}
    e.jump={t:0,x0:e.x,y0:e.y,tx,ty};G.bark=e.kid?'МАЛОЙ: «'+pick(['Дядя, лови!','Петушка хочешь?','Йа-а-а!'])+'»':'ВЕРХОЛАЗ: «Поберегись!»';G.barkT=1.2;if(e.kid)sfx.bark(KINDS.kd.pitch);}}
/* БРИГАДИР */
function updateBrig(e,dt){const K=KINDS.bg,D=DIFF[SET.diff],dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;
  e.losT-=dt;if(e.losT<=0){e.losT=.12;e.see=los(e.x,e.y,P.x,P.y);}
  if(!e.intro){if(G.arena){e.intro=true;e.alert=true;e.state='chase';e.shotT=1.5;e.whT=9;G.brig={phase:'ground'};G.bark='БРИГАДИР: «Кто пустил на объект?! А-а, это твой обрез? Был твой.»';G.barkT=3.4;sfx.bark(K.pitch);msg('БРИГАДИР');}return;}
  if(e.onCrane)return;
  if(e.state==='toCrane'){e.t-=dt;const tx=CRA.x-e.x,ty=CRA.y+1.2-e.y,l=Math.hypot(tx,ty)||1;if(l>1||e.t>0&&e.t<4.5){const ox=e.x,oy=e.y;moveBody(e,tx/l*3.6,ty/l*3.6,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}
    if(l<1.2||e.t<=0)brigOnCrane(e);return;}
  if(e.hp<e.max*.5){e.state='toCrane';e.t=6;G.bark='БРИГАДИР: «Ну всё! Я на кран!»';G.barkT=2.4;sfx.bark(K.pitch*1.1);return;}
  e.shotT-=dt;e.whT-=dt;
  if(e.state==='aimWind'){e.t-=dt;if(e.t<=0){const a=Math.atan2(dy,dx);for(let i=0;i<6;i++){const o=(Math.random()-.5)*.5;ents.push({kind:'proj',spr:'pellet',x:e.x+Math.cos(a)*.5,y:e.y+Math.sin(a)*.5,vx:Math.cos(a+o)*13,vy:Math.sin(a+o)*13,life:1.2,dmg:5,kb:1});}sfx.shotgun();G.flash=Math.max(G.flash,.5);e.state='chase';e.cool=.5;}return;}
  if(e.state==='attack'){e.t-=dt;if(e.t<=0){if(d<K.reach+.3){hurtPlayer(K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0]));sfx.punch();G.shake=.3;}e.state='chase';e.cool=K.rate;}return;}
  if(e.whT<=0){e.whT=13;G.bark='БРИГАДИР: «Бригада, ко мне!»';G.barkT=2;tone('square',2200,2400,.35,.25);tone('square',2200,2400,.25,.2,.45);
    const far=(sx,sy)=>Math.hypot(sx-P.x,sy-P.y)>10;const spots=[[38,12],[82,22],[38,24],[82,33],[60,12],[50,33],[70,12],[47,22]].filter(s=>far(s[0],s[1]));
    for(const k of ['km','sq','sq']){const s=pick(spots);if(s)spawnEnemy(k,s[0]+Math.random(),s[1]+Math.random());}}
  if(e.shotT<=0&&e.see&&d<9){e.shotT=D.spd>1.05?1.7:2.1;e.state='aimWind';e.t=.4;return;}
  if(d<K.reach&&e.cool<=0){e.state='attack';e.t=K.wind;return;}
  let vx=dx/d,vy=dy/d;if(!e.see){const n=flowNext(e.x|0,e.y|0);if(n){const tx=n[0]+.5-e.x,ty=n[1]+.5-e.y,l=Math.hypot(tx,ty)||1;vx=tx/l;vy=ty/l;}}
  if(d>3.2||!e.see){const ox=e.x,oy=e.y,s=K.speed*D.spd;moveBody(e,vx*s,vy*s,dt,e.rad);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}}
function brigOnCrane(e){e.onCrane=true;e.hidden=true;e.state='chase';e.dead=false;e.hp=e.max*.5;G.brig={phase:'crane',dropT:1.5};G.bark='БРИГАДИР: «Сверху виднее!»';G.barkT=2.4;msg('БЕГИ К СВОЕМУ КРАНУ!');if(G.cp)G.cp.crane=true;}
function nearCraneB(){return Math.hypot(P.x-CRB.x,P.y-CRB.y)<2.4;}
function startDuel(){keys.clear();transition(()=>{const ux=CRA.x-CRB.x,uy=CRA.y-CRB.y,l=Math.hypot(ux,uy);G.duel={t:0,jib:Math.min(15,l*.3),ux:ux/l,uy:uy/l,s:0,sv:0,fireT:0,volT:2.2,spin:0,end:0,flashT:0};G.brig.phase='duel';FOGD=120;
  for(const o of ents)if(o.kind==='proj'||o.kind==='drop')o.dead=true;P.pitch=-.04;duelPlace();P.a=Math.atan2(uy,ux);msg('КРАН · '+(SET.diff===2?'МИНИГАН':'ПУЛЕМЁТ'));},.5);}
function duelPos(){const D2=G.duel,px=-D2.uy,py=D2.ux;const J=D2.jib||15;return {px:CRB.x+D2.ux*J+px*D2.s,py:CRB.y+D2.uy*J+py*D2.s,ex:CRA.x-D2.ux*J+px*(2.8*Math.sin(D2.t*.55+1)),ey:CRA.y-D2.uy*J+py*(2.8*Math.sin(D2.t*.55+1))};}
function duelPlace(){const p=duelPos();P.x=p.px;P.y=p.py;P.camZ=7;}
function updateDuel(dt){const D2=G.duel,bg=ents.find(e=>e.kind==='enemy'&&e.k==='bg');D2.t+=dt;
  if(D2.end){updateCraneFall(dt,bg);return;}
  const trn=(k('ArrowRight')?1:0)-(k('ArrowLeft')?1:0)+pad.x;P.a+=trn*2*dt+mouseDX*.0024*(SET.sens+1)/5;mouseDX=0;
  const str=(k('KeyD')?1:0)-(k('KeyA')?1:0)+btn.R-btn.L;D2.sv+=(str*9-D2.sv*1.6)*dt;D2.s+=(D2.sv+Math.sin(D2.t*.8)*1.1)*dt;D2.s=Math.max(-4,Math.min(4,D2.s));duelPlace();
  P.camZ=7+Math.sin(D2.t*1.3)*.05;
  // your gun
  const hard=SET.diff===2,firing=k('Space')||k('ControlLeft')||mouseFire||btn.A;D2.spin=Math.max(0,Math.min(1,D2.spin+(firing?dt*3:-dt*2)));D2.fireT-=dt;D2.flashT-=dt;
  if(firing&&D2.fireT<=0&&(!hard||D2.spin>.5)){D2.fireT=hard?.045:.11;D2.flashT=.04;sfx.pistol();const p=duelPos(),ex=p.ex-P.x,ey=p.ey-P.y,dist=Math.hypot(ex,ey);let da=Math.atan2(ey,ex)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));
    if(Math.abs(da)<Math.atan(2/dist)+.01&&bg){bg.hp-=hard?2.4:3.6;bg.pain=.06;if(Math.random()<.35)ents.push({kind:'boomfx',x:p.ex,y:p.ey,z:6.4,sc:.5,life:.15,f:0});if(bg.hp<=0){D2.end=1;D2.et=0;G.bark='БРИГАДИР: «А-а-а! Кран!»';G.barkT=2.6;sfx.bark(KINDS.bg.pitch);}}}
  // his volleys
  D2.volT-=dt;if(D2.volT<=0){D2.volT=hard?1.35:1.9;const p=duelPos();for(let i=0;i<7;i++){const tx=P.x-p.ex+(Math.random()-.5)*1.4,ty=P.y-p.ey+(Math.random()-.5)*1.4,l=Math.hypot(tx,ty)||1,sp=15;
      setTimeout(()=>{if(!G.duel||G.duel.end)return;const q=duelPos();ents.push({kind:'proj',spr:'tracer',air:1,x:q.ex,y:q.ey,vx:tx/l*sp,vy:ty/l*sp,life:3.5,dmg:6,z:6.6});nz(.05,'bandpass',1400,1,.25,.04);},i*70);}
    D2.eflash=.5;}
  D2.eflash=Math.max(0,(D2.eflash||0)-dt);}
function updateCraneFall(dt,bg){const D2=G.duel;D2.et+=dt;const p=duelPos();
  if(!D2.fz)D2.fz=6.6;if(D2.et<1.8){D2.fv=(D2.fv||0)+9*dt;D2.fz=Math.max(0,D2.fz-D2.fv*dt);if(Math.random()<.5)ents.push({kind:'boomfx',x:p.ex+(Math.random()-.5),y:p.ey+(Math.random()-.5),z:D2.fz+.5,sc:.6,life:.35,f:1});
    let da=Math.atan2(p.ey-P.y,p.ex-P.x)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));P.a+=da*Math.min(1,dt*4);const dd=Math.hypot(p.ex-P.x,p.ey-P.y);P.pitch+=((Math.tan(Math.atan2(D2.fz+1-P.camZ,dd))*RPROJ/RH)-P.pitch)*Math.min(1,dt*4);}
  if(D2.et>=1.3&&!D2.boom){D2.boom=1;G.shake=1.5;G.flash=2;sfx.shotgun();sfx.thud();nz(1.6,'lowpass',400,.7,1.4,1.4);
    for(let i=0;i<14;i++)ents.push({kind:'boomfx',x:p.ex+(Math.random()-.5)*3,y:p.ey+(Math.random()-.5)*3,z:Math.random()*2,sc:1+Math.random()*1.4,life:.9+Math.random()*.9,f:i%2});
    for(let i=0;i<8;i++)ents.push({kind:'fire',x:p.ex+(Math.random()-.5)*4,y:p.ey+(Math.random()-.5)*4,life:9});
    const cr=ents.find(o=>o.kind==='prop'&&o.t==='crane'&&Math.hypot(o.x-CRA.x,o.y-CRA.y)<1);if(cr){cr.t='craneX';cr.sc=4;cr.x=p.ex;cr.y=p.ey;}
    D2.wx=p.ex;D2.wy=p.ey;openBreach();}
  if(D2.et>3.4&&!D2.down){D2.down=1;transition(()=>{const w={x:D2.wx,y:D2.wy};G.duel=null;FOGD=42;P.camZ=.5;P.pitch=0;if(bg){bg.dead=true;bg.state='dead';bg.hidden=true;G.kills++;}G.cleared=true;
      const fs=(x0,y0)=>{for(let r=0;r<6;r+=.5)for(let a=0;a<6.28;a+=.5){const x=x0+Math.cos(a)*r,y=y0+Math.sin(a)*r;if(!solidR(x,y,.35))return [x,y];}return [x0,y0];};
      const [ix,iy]=fs(w.x-1.4,w.y+1.2),[sx,sy]=fs(w.x-3.5,w.y+2.5);P.x=sx;P.y=sy;P.a=Math.atan2(w.y-sy,w.x-sx);
      const it={kind:'item',t:'obrez',x:ix,y:iy};ents.push(it);G.obrezEnt=it;msg('ТВОЙ ОБРЕЗ — В ОБЛОМКАХ');for(const o of ents)if(o.kind==='enemy'&&!o.dead&&o.k!=='bg'){o.alert=true;}},.7);}}
function updateSite(dt){const b=G.brig;
  if(G.arena&&!G.duel&&!G.breach&&!(b&&(b.phase==='crane'||b.phase==='duel'))){const bg=ents.find(o=>o.kind==='enemy'&&o.k==='bg');if(bg&&(bg.dead||bg.hp<=0)){bg.dead=false;bg.state='chase';bg.intro=true;bg.x=CRA.x;bg.y=CRA.y+1.2;brigOnCrane(bg);}}
  if(!G.arena&&inArena(P.x,P.y))siteArena();
  if(!G.duel){G.ambS=(G.ambS||1)-dt;if(G.ambS<=0){G.ambS=1.2+Math.random()*2.4;const q=Math.random();
    if(q<.45){const n=2+(Math.random()*3|0),f=1300+Math.random()*700;for(let i=0;i<n;i++)tone('square',f,f*.8,.03,.03,i*.22);}
    else if(q<.7)nz(.9+Math.random(),'bandpass',2600+Math.random()*900,3,.035,.3);
    else if(q<.85){for(let i=0;i<8;i++)nz(.05,'bandpass',900,2,.04,.04,i*.07);}
    else tone('sawtooth',90,70,1.2,.025);}}
  if(b&&b.phase==='crane'){b.dropT-=dt;if(b.dropT<=0){b.dropT=SET.diff===2?1.25:1.7;const lx=P.x+(P.vx||0)*.45,ly=P.y+(P.vy||0)*.45;ents.push({kind:'drop',x:lx,y:ly,t:0,T:.95});}
    if(nearCraneB()&&!(G.msgT>0))msg('КРАН · E — ЗАЛЕЗТЬ');}
  for(const d of ents){if(d.kind!=='drop'||d.done)continue;d.t+=dt;if(d.t>=d.T+.3){d.done=true;sfx.thud();G.shake=Math.max(G.shake,.45);for(let i=0;i<3;i++)spawnFx('puff',d.x+(Math.random()-.5),d.y+(Math.random()-.5),.5);
      if(Math.hypot(P.x-d.x,P.y-d.y)<1.3)hurtPlayer(26);if(!solidR(d.x,d.y,.45)&&ents.filter(o=>o.kind==='prop'&&o.t==='slab').length<14)ents.push({kind:'prop',t:'slab',x:d.x,y:d.y,sc:1.3,block:.45});}}
  for(const f of ents)if(f.kind==='boomfx'){f.life-=dt;f.sc=Math.min(f.sc*(1+dt*.5),3.2);}
  if(G.obrezEnt&&G.obrezEnt.taken&&!G.breach){G.breach=true;openBreach();for(const [x,y] of [[85.4,11.6],[85.6,16],[84.2,12.8]])ents.push({kind:'fire',x,y,life:60});G.bark='ТЫ: «Ну здравствуй, родной.»';G.barkT=2.4;setTimeout(()=>{if(G.level===10)msg('КРАН ПРОЛОМИЛ ЗАБОР — ТЕБЕ ТУДА');},2400);}
  if(G.breach&&!G.siteEnd&&P.x>BREACH.x+.7&&P.y>BREACH.y0-1.5&&P.y<BREACH.y1+2.5){G.siteEnd=1;keys.clear();transition(()=>{enterLevel(11);msg('ГАРАЖИ');},.8);}}
function siteSkipToCrane(){const e=ents.find(o=>o.kind==='enemy'&&o.k==='bg');if(!e)return;siteSkipToArena();e.intro=true;e.alert=true;e.x=CRA.x;e.y=CRA.y+1.2;brigOnCrane(e);}
function drawCraneHint(g,tx,ty,lab){tx=tx==null?CRB.x:tx;ty=ty==null?CRB.y:ty;lab=lab||'ТВОЙ КРАН';const dx=tx-P.x,dy=ty-P.y,d=Math.hypot(dx,dy);let r=Math.atan2(dy,dx)-P.a;r=Math.atan2(Math.sin(r),Math.cos(r));
  const on=((G.time*3)|0)%2===0,col=on?'#ff4a30':'#ffd040',t=Math.tan(r)/PLANE;
  if(Math.abs(r)<1.2&&Math.abs(t)<.92){const x=200*(1+t);stxt(g,lab,x,30,col,'center');stxt(g,(d|0)+' м',x,44,'#e8e2d2','center');stxt(g,'▼',x,58,col,'center');}
  else{const R2=r>0,x=R2?392:8;stxt(g,R2?lab+' ►':'◄ '+lab,x,110,col,R2?'right':'left');stxt(g,(d|0)+' м',x,124,'#e8e2d2',R2?'right':'left');}}
function drawDuelGun(g){const D2=G.duel;if(!D2||D2.end)return;const hard=SET.diff===2,cx=200,by=H,sp=D2.spin*D2.t*40;
  R(g,'#3a3a3e',cx-70,by-26,140,26);R(g,'#4a4a4e',cx-70,by-26,140,2);
  if(hard){for(let i=0;i<6;i++){const a=sp+i*Math.PI/3,ox=Math.cos(a)*9,oy=Math.sin(a)*4;R(g,'#1a1a1c',cx+ox-3,by-70+oy,6,46);R(g,'#5a5a5e',cx+ox-3,by-70+oy,2,46);}R(g,'#2a2a2e',cx-14,by-34,28,10);}
  else{for(const o of [-9,9]){R(g,'#1a1a1c',cx+o-3,by-78,6,54);R(g,'#5a5a5e',cx+o-3,by-78,2,54);}R(g,'#2a2a2e',cx-16,by-34,32,12);}
  if(D2.flashT>0){g.fillStyle='rgba(255,230,140,.9)';g.beginPath();g.arc(cx,by-80,12+Math.random()*6,0,7);g.fill();}
  stxt(g,hard?'МИНИГАН':'ПУЛЕМЁТ',cx,by-16,'#e8e2d2','center');}

function facingDealer(){for(const e of ents){if(e.t!=='dealer')continue;const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d>2.4)return false;let da=Math.atan2(dy,dx)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));return Math.abs(da)<.6;}return false;}
function occupied(i){const cx=i%MW,cy=(i/MW)|0;const r=.26;for(const [ox,oy] of [[-r,-r],[r,-r],[-r,r],[r,r]])if(((P.x+ox)|0)===cx&&((P.y+oy)|0)===cy)return true;for(const e of ents)if(e.kind==='enemy'&&!e.dead&&(e.x|0)===cx&&(e.y|0)===cy)return true;return false;}
function useAction(){
  if(G.trans||G.cut||(G.rc&&G.rc.lock))return;
  if(G.state==='lift'){if(facingDealer()){openShop();return;}const f=frontTarget();if(f&&f.t==='panel'){if(G.level===4){liftBroken();return;}if(G.level===2&&G.hasKey){G.state='liftMenu';openPage('liftChoice');sfx.tick();}else startRide(G.level===1?2:'win');return;}sfx.tick();return;}
  if(G.state!=='play')return;if(G.level===11){const sw=facingStorozh();if(sw){talkStorozh(sw);return;}}if(G.level===11&&frontGate()){useGate();return;}if(G.level===10&&G.brig&&G.brig.phase==='crane'&&nearCraneB()){startDuel();return;}{const n=facingNPC();if(n){if(n.talk==='bar')openShop();else openTalk(n);return;}}{const gr=facingGranny();if(gr){bribe(gr);return;}}const f=frontTarget();if(!f){sfx.tick();return;}
  if(f.t==='seeds'){if(!G.foundHQ){G.foundHQ=true;}G.seedFound=true;G.secrets=1;sfx.ding();sfx.door();G.gReturn={x:P.x,y:P.y,a:P.a};keys.clear();transition(()=>{enterLevel(12);msg('ЭЛЕВАТОР · 1 ЭТАЖ');},.6);return;}
  if(f.t==='panel'&&G.level===12){siloBroken();return;}
  if(f.t==='gshut'){sfx.click();msg(pick(['ЗАПЕРТО НАГЛУХО','НА ЗАМКЕ','ЭТОТ НЕ ОТКРЫТЬ']));return;}
  if(f.t==='door'){
    if(f.i===BDOOR&&G.bossOn){sfx.click();msg('ЗАПЕРТО');return;}
    if(G.level===12&&G.semLock&&f.i===SEM_DOOR){sfx.click();msg('ЗАПЕРТО');return;}
    if(G.level===9&&f.i===G.lockDoor){sfx.click();msg('ЗАПЕРТО');return;}
    if(doorTarget[f.i]<.5){doorTarget[f.i]=1;doorTimer[f.i]=0;sfx.door();if(TILE[f.i]===10&&!FOUND.has(f.i)){FOUND.add(f.i);G.secrets++;msg('ТАЙНИК!');}}
    else if(!occupied(f.i)&&TILE[f.i]!==10&&TILE[f.i]!==62){doorTarget[f.i]=0;sfx.door();}
  }
  else if(f.t==='switch'){if(G.power){sfx.tick();return;}
    if(G.level===6){openBreaker();return;}
    if(G.level===4){if(G.fuses<3){sfx.click();msg('ЩИТОК: НЕТ ПРЕДОХРАНИТЕЛЕЙ '+G.fuses+'/3');return;}openBreaker();return;}
    G.power=true;sfx.clunk();msg('ЩИТОК: ТОК ЕСТЬ');}
  else if(f.t==='boarded'){sfx.clunk();msg('ЗАКОЛОЧЕНО — ЛОМАЙ');}
  else if(f.t==='shed'){if(G.level===7){sfx.click();msg('НАЗАД ДОРОГИ НЕТ');return;}if(G.level===6&&!G.power){sfx.click();msg('НЕТ ПИТАНИЯ — ЩИТОК');return;}openKeypad(f.i);}
  else if(f.t==='tdoor'){sfx.click();msg('НЕ ПРИСЛОНЯТЬСЯ');}
  else if(f.t==='metro'){if(G.level===8)openChoice('МЕТРО','Спуск в метро. Поезд идёт до станции «Стройка». Спускаемся — или ещё погуляешь по городу?',[{l:'ДАЛЬШЕ: В МЕТРО',f:()=>{talkClose();transition(()=>{enterLevel(9);msg('МЕТРО');},.5);}},{l:'ОСТАТЬСЯ В ГОРОДЕ',f:talkClose}]);
    else openChoice('ВЫХОД В ГОРОД','Лестница наверх, в город.',[{l:'НАВЕРХ: В ГОРОД',f:()=>{talkClose();transition(()=>{enterLevel(8);P.x=61.5;P.y=59.6;P.a=-Math.PI/2;msg('ГОРОД');},.5);}},{l:'ОСТАТЬСЯ',f:talkClose}]);}
  else if(f.t==='bdoor'){sfx.clunk();G.bark='БАРЫГА: «Кто? …А, это ты. Заходи, быстро.»';G.barkT=2.6;sfx.bark(110);TILE[f.i]=7;doorTarget[f.i]=1;doorTimer[f.i]=0;DOORS.push(f.i);setTimeout(()=>sfx.door(),400);}
  else if(f.t==='flatdoor'){sfx.click();msg('ЗАПЕРТО — КЛЮЧ У СМОТРЯЩЕГО');}
  else if(f.t==='exit'){
    if(G.level===9){if(!G.cleared){sfx.click();msg('КАБИНА ЗАПЕРТА — КОНТРОЛЁР НЕ ПУСКАЕТ');return;}sfx.door();keys.clear();G.winTime=G.time;transition(()=>endGame('win'),.6);return;}
    if(G.level===5){if(!G.cleared){sfx.click();msg('ДВЕРЬ ЗАПЕРТА — БУТЫЛОЧНИК НАВЕРХУ');return;}sfx.door();keys.clear();transition(()=>{enterLevel(6);msg('ДОМ 11 · ЭТАЖ 2');},.5);return;}
    if(G.level===6){sfx.click();msg('ВНИЗ НЕ НАДО');return;}
    G.winTime=G.time;sfx.door();keys.clear();transition(()=>endGame('win'),.5);}
  else if(f.t==='lift'){if(G.level===4){if(!G.power){sfx.click();msg('ЛИФТ НЕ РАБОТАЕТ');return;}if(!G.liftKey){sfx.click();msg('ЛИФТ ЗАПЕРТ — НУЖЕН КЛЮЧ');return;}enterLift();return;}if(G.level===3){sfx.click();msg('ЛИФТ НЕ ЕДЕТ');return;}if(G.level===1?!G.power:!G.cleared){sfx.click();msg(G.level===1?'ЛИФТ НЕ РАБОТАЕТ':'ЛИФТ НЕ ЕДЕТ');return;}enterLift();}
}
