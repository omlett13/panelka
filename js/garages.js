'use strict';
/* ---------- ГАРАЖИ: garage doors, cars that drive out, roof kids, the сторож and the gate ---------- */
const GATE11={x:106,y0:53,y1:56};
function garInit(){G.seedFound=!!G.foundHQ;if(G.foundHQ)G.secrets=1;G.gkey=false;G.gateOpen=false;G.garDone=false;G.knock=null;
  for(const i of DOORS)if(TILE[i]===62){doorOpen[i]=0;doorTarget[i]=0;}
  for(const e of ents){
    if(e.kind==='car'){let best=null;for(const [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]])for(let k=1;k<=3;k++){const cx=(e.x+dx*k)|0,cy=(e.y+dy*k)|0;if(!inB(cx,cy))break;const i=cy*MW+cx;if(TILE[i]===62){best={i,dx,dy};break;}if(TILE[i]!==0)break;}
      if(best){e.door=best.i;e.dx=best.dx;e.dy=best.dy;}e.st='wait';e.v=0;e.c=(((e.x*7+e.y*13)|0)%5+5)%5;e.hit=false;}
    if(e.kind==='enemy'&&e.k==='sw'){e.seated=true;e.alert=false;e.state='idle';e.cd=1.5;e.carT=4;}
    if(e.kind==='enemy'&&e.k==='kd'){e.perch=true;e.pz=1.32;e.z=1.32;const cy=e.y|0;let a=e.x|0,b=e.x|0;while(TILE[cy*MW+a-1]>=60&&TILE[cy*MW+a-1]<=62)a--;while(TILE[cy*MW+b+1]>=60&&TILE[cy*MW+b+1]<=62)b++;e.rx0=a+.5;e.rx1=b+.5;e.rv=(Math.random()<.5?-1:1)*(1.4+Math.random()*.8);}
  }}
function carHit(c){const D=SET.diff===2?50:SET.diff===0?32:40;hurtPlayer(D);sfx.punch();sfx.thud();G.shake=Math.max(G.shake,1);G.flash=Math.max(G.flash,.4);
  G.knock={t:1.5,T:1.5,vx:c.dx*7,vy:c.dy*7,roll:(Math.random()<.5?-1:1)*.5};G.bark='ТЫ: «Ох-х…»';G.barkT=1.4;}
function updateCars(dt){for(const c of ents){if(c.kind!=='car'||c.dead)continue;
  if(c.st==='wait'){if(c.door!=null&&doorOpen[c.door]>.35){c.st='warn';c.t=SET.diff===2?.5:SET.diff===0?2.4:2;c.T=c.t;tone('sawtooth',55,190,c.t+.2,.09);nz(c.t,'lowpass',260,1,.08,c.t);G.bark='— Р-Р-Р-РЫ-Ы-Ы!';G.barkT=1;}continue;}
  if(c.st==='warn'){c.t-=dt;G.shake=Math.max(G.shake,.08);if(c.t<=0){c.st='go';c.v=3;sfx.thud();}continue;}
  if(c.st==='go'){c.v=Math.min(12,c.v+30*dt);const nx=c.x+c.dx*c.v*dt,ny=c.y+c.dy*c.v*dt;
    if(!c.hit&&Math.hypot(P.x-c.x,P.y-c.y)<.95){c.hit=true;carHit(c);}
    for(const e of ents){if(e.kind==='enemy'&&!e.dead&&!e.hidden&&e.k!=='sw'&&Math.hypot(e.x-c.x,e.y-c.y)<.95)hitEnemy(e,999);}
    if(solidR(nx+c.dx*.55,ny+c.dy*.55,.5)){c.dead=true;sfx.smash();sfx.thud();nz(.8,'lowpass',500,.8,.6,.6);G.shake=Math.max(G.shake,.6);
      for(let i=0;i<5;i++)spawnFx('puff',c.x+(Math.random()-.5),c.y+(Math.random()-.5),.6);ents.push({kind:'fire',x:c.x,y:c.y,life:6});
      ents.push({kind:'prop',t:'carW',x:c.x,y:c.y,sc:1.5,block:.8});continue;}
    c.x=nx;c.y=ny;}}}
function updateKnock(dt){const K=G.knock;if(!K)return false;K.t-=dt;const k=1-K.t/K.T;
  const f=Math.exp(-k*6);moveBody(P,K.vx*f,K.vy*f,dt,.24);
  const drop=k<.25?k/.25:k<.7?1:Math.max(0,1-(k-.7)/.3);P.camZ=.5-.36*drop;G.roll=K.roll*drop;P.pitch=-.12*drop;
  if(K.t<=0){G.knock=null;G.roll=0;P.pitch=0;P.camZ=.5;return false;}return true;}
function frontGate(){for(let d=.3;d<=1.8;d+=.1){const cx=(P.x+Math.cos(P.a)*d)|0,cy=(P.y+Math.sin(P.a)*d)|0;if(!inB(cx,cy))return false;const t=TILE[cy*MW+cx];if(t===63)return true;if(t!==0)return false;}return false;}
function useGate(){if(!G.gkey){sfx.click();msg('ВОРОТА НА ЦЕПИ — КЛЮЧ У СТОРОЖА');return;}
  for(let y=GATE11.y0;y<=GATE11.y1;y++){const i=y*MW+GATE11.x;TILE[i]=0;ZONE[i]=Z_OUT;}G.gateOpen=true;sfx.door();sfx.clunk();msg('ВОРОТА ОТКРЫТЫ');computeFlow();}
function updateGar(dt){updateCars(dt);
  {const d=Math.hypot(P.x-102.9,P.y-10.2);if(d<9){G.spitT=(G.spitT||0)-dt;if(G.spitT<=0){G.spitT=1.4+Math.random()*2.2;nz(.06,'highpass',2400,1,.07*(1-d/9),.05);if(Math.random()<.4)nz(.04,'bandpass',4200,3,.05*(1-d/9),.03,.12);}}}
  if(G.gateOpen&&!G.garDone&&P.x>GATE11.x+.6){G.garDone=true;keys.clear();G.winTime=G.time;transition(()=>endGame('win'),.8);}
  if(!G.gkey&&!(G.msgT>0)&&frontGate())msg('ВОРОТА НА ЦЕПИ — КЛЮЧ У СТОРОЖА');
  if(!(G.msgT>0)&&facingStorozh())msg('E — ПОГОВОРИТЬ СО СТОРОЖЕМ');}
function garDoorHint(){return null;}
