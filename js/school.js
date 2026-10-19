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
function schoolWalls(){return {1:TX.schW,3:[TX.board],6:[TX.schDoor],16:[TX.coats],17:[TX.honor],20:[TX.stall],22:[TX.schWin],37:[TX.wcM],43:[TX.wcW]};}
function schoolCells(){for(let i=0;i<N;i++){const c=FLCH[i];CEILTEX[i]=TX.schCeil;
  if(c===46)FLOORTEX[i]=TX.schFloor;else if(c===114)FLOORTEX[i]=TX.schTerr;else if(c===58)FLOORTEX[i]=TX.schBoards;else if(c===59)FLOORTEX[i]=TX.schCheck;else if(c===109)FLOORTEX[i]=TX.schStep;}}
function schInit(){G.techOK=false;G.techT=0;}
function techNag(){G.bark='ТЕХНИЧКА: «'+pick(['Куда в уличной обуви?! Сменку надень!','Я только помыла! Сменка где?','Без сменки не пущу. Гардероб — налево.'])+'»';G.barkT=2.6;sfx.bark(230);msg('НУЖНА СМЕНКА · ГАРДЕРОБ');}
/* E on a door: true if the school keeps it shut */
function schoolDoor(i){
  if(TILE[i]===7){sfx.click();msg(i===SCH.front?'ДОМОЙ РАНО · УРОКИ':'ПОДВАЛ ЗАПЕРТ');return true;}
  if(i===SCH.door&&!worn('smenka')){sfx.click();techNag();return true;}
  if(TILE[i]===43){sfx.click();G.bark='ТЫ: «'+pick(['Не, туда нельзя.','Это женский. Мимо.','Ж. Я не настолько потерялся.'])+'»';G.barkT=2;msg('ЖЕНСКИЙ ТУАЛЕТ');return true;}
  return false;}
function updateSchool(dt){G.techT-=dt;
  if(Math.hypot(P.x-34.5,P.y-25.5)<2.2){
    if(!worn('smenka')){if(G.techT<=0){techNag();G.techT=6;}}
    else if(!G.techOK){G.techOK=true;G.bark='ТЕХНИЧКА: «Вот, другое дело. Проходи. И не бегать!»';G.barkT=2.6;sfx.bark(230);doorTarget[SCH.door]=1;doorTimer[SCH.door]=0;sfx.door();}}
  if(!(G.msgT>0)&&P.x<13&&P.y<12.5)msg('2 ЭТАЖ · СКОРО');}
