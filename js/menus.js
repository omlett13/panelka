'use strict';
/* ---------- GAME FLOW / MENUS ---------- */
const MENUS={pause:['ПРОДОЛЖИТЬ','НАСТРОЙКИ','ЗАМЕТКИ','УПРАВЛЕНИЕ','В МЕНЮ'],dead:['ЕЩЕ РАЗ','В МЕНЮ'],win:['ДАЛЬШЕ','В МЕНЮ'],liftChoice:['ВНИЗ: ПОДВАЛ','ДАЛЬШЕ: НОВЫЙ ДОМ'],controls:['НАЗАД']};
const CONTROLS=[['WASD','ХОДИТЬ'],['СТРЕЛКИ/МЫШЬ','ПОВОРОТ'],['ПРОБЕЛ/КЛИК','ОГОНЬ'],['E','ИСПОЛЬЗОВАТЬ'],['1 2 3 4 / 5','СЛОТЫ / ТАПОК'],['G','БРОСИТЬ ВОДКУ'],['TAB','ЛУТ'],['SHIFT','БЕГ'],['ENTER/ESC','ПАУЗА'],['A B / L R','ОГОНЬ ИСП / ВБОК']];
/* level select: unlocks as you reach floors */
let UNL=new Set([1]);for(const v of store.get('unlock',[],Array.isArray))if(LEVEL_SRC[v])UNL.add(v);
function unlock(n){if(UNL.has(n))return;UNL.add(n);store.set('unlock',[...UNL]);}
const HOUSES={9:[[1,'ЭТАЖ 1'],[2,'ЭТАЖ 2'],[3,'ПОДВАЛ']],11:[[4,'ЭТАЖ 1'],[5,'ЛЕСТНИЦА'],[6,'ЭТАЖ 2'],[7,'КРЫША']],4:[[9,'МЕТРО'],[10,'СТРОЙКА']]};
Object.defineProperty(MENUS,'main',{get:()=>UNL.size>1?['ИГРАТЬ','УРОВНИ','НАСТРОЙКИ','ЗАМЕТКИ','УПРАВЛЕНИЕ']:['ИГРАТЬ','НАСТРОЙКИ','ЗАМЕТКИ','УПРАВЛЕНИЕ']});
Object.defineProperty(MENUS,'levels',{get:()=>['ДОМ 9',UNL.has(4)?'ДОМ 11':'ДОМ 11 · ЗАКРЫТО',UNL.has(8)?'ГОРОД':'ГОРОД · ЗАКРЫТО',UNL.has(9)?'МЕТРО':'МЕТРО · ЗАКРЫТО',UNL.has(11)?'ГАРАЖИ':'ГАРАЖИ · ЗАКРЫТО','НАЗАД']});
Object.assign(sfx,{brake(){nz(1.3,'bandpass',2600,6,.3,1.2);tone('sawtooth',900,480,1.1,.06);},tink(){tone('square',2600,1900,.05,.22);nz(.04,'highpass',5000,.7,.2,.03);},thud(){tone('sine',80,28,.5,1.4);nz(.35,'lowpass',260,.8,1.1,.3);},thudS(){tone('sine',65,35,.18,.55);nz(.12,'lowpass',200,.8,.35,.1);},twang(){tone('sawtooth',330,150,.5,.4);tone('sawtooth',335,160,.5,.3);}});
Object.defineProperty(MENUS,'floors',{get:()=>HOUSES[G.house].map(([n,l])=>n===0?l+' · СКОРО':UNL.has(n)?l:l+' · ЗАКРЫТО').concat(['НАЗАД'])});
function startAt(n){G.cp=null;loadLevel(n);resetLevel(false);G.hasKey=n===3;if(n>1)saveCheckpoint();G.state='play';G.page=null;keys.clear();
  msg(LNAME[n]||'');}
function openPage(p){G.page=p;G.sel=0;}
function exitLock(){try{if(document.pointerLockElement)document.exitPointerLock();}catch(e){}}
/* checkpoint: taken when you arrive on floor 2 or the basement; dying there puts you back at that arrival */
function saveCheckpoint(){G.cp={level:G.level,rub:G.rub,hasKey:G.hasKey,UP:Object.assign({},UP),P:{ammo9:P.ammo9,shells:P.shells,vodka:P.vodka,kefir:P.kefir,has:P.has.slice(),w:P.w}};}
function enterLevel(n){loadLevel(n);resetLevel(true);saveCheckpoint();G.state='play';G.page=null;keys.clear();}
function retryLevel(){const c=G.cp;if(!c||c.level===1){newGame();return;}
  loadLevel(c.level);G.rub=c.rub;G.hasKey=c.hasKey;Object.assign(UP,c.UP);Object.assign(P,{ammo9:c.P.ammo9,shells:c.P.shells,vodka:c.P.vodka,kefir:c.P.kefir||0,has:c.P.has.slice(),w:c.P.w});
  resetLevel(true);G.hasKey=c.hasKey;G.state='play';G.page=null;keys.clear();if(c.level===7&&c.chase){roofSkipToChase();return;}if(c.level===9&&c.metroMid){metroSkipMid();return;}if(c.level===10&&c.crane){siteSkipToCrane();msg('СТРОЙКА · КРАН');return;}if(c.level===10&&c.arena){siteSkipToArena();msg('СТРОЙКА · БРИГАДИР');return;}msg(c.level===10?'СТРОЙКА':c.level===9?'МЕТРО':c.level===8?'ГОРОД':c.level===7?'КРЫША':c.level===2?'ЭТАЖ 2':c.level===4?'ДОМ 11':c.level===5?'ЛЕСТНИЦА':c.level===6?'ЭТАЖ 2':'ПОДВАЛ');}
function newGame(){G.cp=null;loadLevel(1);resetLevel(false);G.state='play';G.page=null;keys.clear();}
function nextFloor(){if(G.level===12){siloHome();return;}if(G.level>=4){loadLevel(1);resetLevel(true);G.floorN++;G.cp=null;G.state='play';G.page=null;keys.clear();return;}enterLevel(4);msg('ДОМ 11 · ЭТАЖ 1');}
function resume(){G.state=G.prevState||'play';G.page=null;keys.clear();}
function pauseGame(){if(G.state!=='play'&&G.state!=='lift')return;G.prevState=G.state;G.loot=false;G.state='pause';openPage('pause');keys.clear();mouseFire=false;exitLock();}
const LNAME={1:'ДОМ 9 · ЭТАЖ 1',2:'ДОМ 9 · ЭТАЖ 2',3:'ДОМ 9 · ПОДВАЛ',4:'ДОМ 11 · ЭТАЖ 1',5:'ДОМ 11 · ЛЕСТНИЦА',6:'ДОМ 11 · ЭТАЖ 2',7:'ДОМ 11 · КРЫША',8:'ГОРОД',9:'МЕТРО',10:'СТРОЙКА',11:'ГАРАЖИ',12:'ЭЛЕВАТОР'};
const MENUCAM={1:{x:8.5,y:11.5,a:0},7:{x:9,y:9,a:-.3},8:{x:51,y:53,a:-Math.PI/2},9:{x:60,y:39.5,a:0},10:{x:60,y:79,a:-Math.PI/2-.25},11:{x:23,y:54.5,a:-.05},12:{x:44,y:49,a:-Math.PI/2}};
function lastLevel(){const n=store.get('last',1,Number.isInteger);return LEVEL_SRC[n]&&UNL.has(n)?n:1;}
function menuScene(){const n=lastLevel();G.menuLoad=true;loadLevel(n);resetLevel(false);G.menuLoad=false;const c=MENUCAM[n]||LEVELDEF[n].start;G.menuCam={x:c.x,y:c.y};P.x=c.x;P.y=c.y;P.a=c.a||0;G.menuLvl=n;
  if(n===9){G.trainMove=true;}if(n===7){G.dawn=.85;skyMixK=-1;setDawn(.85);}}
function toMenu(){menuScene();G.state='menu';openPage('main');}
function endGame(s){G.face=null;G.grab=null;G.state=s;G.deadT=0;G.winTime=G.time;openPage(s);keys.clear();mouseFire=false;exitLock();}
function pageLen(){return G.page==='settings'?SETS.length+1:G.page==='notes'?NOTES.length+1:G.page==='note'?1:(MENUS[G.page]||[]).length;}
function changeSet(i,d){const s=SETS[i];SET[s.k]=(SET[s.k]+d+s.vals.length)%s.vals.length;applySettings();saveSet();sfx.tick();}
function applySettings(){setRes();if(AU.m)AU.m.gain.value=SET.snd?.55:0;}
function menuAct(a){
  if(!G.page)return;const n=pageLen();
  if(a==='up'){G.sel=(G.sel-1+n)%n;sfx.tick();return;}
  if(a==='down'){G.sel=(G.sel+1)%n;sfx.tick();return;}
  if(G.page==='settings'){
    if(G.sel<SETS.length){if(a==='left')changeSet(G.sel,-1);else if(a==='right'||a==='ok')changeSet(G.sel,1);else if(a==='back')openPage(G.parent);}
    else if(a==='ok'||a==='back')openPage(G.parent);
    return;}
  if(G.page==='notes'){
    if(a==='back'||(a==='ok'&&G.sel===NOTES.length)){sfx.tick();openPage(G.parent);return;}
    if(a==='ok'){if(NOTESGOT.includes(NOTES[G.sel].id)){G.noteI=G.sel;openPage('note');sfx.pickup();}else sfx.click();}
    return;}
  if(G.page==='note'){if(a==='ok'||a==='back'){sfx.tick();openPage('notes');G.sel=G.noteI;}return;}
  if(a==='back'){if(G.page==='liftChoice'){G.state='lift';G.page=null;return;}if(G.page==='controls')openPage(G.parent);else if(G.state==='pause')resume();return;}
  if(G.page==='levels'||G.page==='floors'){
    if(a==='back'){sfx.tick();openPage(G.page==='floors'?'levels':'main');if(G.page==='levels')G.sel=G.house===11?1:G.house===4?3:0;return;}
    if(a!=='ok')return;
    if(G.page==='levels'){if(G.sel===5){sfx.tick();openPage('main');return;}if(G.sel===4){if(!UNL.has(11)){sfx.click();return;}sfx.tick();startAt(11);return;}if(G.sel===3){if(!UNL.has(9)){sfx.click();return;}G.house=4;sfx.tick();openPage('floors');return;}if(G.sel===2){if(!UNL.has(8)){sfx.click();return;}sfx.tick();startAt(8);return;}const h=G.sel?11:9;if(h===11&&!UNL.has(4)){sfx.click();return;}G.house=h;sfx.tick();openPage('floors');return;}
    const F=HOUSES[G.house];if(G.sel>=F.length){sfx.tick();openPage('levels');G.sel=G.house===11?1:G.house===4?3:0;return;}
    const n=F[G.sel][0];if(!n||!UNL.has(n)){sfx.click();return;}sfx.tick();startAt(n);return;}
  if(a!=='ok')return;
  sfx.tick();
  switch(MENUS[G.page][G.sel]){
    case 'УРОВНИ':openPage('levels');break;
    case 'ИГРАТЬ':newGame();break;
    case 'ЕЩЕ РАЗ':retryLevel();break;
    case 'ДАЛЬШЕ':nextFloor();break;
    case 'ВНИЗ: ПОДВАЛ':G.state='lift';G.page=null;startRide(3);break;
    case 'ДАЛЬШЕ: НОВЫЙ ДОМ':G.state='lift';G.page=null;startRide('win');break;
    case 'ПРОДОЛЖИТЬ':resume();break;
    case 'НАСТРОЙКИ':G.parent=G.page;openPage('settings');break;
    case 'УПРАВЛЕНИЕ':G.parent=G.page;openPage('controls');break;
    case 'ЗАМЕТКИ':G.parent=G.page;openPage('notes');break;
    case 'В МЕНЮ':toMenu();break;
    case 'НАЗАД':openPage(G.parent);break;
  }
}
function menuRows(){
  const rows=[];if(!G.page)return rows;
  if(G.page==='settings'){for(let i=0;i<=SETS.length;i++)rows.push({x:12,y:22+i*24,w:296,h:20,i});return rows;}
  if(G.page==='controls'||G.page==='note'){rows.push({x:80,y:208,w:160,h:20,i:0});return rows;}
  if(G.page==='notes'){const st=Math.max(0,Math.min(NOTES.length-8,G.sel-4));for(let i=st;i<Math.min(NOTES.length,st+8);i++)rows.push({x:12,y:22+(i-st)*23,w:296,h:19,i});rows.push({x:12,y:22+8*23,w:296,h:19,i:NOTES.length});return rows;}
  const items=MENUS[G.page],y0=(G.page==='dead'||G.page==='win'||G.page==='liftChoice')?120:52;
  items.forEach((_,i)=>rows.push({x:60,y:y0+i*28,w:200,h:22,i}));return rows;
}

