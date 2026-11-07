'use strict';
/* ---------- ШКОЛА · ЭТАЖ 1: вахта, гардероб, столовая; the техничка lets you into the corridor only in сменка ---------- */
const SCH={door:24*MW+34,front:41*MW+34};
function tSchW(g,r,v){
  R(g,'#d6d3c8',0,0,64,30);speck(g,r,380,['#cecbc0','#dddad0','#c6c3b8'],0,0,64,30);
  R(g,'#5e957a',0,32,64,28);speck(g,r,320,['#588e74','#659c81','#53876d'],0,32,64,28);
  R(g,'#2f5a47',0,30,64,2);R(g,'#7aae94',0,32,64,1);R(g,'#5a3a22',0,60,64,4);R(g,'#6e4a2c',0,60,64,1);
  for(let i=0;i<5;i++)R(g,'#a8c4b4',(r()*60)|0,36+((r()*20)|0),1+((r()*3)|0),1);
  if(v===1){R(g,'#6a4a2a',22,5,20,22);R(g,'#c8bc98',24,7,16,18);R(g,'#8a7a5a',28,10,8,7);R(g,'#5a4a36',27,17,10,6);}
  if(v===2){R(g,'#a8281e',8,4,48,24);R(g,'#c83a2a',8,4,48,2);R(g,'#e8d070',14,6,36,3);
    for(const [x,y] of [[11,12],[24,12],[37,12],[11,20],[24,20],[37,20]]){R(g,'#eee8d8',x,y,11,6);R(g,'#8a8478',x+1,y+2,9,1);R(g,'#8a8478',x+1,y+4,6,1);}}}
function tSchDoor(g,r){
  tSchW(g,r,0);R(g,'#8a8a82',4,0,56,64);R(g,'#e2ded2',7,3,50,61);R(g,'#cfcbbe',7,3,50,1);
  R(g,'#9ab4be',14,8,36,22);R(g,'#7a96a2',14,8,36,1);for(let x=14;x<50;x+=6)R(g,'#c8d4d8',x,8,1,22);for(let y=8;y<30;y+=6)R(g,'#c8d4d8',14,y,36,1);
  R(g,'#c8c4b6',14,36,36,22);R(g,'#b4b0a2',14,57,36,1);R(g,'#1e2a24',24,32,16,3);R(g,'#e8e0c0',27,33,10,1);
  R(g,'#8a7a4a',50,38,4,2);R(g,'#5a4a2a',50,40,2,4);}
function tSchWin(g,r){
  tSchW(g,r,0);R(g,'#dedbd0',6,2,52,40);R(g,'#141c2e',9,5,46,34);
  for(let i=0;i<14;i++)R(g,'#3a4a6a',9+((r()*46)|0),5+((r()*20)|0),1,1);R(g,'#0a0e18',9,27,46,12);
  for(let x=12;x<54;x+=5)if(r()<.5)R(g,r()<.7?'#c98a44':'#6f86c2',x,30+((r()*6)|0),2,2);
  R(g,'#dedbd0',31,5,2,34);R(g,'#dedbd0',9,18,46,2);R(g,'rgba(200,220,255,.18)',12,7,8,10);
  R(g,'#e8e4da',4,41,56,3);R(g,'#c8c4b8',4,44,56,1);
  for(let x=10;x<54;x+=4){R(g,'#d0ccc0',x,47,3,12);R(g,'#a8a498',x+3,47,1,12);}R(g,'#b8b4a8',10,46,44,1);R(g,'#8a8478',10,59,44,1);}
function tBoard(g,r){
  tSchW(g,r,0);R(g,'#5a3a22',0,4,64,34);R(g,'#1f3a2c',0,7,64,28);speck(g,r,160,['#23402f','#1b3528','#2a4a38'],0,7,64,28);
  g.globalAlpha=.7;for(let i=0;i<6;i++)R(g,'#d8dcd4',6+((r()*40)|0),11+i*4,6+((r()*16)|0),1);g.globalAlpha=1;
  R(g,'#e8e8e0',8,12,1,1);R(g,'#6a4a2c',0,36,64,3);R(g,'#f0f0e8',20,35,4,1);R(g,'#e8d8d0',40,35,3,1);}
function tCoats(g,r){
  R(g,'#24201c',0,0,64,64);R(g,'#8a8a86',0,6,64,2);R(g,'#b0b0aa',0,6,64,1);
  let x=0;while(x<64){const w=6+((r()*5)|0),c=['#2a3450','#5a3a26','#7a2a26','#4a4a4e','#3a4a32','#6a5a3a','#22252e'][(r()*7)|0];
    R(g,'#9a9a94',x+(w>>1),7,1,3);poly(g,c,[[x+1,10],[x+w-1,10],[x+w,40+((r()*10)|0)],[x,40+((r()*10)|0)]]);R(g,shadeHex(c,.7),x+(w>>1),12,1,26);
    if(r()<.35){R(g,c==='#7a2a26'?'#c8b040':'#d8d0c0',x+1,1,w-2,5);}x+=w;}
  R(g,'#5a5a56',0,52,64,2);for(let k=0;k<5;k++){const bx=2+((r()*56)|0);R(g,['#2a3a6a','#6a2a2a','#3a5a3a'][k%3],bx,54,6,9);R(g,'#e8e4d8',bx+2,53,2,2);}}
function tWcDoor(g,r,ch){tSchDoor(g,r);R(g,'#c8c4b6',14,8,36,22);R(g,'#b4b0a2',14,29,36,1);R(g,'#1e2a24',24,10,16,16);
  g.fillStyle='#e8e0c0';g.font='bold 13px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(ch,32,19);}
function tStall(g,r){tSchW(g,r,0);R(g,'#3a5a7a',4,6,56,54);R(g,'#4a6a8a',4,6,56,2);R(g,'#2a4058',4,58,56,2);R(g,'#8a8a86',6,60,2,4);R(g,'#8a8a86',56,60,2,4);
  speck(g,r,90,['#34506e','#44648a'],4,8,56,50);g.globalAlpha=.6;R(g,'#1a1a1a',14,22,10,1);R(g,'#1a1a1a',30,30,14,1);R(g,'#1a1a1a',20,36,6,1);g.globalAlpha=1;}
function tHonor(g,r){
  tSchW(g,r,0);R(g,'#7a1a18',2,2,60,56);R(g,'#9a2622',4,4,56,52);R(g,'#d8b040',6,6,52,6);R(g,'#7a1a18',10,8,44,2);
  for(let y=16;y<52;y+=12)for(let x=8;x<56;x+=10){R(g,'#e6dcc4',x,y,8,10);R(g,'#a89a7c',x+2,y+2,4,4);R(g,'#5a4a3a',x+1,y+6,6,3);}}
function tSchFloor(g,r){for(let y=0;y<64;y+=8)for(let x=0;x<64;x+=8){const k=((x>>3)+(y>>3))&1,c=k?'#9a4a32':'#c8b48a';R(g,c,x,y,8,8);R(g,shadeHex(c,.82),x,y+7,8,1);R(g,shadeHex(c,.82),x+7,y,1,8);}
  speck(g,r,260,['rgba(0,0,0,.12)','rgba(255,255,255,.08)'],0,0,64,64);}
function tTerr(g,r){R(g,'#8a8680',0,0,64,64);speck(g,r,900,['#a6a29a','#6a6660','#c8c4bc','#7a4a3a','#4a4844'],0,0,64,64);R(g,'#6e6a64',0,0,64,1);R(g,'#6e6a64',0,0,1,64);}
function tBoards(g,r){for(let x=0;x<64;x+=8){R(g,'#7a3a24',x,0,8,64);R(g,'#8a4630',x+1,0,2,64);R(g,'#5a2a1a',x+7,0,1,64);const s=(r()*64)|0;R(g,'#5a2a1a',x,s,8,1);}
  speck(g,r,200,['#6e3420','#844230'],0,0,64,64);}
function tCheck(g,r){for(let y=0;y<64;y+=16)for(let x=0;x<64;x+=16){const c=((x>>4)+(y>>4))&1?'#8a6a4a':'#d6cbb0';R(g,c,x,y,16,16);R(g,shadeHex(c,.85),x,y+15,16,1);R(g,shadeHex(c,.85),x+15,y,1,16);}
  speck(g,r,180,['rgba(0,0,0,.1)'],0,0,64,64);}
function tStep(g,r){for(let y=0;y<64;y+=16){R(g,'#8a8680',0,y,64,12);R(g,'#6a6660',0,y+12,64,4);R(g,'#a4a098',0,y,64,2);R(g,'#4a4a48',0,y+2,64,1);}speck(g,r,300,['#7a7670','#94908a'],0,0,64,64);}
function tSchCeil(g,r){R(g,'#cfcdc4',0,0,64,64);speck(g,r,300,['#c6c4ba','#d8d6ce'],0,0,64,64);R(g,'#b8b6ac',0,63,64,1);R(g,'#b8b6ac',63,0,1,64);}
function schoolArt(){
  TX.schW=[0,1,2].map(v=>bake(g=>tSchW(g,rng(700+v),v)));TX.schDoor=bake(g=>tSchDoor(g,rng(704)));TX.schWin=bake(g=>tSchWin(g,rng(705)));
  TX.board=bake(g=>tBoard(g,rng(706)));TX.coats=bake(g=>tCoats(g,rng(707)));TX.honor=bake(g=>tHonor(g,rng(708)));
  TX.schFloor=bake(g=>tSchFloor(g,rng(709)));TX.schTerr=bake(g=>tTerr(g,rng(710)));TX.schBoards=bake(g=>tBoards(g,rng(711)));
  TX.schCheck=bake(g=>tCheck(g,rng(712)));TX.wcM=bake(g=>tWcDoor(g,rng(715),'М'));TX.wcW=bake(g=>tWcDoor(g,rng(716),'Ж'));TX.stall=bake(g=>tStall(g,rng(717)));TX.schStep=bake(g=>tStep(g,rng(713)));TX.schCeil=bake(g=>tSchCeil(g,rng(714)));
  /* парта: two-seater, slanted green lid, bench on the same frame */
  SPR.parta=bake(g=>{R(g,'#2a2420',10,44,3,19);R(g,'#2a2420',51,44,3,19);R(g,'#2a2420',10,60,44,2);
    poly(g,'#3e6a4a',[[8,36],[56,36],[58,44],[6,44]]);R(g,'#4e7a5a',8,36,48,1);R(g,'#2e5038',6,44,52,2);R(g,'#8a6a4a',20,38,3,1);R(g,'#8a6a4a',42,38,3,1);
    R(g,'#5a3a22',12,50,40,3);R(g,'#6e4a2c',12,50,40,1);});
  SPR.bucket=bake(g=>{poly(g,'#9a9e9c',[[22,44],[42,44],[40,62],[24,62]]);R(g,'#c0c4c2',22,44,20,2);R(g,'#7a7e7c',24,52,16,1);g.strokeStyle='#5a5e5c';g.lineWidth=1;g.beginPath();g.arc(32,44,9,Math.PI,0);g.stroke();
    R(g,'#c8bca0',26,40,12,5);R(g,'#a89c80',30,42,6,3);});
  SPR.stul=bake(g=>{R(g,'#3a3a3a',20,40,2,23);R(g,'#3a3a3a',42,40,2,23);R(g,'#3a3a3a',24,44,2,19);R(g,'#3a3a3a',38,44,2,19);
    R(g,'#8a5a32',18,38,28,5);R(g,'#a06a3c',18,38,28,1);R(g,'#3a3a3a',20,16,2,24);R(g,'#3a3a3a',42,16,2,24);R(g,'#8a5a32',18,16,28,10);R(g,'#a06a3c',18,16,28,1);});
  SPR.globe=bake(g=>{R(g,'#5a3a22',22,58,20,5);R(g,'#4a4a44',31,44,2,14);g.strokeStyle='#8a8a80';g.lineWidth=2;g.beginPath();g.arc(32,30,17,-1.2,1.9);g.stroke();
    g.fillStyle='#3a6aa8';g.beginPath();g.arc(32,30,14,0,7);g.fill();for(const [x,y,w,h] of [[24,22,8,6],[34,26,7,10],[22,32,6,5],[36,18,5,4]])R(g,'#5a9a4a',x,y,w,h);R(g,'rgba(255,255,255,.35)',25,21,3,3);});
  SPR.flower=bake(g=>{poly(g,'#8a4a2a',[[22,48],[42,48],[39,63],[25,63]]);R(g,'#a85a34',22,48,20,2);R(g,'#3a2a1a',24,47,16,2);R(g,'#4a6a2a',31,22,2,26);
    for(const [x,y,a] of [[22,26,-.5],[40,22,.5],[18,38,-.3],[44,36,.3],[30,12,0],[26,32,-.7],[38,30,.7]]){g.save();g.translate(x,y);g.rotate(a);g.fillStyle='#2e6a2e';g.beginPath();g.ellipse(0,0,4,8,0,0,7);g.fill();g.fillStyle='#3e8a3a';g.fillRect(-1,-6,1,12);g.restore();}});
  SPR.shkaf=bake(g=>{const r=rng(720);R(g,'#5a3a22',8,4,48,59);R(g,'#6e4a2c',8,4,48,2);R(g,'#3e2616',31,6,2,56);
    R(g,'#9ab4be',11,8,18,26);R(g,'#9ab4be',35,8,18,26);for(const y of [20,33])R(g,'#4a2e1a',11,y,42,2);
    for(let x=12;x<52;x+=3){if(x>28&&x<35)continue;for(const y of [10,22])R(g,['#a83a2a','#2a4a8a','#3a6a3a','#c8a040','#e8e0c8'][(r()*5)|0],x,y+((r()*3)|0),2,10-((r()*3)|0));}
    R(g,'#6e4a2c',11,38,18,22);R(g,'#6e4a2c',35,38,18,22);R(g,'#c8a050',27,48,2,4);R(g,'#c8a050',35,48,2,4);R(g,'rgba(255,255,255,.2)',13,9,3,22);});
  SPR.medshkaf=bake(g=>{R(g,'#e8e6de',12,6,40,57);R(g,'#c8c6be',12,6,40,2);R(g,'#b8b6ae',31,8,2,54);R(g,'#bcd0d4',15,10,14,28);R(g,'#bcd0d4',35,10,14,28);
    for(const y of [18,28])R(g,'#a8a8a0',15,y,34,1);for(const [x,y,c] of [[17,13,'#8a5a2a'],[21,12,'#e8e8e8'],[38,12,'#c84a2a'],[43,13,'#8a5a2a'],[18,22,'#e8e8e8'],[40,22,'#3a6a3a'],[24,23,'#c8a040']])R(g,c,x,y,3,5);
    R(g,'#c82a22',28,44,8,2);R(g,'#c82a22',31,41,2,8);});
  SPR.sink=bake(g=>{R(g,'#d8d8d0',28,40,8,23);R(g,'#b8b8b0',34,40,2,23);poly(g,'#eeeee6',[[16,30],[48,30],[44,40],[20,40]]);R(g,'#c8c8c0',18,30,28,2);
    R(g,'#9a9a94',31,22,2,9);R(g,'#9a9a94',31,22,7,2);R(g,'#7a7a74',29,20,6,2);R(g,'#c8a050',24,36,4,2);});
  SPR.unitaz=bake(g=>{R(g,'#e8e8e0',24,22,16,12);R(g,'#c8c8c0',24,32,16,2);R(g,'#9a9a94',31,10,2,12);R(g,'#5a5a56',30,8,8,2);
    poly(g,'#eeeee6',[[18,40],[46,40],[42,52],[36,63],[28,63],[22,52]]);R(g,'#d0d0c8',20,40,24,3);R(g,'#2a2a28',24,42,16,3);R(g,'#c8c8c0',28,56,8,7);});
  SPR.pissuar=bake(g=>{poly(g,'#eeeee6',[[22,20],[42,20],[44,48],[38,56],[26,56],[20,48]]);R(g,'#c8c8c0',24,26,16,22);R(g,'#d8d8d0',22,20,20,2);R(g,'#9a9a94',31,10,2,10);R(g,'#7a7a74',31,56,2,7);});
  /* мешок для сменки: dark-blue drawstring bag with a name tag, чешки poking out */
  SPR.smenka=bake(g=>{poly(g,'#2a3a6a',[[22,40],[42,40],[46,62],[18,62]]);R(g,'#3a4a7a',22,40,20,2);R(g,'#e8e4d8',24,38,16,2);R(g,'#e8e4d8',31,30,2,9);
    R(g,'#e8e4d8',26,50,12,5);R(g,'#c02a22',28,52,8,1);R(g,'#1e1e22',40,55,10,5);R(g,'#d8d4c8',40,59,10,1);});
  /* техничка: blue робе, kerchief, mop and bucket */
  SPR.Wtech=bake(g=>{drawWoman(g,{dress:'#2a3a6a',skin:'#d0a080',hair:'#8a8680',cap:1});g.strokeStyle='#8a6a42';g.lineWidth=2;g.beginPath();g.moveTo(48,18);g.lineTo(54,60);g.stroke();
    R(g,'#c8bca0',50,58,10,4);poly(g,'#9a9e9c',[[6,50],[18,50],[17,63],[7,63]]);R(g,'#c0c4c2',6,50,12,1);});
}
schoolArt();
function schoolWalls(){return {1:TX.schW,3:[TX.board],6:[TX.schDoor],16:[TX.coats],17:[TX.stend],20:[TX.stall],22:[TX.schWin],37:[TX.wcM],43:[TX.wcW]};}
function schoolCells(){for(let i=0;i<N;i++){const c=FLCH[i];CEILTEX[i]=TX.schCeil;
  if(c===46)FLOORTEX[i]=TX.schFloor;else if(c===114)FLOORTEX[i]=TX.schTerr;else if(c===58)FLOORTEX[i]=TX.schBoards;else if(c===59)FLOORTEX[i]=TX.schCheck;else if(c===109)FLOORTEX[i]=TX.schStep;}}
function schInit(){G.techOK=false;G.techT=0;G.bellT=BELL.first;BDOOR=SCH.door;}
function techNag(){G.bark='ТЕХНИЧКА: «'+pick(['Куда в уличной обуви?! Сменку надень!','Я только помыла! Сменка где?','Без сменки не пущу. Гардероб — налево.'])+'»';G.barkT=2.6;sfx.bark(230);msg('НУЖНА СМЕНКА · ГАРДЕРОБ');}
/* E on a door: true if the school keeps it shut */
function schoolDoor(i){
  if(TILE[i]===7){sfx.click();msg(G.level===14?'ДИРЕКТОР · ЗАПЕРТО':i===SCH.front?'ДОМОЙ РАНО · УРОКИ':'ПОДВАЛ ЗАПЕРТ');return true;}
  if(G.level===13&&i===SCH.door&&!worn('smenka')){sfx.click();techNag();return true;}
  if(TILE[i]===43){sfx.click();G.bark='ТЫ: «'+pick(['Не, туда нельзя.','Это женский. Мимо.','Ж. Я не настолько потерялся.'])+'»';G.barkT=2;msg('ЖЕНСКИЙ ТУАЛЕТ');return true;}
  return false;}
function updateSchool(dt){G.techT-=dt;
  if(Math.hypot(P.x-34.5,P.y-25.5)<2.2){
    if(!worn('smenka')){if(G.techT<=0){techNag();G.techT=6;}}
    else if(!G.techOK){G.techOK=true;G.bark='ТЕХНИЧКА: «Вот, другое дело. Проходи. И не бегать!»';G.barkT=2.6;sfx.bark(230);doorTarget[SCH.door]=1;doorTimer[SCH.door]=0;sfx.door();}}
  if(G.techOK)schBell(dt);
  if(P.x<13&&P.y<12.5&&!G.trans){keys.clear();transition(()=>{enterLevel(14);msg('ШКОЛА · ЭТАЖ 2');},.5);}}

/* ---------- уроки и перемены: the bell sends a crowd down the stairs, along the рекреация to the столовая and back.
   It never goes into classrooms (or toilets, or the вестибюль): that's where you hide ---------- */
const BELL={first:20,lesson:35,brk:22,n:40};
const CROWD_PAL=[
  {suit:'#1e2a55',top:'#24336a',stripe:'#1e2a55',skin:'#e0b090',hair:'#6b4a2a',shoe:'#2a2a2a',hat:'none',hatC:'#222'},
  {suit:'#1e2a55',top:'#e8e4d8',stripe:'#1e2a55',skin:'#e0b090',hair:'#3a2a18',shoe:'#3a2a1a',hat:'none',hatC:'#222',tie:1},
  {suit:'#5a3a24',top:'#5a3a24',stripe:'#5a3a24',skin:'#e8c0a0',hair:'#c8a060',shoe:'#2a1a10',hat:'none',hatC:'#222'},
  {suit:'#2a5a9a',top:'#c83a2a',stripe:'#f0f0f0',skin:'#d0a283',hair:'#8a6a3a',shoe:'#e2e2e2',hat:'cap',hatC:'#2a3a6a'},
  {suit:'#1e2a55',top:'#24336a',stripe:'#1e2a55',skin:'#c99a7a',hair:'#1a1410',shoe:'#141414',hat:'knit',hatC:'#b3262b'}];
SPR.crowd=CROWD_PAL.map(p=>({stand:bake(g=>drawGop(g,'stand',p)),walk1:bake(g=>drawGop(g,'walk1',p)),walk2:bake(g=>drawGop(g,'walk2',p))}));
SPR.wad=bake(g=>{R(g,'#d8d6cc',29,29,7,6);R(g,'#b8b4a8',30,34,5,1);R(g,'#f4f2ea',30,30,2,2);});
const CROWD_BARK=['С дороги!','В столовку!','Чур я первый!','Булочки!','Догоняй!','А-а-а-а!','Посторонись!'];
function bellRing(){for(let i=0;i<50;i++){const t=i/20;tone('square',2350,2300,.04,.045,t);tone('sine',1180,1170,.05,.07,t+.01);}G.shake=Math.max(G.shake,.15);}
/* lanes cover the whole width; 40% hug a wall so there's no safe strip along the sides */
const crowdLane=()=>{const r=Math.random();return r<.2?20.3+Math.random()*.5:r<.4?23.2+Math.random()*.5:20.3+Math.random()*3.4;},cafX=()=>(Math.random()<.5?53:60)+(Math.random()-.5)*.8;
const cafPt=()=>[49.6+Math.random()*14.8,pick([11.8,15,18.2])];
function crowdSpawn(n){const x=8.6+Math.random()*3.8,y=12+Math.random()*3,run=n%5<2,ln=crowdLane(),ex=cafX();
  ents.push({kind:'crowd',x,y,s:(Math.random()*CROWD_PAL.length)|0,sc:.66+Math.random()*.16,spd:3.3+Math.random()*.9,walk:Math.random()*2,wait:0,hitT:0,vx:0,vy:1,dead:false,
    mode:run?'run':'caf',wp:run?[[x,ln],[63.5,crowdLane()]]:[[x,ln],[ex,ln],[ex,18.4],cafPt()]});}
function crowdNext(c){
  if(c.mode==='home'){c.dead=true;return;}
  if(c.mode==='run'){c.wp.push([c.x<36?63.5:9,crowdLane()]);return;}
  if(Math.random()<.5)c.wait=.4+Math.random()*1.6;c.wp.push(cafPt());}
function crowdHome(c){c.mode='home';c.spd*=1.4;c.wait=Math.random()*.6;const ln=crowdLane(),sx=9+Math.random()*3;
  c.wp=c.y<19.8?[[Math.abs(c.x-53)<Math.abs(c.x-60)?53:60,18.4],[Math.abs(c.x-53)<Math.abs(c.x-60)?53:60,ln],[sx,ln],[sx,15],[sx,12]]:[[sx,ln],[sx,15],[sx,12]];}
function schBell(dt){G.bellT-=dt;
  if(!G.schBreak){
    if(G.bellT<5&&!G.schWarn){G.schWarn=true;msg('СКОРО ЗВОНОК');}
    if(G.bellT<=0){G.schBreak=true;G.schWarn=false;G.bellT=BELL.brk;G.crowdOut=BELL.n;G.crowdSpT=1.4;bellRing();msg('ПЕРЕМЕНА! ПРЯЧЬСЯ В КЛАСС');}}
  else{
    G.crowdSpT-=dt;if(G.crowdOut>0&&G.crowdSpT<=0){crowdSpawn(G.crowdOut--);G.crowdSpT=.05+Math.random()*.07;}
    if(G.bellT<=0&&!G.schHome){G.schHome=true;G.crowdOut=0;bellRing();msg('ЗВОНОК НА УРОК');for(const c of ents)if(c.kind==='crowd'&&!c.dead)crowdHome(c);}
    if(G.schHome&&!ents.some(c=>c.kind==='crowd'&&!c.dead)){G.schBreak=G.schHome=false;G.bellT=BELL.lesson;}}
  updateCrowd(dt);}
function updateCrowd(dt){G.crowdHitT-=dt;
  for(const c of ents){if(c.kind!=='crowd'||c.dead)continue;c.hitT-=dt;
    if(c.wait>0)c.wait-=dt;
    else{if(!c.wp.length){crowdNext(c);if(c.dead)continue;}
      const w=c.wp[0],dx=w[0]-c.x,dy=w[1]-c.y,d=Math.hypot(dx,dy);
      if(d<.15)c.wp.shift();else{const st=Math.min(d,c.spd*dt);c.vx=dx/d;c.vy=dy/d;c.x+=c.vx*st;c.y+=c.vy*st;c.walk+=st*3.2;}}
    const px=P.x-c.x,py=P.y-c.y,pd=Math.hypot(px,py);if(pd>=.62||G.state!=='play')continue;
    const ux=pd>.01?px/pd:c.vx,uy=pd>.01?py/pd:c.vy;moveBody(P,ux*(.62-pd),uy*(.62-pd),1,.24);
    if(c.wait<=0&&c.hitT<=0&&G.crowdHitT<=0){c.hitT=.9;G.crowdHitT=.35;hurtPlayer(5+Math.random()*4);sfx.punch();G.shake=Math.max(G.shake,.25);
      moveBody(P,(c.vx+ux)*.3,(c.vy+uy)*.3,1,.24);
      if(G.barkT<.6){G.bark='ТОЛПА: «'+pick(CROWD_BARK)+'»';G.barkT=1.4;}}}
  if(G.schBreak&&Math.random()<dt*1.4){const c=ents.find(o=>o.kind==='crowd'&&!o.dead&&Math.hypot(o.x-P.x,o.y-P.y)<12);if(c)vocal(380+Math.random()*200,.25+Math.random()*.2,.8,[700,1300,2600]);}}
function updateSchoolAudio(){if(!AU.c)return;const t=AU.c.currentTime;
  if(G.level!==13){if(AU.schOn){AU.schOn=false;if(G.level!==8&&AU.crowd)AU.crowd.gain.setTargetAtTime(0,t,.3);}return;}
  AU.schOn=true;let s=0;if(G.state==='play')for(const c of ents)if(c.kind==='crowd'&&!c.dead)s+=Math.max(0,1-Math.hypot(c.x-P.x,c.y-P.y)/16)*(los(P.x,P.y,c.x,c.y)?1:.4);
  crowdBus().gain.setTargetAtTime(Math.min(.18,s*.02),t,.25);}
function schoolHud(g){const b=G.schBreak,s=Math.max(0,Math.ceil(G.bellT));
  stxt(g,G.schHome?'НА УРОК':(b?'ПЕРЕМЕНА ':'УРОК ')+((s/60)|0)+':'+String(s%60).padStart(2,'0'),394,6,b?DANGER:G.bellT<5?WARN:'#d8d4c8','right');}

/* ---------- ШКОЛА · ЭТАЖ 2: классы, химия, учительская, актовый зал, библиотека, приёмная директора ---------- */
function tShelf(g,r){R(g,'#4a2e1a',0,0,64,64);R(g,'#5e3c22',0,0,64,3);
  for(let y=4;y<60;y+=11){R(g,'#2a1a10',2,y,60,9);let x=3;while(x<61){const w=2+((r()*3)|0),h=6+((r()*3)|0);if(r()<.08){x+=3;continue;}
      R(g,['#7a2a22','#2a4a7a','#3a6a3a','#8a6a2a','#5a3a5a','#c8b48a','#2a2a2a'][(r()*7)|0],x,y+9-h,w,h);if(r()<.4)R(g,'#d8c890',x,y+10-h,w,1);x+=w;}
    R(g,'#6e4a2c',0,y+9,64,2);}
  R(g,'#3a2414',0,0,2,64);R(g,'#3a2414',62,0,2,64);}
function tCurtain(g,r,top){R(g,'#5a0e12',0,0,64,64);for(let x=0;x<64;x+=8){R(g,'#8a1a1e',x+1,0,4,64);R(g,'#a8282a',x+2,0,1,64);R(g,'#3e080a',x+6,0,2,64);}
  speck(g,r,120,['#4e0c10','#7a161a'],0,0,64,64);
  if(top){R(g,'#6a1216',0,0,64,10);for(let x=0;x<64;x+=16){g.fillStyle='#4a0a0c';g.beginPath();g.arc(x+8,10,8,0,Math.PI);g.fill();}R(g,'#c8a040',0,10,64,1);R(g,'#a8802a',0,0,64,2);}
  else{R(g,'#c8a040',0,58,64,2);for(let x=1;x<64;x+=3)R(g,'#a8802a',x,60,1,4);}}
function tMendel(g,r){tSchW(g,r,0);R(g,'#5a3a22',3,3,58,36);R(g,'#eeeae0',4,4,56,34);R(g,'#1a1a1a',14,5,36,2);
  const C=['#e8a0a0','#a0c8e8','#e8d890','#b0e0a8','#d0b0e0'];
  for(let row=0;row<6;row++)for(let col=0;col<18;col++){if(row===0&&col>0&&col<17)continue;if((row===1||row===2)&&col>1&&col<12)continue;
    R(g,C[col<2?0:col>11?(col>16?4:3):row>3?2:1],5+col*3,9+row*4,2,3);}
  R(g,'#d0b0e0',14,34,30,2);}
function tDerm(g,r){tSchW(g,r,0);R(g,'#2a1a10',4,0,56,64);R(g,'#5a2e1a',7,2,50,62);
  for(let y=6;y<62;y+=8)for(let x=10+((y/8)&1)*4;x<56;x+=8){R(g,'#4a2414',x,y,2,2);R(g,'#c8a050',x,y,1,1);}
  R(g,'#6a3a22',7,2,50,1);R(g,'#c8a050',13,11,38,11);R(g,'#e0c070',13,11,38,1);R(g,'#8a6a2a',13,21,38,1);g.fillStyle='#3a2410';g.font='bold 7px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ДИРЕКТОР',32,17);R(g,'#c8a050',50,34,4,3);R(g,'#8a6a2a',50,37,2,5);}
function school2Art(){
  TX.shelf=bake(g=>tShelf(g,rng(730)));TX.curtain=bake(g=>tCurtain(g,rng(731),0));TX.curtainTop=bake(g=>tCurtain(g,rng(731),1));TX.mendel=bake(g=>tMendel(g,rng(732)));TX.derm=bake(g=>tDerm(g,rng(733)));
  /* лабораторный стол: black top, flasks and a spirit lamp */
  SPR.labtable=bake(g=>{R(g,'#5a5a56',10,42,3,21);R(g,'#5a5a56',51,42,3,21);R(g,'#4a4a46',12,52,40,8);R(g,'#5a5a56',12,52,40,1);
    R(g,'#1e1e20',6,38,52,5);R(g,'#3a3a3e',6,38,52,1);
    poly(g,'#bcd8d8',[[16,28],[20,28],[24,38],[12,38]]);R(g,'#60b060',13,34,10,4);
    R(g,'#bcd8d8',30,26,4,12);R(g,'#c84a8a',30,32,4,6);R(g,'#d8e4e4',30,26,4,1);
    R(g,'#c8c4b0',42,32,8,6);R(g,'#8a8478',45,30,2,2);R(g,'#ffb040',45,27,2,3);R(g,'#fff0a0',45,28,1,1);});}
school2Art();
function school2Walls(){return {1:TX.schW,3:[TX.board],6:[TX.schDoor],7:[TX.derm],10:[TX.shelf],14:[TX.hallDoor],16:[TX.shelf],17:[TX.curtain],20:[TX.stall],22:[TX.schWin],23:[TX.mendel],31:[TX.honor],32:[TX.bigBook],33:[TX.shelf],37:[TX.wcM],43:[TX.wcW]};}
/* актовый зал: two units tall (TALL2), see renderTop; the stairs down: walk back up the flight you came from */
const HALL={x0:49,y0:5,x1:64,y1:18},LIB={book:31*MW+32,door:37*MW+30};
function school2Cells(){schoolCells();for(let y=HALL.y0;y<=HALL.y1;y++)for(let x=HALL.x0;x<=HALL.x1;x++)TALL2[y*MW+x]=1;}
function updateSchool2(){if(P.x<13&&P.y<11.3&&!G.trans){keys.clear();transition(()=>{enterLevel(13);G.techOK=true;P.x=10.5;P.y=13.8;P.a=Math.PI/2;msg('ШКОЛА · ЭТАЖ 1');},.5);}}

/* ---------- floor 2 art: upper halves for the tall hall, hall doors, the big book; gum ---------- */
function tSchWup(g,r){R(g,'#d6d3c8',0,0,64,64);speck(g,r,700,['#cecbc0','#dddad0','#c6c3b8'],0,0,64,64);R(g,'#c4c0b2',0,0,64,3);R(g,'#e4e0d4',0,3,64,1);}
function tSchWinUp(g,r){tSchWup(g,r);R(g,'#dedbd0',6,6,52,58);R(g,'#141c2e',9,9,46,55);for(let i=0;i<22;i++)R(g,'#3a4a6a',9+((r()*46)|0),9+((r()*50)|0),1,1);
  R(g,'#dedbd0',31,9,2,55);R(g,'#dedbd0',9,30,46,2);R(g,'rgba(200,220,255,.18)',12,11,8,14);}
function tHallDoor(g,r){tSchW(g,r,0);R(g,'#6a4a2a',2,0,60,64);R(g,'#c8a050',16,2,32,8);R(g,'#8a6a2a',16,9,32,1);
  g.fillStyle='#3a2410';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('АКТОВЫЙ ЗАЛ',32,6);
  for(const x of [5,33]){R(g,'#8a5a32',x,12,26,52);R(g,'#9a6a3c',x,12,26,1);R(g,'#7a4a28',x+3,40,20,20);R(g,'#6a3e22',x+3,59,20,1);
    g.fillStyle='#4a3a2a';g.beginPath();g.arc(x+13,26,7,0,7);g.fill();g.fillStyle='#8aa4b0';g.beginPath();g.arc(x+13,26,5,0,7);g.fill();R(g,'rgba(255,255,255,.3)',x+10,23,2,2);}
  R(g,'#3a2414',31,12,2,52);R(g,'#d8b050',27,36,3,6);R(g,'#d8b050',34,36,3,6);}
function tStend(g,r){tSchW(g,r,0);R(g,'#5a3a22',2,2,60,38);R(g,'#c8a878',4,4,56,34);speck(g,r,120,['#b8986a','#d4b488'],4,4,56,34);R(g,'#a8241e',4,4,56,6);R(g,'#e8d070',14,6,36,2);
  for(const [x,y,w,h,c] of [[6,12,14,12,'#f0ece0'],[22,12,10,10,'#f0e6a0'],[34,13,12,11,'#f0ece0'],[48,12,10,13,'#d8e4f0'],[7,26,11,10,'#f0d0d0'],[21,25,14,11,'#f0ece0'],[38,27,9,9,'#f0e6a0'],[49,27,9,9,'#f0ece0']]){
    R(g,'rgba(0,0,0,.25)',x+1,y+1,w,h);R(g,c,x,y,w,h);for(let k=y+3;k<y+h-1;k+=2)R(g,'#8a8478',x+2,k,w-4-((r()*4)|0),1);R(g,r()<.5?'#c02a22':'#2a4ac0',x+(w>>1),y,2,2);}}
function tBigBook(g,r){tShelf(g,r);R(g,'rgba(0,0,0,.45)',23,14,22,40);R(g,'#8a1012',20,10,22,42);R(g,'#c41e1e',22,10,18,42);R(g,'#e83a2a',22,10,2,42);
  for(const y of [14,20,44])R(g,'#e8c050',22,y,18,2);R(g,'#e8c050',26,26,10,10);R(g,'#c41e1e',28,28,6,6);R(g,'#ffe080',22,10,18,1);}
function school2Art2(){
  TX.schWup=bake(g=>tSchWup(g,rng(740)));TX.schWinUp=bake(g=>tSchWinUp(g,rng(741)));TX.hallDoor=bake(g=>tHallDoor(g,rng(742)));TX.stend=bake(g=>tStend(g,rng(743)));TX.bigBook=bake(g=>tBigBook(g,rng(730)));
  /* трибуна: wooden lectern, red front with a gold emblem, a microphone on a gooseneck */
  SPR.lectern=bake(g=>{poly(g,'#5a3a22',[[16,24],[48,24],[46,63],[18,63]]);poly(g,'#7a4e2c',[[14,20],[50,20],[48,26],[16,26]]);R(g,'#8a5e34',14,20,36,1);
    R(g,'#a8241e',21,30,22,26);R(g,'#c8342a',21,30,22,1);g.fillStyle='#e8c050';g.beginPath();g.arc(32,40,6,0,7);g.fill();R(g,'#a8241e',30,37,4,6);R(g,'#e8c050',22,52,20,1);
    R(g,'#3a2414',16,61,32,2);R(g,'#2a2a2a',40,8,1,13);R(g,'#2a2a2a',37,6,4,3);R(g,'#5a5a5a',37,6,4,1);});
  /* жвачка «Love is»: pink wrapper with the comic strip */
  SPR.gum=bake(g=>{R(g,'rgba(0,0,0,.3)',22,51,22,11);R(g,'#f088b0',20,48,22,12);R(g,'#f8b0cc',20,48,22,2);R(g,'#ffffff',23,51,16,6);R(g,'#c02a5a',24,52,6,1);R(g,'#c02a5a',24,54,10,1);R(g,'#e85a8a',32,52,5,4);R(g,'#2a2a2a',27,55,2,1);});}
school2Art2();
/* E in the school: floor 1's стенд opens the board, floor 2's big book opens the shelf */
function schoolUse(){for(let d=.35;d<=1.35;d+=.1){const cx=(P.x+Math.cos(P.a)*d)|0,cy=(P.y+Math.sin(P.a)*d)|0,i=cy*MW+cx,t=TILE[i];if(t===0)continue;
    if(G.level===13&&t===17){openBoard();return true;}
    if(G.level===14&&i===LIB.book){pullBook();return true;}
    return false;}return false;}
function pullBook(){if(G.libOpen){sfx.click();msg('КНИГА УЖЕ ВЫДВИНУТА');return;}
  G.libOpen=true;sfx.clunk();G.shake=.2;G.bark='ТЫ: «„Капитал“, том второй… Тяжёлый. Ага.»';G.barkT=2.6;
  const i=LIB.door;TILE[i]=10;DOORS.push(i);doorTarget[i]=1;doorTimer[i]=0;setTimeout(()=>sfx.door(),350);G.secrets++;msg('ТАЙНИК!');}

/* ---------- стенд «ИНФОРМАЦИЯ» (floor 1 вестибюль): pinned notices you point at and read, like the барыга's case ---------- */
const BOARD=[
 {t:'РАСПИСАНИЕ ЗВОНКОВ',c:'#f0ece0',l:['1 урок ....... 8:30–9:15','2 урок ....... 9:25–10:10','3 урок ...... 10:30–11:15','4 урок ...... 11:25–12:10','','На переменах по рекреации','НЕ БЕГАТЬ!','В класс — по звонку.']},
 {t:'ДЕЖУРНЫЙ КЛАСС',c:'#f0e6a0',l:['Дежурит 8 «Б».','Дежурные стоят у столовой','и у лестницы.','Сменку проверять у всех.','Без сменки — домой,','за родителями.']},
 {t:'ПРОПАЛ ЖУРНАЛ 8 «Б»',c:'#f0ece0',l:['Кто видел классный журнал —','сдать завучу.','Тому, кто вернёт, —','пятёрка по поведению','за четверть.','','Завуч Р. С. Кузнецова']},
 {t:'КРУЖОК «ЮНЫЙ ХИМИК»',c:'#d8e4f0',l:['Вторник, четверг, 15:00.','Кабинет химии, 2 этаж.','Ведёт М. П. Ершова.','Реактивы из кабинета','не выносить!','Кто взял магний —','верните, не позорьтесь.']},
 {t:'СПАСИБО ШЕФАМ!',c:'#f0ece0',l:['Наши шефы с завода','подарили школе новые парты','и цветной телевизор.','Грузовики шефов приезжают','по ночам, чтобы не мешать','урокам. Подвал не трогать —','там их склад. Директор']},
 {t:'БИБЛИОТЕКА',c:'#f0d0d0',l:['Сдайте книги','до конца четверти!','«Капитал», том второй,','с полки не брать.','Это личный экземпляр','директора.','','Библиотекарь Н. В.']},
 {t:'СБОР МАКУЛАТУРЫ',c:'#f0e6a0',l:['В субботу — субботник','и сбор макулатуры.','Норма — 10 кг на ученика.','Класс-победитель','поедет на экскурсию','на элеватор.']},
 {t:'ПРОДАМ ЖВАЧКУ',c:'#e8f0d8',hand:1,l:['Турбо, Лав из, Дональд.','Вкладыши — меняю.','Спросить Вовку, 7 «А».','Учителям не говорить!!!','','P.S. Тайник у меня лучше,','чем у директора.']}];
const BRECT=[[24,40,82,78],[116,34,82,84],[208,42,82,76],[300,36,78,82],[30,134,80,82],[120,130,82,86],[212,136,80,78],[300,132,80,84]],BROT=[-.04,.03,-.02,.05,.03,-.05,.04,-.02];
const BCLOSE={x:304,y:222,w:80,h:16};
function openBoard(){G.state='board';G.board={t:0};G.hover=-1;G.hand={x:200,y:200};keys.clear();exitLock();sfx.latch();}
function closeBoard(){G.board=null;G.state='play';keys.clear();sfx.tick();}
function boardHover(){G.hover=-1;for(let i=BOARD.length-1;i>=0;i--){const [x,y,w,h]=BRECT[i];if(inR(G.hand,{x,y,w,h})){G.hover=i;break;}}}
function boardClick(){if(!G.board||G.board.t<1)return;G.pokeT=.14;
  if(inR(G.hand,BCLOSE)){closeBoard();return;}
  const i=G.hover;if(i<0)return;const n=BOARD[i];sfx.pickup();openRead(n.t,n.l,null,()=>{G.state='board';});}
function updateBoard(dt){const b=G.board;b.t=Math.min(1,b.t+dt*4);G.pokeT-=dt;
  const hx=((k('ArrowRight')||k('KeyD'))?1:0)-((k('ArrowLeft')||k('KeyA'))?1:0)+pad.x,hy=((k('ArrowDown')||k('KeyS'))?1:0)-((k('ArrowUp')||k('KeyW'))?1:0)+pad.y;
  if(hx||hy){G.hand.x=Math.max(0,Math.min(W-1,G.hand.x+hx*240*dt));G.hand.y=Math.max(0,Math.min(H-1,G.hand.y+hy*240*dt));}
  boardHover();}
function drawBoardUI(){const g=tg,b=G.board;g.save();g.globalAlpha=Math.min(1,b.t*1.5);
  R(g,'#3a2414',0,0,W,H);R(g,'#5a3a22',6,6,W-12,H-12);R(g,'#b8946a',12,12,W-24,H-24);
  const r=rng(77);for(let i=0;i<900;i++)R(g,r()<.5?'#a8845a':'#c8a47a',12+((r()*(W-26))|0),12+((r()*(H-26))|0),2,2);
  R(g,'#a8241e',12,12,W-24,18);stxt(g,'ИНФОРМАЦИЯ',200,17,'#f0d060','center');
  for(let i=0;i<BOARD.length;i++){const n=BOARD[i],[x,y,w,h]=BRECT[i],hv=G.hover===i,lift=hv?3:0;g.save();g.translate(x+w/2,y+h/2-lift);g.rotate(hv?0:BROT[i]);
    R(g,'rgba(0,0,0,.3)',-w/2+2+lift,-h/2+3+lift,w,h);R(g,n.c,-w/2,-h/2,w,h);if(hv){g.strokeStyle=WARN;g.lineWidth=2;g.strokeRect(-w/2,-h/2,w,h);}
    wrapText(n.t,12).forEach((s,k)=>txt(g,s,0,-h/2+8+k*9,n.hand?'#2a3ab0':'#2a2218','center',6));
    const rr=rng(90+i);for(let yy=-h/2+34;yy<h/2-6;yy+=6)R(g,n.hand?'#6a7ac8':'#8a8478',-w/2+6,yy,w-14-((rr()*14)|0),1);
    R(g,i%2?'#2a4ac0':'#c02a22',-2,-h/2-1,4,4);R(g,'#ffffff',-1,-h/2,1,1);g.restore();}
  const hc=inR(G.hand,BCLOSE);R(g,hc?'#5a4e3a':'#3a342a',BCLOSE.x,BCLOSE.y,BCLOSE.w,BCLOSE.h);txt(g,'ОТОЙТИ',BCLOSE.x+BCLOSE.w/2,BCLOSE.y+4,'#e8e1cf','center');
  g.restore();
  const hx=G.hand.x|0,hy=(G.hand.y-(G.pokeT>0?6:0))|0;
  poly(g,SLV,[[hx-2,hy+60],[hx+27,hy+60],[hx+140,H+60],[hx+40,H+60]]);poly(g,SLVD,[[hx+22,hy+60],[hx+27,hy+60],[hx+140,H+60],[hx+128,H+60]]);g.drawImage(ART.hand,hx-16,hy-1);}
function drawBoardBottom(g){txt(g,'СТЕНД В ВЕСТИБЮЛЕ',6,4,WARN);
  const n=G.hover>=0?BOARD[G.hover]:null;
  if(n){wrapText(n.t,18).forEach((s,k)=>txt(g,s,160,60+k*16,VFD,'center',12));}else txt(g,'НАВЕДИ НА ЛИСТОК',160,70,DIM,'center');
  txt(g,'A — ЧИТАТЬ    B — ОТОЙТИ',160,140,LABEL,'center');drawSlots(g,-1);}
