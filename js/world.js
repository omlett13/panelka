'use strict';
/* ---------- FLOW FIELD ---------- */
const FLOW=new Int16Array(N),LUREF=new Int16Array(N);
let lure=null;
function passT(i){const t=TILE[i];return (t===0&&ZONE[i]!==Z_VOID)||t===6||t===7||t===50||((t===42||t===43)&&doorOpen[i]>.5)||(t===10&&doorOpen[i]>.5);}
function bfs(F,x,y){
  F.fill(9999);const s=(y|0)*MW+(x|0);if(s<0||s>=N)return;F[s]=0;const q=[s];let h=0;
  while(h<q.length){const c=q[h++],cx=c%MW,cy=(c/MW)|0;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(!inB(nx,ny))continue;const n=ny*MW+nx;if(passT(n)&&F[n]>F[c]+1){F[n]=F[c]+1;q.push(n);}}}
}
function computeFlow(){bfs(FLOW,P.x,P.y);}
function passFlow(x,y){return inB(x,y)&&passT(y*MW+x);}
function flowNext(cx,cy,F){F=F||FLOW;let best=null,bv=F[cy*MW+cx];
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const nx=cx+dx,ny=cy+dy;if(!passFlow(nx,ny))continue;
    if(dx&&dy&&(!passFlow(cx+dx,cy)||!passFlow(cx,cy+dy)||ISD[TILE[cy*MW+cx+dx]]||ISD[TILE[(cy+dy)*MW+cx]]))continue;
    const v=F[ny*MW+nx]+(dx&&dy?.4:0);if(v<bv){bv=v;best=[nx,ny];}}
  return best;}

/* ---------- COLLISION ---------- */
function railHit(cx,cy,ax0,ax1,ay0,ay1){const m=RAILM[cy*MW+cx];const ov=(bx0,bx1,by0,by1)=>ax1>bx0&&ax0<bx1&&ay1>by0&&ay0<by1;
  if(((m&3)||!(m&12))&&ov(cx+.42,cx+.58,cy+((m&1)||!m?0:.42),cy+((m&2)||!m?1:.58)))return true;
  if((m&12)&&ov(cx+((m&4)?0:.42),cx+((m&8)?1:.58),cy+.42,cy+.58))return true;return false;}
function solidR(x,y,r){const x0=(x-r)|0,x1=(x+r)|0,y0=(y-r)|0,y1=(y+r)|0;for(let cy=y0;cy<=y1;cy++)for(let cx=x0;cx<=x1;cx++){if(!inB(cx,cy))return true;const t=TILE[cy*MW+cx];if(t===68||t===69){if(railHit(cx,cy,x-r,x+r,y-r,y+r))return true;}else if(solidCell(cx,cy))return true;}return false;}
function pushProps(o,r){for(const e of ents){if((e.kind!=='prop'&&e.kind!=='npc')||!e.block)continue;const dx=o.x-e.x,dy=o.y-e.y;if(Math.abs(dx)>1.2||Math.abs(dy)>1.2)continue;const d=Math.hypot(dx,dy),m=r+e.block;if(d<m&&d>.0001){const nx=e.x+dx/d*m,ny=e.y+dy/d*m;if(!solidR(nx,o.y,r))o.x=nx;if(!solidR(o.x,ny,r))o.y=ny;}}}
function roomBlock(o,x,y,r){const bro=!!KINDS[o.k].bro;for(const [ox,oy] of [[-r,-r],[r,-r],[-r,r],[r,r]]){const c=((y+oy)|0)*MW+((x+ox)|0);if(bro?!BROOM[c]:(BROOM[c]||c===BDOOR))return true;}return false;}
function moveBody(o,vx,vy,dt,r){const en=o.kind==='enemy',S=(x,y)=>solidR(x,y,r)||(en&&roomBlock(o,x,y,r));const nx=o.x+vx*dt;if(!S(nx,o.y))o.x=nx;const ny=o.y+vy*dt;if(!S(o.x,ny))o.y=ny;pushProps(o,r);}
function los(ax,ay,bx,by){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy),n=Math.ceil(d*4);for(let i=1;i<n;i++){const t=i/n;if(sightBlock((ax+dx*t)|0,(ay+dy*t)|0))return false;}return true;}
function rayDistLow(x,y,dx,dy,max){for(let d=0;d<max;d+=.04){const cx=(x+dx*d)|0,cy=(y+dy*d)|0;if(!inB(cx,cy))return d;const t=TILE[cy*MW+cx];if(t>=60&&t<=65)continue;if(sightBlock(cx,cy))return d;}return max;}
function rayDist(x,y,dx,dy,max){for(let d=0;d<max;d+=.04){if(sightBlock((x+dx*d)|0,(y+dy*d)|0))return d;}return max;}

/* ---------- MESSAGES ---------- */
function msg(s){G.msg=s;G.msgT=2.4;}
function bark(e){const K=KINDS[e.k];if(G.barkT>1.2||K.rat||K.dog||K.spider)return;G.bark=(K.who||K.name||(K.boss?'БАТЯ':'ГОПНИК'))+': «'+K.bark[(Math.random()*K.bark.length)|0]+'»';G.barkT=2.8;sfx.bark(K.pitch*(.9+Math.random()*.2));}

/* ---------- PLAYER ACTIONS ---------- */
const WNAMES=['КУЛАК','ПМ','ОБРЕЗ'];
function selectW(i){if((G.state!=='play'&&G.state!=='lift')||!P.has[i]||P.w===i)return;P.w=i;P.switchT=.25;P.cool=Math.max(P.cool,.2);sfx.swap();}
function cycleW(d){let i=P.w;for(let k=0;k<4;k++){i=(i+d+4)%4;if(P.has[i]){selectW(i);return;}}}
function makeNoise(r){for(const e of ents){if(e.kind!=='enemy'||e.dead||e.alert)continue;if(FLOW[(e.y|0)*MW+(e.x|0)]<=r)wake(e,true);}}
function wake(e,doBark){if(e.alert||e.seated||KINDS[e.k].granny)return;if(KINDS[e.k].bro&&!G.bossOn)return;e.alert=true;e.state='wake';e.t=e.k==='sq'?.35:.15;if(KINDS[e.k].dog){sfx.woof();e.woofT=2+Math.random()*2;makeNoise(10);}else if(KINDS[e.k].rat){sfx.squeak();}else if(KINDS[e.k].spider){sfx.skitter();}else if(doBark)bark(e);
  for(const o of ents){if(o.kind!=='enemy'||o.dead||o.alert||o.seated||o===e)continue;if(Math.hypot(o.x-e.x,o.y-e.y)<6&&los(o.x,o.y,e.x,e.y)){o.alert=true;o.state='wake';o.t=.25+Math.random()*.35;}}}
function spawnFx(t,x,y,life){ents.push({kind:'fx',t,x,y,life});}
function hitEnemy(e,dmg){const K=KINDS[e.k];if(K.rf){rfHit(e,dmg);return;}if(K.brig&&!e.onCrane&&!G.duel){dmg=Math.min(dmg,Math.max(0,e.hp-e.max*.3));if(dmg<=0){e.pain=.1;if(e.state!=='toCrane'&&e.intro){e.state='toCrane';e.t=6;}return;}}
  if(K.granny){if(e.gs!=='up'&&e.gs!=='swingWind')grannyAlarm(e,'Убивают!! Милиция!!');for(const o of ents)if(o.kind==='enemy'&&!o.dead&&!KINDS[o.k].granny&&!KINDS[o.k].boss&&Math.hypot(o.x-e.x,o.y-e.y)<9){o.rage=true;}G.bark='ГОПНИК: «Ты чё, на бабку?!»';G.barkT=2.4;return;}
  if(K.dvornik&&!G.dvOn){if(!G.cut)startCut(e);return;}
  if(K.boom&&e.box>0){e.box-=dmg;e.pain=.1;if(!e.alert)wake(e,false);if(e.box<=0)boomBreak(e);return;}
  if(K.spider){if(e.lastShot===G.shotId)return;e.lastShot=G.shotId;e.hits=(e.hits||0)+1;e.pain=.15;spawnFx('blood',e.x,e.y,.3);if(!e.alert)wake(e,false);if(e.state==='leap'){e.state='chase';e.cool=1;}if(e.hits>=3)killEnemy(e);return;}if(K.worker&&e.state==='attack'){e.state='chase';e.stun=.9;e.cool=.7;sfx.clunk();}e.hp-=dmg*(K.bro?.8:1);e.pain=(K.boss||K.bro)?.07:.14;if(!e.alert)wake(e,false);if(e.state==='lure'){e.state='chase';e.lure=null;}if(e.state==='attack'&&Math.random()<.25){e.state='chase';e.cool=.35;}if(e.hp<=0)killEnemy(e);}
const RUBDROP={ls:[4,8],hk:[12,20],oc:[6,10],sy:[18,28],mx:[8,14],kd:[2,5],sw:[40,60],km:[8,14],tb:[6,12],sj:[6,12],bg:[0,0],kt:[150,200],gt:[0,0],dz:[0,0],gg:[0,0],bb:[0,0],sq:[5,10],sp:[5,10],br:[25,35],bt:[250,300],dn:[4,8],pes:[0,0],rm:[15,25],kl:[60,80],tl:[60,80],rat:[0,0],st:[8,14],kc:[120,150],spd:[10,15],mg:[10,16],vr:[15,25],dv:[150,200],rk:[6,11],sm:[80,120],bm:[10,16]};
function boomBreak(e){e.box=0;e.panicT=3.5;e.state='chase';sfx.smash();sfx.scratch();spawnFx('boomBits',e.x,e.y,.6);G.bark='С МАГНИТОФОНОМ: «Мой маг!!»';G.barkT=2.4;G.bonus=.6;}
function killEnemy(e){if(e.k==='gt')roofWin(e);if(e.k==='kt'){G.cleared=true;G.lockDoor=-1;setTimeout(()=>{G.trainMove=false;G.shake=.5;sfx.brake();announce('Станция «Стройка». Выход — по лестнице. Эскалатор не работает.');setTimeout(()=>{for(const i of MT.doorsX)doorTarget[i]=1;sfx.door();},1400);},900);}e.dead=true;e.state='dead';G.kills++;P.faceGrin=1;if(KINDS[e.k].dog)sfx.yelp();else if(KINDS[e.k].spider)sfx.squish();else if(KINDS[e.k].rat)sfx.squeak();else sfx.die(KINDS[e.k].pitch);
  const K=KINDS[e.k];
  if(K.bro){const o=ents.find(x=>x.kind==='enemy'&&!x.dead&&KINDS[x.k].bro);
    if(o){G.firstDeadT=G.time;o.griefT=2.5;o.state='chase';G.bark=KINDS[o.k].name+': «'+(e.k==='kl'?'КОЛЯН?!':'ТОЛЯН?!')+'»';G.barkT=2.5;sfx.bark(KINDS[o.k].pitch*.8);}
    else{if(G.firstDeadT>=0&&!e.raged){G.rub+=150;msg('БЕЗ ЯРОСТИ!  +150 РУБ');}bossCleared();}}
  const rr=Math.random();if(e.k==='br'||e.k==='bt'||e.k==='kc'||e.k==='dv'||K.bro)ents.push({kind:'item',t:'shells',x:e.x+.25,y:e.y,drop:1});else if((e.k==='sp'&&rr<.45)||(e.k==='sq'&&rr<.3))ents.push({kind:'item',t:'ammo9s',x:e.x+.25,y:e.y+.1,drop:1});
  if(e.k==='dv'){ents.push({kind:'item',t:'liftkey',x:e.x,y:e.y-.25,drop:1});G.dvDown=true;G.bark='ДВОРНИК: «Ключ… от лифта… забирай…»';G.barkT=3;G.clearT=0;}
  if(e.k==='sw'){ents.push({kind:'item',t:'gkey',x:e.x,y:e.y-.3,drop:1});ents.push({kind:'item',t:'vodkaI',x:e.x+.4,y:e.y+.3,drop:1});G.bark='СТОРОЖ: «Ключ… от ворот… и пузырь… береги её…»';G.barkT=3.4;}
  if(e.k==='sm'){ents.push({kind:'item',t:'flatkey',x:e.x,y:e.y-.25,drop:1});G.bark='СМОТРЯЩИЙ: «Ключ… забирай…»';G.barkT=3;}
  if(e.k==='bm'){G.cleared=true;msg('ДВЕРЬ НАВЕРХУ ОТКРЫТА');G.bark='БУТЫЛОЧНИК: «Всё… тара кончилась…»';G.barkT=2.6;}
  if(e.k==='vr'){ents.push({kind:'item',t:'fuse',x:e.x,y:e.y+.2,drop:1});msg('ОН УРОНИЛ ПРЕДОХРАНИТЕЛЬ');}
  if(e.k==='mg'&&e.box>0){e.box=0;spawnFx('boomBits',e.x,e.y,.6);sfx.scratch();}
  const d=RUBDROP[e.k];if(d[1]>0)ents.push({kind:'item',t:'rub',x:e.x-.2,y:e.y-.15,drop:1,v:(d[0]+Math.random()*(d[1]-d[0]))|0});}
/* бабка: watches from her bench; fill the ? and she screams, waking the whole yard.
   Bribe her (use, 20 руб), distract her with vodka, or slap her quiet with the slipper. */
function grannyAlarm(e,line){if(e.bribed)return;const K=KINDS.bb;
  if(e.gs==='sit'){e.x=e.sx+Math.cos(Math.atan2(P.y-e.sy,P.x-e.sx))*.7;e.y=e.sy+Math.sin(Math.atan2(P.y-e.sy,P.x-e.sx))*.7;if(solidR(e.x,e.y,.25)){e.x=e.sx;e.y=e.sy+.6;}
    if(!e.bench){e.bench=1;ents.push({kind:'prop',t:'bench',x:e.sx,y:e.sy,sc:1,block:.42});}}
  e.gs='up';e.t=12;e.sus=1;e.cool=1;G.bark='БАБКА: «'+(line||'Милиция! Хулиган!')+'»';G.barkT=3;sfx.bark(K.pitch);sfx.bark(K.pitch*1.2);
  for(const o of ents){if(o.kind!=='enemy'||o.dead||o.seated||KINDS[o.k].granny||KINDS[o.k].bro||KINDS[o.k].dvornik)continue;if(FLOW[(o.y|0)*MW+(o.x|0)]<=34){if(!o.alert)wake(o,false);o.alert=true;if(o.state==='idle'||o.state==='lure')o.state='chase';}}}
function updateGranny(e,dt){const K=KINDS.bb,dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;e.losT-=dt;if(e.losT<=0){e.losT=.15;e.see=los(e.x,e.y,P.x,P.y);}
  if(e.offT>0)e.offT-=dt;if(e.lectT>0)e.lectT-=dt;
  if(e.bribed||G.state!=='play'){e.sus=Math.max(0,e.sus-dt);return;}
  if(lure&&!(e.lectT>0)&&Math.hypot(lure.x-e.x,lure.y-e.y)<7&&e.gs!=='up'){e.lectT=lure.life;G.bark='БАБКА: «Опять нажрались, ироды!»';G.barkT=2.4;sfx.bark(K.pitch);}
  if(e.gs==='sit'||e.gs==='calm'){const busy=e.offT>0||e.lectT>0;
    if(!busy&&e.see&&d<K.sight){e.sus+=dt*(d<3?1.6:.85);if(e.sus>=1)grannyAlarm(e);}else e.sus=Math.max(0,e.sus-dt*.5);return;}
  if(e.gs==='up'){e.t-=dt;e.cool-=dt;e.yellT=(e.yellT||0)-dt;if(e.yellT<=0){e.yellT=3+Math.random()*2;if(e.see)bark(e);}
    if(e.see&&d<K.reach&&e.cool<=0){e.gs='swingWind';e.wt=K.wind;return;}
    if(e.see&&d<6&&d>1){const ox=e.x,oy=e.y;moveBody(e,dx/d*K.speed,dy/d*K.speed,dt,.25);e.walk+=Math.hypot(e.x-ox,e.y-oy)*3;}
    if(e.t<=0){e.gs='calm';e.sus=0;}return;}
  if(e.gs==='swingWind'){e.wt-=dt;if(e.wt<=0){if(d<K.reach+.4){hurtPlayer(K.dmg[0]+Math.random()*(K.dmg[1]-K.dmg[0]));sfx.punch();G.shake=.3;moveBody(P,dx/d*10,dy/d*10,.1,.24);}else sfx.whoosh();e.gs='up';e.cool=K.rate;}}}
function facingGranny(){for(const e of ents){if(e.kind!=='enemy'||e.k!=='bb')continue;const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d>1.8)continue;let da=Math.atan2(dy,dx)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<.6)return e;}return null;}
function bribe(e){if(e.bribed){G.bark='БАБКА: «Иди уже, милок, иди.»';G.barkT=2;sfx.bark(260);return;}
  if(G.rub<20){sfx.click();G.bark='БАБКА: «Денег нет — и совести нет!»';G.barkT=2.2;sfx.bark(260);return;}
  G.rub-=20;sfx.cash();e.bribed=true;e.sus=0;if(e.gs!=='sit')e.gs='calm';G.bark='БАБКА: «Ну иди, иди, милок. А знаешь что скажу…»';G.barkT=3.2;sfx.bark(250);
  if(e.note&&!NOTESGOT.includes(e.note)){NOTESGOT.push(e.note);saveNotes();msg('НОВАЯ ЗАМЕТКА: СПЛЕТНИ');}}
/* bottles rolling down the stairwell: axis-aligned, keep their lane, turn at corners, follow the way down to the player */
function rollDir(r){const cx=r.x|0,cy=r.y|0,here=FLOW[cy*MW+cx];let best=null,bv=here;for(const [ox,oy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+ox,ny=cy+oy;if(!passFlow(nx,ny))continue;const v=FLOW[ny*MW+nx];if(v<bv){bv=v;best=[ox,oy];}}return best;}
function snapLane(r){const horiz=!!r.vx;const lanes=[-1,0,1].filter(l=>horiz?passFlow(r.x|0,(r.y|0)+l):passFlow((r.x|0)+l,r.y|0));if(!lanes.length)return;const l=lanes[(Math.random()*lanes.length)|0];if(horiz)r.y=(r.y|0)+l+.5;else r.x=(r.x|0)+l+.5;}
function spawnRoll(e){if(ents.filter(o=>o.kind==='roll'&&!o.dead).length>=7)return;const r={kind:'roll',x:e.x,y:e.y,vx:0,vy:0,spin:0,life:60,lane:[-.9,0,.9][(Math.random()*3)|0],turn:0};const d=rollDir(r);if(!d){return;}r.vx=d[0];r.vy=d[1];
  snapLane(r);ents.push(r);sfx.throwIt();}
function smashRoll(r,dmg){r.dead=true;sfx.smash();spawnFx('shards',r.x,r.y,.45);if(dmg){hurtPlayer(dmg);G.shake=.25;}}
function updateRolls(dt){for(const r of ents){if(r.kind!=='roll'||r.dead)continue;r.life-=dt;r.spin+=dt*10;if(r.life<=0){r.dead=true;continue;}
    const sp=4.2,ox=r.x,oy=r.y;moveBody(r,r.vx*sp,r.vy*sp,dt,.2);const moved=Math.hypot(r.x-ox,r.y-oy);r.turn-=dt;
    if(moved<sp*dt*.4||(r.turn<=0&&Math.random()<.02)){r.turn=.25;const d=rollDir(r);if(d){r.vx=d[0];r.vy=d[1];snapLane(r);}}
    if(G.state==='play'&&Math.hypot(r.x-P.x,r.y-P.y)<.42)smashRoll(r,8);
    else if(r.life>0&&Math.random()<dt*2.5&&Math.hypot(r.x-P.x,r.y-P.y)<9)sfx.tick();}}
function updateRoller(e,dt){const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||.001;e.rollT=(e.rollT==null?2.2:e.rollT)-dt;e.poseT=(e.poseT||0)-dt;e.cool-=dt;e.state=e.poseT>0?'attack':'chase';
  if(e.rollT<=0&&G.state==='play'&&FLOW[(e.y|0)*MW+(e.x|0)]<220){e.rollT=e.hp<e.max*.5?1.5:2.5;e.poseT=.45;spawnRoll(e);if(Math.random()<.45)bark(e);}
  if(d<1.2&&e.cool<=0&&G.state==='play'){e.cool=1.1;hurtPlayer(8+Math.random()*4);sfx.punch();}}
function saltShot(e){const lead=.35,tx=P.x+(P.vx||0)*lead,ty=P.y+(P.vy||0)*lead,a0=Math.atan2(ty-e.y,tx-e.x);sfx.shotgun();G.shake=.25;
  for(let i=0;i<7;i++){const a=a0+(i/6-.5)*.5+(Math.random()-.5)*.04;ents.push({kind:'proj',spr:'salt',x:e.x+Math.cos(a)*.5,y:e.y+Math.sin(a)*.5,vx:Math.cos(a)*10,vy:Math.sin(a)*10,life:1.3,dmg:4,kb:1});}
  spawnFx('puff',e.x+Math.cos(a0)*.7,e.y+Math.sin(a0)*.7,.3);}
function broomSweep(e,d,dx,dy){sfx.whoosh();nz(.25,'bandpass',900,.8,.5,.22);dustRing(e.x,e.y,1.4);if(e.phase2)dustRing(e.x,e.y,2.3);
  if(d<(e.phase2?3:2.6)&&G.state==='play'){hurtPlayer(e.phase2?22:17);sfx.punch();G.shake=.4;moveBody(P,dx/d*18,dy/d*18,.1,.24);}}
/* the shed "cutscene": he turns, fires rock salt, you fly out the door, the fight starts in the yard */
