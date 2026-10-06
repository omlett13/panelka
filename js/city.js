'use strict';
/* ---------- ГОРОД: жители, лавки, разговоры (нижний экран) ---------- */
const GOSSIP=['Слыхал? С вертолёта двое прыгали. Здоровые, как шкафы.','Говорят, это люди Президента. Кто такой — лучше не спрашивай.','Бугаи эти на крыше парнишку ловили. А потом — в сено его, с крыши!','Вертолёт над районом кружил. Я уж думала — война.','Барыга? Он теперь в закоулке сидит, за рынком. Только никому не открывает.','В фонтан мелочь кидают. На счастье. Ну и на бедность.','Пацан в парке с тапком бегает. Чужой тапок, по глазам видно.','В гастроном «Мишку на Севере» завезли! Бегом, пока не разобрали.','На рынке гопота совсем обнаглела — у бабок семечки отбирают.','Ты чего такой побитый? С крыши упал, что ли?','Бугаев этих, говорят, пуля не берёт. Брешут, наверное.','Президент, Президент… Все о нём шепчут, никто его не видел.'];
const TALK={
  gastro:{who:'ГАСТРОНОМ · ТЁТЯ ВАЛЯ',hi:['Очередь не задерживаем!','Колбасы нет. …Шучу, есть. Для своих.','Чего брать будем?'],ok:['Держи. Следующий!','Сдачи нет, не спрашивай.'],
    shop:[['ПЕЛЬМЕНИ',15,{hp:20}],['КОЛБАСА',25,{hp:35}],['КЕФИР',20,{kefir:1}],['«МИШКА НА СЕВЕРЕ»',10,{candy:1}]]},
  bulka:{who:'БУЛОЧНАЯ · ТЁТЯ НИНА',hi:['Хлеб свежий, только привезли.','Батоны вилкой не тыкать!'],ok:['На здоровье.','Бери, пока тёплый.'],shop:[['БАТОН',4,{hp:8}],['БУБЛИК',3,{hp:5}],['КОРЖИК',5,{hp:10}]]},
  apteka:{who:'АПТЕКА',hi:['Рецепт есть? …Ладно, без рецепта.','Опять побитый? Садись, не падай.'],ok:['Выздоравливай.','Приходи ещё. Хотя лучше не надо.'],shop:[['БИНТ',10,{hp:5,bleed:1}],['ЙОД',8,{hp:12}],['АСКОРБИНКА',3,{hp:4}]]},
  sapog:{who:'РЕМОНТ ОБУВИ · ДЯДЯ ЖОРА',hi:['Тапок принесёшь — я из него такое сделаю…','Набойки, молнии, каблуки. Тапки — отдельный разговор.'],gossip:['Тапок твой у пацана в парке. Видел, как он им голубей гоняет.','Раньше тут очередь стояла до угла. Теперь все в кроссовках.']},
  kvas:{who:'КВАС · ТЁТЯ ЗИНА',hi:['Квас холодный! Кружка своя или наша?','Жарко? Квасу!'],ok:['Пей на здоровье.','Кружку верни!'],shop:[['КВАС МАЛЫЙ',3,{hp:6}],['КВАС БОЛЬШОЙ',6,{hp:12}]]},
  pechat:{who:'СОЮЗПЕЧАТЬ',hi:['Газеты, журналы, открытки.','«Правда» свежая. Правды в ней — как обычно.'],ok:['Держи.','Читай, просвещайся.'],shop:[['ГАЗЕТА «ПРАВДА»',3,{note:'note14'}],['КАРТА ГОРОДА',15,{map:1}]]},
  soda:{who:'АВТОМАТ ГАЗИРОВКИ',hi:['Стакан на цепочке. Не спрашивай, кто пил до тебя.'],ok:['Пшш-ш…','Буль.'],shop:[['БЕЗ СИРОПА',1,{hp:3}],['С СИРОПОМ',3,{hp:7}]]},
  fruit:{who:'ОВОЩИ-ФРУКТЫ',hi:['Яблочки свои, с дачи!','Огурцы — как огурцы.'],ok:['Кушай.','Спасибо, сынок.'],shop:[['ЯБЛОКИ',4,{hp:6}],['ОГУРЦЫ',3,{hp:5}]]},
  melon:{who:'АРБУЗЫ',hi:['Арбуз сладкий! Не сладкий — денег не верну.','Выбирай, какой хочешь.'],ok:['Хороший выбрал.','Режь дома, тут ножа нет.'],shop:[['АРБУЗ',12,{hp:30}]]},
  vend:{who:'ТОРГОВЕЦ',hi:['Смотри, не трогай — купи сначала!','Всё своё, всё с дачи!','Бери, отдам дёшево. Ну, почти.'],gossip:['Рынок, сынок, — это жизнь. Кто громче, тот и продал.','Гопота тут дань собирает. Каждый день, как на работу.']},
  pirog:{who:'ТЁТЯ С ПИРОЖКАМИ',hi:['Пирожки! С капустой, с картошкой!','Горячие, только из духовки!'],ok:['Кушай, худенький какой.','На здоровье!'],shop:[['ПИРОЖОК С КАПУСТОЙ',3,{hp:7}],['ПИРОЖОК С КАРТОШКОЙ',3,{hp:7}]]},
  bar:{who:'БАРЫГА',hi:['Тише ты. Тут свои.','Живой? Я думал, тебя с крыши… ну, ладно, раз живой.','Лифт мой накрылся. Теперь тут торгую.'],ok:['Бери, пока дают.','Только никому, понял?'],
    shop:[['ПАТРОНЫ 9ММ',15,{ammo9:8}],['ДРОБЬ',20,{shells:4}],['КЕФИР',18,{kefir:1}]],gossip:['Бугаи эти — люди Президента. Давно на него работают.','Президент в Белом доме сидит. Туда просто так не попадёшь.','Обрез твой у стройки видели. У кого — не скажу. Пока.']},
  civ:{who:'ПРОХОЖИЙ'},civW:{who:'ПРОХОЖАЯ'},queue:{who:'ОЧЕРЕДЬ',hi:['Молодой человек, вы тут не стояли!','Куда без очереди?!'],gossip:['Я за «Мишкой» с утра стою.','Говорят, завтра колбасу выбросят.']},
  mil:{who:'МИЛИЦИОНЕР',hi:['Гражданин, проходим, не задерживаемся.','Документики… Ладно, иди.'],gossip:['Бугаи? Не положено обсуждать.','Вертолёт был учебный. Всё, разговор окончен.']},
  chess:{who:'ШАХМАТИСТЫ',hi:['Шах. …Не мешай, молодой.','Ходи конём, Петрович!'],gossip:['Вертолёт? Мы тут в шахматы играем, нам некогда.','Президент ваш — пешка. Все мы пешки.']},
  kid:{who:'ПАЦАН',hi:['Тапок? Мой теперь!','Чего надо? Тапок не отдам!'],gossip:['Ну… может, поменяю. На что-нибудь сладкое.','А он мягкий, тапок твой. Голубей хорошо гонять.']}
};
const NPCS={Ngastro:{spr:'Wseller',talk:'gastro',block:.3},Nbulka:{spr:'Wseller',talk:'bulka',block:.3},Napteka:{spr:'Wpharm',talk:'apteka',block:.3},Nsapog:{spr:'Csapog',talk:'sapog',block:.3},
  Nkvas:{spr:'kvas',talk:'kvas',sc:1.5,block:.6},Npechat:{spr:'pechat',talk:'pechat',sc:2,block:.8},Nsoda:{spr:'soda',talk:'soda',sc:1.3,block:.4},Nfruit:{spr:'fruit',talk:'fruit',sc:1.8,block:.7},Nmelon:{spr:'melon',talk:'melon',sc:1.2,block:.5},
  Nchess1:{spr:'Cchess1',talk:'chess',block:.3},Nchess2:{spr:'Cchess2',talk:'chess',block:.3},Nkid:{spr:'Ckid',talk:'kid',sc:.75,block:.25},Nmil:{spr:'Cmil',talk:'mil',block:.3},
  Nwalk1:{spr:'Cman1',talk:'civ',block:.3,walk:1},Nwalk2:{spr:'Cman2',talk:'civ',block:.3,walk:1},Nwalk3:{spr:'Cman3',talk:'civ',block:.3,walk:1},
  Nstall1:{spr:'stall1',talk:'vend',sc:1.8,block:.7},Nstall2:{spr:'stall2',talk:'vend',sc:1.8,block:.7},Nstall3:{spr:'stall3',talk:'vend',sc:1.8,block:.7},
  Nshout:{spr:'Wciv2',talk:'pirog',block:.3,shout:['Пирожки! Горячие пирожки!','С капустой, с картошкой!']},Nshout2:{spr:'Cman3',talk:'vend',block:.3,shout:['Семечки! Кому семечки!','Стакан — десять копеек!']},
  Nbar:{spr:'dealer',talk:'bar',sc:1.05,block:.32},
  Nciv1:{spr:'Cman1',talk:'civ',block:.3},Nciv2:{spr:'Wciv1',talk:'civW',block:.3},Nciv3:{spr:'Cman3',talk:'civ',block:.3},Nciv4:{spr:'Wciv2',talk:'civW',block:.3},Nciv5:{spr:'Cman2',talk:'civ',block:.3},
  Nciv6:{spr:'Wciv1',talk:'civW',block:.3},Nciv7:{spr:'Cman1',talk:'civ',block:.3},Nciv8:{spr:'Cman3',talk:'civ',block:.3},Nciv9:{spr:'Wqueue',talk:'queue',block:.3}};
function facingNPC(){let best=null,bd=1e9;for(const e of ents){if(e.kind!=='npc')continue;const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d>1.6+(e.block||0))continue;let da=Math.atan2(dy,dx)-P.a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)>.55)continue;if(d<bd){bd=d;best=e;}}return best;}
function pick(a){return a[(Math.random()*a.length)|0];}
function wrapText(s,n){const out=[];let line='';for(const w of s.split(' ')){if((line+' '+w).trim().length>n){if(line)out.push(line);line=w;}else line=(line+' '+w).trim();}if(line)out.push(line);return out;}
function talkOpts(){const T=TALK[G.talk.id],o=[];
  if(G.talk.id==='kid'&&!P.has[3]&&(G.candy||0)>0)o.push({l:'ДАТЬ «МИШКУ»',f:()=>{G.candy--;P.has[3]=1;P.w=3;sfx.pickup();talkSay('О! «Мишка на Севере»! …Ладно, держи свой тапок. Он всё равно воняет.');msg('ТАПОК ВЕРНУЛСЯ');G.talk.opts=talkOpts();G.talk.sel=0;}});
  if(G.talk.id==='sapog'&&P.has[3]&&!UP.gvozd)o.push({l:'ПОДБИТЬ ТАПОК ГВОЗДЯМИ · 40 Р',f:()=>{if(G.rub<40){talkSay('Сорок рублей, молодой. Гвозди нынче дорогие.');sfx.click();return;}G.rub-=40;UP.gvozd=1;sfx.cash();sfx.clunk();talkSay('Готово. Подошва — сталь, гвозди — наружу. Бей в лоб, не промахнёшься.');msg('ТАПОК+ : УРОН x2');G.talk.opts=talkOpts();G.talk.sel=0;}});if(T.shop)for(const it of T.shop)o.push({l:it[0]+' · '+it[1]+' Р',f:()=>buyItem(it)});o.push({l:'ПОГОВОРИТЬ',f:()=>{talkSay(pick(T.gossip||GOSSIP));sfx.bark(G.talk.pitch);}});o.push({l:'ПОКА',f:talkClose});return o;}
function openTalk(n){const T=TALK[n.talk];G.talk={n,id:n.talk,who:T.who,text:[],sel:0,pitch:120+((n.x*7+n.y*3)|0)%120};G.state='talk';keys.clear();mouseFire=false;
  const sp=n.talk==='kid'?(P.has[3]?'Спасибо за «Мишку»! Тапок больше не отдам… в смысле, он твой.':(G.candy>0?'Это что у тебя в кармане? «Мишка»?!':null)):n.talk==='sapog'&&P.has[3]?(UP.gvozd?'Ну как тапок? Бьёт? То-то же.':'О, тапок вернул! Давай сюда — подобью гвоздями, будет как кастет.'):null;
  talkSay(sp||(T.hi?pick(T.hi):pick(GOSSIP)));G.talk.opts=talkOpts();sfx.bark(G.talk.pitch);}
function talkSay(s){G.talk.text=wrapText(s,34);G.talk.tt=0;}
function openChoice(who,text,opts){G.talk={n:null,id:null,who,text:[],sel:0,opts,pitch:120};G.state='talk';keys.clear();mouseFire=false;talkSay(text);sfx.tick();}
function talkClose(){G.talk=null;G.state='play';keys.clear();sfx.tick();}
function talkMove(d){const t=G.talk;if(!t)return;t.sel=(t.sel+d+t.opts.length)%t.opts.length;sfx.tick();}
function talkChoose(){const t=G.talk;if(!t)return;const o=t.opts[t.sel];if(o)o.f();}
function talkKey(k){if(k==='ArrowUp'||k==='KeyW')talkMove(-1);else if(k==='ArrowDown'||k==='KeyS')talkMove(1);else if(k==='Enter'||k==='Space'||k==='KeyE')talkChoose();else if(k==='Escape'||k==='Backspace'||k==='Tab'||k==='KeyQ')talkClose();}
function talkRows(){const t=G.talk,n=t.opts.length,h=19,y0=BH-6-n*h;return t.opts.map((o,i)=>({x:10,y:y0+i*h,w:BW-20,h:h-2,i}));}
function talkTouch(p){for(const r of talkRows())if(inR(p,r)){if(G.talk.sel===r.i)talkChoose();else{G.talk.sel=r.i;sfx.tick();}return;}}
function buyItem(it){const [name,price,fx]=it,T=TALK[G.talk.id];
  if(G.rub<price){talkSay(pick(['Денег нет — не задерживай.','Рублей не хватает, милок.','Без денег — только посмотреть.']));sfx.click();return;}
  if(fx.ammo9&&P.ammo9>=cap9()){talkSay('Тебе столько не унести.');sfx.click();return;}if(fx.shells&&P.shells>=capS()){talkSay('Карманы полные, куда тебе ещё.');sfx.click();return;}
  if(fx.hp&&!fx.bleed&&P.hp>=maxHP()){talkSay('Ты и так сытый. Потом приходи.');sfx.click();return;}
  if(fx.note&&NOTESGOT.includes(fx.note)){talkSay('Эту ты уже читал. Новой пока нет.');sfx.click();return;}
  G.rub-=price;sfx.cash();
  if(fx.hp)P.hp=Math.min(maxHP(),P.hp+fx.hp);if(fx.bleed)P.bleed=0;if(fx.kefir)P.kefir=(P.kefir||0)+1;if(fx.ammo9)P.ammo9=Math.min(cap9(),P.ammo9+fx.ammo9);if(fx.shells)P.shells=Math.min(capS(),P.shells+fx.shells);if(fx.candy)G.candy=(G.candy||0)+1;
  if(fx.note){NOTESGOT.push(fx.note);saveNotes();}if(fx.map){SEEN.fill(1);}
  talkSay(pick(T.ok||['Держи.'])+(fx.note?'  (В ЗАМЕТКАХ)':fx.map?'  (КАРТА НА ЭКРАНЕ)':fx.candy?'  («МИШКА» В КАРМАНЕ)':''));}
function drawTalkBottom(g){const t=G.talk;R(g,'#0e1412',0,0,BW,BH);R(g,'#0b100e',0,0,BW,20);R(g,'#2c4a40',0,20,BW,1);
  txt(g,t.who,8,6,WARN);txt(g,G.rub+' Р',BW-8,6,VFD,'right');
  t.tt=(t.tt||0)+1/60;const shown=Math.floor(t.tt*60);let left=shown;
  t.text.forEach((l,i)=>{const s=l.slice(0,Math.max(0,left));left-=l.length;txt(g,s,10,32+i*13,'#e8e2d2');});
  for(const r of talkRows()){const sel=r.i===t.sel;R(g,sel?'#1f3a30':'#141c19',r.x,r.y,r.w,r.h);frame(g,r.x,r.y,r.w,r.h,sel?VFD:'#2c4a40');txt(g,(sel?'> ':'  ')+t.opts[r.i].l,r.x+6,r.y+5,sel?VFD:LABEL);}}
/* haze toward the sky colour in the daytime city */
let HZ=0;function hzA(c,r,g,b){let R2=(c&255)+r,G2=((c>>>8)&255)+g,B2=((c>>>16)&255)+b;if(R2>255)R2=255;if(G2>255)G2=255;if(B2>255)B2=255;return (0xff000000|(B2<<16)|(G2<<8)|R2)>>>0;}
function updateNPCs(dt){if(Math.hypot(P.x-61.5,P.y-60.3)<1.7&&!(G.msgT>0))msg('МЕТРО · E — СПУСТИТЬСЯ');for(const e of ents){if(e.kind!=='npc'||!e.walk)continue;e.pause=(e.pause||0)-dt;if(e.pause>0){e.moving=false;continue;}
    const ox=e.x;const nx=e.x+e.dir*.9*dt;if(nx<e.x0||nx>e.x1||solidR(nx,e.y,.3)||Math.hypot(nx-P.x,e.y-P.y)<.7){e.dir=-e.dir;if(Math.random()<.4)e.pause=1+Math.random()*2.5;}else e.x=nx;e.moving=e.x!==ox;e.wk+=Math.abs(e.x-ox)*3.2;}}
/* market crowd: recorded loop (freesound community, 'crowd the hill language'), mono 48k, 32 s */
function bossFightOn(){if(G.state!=='play')return false;for(const e of ents){if(e.kind!=='enemy'||e.dead)continue;const K=KINDS[e.k];if((K.boss||K.bro)&&!K.rf&&e.alert)return true;}return false;}
function bossMusic(){if(!AU.c)return;const c=AU.c,t=c.currentTime;
  if(!AU.bossG){AU.bossG=c.createGain();AU.bossG.gain.value=0;AU.bossG.connect(AU.m);AU.bossBuf=null;
    loadMp3('boss',buf=>{AU.bossBuf=buf;});}
  const on=bossFightOn();
  if(on&&!AU.bossSrc&&AU.bossBuf){const src=c.createBufferSource();src.buffer=AU.bossBuf;src.loop=true;src.connect(AU.bossG);src.start();AU.bossSrc=src;AU.bossG.gain.cancelScheduledValues(t);AU.bossG.gain.setTargetAtTime(.6,t,.5);}
  else if(!on&&AU.bossSrc){AU.bossG.gain.setTargetAtTime(0,t,.6);const src=AU.bossSrc;AU.bossSrc=null;try{src.stop(t+1.4);}catch(e){}}
  else if(on&&AU.bossSrc){AU.bossG.gain.setTargetAtTime(.6,t,.5);}}
function updateCityAudio(){if(!AU.c||G.level!==8)return;const t=AU.c.currentTime,live=G.state==='play';
  if(!AU.crowd){const c=AU.c,gn=c.createGain();gn.gain.value=0;gn.connect(AU.m);AU.crowd=gn;
    loadMp3('crowd',buf=>{const s=c.createBufferSource();s.buffer=buf;s.loop=true;s.connect(gn);s.start();});}
  const d=Math.hypot(P.x-84,P.y-48),v=live?Math.pow(Math.max(0,1-d/28),1.3)*.07:0;AU.crowd.gain.setTargetAtTime(v,t,.4);
  if(!live||t<(G.shoutT||0))return;G.shoutT=t+2.5+Math.random()*3.5;
  const cands=ents.filter(e=>e.kind==='npc'&&e.shout&&Math.hypot(e.x-P.x,e.y-P.y)<16);if(!cands.length){const n=ents.find(e=>e.kind==='npc'&&e.talk==='vend'&&Math.hypot(e.x-P.x,e.y-P.y)<12);if(n)vocal(150+Math.random()*80,.35,.8,[650,1150,2400]);return;}
  const n=pick(cands),dd=Math.hypot(n.x-P.x,n.y-P.y);vocal(dd<8?230:180,.45,.8,[650,1150,2400]);if(dd<9&&G.barkT<=0){G.bark=TALK[n.talk].who+': «'+pick(n.shout)+'»';G.barkT=2.2;}}
function cityBirds(){if(!AU.c||G.level!==8||G.state!=='play')return;const t=AU.c.currentTime;if(t<(G.birdT||0))return;G.birdT=t+1.5+Math.random()*4;const f=2200+Math.random()*1400;for(let i=0;i<2+((Math.random()*3)|0);i++)tone('sine',f,f*1.3,.07,.06,i*.11);}

