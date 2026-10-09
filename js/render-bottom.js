'use strict';
/* ---------- RENDER: BOTTOM SCREEN ---------- */
function zoneName(){const z=ZONE[(P.y|0)*MW+(P.x|0)];if(G.level===11){const c=FLCH[(P.y|0)*MW+(P.x|0)];return c===91?'ГАРАЖ':z===Z_HALL?'СТОРОЖКА':'ГАРАЖИ';}if(G.level===12)return P.x>=SILO_SW?(P.y>=SILO_F3&&P.y<76?'ЭЛЕВАТОР · 3 ЭТАЖ':'ЛЕСТНИЦА'):P.y>SILO_F2?'ЭЛЕВАТОР · 2 ЭТАЖ':'ЭЛЕВАТОР · 1 ЭТАЖ';if(G.level===10)return G.duel?'КРАН':z===Z_HALL?'КОРПУС':'СТРОЙКА';if(G.level===9){const c=FLCH[(P.y|0)*MW+(P.x|0)];return c===114?(G.trainMove?'ВАГОН · В ПУТИ':'ВАГОН'):c===101?'ЭСКАЛАТОР':c===95?(P.y<48?'СТАНЦИЯ «СТРОЙКА»':'ЛЕСТНИЦА'):z===Z_OUT?'У СТРОЙКИ':P.y>41?'ЗАБРОШЕННАЯ СТАНЦИЯ':P.y<12?'ВЕСТИБЮЛЬ':'ПЛАТФОРМА';}if(G.level===8){const x=P.x,y=P.y;return x>96.5&&y<56?'ЗАКОУЛОК':z===Z_HALL?'МАГАЗИН':x<36&&y>36.5&&y<57?'ПАРК':x>66.5&&y<49?'ТОРГОВАЯ УЛИЦА':x>75&&y>=49&&y<57?'РЫНОК':x>=39&&x<64&&y>=37&&y<57?'ПЛОЩАДЬ':'УЛИЦА';}if(G.level===7)return P.y>31?'УЛИЦА':FLCH[(P.y|0)*MW+(P.x|0)]===112?'ДОСКА':z===Z_HALL?'МАШИННОЕ':'КРЫША';if(G.level===5)return 'ЛЕСТНИЦА';if(G.level===6)return z===Z_APT?(P.x>=22&&P.x<34&&P.y>26?'КУХНЯ':'КОМНАТА'):'КОРИДОР';if(G.level===4){if(z===Z_LIFT)return 'ЛИФТ';if(z===Z_BASE)return P.x<20?'САРАЙ':'ГАРАЖ';if(z===Z_OUT)return P.y>35?'ГАРАЖИ':P.x<22&&P.y>21?'ПЛОЩАДКА':'ДВОР';if(z===Z_APT)return 'КВАРТИРА';return 'ПОДЪЕЗД';}if(z===Z_LIFT)return 'ЛИФТ';if(z===Z_BOSS)return G.level===3?'ХАТА БАТИ':'ХАТА БРАТЬЕВ';if(z===Z_WATER)return 'ЗАТОПЛЕНО';if(z===Z_BOIL)return 'КОТЕЛЬНАЯ';if(G.level===3)return 'ПОДВАЛ';if(G.level===2&&z===Z_OUT)return 'БАЛКОН';return z===Z_OUT?(P.y>21?'ГАРАЖИ':'ДВОР'):z===Z_APT?'КВАРТИРА':z===Z_BASE?'ПОДВАЛ':'ПОДЪЕЗД';}
function frame(g,x,y,w,h,c){g.strokeStyle=c;g.lineWidth=1;g.strokeRect(x+.5,y+.5,w-1,h-1);}
function bar(g,x,y,w,h,v,c){R(g,'#0a0e0d',x,y,w,h);R(g,c,x,y,Math.max(0,Math.min(1,v))*w|0,h);}
function drawMap(g,x0,y0,w,h){
  R(g,'#0a0e0d',x0,y0,w,h);g.save();g.beginPath();g.rect(x0,y0,w,h);g.clip();
  const cs=G.zoom?4:8,ox=x0+w/2-P.x*cs,oy=y0+h/2-P.y*cs;
  for(let i=0;i<N;i++){if(!SEEN[i])continue;const cx=i%MW,cy=(i/MW)|0,t=TILE[i];let c;
    if(t===0)c=ZONE[i]===Z_OUT?'#172024':ZONE[i]===Z_BASE?'#1a1a17':'#1f2e28';
    else if(t===10)c=doorOpen[i]>.5?'#6a4a34':'#8f9a90';
    else if(ISD[t])c=doorOpen[i]>.5?'#6a4a34':'#a2643e';
    else if(t===5)c=(G.t*2|0)%2?WARN:'#8a5a2a';else if(t===8)c=G.power?VFD:'#c9a22a';else c=(t===2||t===9)?'#6e5a50':'#8f9a90';
    R(g,c,Math.floor(ox+cx*cs),Math.floor(oy+cy*cs),cs,cs);}
  const px=x0+w/2,py=y0+h/2,a=P.a;g.fillStyle=VFD;g.beginPath();g.moveTo(px+Math.cos(a)*7,py+Math.sin(a)*7);g.lineTo(px+Math.cos(a+2.5)*5,py+Math.sin(a+2.5)*5);g.lineTo(px+Math.cos(a-2.5)*5,py+Math.sin(a-2.5)*5);g.closePath();g.fill();
  g.restore();frame(g,x0,y0,w,h,'#2c4a40');
}
function drawFace(g,x,y){
  const hp=P.hp,dead=G.state==='dead',SK=hp<30?'#b98b6d':'#c9987a',SKD='#9f735a';
  R(g,'#101413',x,y,40,40);
  R(g,'#5e4d3c',x+3,y+1,34,13);R(g,'#735f4a',x+5,y+2,30,3);for(const [a,b] of [[6,6],[12,4],[20,7],[27,5],[32,8],[9,9]])R(g,'#4a3c2e',x+a,y+b,2,1);
  R(g,'#5e4d3c',x+1,y+12,8,18);R(g,'#5e4d3c',x+31,y+12,8,18);R(g,'#4a3c2e',x+1,y+28,8,2);R(g,'#4a3c2e',x+31,y+28,8,2);
  R(g,'#836c55',x+6,y+10,28,5);R(g,'#c0302a',x+18,y+4,4,4);R(g,'#e0584a',x+19,y+5,2,1);
  R(g,SK,x+9,y+15,22,22);R(g,SKD,x+27,y+15,4,22);R(g,SKD,x+9,y+35,22,2);
  for(const [a,b] of [[12,33],[15,34],[19,33],[23,34],[26,33],[11,30],[28,30]])R(g,'#8a6a55',x+a,y+b,1,1);
  if(hp<35&&!dead)R(g,'#5a3050',x+21,y+18,8,6);
  if(dead){R(g,'#2a1a14',x+12,y+20,5,1);R(g,'#2a1a14',x+14,y+18,1,5);R(g,'#2a1a14',x+22,y+20,5,1);R(g,'#2a1a14',x+24,y+18,1,5);}
  else if(P.faceHurt>0){R(g,'#2a1a14',x+12,y+21,6,1);R(g,'#2a1a14',x+22,y+21,6,1);}
  else{const l=P.faceLook;R(g,'#e8e2d6',x+12,y+20,6,3);R(g,'#e8e2d6',x+22,y+20,6,3);R(g,'#1a1410',x+14+l*2,y+20,2,3);R(g,'#1a1410',x+24+l*2,y+20,2,3);}
  if(P.faceGrin>0||P.anim<.25){R(g,'#3a2a20',x+12,y+17,3,1);R(g,'#3a2a20',x+15,y+18,3,1);R(g,'#3a2a20',x+22,y+18,3,1);R(g,'#3a2a20',x+25,y+17,3,1);}
  else{R(g,'#3a2a20',x+12,y+18,6,1);R(g,'#3a2a20',x+22,y+18,6,1);}
  R(g,SKD,x+19,y+22,2,6);
  if(dead||P.faceHurt>0)R(g,'#3a0f0f',x+17,y+30,6,3);else if(P.faceGrin>0){R(g,'#3a0f0f',x+15,y+30,10,3);R(g,'#e8e2d6',x+16,y+30,8,1);}else R(g,'#6a3a2a',x+15,y+31,10,1);
  if(hp<60)R(g,'#8a1010',x+11,y+16,3,2);if(hp<35){R(g,'#8a1010',x+26,y+25,2,5);R(g,'#8a1010',x+13,y+27,2,2);}
}
function icon(g,i,cx,y,c){
  if(i===0){R(g,c,cx-7,y,14,11);R(g,'#111715',cx-3,y+1,1,6);R(g,'#111715',cx+1,y+1,1,6);R(g,c,cx-10,y+4,4,6);if(UP.kastet)R(g,WARN,cx-7,y,14,2);}
  else if(i===1){R(g,c,cx-10,y+1,20,5);R(g,c,cx+3,y+6,6,7);R(g,c,cx-1,y+6,3,2);}
  else if(i===2){R(g,c,cx-14,y+2,22,2);R(g,c,cx-14,y+5,22,2);R(g,c,cx+6,y+1,10,8);}
  else if(i===3){R(g,c,cx-3,y+3,6,10);R(g,c,cx-1,y-1,2,4);R(g,'#111715',cx-2,y+6,4,3);}
  else if(i===5){R(g,c,cx-9,y+8,18,4);R(g,c,cx-6,y+5,11,3);R(g,c,cx+5,y+7,4,2);R(g,'#111715',cx-4,y+6,2,1);R(g,'#111715',cx,y+6,2,1);}
  else{frame(g,cx-6,y-1,12,15,c);R(g,c,cx+2,y+6,2,2);}
}
function slotLabel(id){return id<=2?wname(id):id===5?wname(3):id===3?'ВОДКА':'ОТКРЫТЬ';}
function slotOwned(id){return id===2?!!P.has[2]:id===5?!!P.has[3]:id===3?P.vodka>0:true;}
function slotW(id){return id<=2?id:id===5?3:-1;}
function drawSlots(g,sel){
  for(let i=0;i<4;i++){const b=BTNS[i],id=SLOTS[i],own=slotOwned(id),act=slotW(id)===P.w,pick=sel===i;
    R(g,b.hit?'#2a3f37':act?'#1e2e29':'#161d1b',b.x,b.y,b.w,b.h);frame(g,b.x,b.y,b.w,b.h,pick?WARN:act?VFD:'#2c4a40');
    const c=!own?DIM:act?VFD:LABEL;icon(g,id,b.x+b.w/2,b.y+12,c);
    txt(g,((id===2||id===5)&&!own)?'———':slotLabel(id),b.x+b.w/2,b.y+34,c,'center');
    if(id===3)txt(g,'x'+P.vodka,b.x+b.w-4,b.y+4,own?LABEL:DIM,'right');}
}
const GEAR=[['kastet','КАСТЕТ'],['tt','ТТ'],['dvust','ДРОБОВИК'],['krossy','КРОССЫ'],['vest','ЖИЛЕТ'],['bando','ПАТРОНТ.'],['salo','САЛО'],['tapok2','ТАПКИ']];
function drawGear(g,y){GEAR.forEach(([id,n],i)=>{const x=6+(i%4)*78,yy=y+((i/4)|0)*22,on=!!UP[id];R(g,on?'#1e2e29':'#141b19',x,yy,74,18);frame(g,x,yy,74,18,on?VFD:'#22362f');txt(g,n,x+37,yy+5,on?VFD:DIM,'center');});}
function drawLoot(g){
  txt(g,'ЛУТ',6,4,WARN);txt(g,'ЗАКРЫТЬ',314,4,LABEL,'right');
  for(let i=0;i<LN;i++){const t=lootTile(i),id=LOOTS[i],own=lootOwned(id),held=G.lootHeld===id,cur=G.lootCur===i;
    R(g,held?'#2a3f37':'#161d1b',t.x,t.y,t.w,t.h);frame(g,t.x,t.y,t.w,t.h,held?WARN:cur?VFD:'#2c4a40');
    icon(g,id,t.x+t.w/2,t.y+12,own?(held?WARN:LABEL):DIM);
    const n=(id===2||id===5)&&!own?'———':id===4?'ДВЕРЬ':slotLabel(id);txt(g,n,t.x+t.w/2,t.y+42,own?LABEL:DIM,'center',6);}
  txt(g,'СНАРЯГА',6,96,DIM);drawGear(g,108);
  txt(g,'РУБ '+G.rub,314,96,VFD,'right');
  if(P.kefir)txt(g,'КЕФИР x'+P.kefir,314,86,LABEL,'right');
  drawSlots(g,G.lootSlot>=0?G.lootSlot:(G.lootCur>=LN?G.lootCur-LN:-1));
}
function drawShopBottom(g){
  txt(g,'ЧЕМОДАН БАРЫГИ',6,4,WARN);
  if(G.barkT>0)txt(g,G.bark,160,26,LABEL,'center');
  txt(g,'РУБЛИ',160,52,DIM,'center');txt(g,String(G.rub),160,64,VFD,'center',16);
  txt(g,'СНАРЯГА',6,96,DIM);txt(g,'ВОДКА x'+P.vodka+(P.kefir?'  КЕФИР x'+P.kefir:''),314,96,LABEL,'right');drawGear(g,108);
  drawSlots(g,-1);
}
function stat(g,label,val,y,c,hl){if(hl)R(g,'#1d2c27',240,y-2,78,24);txt(g,label,244,y,hl?LABEL:'#8f998f');txt(g,String(val),244,y+11,c||LABEL);}
function renderBottom(){
  const g=bg;R(g,'#111715',0,0,BW,BH);
  R(g,'#0b100e',0,0,BW,15);R(g,'#2c4a40',0,15,BW,1);
  if(G.state==='menu'||G.state==='pause'||(G.page&&G.state!=='play'&&G.state!=='lift'))return bottomMenu(g);
  if(G.state==='shop')return drawShopBottom(g);
  if(G.state==='talk'&&G.talk)return drawTalkBottom(g);
  if(G.state==='breaker')return drawBreakerBottom(g);
  if(G.state==='keypad')return drawKeypadBottom(g);
  if(G.loot)return drawLoot(g);
  if(G.barkT>0)txt(g,G.bark,6,4,WARN);else if(G.msgT>0)txt(g,G.msg,6,4,LABEL);else txt(g,(G.level===3?'':G.level===10?'':G.level===9?'МЕТРО · ':G.level===8?'ГОРОД · ':G.level>=4?'ДОМ 11 · ':'ЭТАЖ '+G.level+' · ')+zoneName(),6,4,LABEL);
  txt(g,fmtTime(G.time),314,4,VFD,'right');
  /* left column */
  R(g,'#0b0f0e',18,20,44,44);frame(g,18,20,44,44,'#2c4a40');drawFace(g,20,22);
  const hc=P.hp<30?DANGER:VFD;
  txt(g,'ЗДОРОВЬЕ',42,70,LABEL,'center');txt(g,String(P.hp),42,81,hc,'center',16);bar(g,8,100,68,5,P.hp/maxHP(),hc);
  txt(g,'ВАТНИК',42,114,LABEL,'center');txt(g,String(P.armor),42,125,'#c9d1bb','center');bar(g,8,136,68,3,P.armor/maxAR(),'#9aa58a');
  R(g,'#161d1b',LOOTBTN.x,LOOTBTN.y,LOOTBTN.w,LOOTBTN.h);frame(g,LOOTBTN.x,LOOTBTN.y,LOOTBTN.w,LOOTBTN.h,'#2c4a40');txt(g,'ЛУТ',42,155,LABEL,'center');
  /* center map */
  drawMap(g,84,20,152,156);
  /* right column */
  stat(g,'ПАТРОНЫ',P.ammo9,22,P.w===1?VFD:LABEL,P.w===1);
  stat(g,'ДРОБЬ',P.shells,50,P.w===2?VFD:LABEL,P.w===2);
  stat(g,'РУБЛИ',G.rub,78,WARN);
  stat(g,'ГОПНИКИ',G.kills+'/'+G.killTotal,106);
  if(G.level===4){const o=G.fuses<3?['ПРЕДОХР.',G.fuses+'/3',DANGER]:!G.power?['ЩИТОК','НЕТ',DANGER]:!G.liftKey?['КЛЮЧ','НЕТ',DANGER]:['ЛИФТ','ЕСТЬ',VFD];stat(g,o[0],o[1],134,o[2]);}
  else if(G.level===5)stat(g,'ВЕРХ',G.cleared?'ОТКРЫТО':'ЗАКРЫТО',134,G.cleared?VFD:DANGER);
  else if(G.level===6){const n=(G.flatKey?1:0)+(G.power?1:0)+(G.codeOK?1:0);stat(g,'ЗАДАЧИ',n+'/3',134,n>=3?VFD:DANGER);}
  else if(G.level===8)stat(g,'МИШКА',String(G.candy||0),134,LABEL);
  else if(G.level===11)stat(g,G.gkey?'ВОРОТА':'КЛЮЧ',G.gkey?(G.gateOpen?'ОТКРЫТО':'ЕСТЬ КЛЮЧ'):'У СТОРОЖА',134,G.gkey?VFD:DANGER);
  else if(G.level===10&&G.breach){stat(g,'ВЫХОД','ПРОЛОМ',134,VFD);}
  else if(G.level===10){const b=ents.find(e=>e.kind==='enemy'&&e.k==='bg');stat(g,'БРИГАДИР',b&&!b.dead?(G.duel?'НА КРАНЕ':'ЖИВ'):'НЕТ',134,b&&!b.dead?DANGER:VFD);}
  else if(G.level===9){const kt=ents.find(e=>e.kind==='enemy'&&e.k==='kt');stat(g,'КОНТРОЛЁР',kt&&!kt.dead?'ЖИВ':'НЕТ',134,kt&&!kt.dead?DANGER:VFD);}
  else if(G.level===7){const rc=G.rc,o=!rc?['ГИТАРИСТ','ЖИВ',DANGER]:rc.ph==='street'?['ПМ',P.has[1]?'ЕСТЬ':'НЕТ',P.has[1]?VFD:DANGER]:['БЕГИ','!',DANGER];stat(g,o[0],o[1],134,o[2]);}
  else{const ok=G.level===1?G.power:G.level===2?G.hasKey:G.safeFound;stat(g,LEVELDEF[G.level].obj,ok?'ЕСТЬ':'НЕТ',134,ok?VFD:DANGER);}
  drawSlots(g,-1);
}
function drawNote(g,N){
  g.fillStyle='rgba(6,8,10,.8)';g.fillRect(0,0,W,H);
  const news=N.kind.startsWith('ГАЗЕТА'),x=90,y=14,w=220,h=212;
  g.save();g.translate(200,120);g.rotate(news?-.015:.02);g.translate(-200,-120);
  R(g,'rgba(0,0,0,.5)',x+4,y+4,w,h);R(g,news?'#d9d2bc':'#e4ddc8',x,y,w,h);
  const r=rng(N.id.charCodeAt(4)*7);for(let i=0;i<60;i++)R(g,'rgba(120,100,60,.12)',x+r()*w|0,y+r()*h|0,1+r()*3|0,1);
  g.fillStyle='#2a241c';g.textBaseline='top';
  if(news){g.textAlign='center';g.font='bold 11px "Times New Roman", serif';g.fillText('ВЕЧЕРНИЙ ГОРОД',200,y+8);R(g,'#2a241c',x+10,y+23,w-20,1);R(g,'#2a241c',x+10,y+25,w-20,1);
    g.font='bold 12px "Times New Roman", serif';g.fillText(N.title,200,y+34);
    g.font='10px "Times New Roman", serif';g.textAlign='left';N.text.forEach((l,i)=>g.fillText(l,x+14,y+58+i*15));
    for(let i=0;i<3;i++)R(g,'rgba(42,36,28,.25)',x+14,y+160+i*9,w-28-(i*31%50),3);}
  else{R(g,'rgba(90,120,170,.35)',x,y+20,w,1);for(let i=1;i<13;i++)R(g,'rgba(90,120,170,.22)',x,y+20+i*14,w,1);R(g,'rgba(190,70,60,.35)',x+22,y,1,h);
    g.font='italic 12px "Comic Sans MS", cursive';g.fillStyle='#1c2a5a';g.textAlign='left';N.text.forEach((l,i)=>g.fillText(l,x+30,y+22+i*14+ (i?14:0)));}
  g.restore();
}
function bottomMenu(g){
  const title={liftChoice:'ЛИФТ',main:'ГЛАВНОЕ МЕНЮ',pause:'ПАУЗА',settings:'НАСТРОЙКИ',controls:'УПРАВЛЕНИЕ',levels:'УРОВНИ',floors:G.house===11?'ДОМ 11':'ДОМ 9',notes:'ЗАМЕТКИ '+NOTESGOT.length+'/'+NOTES.length,note:'ЗАМЕТКИ',dead:'КОНЕЦ',win:'ЭТАЖ ПРОЙДЕН'}[G.page]||'';
  txt(g,'ПАНЕЛЬКА',6,4,WARN);txt(g,title,314,4,LABEL,'right');
  const rows=menuRows();
  if(G.page==='settings'){
    rows.forEach(r=>{const sel=G.sel===r.i;R(g,sel?'#1e2e29':'#141b19',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,sel?VFD:'#22362f');
      if(r.i<SETS.length){const s=SETS[r.i];txt(g,s.label,r.x+8,r.y+6,sel?VFD:LABEL);const v=s.vals[SET[s.k]];txt(g,sel?'< '+v+' >':v,r.x+r.w-8,r.y+6,sel?VFD:'#c9d1bb','right');}
      else txt(g,'НАЗАД',r.x+r.w/2,r.y+6,sel?VFD:LABEL,'center');});
    return;}
  if(G.page==='notes'){
    rows.forEach(r=>{const sel=G.sel===r.i;R(g,sel?'#1e2e29':'#141b19',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,sel?VFD:'#22362f');
      if(r.i<NOTES.length){const N=NOTES[r.i],got=NOTESGOT.includes(N.id);txt(g,got?N.title:'— ? —',r.x+8,r.y+6,got?(sel?VFD:LABEL):DIM);}
      else txt(g,'НАЗАД',r.x+r.w/2,r.y+6,sel?VFD:LABEL,'center');});
    return;}
  if(G.page==='note'){const N=NOTES[G.noteI];txt(g,N.title,160,40,WARN,'center');txt(g,N.kind,160,60,LABEL,'center');
    const r=rows[0];R(g,'#1e2e29',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,VFD);txt(g,'НАЗАД',r.x+r.w/2,r.y+7,VFD,'center');return;}
  if(G.page==='controls'){CONTROLS.forEach(([a,b],i)=>{txt(g,a,16,26+i*17,VFD);txt(g,b,304,26+i*17,LABEL,'right');});}
  if(G.page==='dead'||G.page==='win'||G.page==='liftChoice'){
    txt(g,G.page==='dead'?'ПОПРОБУЙ ЕЩЕ':G.page==='liftChoice'?'КУДА ЕДЕМ?':'ДОМ ЗАЧИЩЕН',160,40,G.page==='dead'?DANGER:WARN,'center');
    txt(g,G.page==='win'?'РУБЛИ '+G.rub+'   ВОДКА x'+P.vodka:G.page==='dead'?'СНОВА: '+(G.cp&&G.cp.level===2?'ЭТАЖ 2':G.cp&&G.cp.level===3?'ПОДВАЛ':G.cp&&G.cp.level===4?'ДОМ 11':G.cp&&G.cp.level===5?'ЛЕСТНИЦА':G.cp&&G.cp.level===6?'ДОМ 11 · ЭТАЖ 2':G.cp&&G.cp.level===7?'КРЫША':G.cp&&G.cp.level===8?'ГОРОД':G.cp&&G.cp.level===9?'МЕТРО':G.cp&&G.cp.level===10?'СТРОЙКА':'ЭТАЖ 1'):'ГОПНИКИ '+G.kills+'/'+G.killTotal+'   ВРЕМЯ '+fmtTime(G.time),160,70,LABEL,'center');
    if(G.page==='dead'&&G.deadT<.6)return;}
  rows.forEach(r=>{const sel=G.sel===r.i;R(g,sel?'#1e2e29':'#141b19',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,sel?VFD:'#22362f');
    txt(g,MENUS[G.page][r.i],r.x+r.w/2,r.y+7,sel?VFD:LABEL,'center');});
}

